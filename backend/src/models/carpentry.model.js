import mongoose, { Schema } from "mongoose";

const CarpentrySchema = new Schema({
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
       default:"Carpentry"
    }
}, { timestamps: true });

export const Carpentry = mongoose.model("Carpentry", CarpentrySchema);
