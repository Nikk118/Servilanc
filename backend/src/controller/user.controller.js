import {User} from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { genrateToken } from "../utils/generateToken.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { sendSignupEmail } from "../utils/emailService.js"


const userSignUp = asyncHandler(async (req, res) => {
    const { email, username, password, phone } = req.body;

    if (!email || !username || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        username,
        email,
        phone,
        password,
    });
    console.log("created user")
    const createdUser = await User.findById(user._id).select("-password");

    if (createdUser) {
        genrateToken(createdUser._id, res);
        await createdUser.save();

        // **Send email after successful signup**
        try {
            await sendSignupEmail(email, username);
            console.log("Signup email sent to:", email);
        } catch (error) {
            console.error("Error sending signup email:", error);
        }

        return res.status(201).json({
            message: "User created successfully",
            user: createdUser,
        });
    } else {
        return res.status(500).json({ message: "Internal server error" });
    }
});


const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  console.log("Received login request for:", username);

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const loggedinuser = await User.findOne({ username });

  
  if (!loggedinuser) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

 
  const isPasswordValid = await loggedinuser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }


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
    
    const profilePictureLocalPath=req.file?.path
   
    const userId = req.user._id;

    if (!profilePictureLocalPath) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: profilePicture.secure_url },
      { new: true }
    );
    
    await updatedUser.save();

    res.status(200).json(
   {   message:"Profile picture updated successfully"
    ,user:updatedUser
   }
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