import {asyncHandler} from "../utils/asyncHandler.js"
import { Address } from "../models/address.model.js"

const createAddress=asyncHandler(async(req,res)=>{
    const user=req.user
    const {street,city,state,pincode,mobileNumber}=req.body

    if( !city || !state  || !pincode || !mobileNumber){
        return res.status(400).json({message:"All fields are required"})
    }
    const addressExists=await Address.findOne({userId:user._id})

    if(addressExists){
        return res.status(400).json({message:"Address already exists"})
    }

    const newAddress=await Address.create({
        userId:user._id,
        street,
        city,
        state,
        pincode,
        mobileNumber
    })
    return res.status(201).json({message:"Address created successfully",address:newAddress})

})

const getAddress=asyncHandler(async(req,res)=>{
    const user= req.user

    const address=await Address.findOne({userId:user._id})

    if(!address){
        return res.status(404).json({message:"Address not found"})
    }
    return res.status(200).json({message:"Address found successfully",address})
})

const deleteAddress=asyncHandler(async(req,res)=>{
    const user=req.user
    
    await Address.deleteOne({userId:user._id})
    return res.status(200).json({message:"Address deleted successfully"})
})

const updateAddress=asyncHandler(async(req,res)=>{
    const user = req.user

    const {street,city,state,pincode,mobileNumber}=req.body
    
    if( !street||!city || !state  || !pincode || !mobileNumber){
        return res.status(400).json({message:"All fields are required"})
    }

    const updatedAddress=await Address.findOneAndUpdate(
        {userId:user._id},
        {
            street,
            city,
            state,
            pincode,
            mobileNumber
        },{ new: true, runValidators: true }   
    )

    if (!updatedAddress) {
        return res.status(404).json({message:"Address not found"})
    }

    return res.status(200).json({message:"Address updated successfully",address:updatedAddress})
})

export {
    createAddress,
    getAddress,
    deleteAddress,
    updateAddress
}