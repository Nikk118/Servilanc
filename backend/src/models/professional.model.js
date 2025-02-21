import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    category:String,

}, { timestamps: true });

export const Professional = mongoose.model("Professional", professionalSchema);
