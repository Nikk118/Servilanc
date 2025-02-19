import {asyncHandler} from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import { genrateToken } from "../utils/generateToken.js";



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

const logoutAdmin=asyncHandler(async(req,res)=>{
    res.cookie("jwt", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      return res.status(200).json({ message: "Admin logged out successfully" });
})

const getAdmin=asyncHandler(async(req,res)=>{

    return res.status(200).json({message:"Admin fetched successfully",admin:req.admin})
})
export {
    getAdmin,
    loginAdmin,
    logoutAdmin
}
