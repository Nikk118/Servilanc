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

    // Fetch accepted bookings and populate user details
    const acceptedBookings = await Booking.find({
      professional: professionalId,
      status: "Accepted"
    }).populate("user");

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
      const service = serviceDetails[index]; // Match services based on order

      return {
        ...booking.toObject(),
        user: {
          ...booking.user.toObject(),
          address: address || null // Attach address or set to null if not found
        },
        service: service || null // Attach service details
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

    // Fetch pending bookings and populate user details
    const pendingBookings = await Booking.find({ status: "Pending" }).populate("user");

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

        // Return only if service category matches professional category
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
      .filter(booking => booking !== null); // Remove `null` values

    return res.status(200).json({
      message: "New bookings retrieved successfully",
      newBookings: bookingsWithDetails,
    });
  } catch (error) {
    console.error("Error fetching new bookings:", error);
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

export {
  getNewBooking,
  professionalLogin,
  professionalLogout,
  getCurrentprofessional,
  getAcceptedBooking,
  updateProfile,
};
