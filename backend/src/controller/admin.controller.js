import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import { genrateToken } from "../utils/generateToken.js";
import { Professional } from "../models/professional.model.js";
import { Address } from "../models/address.model.js";
import { Service } from "../models/service.model.js";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import { Cancellation } from "../models/Cancellation.model.js";
import { sendEmail } from "../utils/emailService.js";

const getAllCancellations = asyncHandler(async (req, res) => {
  try {
    const cancellations = await Cancellation.find({ cancelledBy: "Professional" })
      .sort({ createdAt: -1 })
      .populate("booking");

    const detailedCancellations = await Promise.all(
      cancellations.map(async (cancellation) => {
        if (!cancellation.booking) return cancellation.toObject();

        const service = await Service.findById(cancellation.booking.service);
        const professional = await Professional.findById(cancellation.booking.professional);

        return { ...cancellation.toObject(), service: service || null, professional: professional || null };
      })
    );

    res.status(200).json({ cancellations: detailedCancellations });
  } catch (error) {
    console.error("Error fetching cancellations:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const getUserCancellations = asyncHandler(async (req, res) => {
  try {
    const userCancellations = await Cancellation.find({ cancelledBy: "User" })
      .sort({ createdAt: -1 })
      .populate("booking");

    const detailedCancellations = await Promise.all(
      userCancellations.map(async (cancellation) => {
        if (!cancellation.booking) return cancellation.toObject();

        const service = await Service.findById(cancellation.booking.service);
        const user = await User.findById(cancellation.booking.user);

        return { ...cancellation.toObject(), service: service || null, user: user || null };
      })
    );

    res.status(200).json({ cancellations: detailedCancellations });
  } catch (error) {
    console.error("Error fetching user cancellations:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const adminSignUp = asyncHandler(async (req, res) => {
  const { email, username, password, phone } = req.body;
  if (!email || !username || !password || !phone) return res.status(400).json({ message: "All fields are required" });

  const adminExists = await Admin.findOne({ email });
  if (adminExists) return res.status(400).json({ message: "Admin already exists" });

  const admin = await Admin.create({ username, email, password, phone });
  const createdAdmin = await Admin.findById(admin._id).select("-password");

  if (createdAdmin) {
    genrateToken(createdAdmin._id, res);
    await createdAdmin.save();
    return res.status(201).json({ message: "Admin created successfully", professional: createdAdmin });
  }
  return res.status(500).json({ message: "Internal server error" });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "All fields are required" });

  const loggedinAdmin = await Admin.findOne({ username });
  if (!loggedinAdmin) return res.status(400).json({ message: "Invalid credentials" });

  const isPasswordValid = await loggedinAdmin.isPasswordCorrect(password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  genrateToken(loggedinAdmin._id, res);
  return res.status(200).json({ message: "Admin logged in successfully", admin: loggedinAdmin });
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { expires: new Date(Date.now()), httpOnly: true });
  return res.status(200).json({ message: "Admin logged out successfully" });
});

const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select("-password");
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  return res.status(200).json({ message: "Admin logged in successfully", admin });
});

