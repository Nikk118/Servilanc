import mongoose , {Schema } from "mongoose";    

const registerSchema = new Schema({
        fullName: String,
        email: String,
        phone: String,
        category: String,
    });
    
export const Register = mongoose.model("Register", registerSchema);