import jwt from "jsonwebtoken"
import {Professional} from "../models/professional.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const verifyProfessional=asyncHandler(async(req,res,next)=>{
    
        const token=req.cookies?.jwt
    console.log("1");
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
    
    const decode=  jwt.verify(token,process.env.JWT_SECRET)
    console.log("2");
    
    if (!decode) {
        return res.status(401).json({message:"unauthorized"})
        
    }
    console.log(decode);
    const professional= await Professional.findById(decode.userId).select("-password")
    console.log("3");
    
    if (!professional) {
        return res.status(401).json({message:"unauthorized"})
        
    }
    
    console.log("4");
    req.professional=professional

        next()
    


})

export {
    verifyProfessional
}