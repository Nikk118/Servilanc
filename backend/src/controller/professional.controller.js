import { Professional } from "../models/professional.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { genrateToken } from "../utils/generateToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Booking} from "../models/booking.model.js";
import {Address} from "../models/address.model.js"
import { Salon } from "../models/Salon.model.js";
import { Plumbing } from "../models/Plumbing.model.js";
import { Cleaning } from "../models/cleaning.model.js";

const findServiceById = async (serviceId) => {
    try {
      // Search in all three collections simultaneously
      const [plumbing, cleaning, salon] = await Promise.all([
        Plumbing.findById(serviceId),
        Cleaning.findById(serviceId),
        Salon.findById(serviceId),
      ]);
  
      // Return the first found service
      return plumbing || cleaning || salon || null;
    } catch (error) {
      console.error("Error finding service:", error);
      return null;
    }
  };


const professionalLogin = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const loggedinprofessional = await Professional.findOne({ name });

  if (!loggedinprofessional) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  console.log(loggedinprofessional);

  const isPasswordValid = await loggedinprofessional.isPasswordCorrect(
    password
  );
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  genrateToken(loggedinprofessional._id, res);

  return res.status(200).json({
    message: "Professional logged in successfully",
    professional: loggedinprofessional,
  });
});

const professionalLogout = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ message: "professional logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});


const getCurrentprofessional = asyncHandler(async (req, res) => {
  const professional = await Professional.findById(req.professional._id);

  if (!professional) {
    return res.status(500).json({ message: "internal server error" });
  }

  return res
    .status(200)
    .json({
      message: "current professional logged in successfully",
      professional,
    });
});

