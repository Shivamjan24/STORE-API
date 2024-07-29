const express=require('express')
const app=express()
const storerouter=require('./routes/products')
const notfound=require("./middleware/not-found")
const errorHandlerMiddleware=require("./middleware/error-handler")
const connectDB = require('./db/connect')
require('dotenv').config()
require('express-async-errors')

app.use(express.json())
app.use("/api/v1/products",storerouter)
app.use(notfound)
app.use(errorHandlerMiddleware)

const start=async ()=>{
    try
    {
        await connectDB(process.env.MONGODB_URL)
        app.listen(3000,()=>{
            console.log("server is running on port 3000.... ");
        })
    }
    catch(error)
    {
        console.log(error);
    }
}

start();