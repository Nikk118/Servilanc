import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Service } from "../models/service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ✅ Add new service
const addService = asyncHandler(async (req, res) => {
    const admin = req.admin;
    if (!admin) return res.status(404).json({ message: "Invalid access" });

    const { name, description, price, duration, category } = req.body;
    const image_urlLocalPath = req.file?.path;

    if (!name || !description || !price || !duration || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!image_urlLocalPath) return res.status(404).json({ message: "Image is required" });

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

// ✅ Get all services
const allServices = asyncHandler(async (req, res) => {
    const services = await Service.find();
    return res.status(200).json({ message: "All services fetched successfully", services });
});

// ✅ Delete a service
const removeService = asyncHandler(async (req, res) => {
    const admin = req.admin;
    const { serviceId } = req.params;

    if (!admin) return res.status(404).json({ message: "Invalid access" });
    if (!serviceId) return res.status(400).json({ message: "Service ID is required" });

    const service = await Service.findByIdAndDelete(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    return res.status(200).json({ message: "Service deleted successfully", service });
});

// ✅ Update service
const updateService = asyncHandler(async (req, res) => {
    const { serviceId } = req.params;
    const { name, description, price, duration, category } = req.body;
    const image_urlLocalPath = req.file?.path;

    if (!name || !description || !price || !duration || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    let updatedFields = { name, description, price, duration, category };

    if (image_urlLocalPath) {
        const image_url = await uploadOnCloudinary(image_urlLocalPath);
        updatedFields.image_url = image_url.secure_url;
    }

    const service = await Service.findByIdAndUpdate(serviceId, updatedFields, { new: true });
    if (!service) return res.status(404).json({ message: "Service not found" });

    return res.status(200).json({ message: "Service updated successfully", service });
});

// ✅ Get services by category
const servicesByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    const services = await Service.find({ category });
    return res.status(200).json({ message: `Services under category '${category}' fetched successfully`, services });
});

export {
    addService,
    allServices,        // ✅ Corrected export
    removeService,
    updateService,
    servicesByCategory
};