const getAcceptedBooking = asyncHandler(async (req, res) => {
  try {
    if (!req.professional) {
      return res.status(400).json({ message: "Professional not found" });
    }

    const professionalId = req.professional._id;

    // Fetch accepted bookings sorted by newest first
    const acceptedBookings = await Booking.find({
      professional: professionalId,
      status: "Accepted"
    })
      .populate("user")
      .sort({ createdAt: -1 });

    // Extract user IDs and service IDs from bookings
    const userIds = acceptedBookings.map(booking => booking.user?._id).filter(id => id);
    const serviceIds = acceptedBookings.map(booking => booking.service).filter(id => id);

    // Fetch all addresses for the users in a single query
    const userAddresses = await Address.find({ userId: { $in: userIds } });

    // Fetch all services for the given service IDs
    const serviceDetails = await Promise.all(serviceIds.map(serviceId => findServiceById(serviceId)));

    // Attach address and service details to each booking
    const bookingsWithDetails = acceptedBookings.map((booking, index) => {
      const address = userAddresses.find(addr => addr.userId.toString() === booking.user?._id.toString());
      const service = serviceDetails[index];

      return {
        ...booking.toObject(),
        user: {
          ...booking.user.toObject(),
          address: address || null
        },
        service: service || null
      };
    });

    return res.status(200).json({
      message: "Accepted bookings retrieved successfully",
      acceptedBookings: bookingsWithDetails
    });
  } catch (error) {
    console.error("Error fetching accepted bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const getNewBooking = asyncHandler(async (req, res) => {
  try {
    if (!req.professional) {
      return res.status(400).json({ message: "Professional not found" });
    }

    const professionalId = req.professional._id;

    // Fetch professional details (to get category)
    const professional = await Professional.findById(professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    const professionalCategory = professional.category; // Assuming category field exists

    // Fetch pending bookings sorted by newest first
    const pendingBookings = await Booking.find({ status: "Pending" })
      .populate("user")
      .sort({ createdAt: -1 });

    // Extract user IDs and service IDs
    const userIds = pendingBookings.map(booking => booking.user?._id).filter(id => id);
    const serviceIds = pendingBookings.map(booking => booking.service).filter(id => id);

    // Fetch all addresses for the users in a single query
    const userAddresses = await Address.find({ userId: { $in: userIds } });

    // Fetch all services for the given service IDs
    const serviceDetails = await Promise.all(serviceIds.map(serviceId => findServiceById(serviceId)));

    // Filter bookings where service category matches professional category
    const bookingsWithDetails = pendingBookings
      .map((booking, index) => {
        const address = userAddresses.find(addr => addr.userId.toString() === booking.user?._id.toString());
        const service = serviceDetails[index];

        if (service?.category === professionalCategory) {
          return {
            ...booking.toObject(),
            user: {
              ...booking.user.toObject(),
              address: address || null,
            },
            service: service || null,
          };
        }
        return null;
      })
      .filter(booking => booking !== null);

    return res.status(200).json({
      message: "New bookings retrieved successfully",
      newBookings: bookingsWithDetails,
    });
  } catch (error) {
    console.error("Error fetching new bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const getCompletedBooking = asyncHandler(async (req, res) => {
  try {
    if (!req.professional) {
      return res.status(400).json({ message: "Professional not found" });
    }

    const professionalId = req.professional._id;

    // Fetch professional details (to get category)
    const professional = await Professional.findById(professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    const professionalCategory = professional.category; // Assuming category field exists

    // Fetch completed bookings sorted by newest first
    const completedBookings = await Booking.find({ status: "Completed" })
      .populate("user")
      .sort({ createdAt: -1 });

    // Extract user IDs and service IDs
    const userIds = completedBookings.map(booking => booking.user?._id).filter(id => id);
    const serviceIds = completedBookings.map(booking => booking.service).filter(id => id);

    // Fetch all addresses for the users in a single query
    const userAddresses = await Address.find({ userId: { $in: userIds } });

    // Fetch all services for the given service IDs
    const serviceDetails = await Promise.all(serviceIds.map(serviceId => findServiceById(serviceId)));

    // Filter bookings where service category matches professional category
    const bookingsWithDetails = completedBookings
      .map((booking, index) => {
        const address = userAddresses.find(addr => addr.userId.toString() === booking.user?._id.toString());
        const service = serviceDetails[index];

        if (service?.category === professionalCategory) {
          return {
            ...booking.toObject(),
            user: {
              ...booking.user.toObject(),
              address: address || null,
            },
            service: service || null,
          };
        }
        return null;
      })
      .filter(booking => booking !== null);

    return res.status(200).json({
      message: "Completed bookings retrieved successfully",
      completedBookings: bookingsWithDetails,
    });
  } catch (error) {
    console.error("Error fetching completed bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const updateProfile = async (req, res) => {
  try {
    const profilePictureLocalPath = req.file?.path;

    const professionalId = req.professional._id;

    if (!profilePictureLocalPath) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);

    const updatedprofessional = await Professional.findByIdAndUpdate(
      professionalId,
      { profilePicture: profilePicture.secure_url },
      { new: true }
    );

    await updatedprofessional.save();

    res
      .status(200)
      .json({
        message: "Profile picture updated successfully",
        professional: updatedprofessional,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfessionalStats = asyncHandler(async (req, res) => {
  try {
    const professionalId = req.professional._id;

    // Fetch professional details
    const professional = await Professional.findById(professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    const professionalCategory = professional.category;
    console.log(professionalCategory);

    // Count status-based bookings
    const completedCount = await Booking.countDocuments({ professional: professionalId, status: "Completed" });
    const acceptedCount = await Booking.countDocuments({ professional: professionalId, status: "Accepted" });
    const cancelledCount = await Booking.countDocuments({ professional: professionalId, status: "Cancelled" });

    // Calculate total earnings where paymentStatus is "Paid"
    const totalEarningsResult = await Booking.aggregate([
      {
        $match: {
          professional: professionalId,
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$totalAmount" }, 
        },
      },
    ]);

    const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;

    // Fetch all pending bookings
    const pendingBookings = await Booking.find({ status: "Pending" });

    let newRequestsCount = 0;

    
    for (const booking of pendingBookings) {
      const service = await findServiceById(booking.service); 
      if (service && service.category === professionalCategory) {
        newRequestsCount++; 
      }
    }

    res.status(200).json({
      message: "Professional booking stats retrieved successfully",
      stats: {
        completed: completedCount,
        accepted: acceptedCount,
        cancelled: cancelledCount,
        totalEarnings: totalEarnings,
        newRequests: newRequestsCount, // New Pending Requests
      },
    });
  } catch (error) {
    console.error("Error fetching professional stats:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});




const paymentPaid=asyncHandler(async(req,res)=>{
  const bookingId=req.params.id
  const booking=await Booking.findById(bookingId)
  if(!booking){
    return res.status(404).json({message:"Booking not found"})
  }
  booking.paymentStatus="Paid"
  await booking.save()
  return res.status(200).json({message:"Payment status updated successfully",booking})
})



export {
  paymentPaid,
  getProfessionalStats,
  getCompletedBooking,
  getNewBooking,
  professionalLogin,
  professionalLogout,
  getCurrentprofessional,
  getAcceptedBooking,
  updateProfile,
};
