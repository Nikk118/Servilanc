import express from "express"
import cookieParser from "cookie-parser"
import userRouter from "./router/user.router.js"
import addressRouter from "./router/address.router.js"
import adminRouter from "./router/admin.router.js"
import salonRouter from "./router/salon.router.js"
import cleaningRouter from "./router/cleaning.router.js"
import plumbingRouter from "./router/plumbing.router.js"
import bookingRouter from "./router/booking.router.js"
import professionalRouter from "./router/professional.router.js"
import cors from "cors"



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

// enables running on localhost with frontend
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use("/api/address",addressRouter)
app.use("/api/admin",adminRouter)
app.use("/api/salon",salonRouter)
app.use("/api/cleaning",cleaningRouter)
app.use("/api/plumbing",plumbingRouter)
app.use("/api/booking",bookingRouter)
app.use("/api/professional",professionalRouter)