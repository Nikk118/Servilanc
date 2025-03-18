import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Electrician } from "../models/electrician.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addElectricianService = asyncHandler(async (req, res) => {
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

    const electrician = await Electrician.create({
        name,
        description,
        price,
        duration,
        
        image_url: image_url.secure_url
    });

    return res.status(201).json({ message: "Electrician service added successfully", electrician });
});

const allElectricianService = asyncHandler(async (req, res) => {
    const electricians = await Electrician.find();
    return res.status(200).json({ message: "All electrician services fetched successfully", electricians });
});

const removeElectricianService = asyncHandler(async (req, res) => {
    const admin = req.admin;
    const { electricianId } = req.params;

    if (!admin) {
        return res.status(404).json({ message: "Invalid access" });
    }
    if (!electricianId) {
        return res.status(400).json({ message: "Service ID is required" });
    }

    const electrician = await Electrician.findByIdAndDelete(electricianId);
    return res.status(200).json({ message: "Electrician service deleted successfully", electrician });
});

export {
    addElectricianService,
    allElectricianService,
    removeElectricianService
};
