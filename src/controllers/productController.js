


const Product = require("../models/Products")


exports.createProduct= async(req,res)=>{
    try {
        const {name, descriptione, price, category, unit,unitValue} = req.body
        const image =req.file? `/uploads/products/${req.file.filename}` : null

        const products = await Product.create({
            name ,descriptione,price, category, unit,unitValue ,image
        })

        const existingProduct = await Product.findOne({name : name.trim()})
        
        if(existingProduct){
            return res.status(400).json({message : "product alrady existed"})
        }
       
        return res.status(200).json({message :"products add",products})
        
    } catch (error) {
        console.error("somthing wrong",error.message)
    }
}



exports.getProducts = async(req,res)=>{
    try {
        const newProducts = await Product.find()
        return res.status(200).json({message : "success" , newProducts})
    } catch (error) {
        console.error(error.message)
    }
}