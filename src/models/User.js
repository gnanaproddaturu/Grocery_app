
// const mongoose = require("mongoose")


// const userSchema= new mongoose.Schema({
//     name:{
//         type : String,
//         required : true
//     },
//     email :{
//         type : String,
//         required : true,
//         unique : true
//     },
//     otp : String,
//     otpExpires : String
// })

// module.exports = mongoose.model("User" , userSchema)


const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    }
})

module.exports = mongoose.model("User", userSchema)