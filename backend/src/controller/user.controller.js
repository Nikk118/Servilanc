import {User} from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { genrateToken } from "../utils/generateToken.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const userSignUp = asyncHandler(async(req,res)=>{

    const {email,username,password}=req.body

    if(!email || !username|| !password){
      return res.status(400)
      .json(
       { message:"all feilds are required"}
      )
    }

    const userExists= await User.findOne({$or:[{username},{email}]})

    if(userExists){
      return res.status(400)
      .json(
       { message:"user already exists"}
      )
    }

    const user= await User.create({
        username,
        email,
        password
    })

    const createdUser= await User.findById(user._id).select("-password")

    if(createdUser){

        genrateToken(createdUser._id,res)
        await createdUser.save()

        return res.status(201)
        .json(
            {
                message:"user created successfully",
                user:createdUser
            }
        )
    }else{
      return res.status(500)
      .json(
       { message:"internal server error"}
      )

    }
    
    
})

const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
  
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find user by fullname
  const loggedinuser = await User.findOne({ username });

  // Check if user exists
  if (!loggedinuser) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Verify the password
  const isPasswordValid = await loggedinuser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate token and send response
  genrateToken(loggedinuser._id, res);

  return res.status(200).json(
    {message:"user logged in successfully",
    user:loggedinuser}
  );
});

const userLogout=asyncHandler(async(req,res)=>{
  try {
       res.cookie("jwt","",{maxAge:0});
      return res.status(200)
          .json(
              {message:"user logged out successfully"}
          )
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
})



const getCurrentUser=asyncHandler(async(req,res)=>{
  const user= await User.findById(req.user._id)

  if (!user) {
    return res.status(500).json({ message: "internal server error" });

  }

  return res.status(200)
      .json(
          {message:"user logged in successfully",
          user}
      )
})

const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user._id;

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await uploadOnCloudinary(profilePicture);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    );
    await updatedUser.save();

    res.status(200).json(
      new apiResponse(200, updatedUser, "Profile picture updated successfully")
    );
  } catch (error) {
    
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  userSignUp
  ,userLogin,
  userLogout,
  getCurrentUser,
  updateProfile
}