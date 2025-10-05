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
import feedbackRouter from "./router/feedback.router.js"
import ContactRouter from "./router/contact.router.js"
import registerRouter from "./router/registers.router.js"
import electricianRoutes from "./router/electrician.router.js"
import carpentryRoutes from "./router/carpentry.router.js";
import pestControlRoutes from "./router/pestControl.router.js";
import ProfessionalCancelRouter from "./router/cancellation.router.js"
import ServiceRouter from "./router/service.router.js"
import cors from "cors"
// import smsRouter from "./router/sms.router.js"
import path from "path"

 


const app = express()

import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();

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

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 





app.use(express.static("public"))
app.use(cookieParser())

// app.use('/api/sms',smsRouter)

app.use("/api/user",userRouter)
app.use("/api/address",addressRouter)
app.use("/api/admin",adminRouter)
app.use("/api/salon",salonRouter)
app.use("/api/cleaning",cleaningRouter)
app.use("/api/plumbing",plumbingRouter)
app.use("/api/booking",bookingRouter)
app.use("/api/professional",professionalRouter)
app.use("/api/feedback",feedbackRouter)
app.use("/api/contact",ContactRouter)
app.use("/api/registers",registerRouter)
app.use("/api/electrician", electricianRoutes);
app.use("/api/carpentry", carpentryRoutes);
app.use("/api/pestControl", pestControlRoutes);
app.use("/api/profesionalCancel",ProfessionalCancelRouter)
app.use("/api/service",ServiceRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend","dist","index.html"))
    })
}