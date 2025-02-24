import mongoose from "mongoose";
import bcrypt from "bcrypt";

const professionalSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    category:String,
    profilePicture:{ type: String, default: "" }

}, { timestamps: true });

professionalSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next(); 
        }

        if (!this.password) {
            throw new Error("Password is required");
        }

        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

professionalSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const Professional = mongoose.model("Professional", professionalSchema);
