import mongoose, { Schema } from "mongoose";

const PlumbingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "",
    },
    image_url: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    professional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professional", // Ensure this matches the Professional model
      required: true, // Ensure it's required so that every service has a professional assigned
    },
  },
  { timestamps: true }
);

export const Plumbing = mongoose.model("Plumbing", PlumbingSchema);
