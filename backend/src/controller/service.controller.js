import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Service } from "../models/service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add a new service
const addService = asyncHandler(async (req, res) => {
    const admin = req.admin;
    if (!admin) {
        return res.status(404).json({ message: "Invalid access" });
    }

    const { name, description, price, duration, category } = req.body;
    const image_urlLocalPath = req.file?.path;

    if (!name || !description || !price || !duration || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!image_urlLocalPath) {
        return res.status(404).json({ message: "Image is required" });
    }

    const image_url = await uploadOnCloudinary(image_urlLocalPath);

    const service = await Service.create({
        name,
        description,
        price,
        duration,
        category,
        image_url: image_url.secure_url
    });

    return res.status(201).json({ message: "Service added successfully", service });
});

// Get all services (optionally filter by category)
const allServices = asyncHandler(async (req, res) => {
    const { category } = req.query;
    const query = category ? { category } : {};
    const services = await Service.find(query);
    return res.status(200).json({ message: "All services fetched successfully", services });
});

// Remove a service
const removeService = asyncHandler(async (req, res) => {
    const admin = req.admin;
    const { serviceId } = req.params;

    if (!admin) {
        return res.status(404).json({ message: "Invalid access" });
    }
    if (!serviceId) {
        return res.status(400).json({ message: "Service ID is required" });
    }

    const service = await Service.findByIdAndDelete(serviceId);
    return res.status(200).json({ message: "Service deleted successfully", service });
});

// Update a service
const updateService = asyncHandler(async (req, res) => {
    const { serviceId } = req.params;
    const { name, description, price, duration, category } = req.body;

    if (!name || !description || !price || !duration || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const service = await Service.findByIdAndUpdate(
        serviceId,
        { name, description, price, duration, category },
        { new: true }
    );

    return res.status(200).json({ message: "Service updated successfully", service });
});

export {
    addService,
    allServices,
    removeService,
    updateService
};