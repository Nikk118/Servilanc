import mongoose, { Schema } from "mongoose";


const  PlumbingSchema= new Schema({
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
    },
    category: {
        type: String, 
        default: "Plumbing"
    }
    
},{timestamps:true})




export const Plumbing = mongoose.model("Plumbing",PlumbingSchema)
