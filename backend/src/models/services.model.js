import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    service_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],  // An array of categories for the service
      required: true,
    },
    price: {
      type: Number,  // The price for the service, assuming it's a number
      required: true,
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
