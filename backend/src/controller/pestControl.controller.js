import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { PestControl } from "../models/pestControl.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addPestControlService = asyncHandler(async (req, res) => {
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

    const pestControl = await PestControl.create({
        name,
        description,
        price,
        duration,
        image_url: image_url.secure_url
    });

    return res.status(201).json({ message: "Pest Control service added successfully", pestControl });
});

const allPestControlService = asyncHandler(async (req, res) => {
    const pestControl = await PestControl.find();
    return res.status(200).json({ message: "All pest control services fetched successfully", pestControl });
});

const removePestControlService = asyncHandler(async (req, res) => {
    const admin = req.admin;
    const { pestControlId } = req.params;

    if (!admin) {
        return res.status(404).json({ message: "Invalid access" });
    }
    if (!pestControlId) {
        return res.status(400).json({ message: "Service ID is required" });
    }

    const pestControl = await PestControl.findByIdAndDelete(pestControlId);
    return res.status(200).json({ message: "Pest Control service deleted successfully", pestControl });
});

const updatePestControlService = asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body);
    const { pestControlId } = req.params;
    const { name, description, price, duration } = req.body;
    // const image_urlLocalPath = req.file?.path;

    // console.log("Request File:", req.file);
    if (!name || !description || !price || !duration) {
        return res.status(400).json({ message: "All fields are required" });
    }

    let updatedData = { name, description, price, duration };

    // if (image_urlLocalPath) {
    //     const image_url = await uploadOnCloudinary(image_urlLocalPath);
    //     updatedData.image_url = image_url.secure_url;
    // }

    const pestControl = await PestControl.findByIdAndUpdate(
        pestControlId,
        updatedData,
        { new: true }
    );

    return res.status(200).json({ message: "Pest Control service updated successfully", pestControl });
});

export {
    addPestControlService,
    allPestControlService,
    removePestControlService,
    updatePestControlService
};
