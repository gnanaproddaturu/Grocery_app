


const controller = require("../controllers/cartController")
const express = require("express")

const router = express.Router()

router.post("/add-to-cart" , controller.addToCart)

module.exports = router