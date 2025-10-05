import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, default: "" },
  image_url: { type: String, default: "" },
  category: { type: String, required: true }, // e.g., Carpentry, Salon, etc.
  status: { type: String, default: "pending" }, // "completed" or "pending"
}, { timestamps: true });

export const Service = mongoose.model("Service", serviceSchema);