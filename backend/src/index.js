import express from "express"
import cookieParser from "cookie-parser"
import userRouter from "./router/user.router.js"
import addressRouter from "./router/address.router.js"
import adminRouter from "./router/admin.router.js"


const app = express()

import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./db/index.js"
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is running on port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("connection fail...",err);
})


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use("/api/address",addressRouter)
app.use("/api/admin",adminRouter)