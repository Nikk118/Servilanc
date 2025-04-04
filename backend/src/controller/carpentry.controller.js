import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Carpentry } from "../models/carpentry.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addCarpentryService = asyncHandler(async (req, res) => {
    const admin = req.admin;
    if (!admin) {
        return res.status(404).json({ message: "Invalid access" });
    }

    const { name, description, price, duration } = req.body;
    const image_urlLocalPath = req.file?.path;

    console.log("Request File:", req.file);
    if (!name || !description || !price || !duration) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!image_urlLocalPath) {
        return res.status(404).json({ message: "Image is required" });
    }

    const image_url = await uploadOnCloudinary(image_urlLocalPath);

    const carpentry = await Carpentry.create({
        name,
        description,
        price,
        duration,
        image_url: image_url.secure_url
    });

    return res.status(201).json({ message: "Carpentry service added successfully", carpentry });
});

const allCarpentryService = asyncHandler(async (req, res) => {
    const carpentry = await Carpentry.find();
    return res.status(200).json({ message: "All carpentry services fetched successfully", carpentry });
});

const removeCarpentryService = asyncHandler(async (req, res) => {
    const admin = req.admin;
    const { carpentryId } = req.params;

    if (!admin) {
        return res.status(404).json({ message: "Invalid access" });
    }
    if (!carpentryId) {
        return res.status(400).json({ message: "Service ID is required" });
    }

    const carpentry = await Carpentry.findByIdAndDelete(carpentryId);
    return res.status(200).json({ message: "Carpentry service deleted successfully", carpentry });
});

const updateCarpentryService = asyncHandler(async (req, res) => {
    console.log("req body", req.body);
    const { carpentryId } = req.params;
    const { name, description, price, duration } = req.body;
    // const image_urlLocalPath = req.file?.path;
    // console.log("Request File:", req.file);

    if (!name || !description || !price || !duration) {
        return res.status(400).json({ message: "All fields are required" });
    }
    

    
    const carpentry = await Carpentry.findByIdAndUpdate(
        carpentryId, 
        { name, description, price, duration }, 
        { new: true }
    );

    return res.status(200).json({ message: "Carpentry service updated successfully", carpentry });
});

export {
    addCarpentryService,
    allCarpentryService,
    removeCarpentryService,
    updateCarpentryService
};
