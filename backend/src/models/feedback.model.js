import {mongoose,Schema} from "mongoose";

const feedbackSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:"User",required:true},
    comment:{type:String,required:true},
},{timestamps:true})

export const Feedback=mongoose.model("Feedback",feedbackSchema)
