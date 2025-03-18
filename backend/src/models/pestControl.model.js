import mongoose, { Schema } from "mongoose";

const PestControlSchema = new Schema({
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
        default:"PestControl"
    }
}, { timestamps: true });

export const PestControl = mongoose.model("PestControl", PestControlSchema);
