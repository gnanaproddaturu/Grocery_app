const Cart = require("../models/Cart");
const Product = require("../models/Products");

exports.addToCart = async (req, res) => {
  try {
    

     const userId = req.userId;
        const { productId, quantity } = req.body;

        console.log("userId:", userId);
        console.log("productId:", productId);
        console.log("quantity:", quantity);

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        if (!productId || quantity < 1) {
            return res.status(400).json({
                message: "Please add a valid product"
            });
        }







    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(400).json({ message: "Product not found......." });
    }
    let cart = await Cart.findOne({ user: userId });
    console.log(cart)
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity,
          },
        ],
      });
      return res
        .status(200)
        .json({ message: "Cart created & Product added.....", cart });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
