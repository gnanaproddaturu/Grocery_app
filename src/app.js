


const express = require("express")
const productRoute = require("./routes/productRoutes")
const path = require("path")
const adminRoute = require("./routes/adminRoutes")
const emailRoute = require("./routes/emailRoutes")

const app = express()

app.use(express.json())
app.use("/uploads/products",express.static(path.join(__dirname,"uploads/products")))


app.use("/api" ,productRoute)
app.use("/admin" , adminRoute)
app.use("/email" , emailRoute)

app.get("/" , (req,res)=>{
    res.json({
        message : "app run successfully.......!"
    })
})



module.exports = app