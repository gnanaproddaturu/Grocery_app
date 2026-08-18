

const Cart = require("../models/Cart")
const Product = require("../models/Products")



exports.addToCart=async()=>{

    try {
        const userId = req.user._id;
        const {productId , qunatity} = req.body
        if(qunatity <1){
            return res.status(400).json({message : "pless add a product..........."})
        }
        const productExists = await Product.findById(productId)
        if(!productExists){
            return res.status(400).json({message : "Product not found......."})
        }
        let cart = await Cart.findOne({user:userId})
        if(!cart){
            cart = await Cart.create({
                user :userId,
                items:[{
                    product : productId,qunatity
                }]
            })
            return res.status(200).json({message : "Cart created & Product added.....",
                cart
            })
        }
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
        if(itemIndex > -1){
            cart.items[itemIndex].qunatity += qunatity
        }
        else{
            cart.items.push({product:productId , qunatity})
        }
        await cart.save()
        res.json({
            success : true,
            message : "Product added successfully"
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}