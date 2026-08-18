


const nodemailer = require("nodemailer");
const dotEnv = require("dotenv")


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


exports.sendOtpEmail = async(email ,otp)=>{
    try {
    await transporter.sendMail({
    from: `"OTP Verification" <${process.env.EMAIL_USER}>`, // sender address
    to: email,
    subject: "Your OTP code",
    html: `<h2> Your OTP is : ${otp} </h2> <p>Valid for 5 minutes</p>`
  });

} catch (err) {
  console.error("Error while sending mail:", err);
}
}