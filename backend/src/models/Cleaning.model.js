import mongoose, { Schema } from "mongoose";


const  CleaningSchema= new Schema({
    name:{
        type:String,
        required:true, 
    },
    description:{
        type:String,
        required:true, 
    },
    price:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        default:""
    },
    image_url:{
        type:String,
        default:""
    }
    
},{timestamps:true})




export const Cleaning = mongoose.model("Cleaning",CleaningSchema)