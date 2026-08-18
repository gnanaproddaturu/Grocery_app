


const emailController = require("../controllers/emailControllers")
const express = require("express")

const router = express.Router()

router.post("/send-otp" , emailController.sendOtp)

module.exports = router