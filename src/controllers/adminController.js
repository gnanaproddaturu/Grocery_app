
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



exports.adminRegister = async(req , res)=>{
    try {
        const {name ,email , password} = req.body

        // const adminRecord = awiat Admin.findOne({email})
        const adminRecord = await Admin.findOne({email})
        if(adminRecord){
            return res.staths(400).json({message :"email already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password , 10)

        const admin = await Admin.create({
            name , email , password : hashedPassword
        })
        return res.status(200).json({message :"admin reginstation success"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }

}


exports.adminLogin = async(req,res)=>{
    try{
        const {email , password} = req.body
    
        const adminRecord = await Admin.findOne({email})
        if(!adminRecord){
            return res.status(401).json({message : "invalid credentials"})
        }
        const adminPssword = await bcrypt.compare(password , adminRecord.password)
        if(!adminPssword){
            return res.status(400).json({message : "Password invalid creadentials"})
        }
        
        const token =  jwt.sign(
            {adminId : adminRecord._id} ,process.env.JWT_SECRET ,{expiresIn:"1d"}
        )
        return res.status(200).json({message : "login success" , token})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}



