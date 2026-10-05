






const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            unitValue,
            unit,
            isActive,
        } = req.body;

        const image = req.file
            ? `/uploads/products/${req.file.filename}`
            : null;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            unitValue,
            unit,
            isActive,
            image,
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        console.error(
            "Create product error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getProducts = async(req,res)=>{
    try {
        const newProducts = await Product.find()
        return res.status(200).json({message : "success" , newProducts})
    } catch (error) {
        console.error(error.message)
    }
}