import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";

const adminSchema=new Schema({
    username:{
        type:String,
        requuired:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        menLenth:8,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
},{timestamps:true})


adminSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next(); // Skip hashing if password is not modified
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

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const Admin=mongoose.model("Admin",adminSchema)