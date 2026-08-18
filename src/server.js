

const express = require("express")
const dotEnv = require("dotenv")
const connectDatabase = require("./config/db")
const app = require("./app")


dotEnv.config()
console.log('content mongos ', process.env.MONGO_URI)


const PORT = process.env.PORT || 8000



const startServer= async()=>{
    try {
        
        await connectDatabase()

        app.listen(PORT ,()=>{
            console.log(`Server running on http://localhost:${PORT}`)
        });
    } catch (error) {
        console.log(`Server startup failed : `,error.message)
        process.exit(1)
    }
}
 
startServer()

