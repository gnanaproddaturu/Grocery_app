
const User = require("../models/User")

const {generateOtp} = require("../email/generateOtp")
const {sendOtpEmail} = require("../email/send-otp")




exports.sendOtp = async(req, res)=>{
    try {
        
        const {name , email} = req.body
        if(!email){
            return res.status(400).json({message : "Email requird"})
        }
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({name  ,email})
        }
        console.log(user)
        const otp = generateOtp()
        user.otp = otp
        user.otpExpires = Date.now()+5*60*1000 

        await sendOtpEmail(email , otp)

        res.status(200).json({
            success : true,
            message :"OTP send to your eamil",
            name
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }

}