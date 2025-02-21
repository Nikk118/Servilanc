import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Salon } from "../models/Salon.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addSalonService=asyncHandler(async(req,res)=>{
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

   
    

    const salon= await Salon.create({
        name,
        description,
        price,
        duration,
        category,
        image_url:image_url.secure_url
    })

    return res.status(201).json({message:"salon added successfully",salon})

    
})

const allSalonService=asyncHandler(async(req,res)=>{
    const admin=req.admin
    if (!admin) {
        return res.status(404).json({message:"invalid access"})
    }
    const salon= await Salon.find()
    return res.status(200).json({message:"all fetched successfully",salon})
})  

const removeSalonService=asyncHandler(async(req,res)=>{
    const admin=req.admin
    const {salonId}=req.params
    // const {playlistId}=req.params

    if (!admin) {
        return res.status(404).json({message:"invalid access"})
    }
    if (!salonId) {
        return removeSalonService.status(400).json({message:"serviceId is required"})
    }

    const salon= await Salon.findByIdAndDelete(salonId)
    return res.status(200).json({message:"salon deleted successfully",salon})

})

export {
    addSalonService,
    allSalonService,
    removeSalonService
}