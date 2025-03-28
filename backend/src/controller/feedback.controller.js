
import { Feedback } from "../models/feedback.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"



const createFeedback=asyncHandler(async(req,res)=>{
    const {comment}=req.body
    console.log(req.body);
    const user=req.user
    if(  !comment){
        return res.status(400).json({message:"All fields are required"})
    }
    const feedback= await Feedback.create({
        comment,
        user:user._id
    })
    res.status(201).json({message:"Feedback created successfully",feedback})    
})

const get10Feedback=asyncHandler(async(req,res)=>{
    const feedback= await Feedback.find().limit(10).populate("user")
    return res.status(200).json({message:"Feedback fetched successfully",feedback})
})

const getAllFeedback=asyncHandler(async(req,res)=>{
    const feedback= await Feedback.find().sort({createdAt:-1}).populate("user")
    return res.status(200).json({message:"Feedback fetched successfully",feedback})
});

const deleteFeedback=asyncHandler(async(req,res)=>{
    const {feedbackId}=req.params
    await Feedback.findByIdAndDelete(feedbackId)
    return res.status(200).json({message:"Feedback deleted successfully"})
})

export {
    createFeedback,
    get10Feedback,
    getAllFeedback,
    deleteFeedback,
}