const addProfessional = asyncHandler(async (req, res) => {
  const { email, name, password, phone, category } = req.body;
  if (!email || !name || !password || !phone || !category) return res.status(400).json({ message: "All fields are required" });

  const professionalExists = await Professional.findOne({ $or: [{ name }, { email }] });
  if (professionalExists) return res.status(400).json({ message: "Professional already exists" });

  const professional = await Professional.create({ name, email, password, phone, category });
  const createdProfessional = await Professional.findById(professional._id).select("-password");

  if (createdProfessional) {
    res.status(201).json({ message: "Professional created successfully", professional: createdProfessional });
    sendEmail(email, "Welcome to Our Service Platform", `Hello ${name},\n\nYou have been added as a professional.\nCategory: ${category}`).catch(console.error);
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

const totalServices = asyncHandler(async (req, res) => {
  // Aggregate to count by category
  const categoryCounts = await Service.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);

  // Transform to { categoryName: count } object
  const servicesByCategory = {};
  categoryCounts.forEach((item) => {
    servicesByCategory[item._id] = item.count;
  });

  // Total count
  const totalCount = await Service.countDocuments();

  return res.status(200).json({
    message: "Total services",
    Services: {
      ...servicesByCategory,
      totalCount,
    },
  });
});

const userstats = asyncHandler(async (req, res) => {
  const users = await User.countDocuments();
  const professionals = await Professional.countDocuments();
  return res.status(200).json({ message: "User stats", users, professionals });
});

const bookingsStats = asyncHandler(async (req, res) => {
  const bookingsCount = await Booking.countDocuments();
  const statusCounts = await Booking.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
  const statusMap = statusCounts.reduce((acc, { _id, count }) => ({ ...acc, [_id]: count }), {});

  return res.status(200).json({
    message: "Bookings stats",
    totalBookings: bookingsCount,
    Pending: statusMap["Pending"] || 0,
    Cancelled: statusMap["Cancelled"] || 0,
    Completed: statusMap["Completed"] || 0,
    Accepted: statusMap["Accepted"] || 0
  });
});

const getAllProfessionalStats = asyncHandler(async (_, res) => {
  const professionals = await Professional.find();

  const professionalStats = await Promise.all(
    professionals.map(async (professional) => {
      const acceptedBookings = await Booking.find({ professional: professional._id, status: "Accepted" });
      const completedBookings = await Booking.countDocuments({ professional: professional._id, status: "Completed" });
      const cancelledBookings = await Booking.countDocuments({ professional: professional._id, cancelledBy: "Professional", status: "Cancelled" });

      const acceptedBookingDetails = await Promise.all(
        acceptedBookings.map(async (booking) => {
          const address = await Address.find({ userId: booking.user });
          const serviceDetails = await Service.findById(booking.service);
          return { user: booking.user, service: serviceDetails, address, booking: { _id: booking._id, bookingDate: booking.bookingDate, bookingTime: booking.bookingTime } };
        })
      );

      acceptedBookingDetails.sort((a, b) => {
        const dateA = new Date(a.booking.bookingDate).getTime();
        const dateB = new Date(b.booking.bookingDate).getTime();
        if (dateA !== dateB) return dateA - dateB;

        const timeA = convertTo24Hour(a.booking.bookingTime);
        const timeB = convertTo24Hour(b.booking.bookingTime);
        return timeA - timeB;
      });

      return {
        professional: professional._id,
        name: professional.name,
        catagory: professional.category,
        email: professional.email,
        phone: professional.phone,
        acceptedBookings: acceptedBookings.length,
        completedBookings,
        cancelledBookings,
        acceptedBookingDetails
      };
    })
  );

  return res.status(200).json({ message: "All professionals booking stats", professionalStats });
});

const convertTo24Hour = (timeStr) => {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

const getAllUsersStats = asyncHandler(async (req, res) => {
  const users = await User.find();
  const userStats = await Promise.all(
    users.map(async (user) => {
      const totalBookings = await Booking.countDocuments({ userId: user._id });
      const pendingBookings = await Booking.countDocuments({ user: user._id, status: "Pending" });
      const completedBookings = await Booking.countDocuments({ user: user._id, status: "Completed" });
      const cancelledBookings = await Booking.countDocuments({ user: user._id, status: "Cancelled", cancelledBy: "User" });

      return { user: user._id, username: user.username, email: user.email, totalBookings, pendingBookings, completedBookings, cancelledBookings };
    })
  );

  return res.status(200).json({ message: "All users booking stats", userStats });
});

const removeProfessional = asyncHandler(async (req, res) => {
  const { professionalId } = req.params;
  const professional = await Professional.findByIdAndDelete(professionalId);
  return professional ? res.status(200).json({ message: "Professional removed successfully" }) : res.status(500).json({ message: "Internal server error" });
});

const removeUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByIdAndDelete(userId);
  return user ? res.status(200).json({ message: "User removed successfully" }) : res.status(500).json({ message: "Internal server error" });
});

const getALLBookingWithDeatils = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).populate("user professional");
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const service = await Service.findById(booking.service);
        return { ...booking.toObject(), service: service || null };
      })
    );
    return res.status(200).json({ message: "All bookings retrieved successfully", bookings: bookingsWithDetails });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export {
  getAllCancellations,
  getALLBookingWithDeatils,
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
  addProfessional,
  getUserCancellations
};
