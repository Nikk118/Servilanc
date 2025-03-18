import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Cleaning } from "../models/cleaning.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addCleaningService=asyncHandler(async(req,res)=>{
    const admin=req.admin
    if (!admin) {
        return res.status(404).json({message:"invalid access"})
    }
    const {name,description,price,duration,category}=req.body
    const image_urlLocalPath=req.file?.path

    console.log("Request File:", req.file);
    if(!name || !description || !price || !duration ){
        return res.status(400).json({message:"All fields are required"})
    }
    if (!image_urlLocalPath) {
        return res.status(404).json({message:"Image is required"})
    };
    const image_url = await uploadOnCloudinary(image_urlLocalPath);

   
    

    const cleaning= await Cleaning.create({
        name,
        description,
        price,
        duration,
        category,
        image_url:image_url.secure_url
    })

    return res.status(201).json({message:"cleaning added successfully",cleaning})

    
})

const allCleaningService=asyncHandler(async(req,res)=>{
    
    const cleaning= await Cleaning.find()
    return res.status(200).json({message:"all fetched successfully",cleaning})
})  

const removeCleaningService=asyncHandler(async(req,res)=>{
    const admin=req.admin
    const {cleaningId}=req.params
   

    if (!admin) {
        return res.status(404).json({message:"invalid access"})
    }
    if (!cleaningId) {
        return res.status(400).json({message:"serviceId is required"})
    }

    const clean= await Cleaning.findByIdAndDelete(cleaningId)
    return res.status(200).json({message:"salon deleted successfully",clean})

})

const updateCleaningService=asyncHandler(async(req,res)=>{
    console.log("req body",req.body);
    const {cleaningId}=req.params
    const {name,description,price,duration}=req.body
    const image_urlLocalPath=req.file?.path
    console.log("Request File:", req.file);
    if(!name || !description || !price || !duration){
        return res.status(400).json({message:"All fields are required"})
    }
    if (!image_urlLocalPath) {
        return res.status(404).json({message:"Image is required"})
    };
    const image_url = await uploadOnCloudinary(image_urlLocalPath);
    const cleaning= await Cleaning.findByIdAndUpdate(cleaningId,{name,description,price,duration,image_url:image_url.secure_url},{new:true})
    return res.status(200).json({message:"cleaning updated successfully",cleaning})
})

export {
    updateCleaningService,
    addCleaningService,
    allCleaningService,
    removeCleaningService
}