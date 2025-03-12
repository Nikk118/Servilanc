import {asyncHandler} from "../utils/asyncHandler.js";
import { Contact } from "../models/contact.model.js";


const createContact=asyncHandler(async(req,res)=>{
    const {fullName,email,phone,message}=req.body
    if(!fullName || !email || !phone || !message){
        return res.status(400).json({message:"All fields are required"})
    }
    const contact= await Contact.create({
        fullName,
        email,
        phone,
        
        message
    })
    return res.status(201).json({message:"Contact created successfully",contact})
})

const getContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({message:"Contact fetched successfully",contact})
})

const deleteContact=asyncHandler(async(req,res)=>{
    const {contactId}=req.params
    await Contact.findByIdAndDelete(contactId)
    return res.status(200).json({message:"Contact deleted successfully"})
})
export {createContact
    ,getContact
    ,deleteContact
}