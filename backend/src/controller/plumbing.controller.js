import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Plumbing } from "../models/Plumbing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addPlumbingService=asyncHandler(async(req,res)=>{
    const admin=req.admin
    if (!admin) {
        return res.status(404).json({message:"invalid access"})
    }
    const {name,description,price,duration,category}=req.body
    const image_urlLocalPath=req.file?.path

    console.log("Request File:", req.file);
    if(!name || !description || !price || !duration || !category){
        return res.status(400).json({message:"All fields are required"})
    }
    if (!image_urlLocalPath) {
        return res.status(404).json({message:"Image is required"})
    };
    const image_url = await uploadOnCloudinary(image_urlLocalPath);

    
    

    const plumbing= await Plumbing.create({
        name,
        description,
        price,
        duration,
        image_url:image_url.secure_url
    })

    return res.status(201).json({message:"Plumbing added successfully",plumbing})

    
})

const allPlumbingService=asyncHandler(async(req,res)=>{
    const admin=req.admin
    if (!admin) {
        return res.status(404).json({message:"invalid access"})
    }
    const plumbing= await Plumbing.find()
    return res.status(200).json({message:"all fetched successfully",plumbing})
})  

const removePlumbingService=asyncHandler(async(req,res)=>{
    const admin=req.admin
    const {plumbingId}=req.params
   

    if (!admin) {
        return res.status(404).json({message:"invalid access"})
    }
    if (!plumbingId) {
        return res.status(400).json({message:"serviceId is required"})
    }

    const plumbing= await Plumbing.findByIdAndDelete(plumbingId)
    return res.status(200).json({message:"plimbing service deleted successfully",plumbing})

})

export {
    addPlumbingService,
    allPlumbingService,
    removePlumbingService
}