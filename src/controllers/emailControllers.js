
const User = require("../models/User");
const { generateOtp } = require("../email/generateOtp");
const {sendOtpEmail} = require("../email/send-otp")
const jwt = require("jsonwebtoken")

exports.sendOtp = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email required",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    const otp = generateOtp();

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendOtpEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
      name,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("Email from request:", email);
    console.log("OTP from request:", otp);


    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are requiered" });
    }

    const user = await User.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

      console.log("OTP from database:", user.otp);
    console.log("OTP expiry:", user.otpExpires);
    console.log("OTP type:", typeof user.otp);

    if (!user.otp || user.otp !== String(otp)) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid Expired........" });
    }


    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      success: true,
      token,
    });
    
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
