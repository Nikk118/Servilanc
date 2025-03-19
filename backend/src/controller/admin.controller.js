import {asyncHandler} from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import { genrateToken } from "../utils/generateToken.js";
import { Professional } from "../models/professional.model.js";
import {Salon} from "../models/Salon.model.js"
import { Cleaning } from "../models/cleaning.model.js"
import { Plumbing } from "../models/Plumbing.model.js"
import { User } from "../models/user.model.js"
import { Electrician } from "../models/electrician.model.js"
import { Carpentry } from "../models/carpentry.model.js"
import { PestControl } from "../models/pestControl.model.js"
import {Booking} from "../models/booking.model.js"


const adminSignUp= asyncHandler(async(req,res)=>{

  const {email,username,password,phone}=req.body

    if(!email || !username|| !password || !phone){
      return res.status(400)
      .json(
       { message:"all feilds are required"}
      )
    }

    const adminExists= await Admin.findOne({email})

    if(adminExists){
      return res.status(400)
      .json(
       { message:"admin already exists"}
      )
    }

    const admin= await Admin.create({
        username,
        email,
        password,
        phone
    })

    const createdadmin= await Admin.findById(admin._id).select("-password")
    
        if(createdadmin){
    
            genrateToken(createdadmin._id,res)
            await createdadmin.save()
    
            return res.status(201)
            .json(
                {
                    message:"admin created successfully",
                    professional:createdadmin
                }
            )
        }else{
          return res.status(500)
          .json(
           { message:"internal server error"}
          )
    
        }
    }
      )

const loginAdmin=asyncHandler(async(req,res)=>{
    const {username,password}=req.body

 
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const loggedinadmin = await Admin.findOne({ username: username });
    
    console.log("1")
    if (!loggedinadmin) {
      return res.status(400).json({ message: "Invalid credentials" });
      
    }
    console.log("2")
    
    const isPasswordValid = await loggedinadmin.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("3")

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

    const admin=await Admin.findById(req.admin._id).select("-password")

    if(!admin){
        return res.status(404).json({message:"admin not found"})
    }

    return res.status(200).json(
      {message:"admin logged in successfully",
        admin}
  )
})

const addProfessional= asyncHandler(async(req,res)=>{

   
    const {email,name,password,phone,category}=req.body

      console.log(email,name,password,phone,category)
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

const totalServices=asyncHandler(async(req,res)=>{
      const salon= await Salon.countDocuments()
      const cleaning= await Cleaning.countDocuments()
      const plumbing= await Plumbing.countDocuments()
      const electrician= await Electrician.countDocuments()
      const carpentry= await Carpentry.countDocuments()
      const pestControl= await PestControl.countDocuments()

      const totalCount=salon+cleaning+plumbing+electrician+carpentry+pestControl
      const Services={salon,cleaning,plumbing,totalCount,electrician,carpentry,pestControl}
      return res.status(200).json({message:"total services",Services})
})

const userstats = asyncHandler(async (req, res) => {
  try {
    const users = await User.countDocuments(); // ✅ Await added
    const professionals = await Professional.countDocuments(); // ✅ Await added

    return res.status(200).json({
      message: "User stats",
      users,
      professionals
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const bookingsStats = asyncHandler(async (req, res) => {
  try {
    const bookingsCount = await Booking.countDocuments(); // Total bookings

    const statusCounts = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Convert aggregation result into a key-value object
    const statusMap = statusCounts.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});

    return res.status(200).json({
      message: "Bookings stats",
      totalBookings: bookingsCount,
      Pending: statusMap["Pending"] || 0,
      Cancelled: statusMap["Cancelled"] || 0,
      Completed: statusMap["Completed"] || 0,
      Accepted: statusMap["Accepted"] || 0,
    });
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const getAllProfessionalStats=asyncHandler(async(req,res)=>{
  const professionals=await Professional.find()

  const professionalStats=await Promise.all(
    professionals.map(async(professional)=>{
        
        const acceptedBookings=await Booking.countDocuments({professional:professional._id,status:"Accepted"})
        const completedBookings=await Booking.countDocuments({professional:professional._id,status:"Completed"})
        const cancelledBookings=await Booking.countDocuments({professional:professional._id,status:"Cancelled"})

        return{
            professional:professional._id,
            name:professional.name,
            catagory:professional.category,
            email:professional.email,
            phone:professional.phone,
            acceptedBookings,
            completedBookings,
            cancelledBookings
        }
  }))

  return res.status(200).json({message:"All professionals booking stats",professionalStats})
    
})

const getAllUsersStats = asyncHandler(async (req, res) => {
  const users = await User.find();

  const userStats = await Promise.all(
    users.map(async (user) => {
      const totalBookings = await Booking.countDocuments({ userId: user._id });
      const pendingBookings = await Booking.countDocuments({
        user: user._id,
        status: "Pending",
      });
      const completedBookings = await Booking.countDocuments({
        user: user._id,
        status: "Completed",
      });
      const cancelledBookings = await Booking.countDocuments({
        user: user._id,
        status: "Cancelled",
      });

      return {
        user: user._id,
        username: user.username,
        email: user.email,
        totalBookings,
        pendingBookings,
        completedBookings,
        cancelledBookings,
      };
    })
  );

  return res.status(200).json({ message: "All users booking stats", userStats });
});

const removeProfessional=asyncHandler(async(req,res)=>{
  const {professionalId}=req.params
  const professional=await Professional.findByIdAndDelete(professionalId)
  if(professional){
    return res.status(200).json({message:"professional removed successfully"})
  }else{
    return res.status(500).json({message:"internal server error"})
  }

})

const removeUser=asyncHandler(async(req,res)=>{
  const {userId}=req.params
  const user=await User.findByIdAndDelete(userId)
  if(user){
    return res.status(200).json({message:"user removed successfully"})
  }else{
    return res.status(500).json({message:"internal server error"})
  }
})


export {
  removeUser,
  removeProfessional,
  getAllUsersStats,
  getAllProfessionalStats,
  bookingsStats,
  userstats,
  totalServices,
    adminSignUp,
    getAdmin,
    loginAdmin,
    logoutAdmin,
    addProfessional
}
