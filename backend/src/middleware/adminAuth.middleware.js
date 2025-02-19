import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const verifyAdmin=asyncHandler(async(req,res,next)=>{
    
        const token=req.cookies?.jwt
    
        if(!token){
            return res.status(401).json({message:"unauthorized"})
        }

        const decode=  jwt.verify(token,process.env.JWT_SECRET)

        if (!decode) {
            return res.status(401).json({message:"unauthorized"})
            
        }

        const admin= await Admin.findById(decode.userId).select("-password")

        if (!admin) {
            return res.status(401).json({message:"unauthorized"})
            
        }

        req.admin=admin

        next()
    


})

export {
    verifyAdmin
}