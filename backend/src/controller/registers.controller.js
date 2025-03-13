import {asyncHandler} from "../utils/asyncHandler.js";
import { Register } from "../models/registers.model.js";

const createRegister=asyncHandler(async(req,res)=>{
    const {fullName,email,phone,category}=req.body
    if(!fullName || !email || !phone || !category){
        return res.status(400).json({message:"All fields are required"})
    }
    const register= await Register.create({
        fullName,
        email,
        phone,
        category
    })
    return res.status(201).json({message:"Register created successfully",register})
})

const getRegister=asyncHandler(async(req,res)=>{
    const register = await Register.find().sort({ createdAt: -1 });
    return res.status(200).json({message:"Register fetched successfully",register})
})

const deleteRegister=asyncHandler(async(req,res)=>{
    const {registerId}=req.params
    await Register.findByIdAndDelete(registerId)
    return res.status(200).json({message:"Register deleted successfully"})
})
export {
    createRegister,
    getRegister,
    deleteRegister
}
