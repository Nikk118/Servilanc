import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("DB Connected");
    } catch (error) {
        console.log("error",error);
    }
}

export default connectDB