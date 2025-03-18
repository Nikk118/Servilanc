import mongoose, { Schema } from "mongoose";

const ElectricianSchema = new Schema({
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
        default: ""
    },
    image_url: {
        type: String,
        default: ""
    },
    category: {
        type: String, 
        default:"Electrician"
    }
}, { timestamps: true });

export const Electrician = mongoose.model("Electrician", ElectricianSchema);
