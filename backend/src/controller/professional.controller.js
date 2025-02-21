import {Professional} from "../models/professional.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { genrateToken } from "../utils/generateToken.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const professionalSignUp = asyncHandler(async(req,res)=>{

    const {email,name,password,phone,category}=req.body

    if(!email || !name|| !password || !phone || !category){
      return res.status(400)
      .json(
       { message:"all feilds are required"}
      )
    }

     const professionalExists= await Professional.findOne({$or:[{name},{email}]})
    
        if(professionalExists){
          return res.status(400)
          .json(
           { message:"professional already exists"}
          )
        }
    
        const professional= await Professional.create({
            name,
            email,
            password,
            phone,
            category
        })
    
        const createdprofessional= await Professional.findById(professional._id).select("-password")
    
        if(createdprofessional){
    
            genrateToken(createdprofessional._id,res)
            await createdprofessional.save()
    
            return res.status(201)
            .json(
                {
                    message:"professional created successfully",
                    professional:createdprofessional
                }
            )
        }else{
          return res.status(500)
          .json(
           { message:"internal server error"}
          )
    
        }
        
        
    })
    
const professionalLogin = asyncHandler(async (req, res) => {
      const { name, password,} = req.body;
    
      // Validate input fields
      if (!name || !password) {
      
        return res.status(400).json({ message: "All fields are required" });
      }
    
      // Find professional by fullname
      const loggedinprofessional = await Professional.findOne({ name });
    
      // Check if professional exists
      if (!loggedinprofessional) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    
      // Verify the password
      const isPasswordValid = await loggedinprofessional.isPasswordCorrect(password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    
      // Generate token and send response
      genrateToken(loggedinprofessional._id, res);
    
      return res.status(200).json(
        {message:"professional logged in successfully",
        professional:loggedinprofessional}
      );
    });
    
const professionalLogout=asyncHandler(async(req,res)=>{
      try {
           res.cookie("jwt","",{maxAge:0});
          return res.status(200)
              .json(
                  {message:"professional logged out successfully"}
              )
      } catch (error) {
        return res.status(500).json({ message: "internal server error" });
      }
    })
    
    
    
const getCurrentprofessional=asyncHandler(async(req,res)=>{
      const professional= await Professional.findById(req.professional._id)
    
      if (!professional) {
        return res.status(500).json({ message: "internal server error" });
    
      }
    
      return res.status(200)
          .json(
              {message:"professional logged in successfully",
              professional}
          )
    })
    
const updateProfile = async (req, res) => {
      try {
        
        const profilePictureLocalPath=req.file?.path
        console.log("Request File:", req.file);
        const professionalId = req.professional._id;
    
        if (!profilePictureLocalPath) {
          return res.status(400).json({ message: "Profile pic is required" });
        }
    
        const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
    
        const updatedprofessional = await professional.findByIdAndUpdate(
          professionalId,
          { profilePicture: profilePicture.secure_url },
          { new: true }
        );
        
        await updatedprofessional.save();
    
        res.status(200).json(
       {   message:"Profile picture updated successfully"
        ,professional:updatedprofessional
       }
        );
      } catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
      }
    };
    
    export {
      professionalSignUp
      ,professionalLogin,
      professionalLogout,
      getCurrentprofessional,
      updateProfile
    }