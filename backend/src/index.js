import express from "express"

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