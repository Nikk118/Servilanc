import {asyncHandler} from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import { genrateToken } from "../utils/generateToken.js";

const signupAdmin=asyncHandler(async(req,res)=>{
    const {username,email,password,phone}=req.body

    if (phone.length != 10 ) {
        return res.status(400).json({ message: "Invalid phone number " });
    }
    
    if (password.length < 8) {
        return res.status(400).json({message:"password must contain 8 letters"})
    }
    if(!username || !email){
        return res.status(400).json({message:"All fields are required"})
    }
    const adminExists=await Admin.findOne({$or:[{username},{email}]})

    if(adminExists){
        return res.status(400).json({message:"Admin already exists"})
    }

    const admin=await Admin.create({
        username,
        email,
        password,
        phone
    })

    if (admin) {
        genrateToken(admin._id, res);
        await admin.save();
        return res.status(201).json({message:"Admin created successfully",admin})
    }else{
        return res.status(400).json({message:"Admin not created"})
    }
})

const loginAdmin=asyncHandler(async(req,res)=>{
    const {username,password}=req.body

 
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const loggedinadmin = await Admin.findOne({ username });

    if (!loggedinadmin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await loggedinadmin.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    genrateToken(loggedinadmin._id, res);

    return res.status(200).json(
      {message:"admin logged in successfully",  admin:loggedinadmin}
    );

})
export {
    signupAdmin,
    loginAdmin}
