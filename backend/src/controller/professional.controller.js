import { Professional } from "../models/professional.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { genrateToken } from "../utils/generateToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Booking } from "../models/booking.model.js";
import { Address } from "../models/address.model.js";
import { Service } from "../models/service.model.js";

const getCancelledBookingByProfessional = asyncHandler(async (req, res) => {
  if (!req.professional) return res.status(400).json({ message: "Professional not found" });

  const professionalId = req.professional._id;

  const cancelledBookings = await Booking.find({
    professional: professionalId,
    status: "Cancelled",
    cancelledBy: "Professional"
  }).populate("user").sort({ bookingDate: -1, bookingTime: -1 });

  const userIds = cancelledBookings.map(booking => booking.user?._id).filter(id => id);
  const serviceIds = cancelledBookings.map(booking => booking.service).filter(id => id);

  const userAddresses = await Address.find({ userId: { $in: userIds } });
  const serviceDetails = await Promise.all(serviceIds.map(serviceId => Service.findById(serviceId)));

  const bookingsWithDetails = cancelledBookings.map((booking, index) => {
    const address = userAddresses.find(addr => addr.userId.toString() === booking.user?._id.toString());
    const service = serviceDetails[index];
    return {
      ...booking.toObject(),
      user: { ...booking.user.toObject(), address: address || null },
      service: service || null
    };
  });

  return res.status(200).json({ message: "Cancelled bookings retrieved successfully", cancelledBookings: bookingsWithDetails });
});

const professionalLogin = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).json({ message: "All fields are required" });

  const professional = await Professional.findOne({ name });
  if (!professional) return res.status(400).json({ message: "Invalid credentials" });

  const isPasswordValid = await professional.isPasswordCorrect(password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  genrateToken(professional._id, res);
  return res.status(200).json({ message: "Professional logged in successfully", professional });
});

const professionalLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  return res.status(200).json({ message: "Professional logged out successfully" });
});

const getCurrentprofessional = asyncHandler(async (req, res) => {
  const professional = await Professional.findById(req.professional._id);
  if (!professional) return res.status(500).json({ message: "Internal server error" });

  return res.status(200).json({ message: "Current professional logged in successfully", professional });
});

const getAcceptedBooking = asyncHandler(async (req, res) => {
  if (!req.professional) return res.status(400).json({ message: "Professional not found" });

  const professionalId = req.professional._id;
  const acceptedBookings = await Booking.find({ professional: professionalId, status: "Accepted" })
    .populate("user").sort({ bookingDate: 1, bookingTime: 1 });

  const userIds = acceptedBookings.map(booking => booking.user?._id).filter(id => id);
  const serviceIds = acceptedBookings.map(booking => booking.service).filter(id => id);

  const userAddresses = await Address.find({ userId: { $in: userIds } });
  const serviceDetails = await Promise.all(serviceIds.map(serviceId => Service.findById(serviceId)));

  const bookingsWithDetails = acceptedBookings.map((booking, index) => {
    const address = userAddresses.find(addr => addr.userId.toString() === booking.user?._id.toString());
    const service = serviceDetails[index];
    return { ...booking.toObject(), user: { ...booking.user.toObject(), address: address || null }, service: service || null };
  });

  return res.status(200).json({ message: "Accepted bookings retrieved successfully", acceptedBookings: bookingsWithDetails });
});

const getNewBooking = asyncHandler(async (req, res) => {
  if (!req.professional) return res.status(400).json({ message: "Professional not found" });

  const professionalId = req.professional._id;
  const professional = await Professional.findById(professionalId);
  if (!professional) return res.status(404).json({ message: "Professional not found" });

  const pendingBookings = await Booking.find({ status: "Pending" }).populate("user").sort({ createdAt: -1 });
  const userIds = pendingBookings.map(booking => booking.user?._id).filter(id => id);
  const serviceIds = pendingBookings.map(booking => booking.service).filter(id => id);

  const userAddresses = await Address.find({ userId: { $in: userIds } });
  const serviceDetails = await Promise.all(serviceIds.map(serviceId => Service.findById(serviceId)));

  const bookingsWithDetails = pendingBookings.map((booking, index) => {
    const address = userAddresses.find(addr => addr.userId?.toString() === booking.user?._id?.toString());
    const service = serviceDetails[index];
    if (!booking.user || !service || service.category !== professional.category) return null;
    return { ...booking.toObject(), user: { ...booking.user.toObject(), address: address || null }, service };
  }).filter(booking => booking !== null);

  return res.status(200).json({ message: "New bookings retrieved successfully", newBookings: bookingsWithDetails });
});

const getCompletedBooking = asyncHandler(async (req, res) => {
  if (!req.professional) return res.status(400).json({ message: "Professional not found" });

  const professionalId = req.professional._id;
  const professional = await Professional.findById(professionalId);
  if (!professional) return res.status(404).json({ message: "Professional not found" });

  const completedBookings = await Booking.find({ status: "Completed" }).populate("user").sort({ createdAt: -1 });
  const userIds = completedBookings.map(booking => booking.user?._id).filter(id => id);
  const serviceIds = completedBookings.map(booking => booking.service).filter(id => id);

  const userAddresses = await Address.find({ userId: { $in: userIds } });
  const serviceDetails = await Promise.all(serviceIds.map(serviceId => Service.findById(serviceId)));

  const bookingsWithDetails = completedBookings.map((booking, index) => {
    const address = userAddresses.find(addr => addr.userId.toString() === booking.user?._id.toString());
    const service = serviceDetails[index];
    if (!service || service.category !== professional.category) return null;
    return { ...booking.toObject(), user: { ...booking.user.toObject(), address: address || null }, service };
  }).filter(booking => booking !== null);

  return res.status(200).json({ message: "Completed bookings retrieved successfully", completedBookings: bookingsWithDetails });
});

const updateProfile = async (req, res) => {
  const profilePictureLocalPath = req.file?.path;
  const professionalId = req.professional._id;
  if (!profilePictureLocalPath) return res.status(400).json({ message: "Profile pic is required" });

  const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
  const updatedProfessional = await Professional.findByIdAndUpdate(professionalId, { profilePicture: profilePicture.secure_url }, { new: true });
  await updatedProfessional.save();
  return res.status(200).json({ message: "Profile picture updated successfully", professional: updatedProfessional });
};

const getProfessionalStats = asyncHandler(async (req, res) => {
  const professionalId = req.professional._id;
  const professional = await Professional.findById(professionalId);
  if (!professional) return res.status(404).json({ message: "Professional not found" });

  const completedCount = await Booking.countDocuments({ professional: professionalId, status: "Completed" });
  const acceptedCount = await Booking.countDocuments({ professional: professionalId, status: "Accepted" });
  const cancelledCount = await Booking.countDocuments({ professional: professionalId, status: "Cancelled", cancelledBy: "Professional" });

  const totalEarningsResult = await Booking.aggregate([
    { $match: { professional: professionalId, paymentStatus: "Paid" } },
    { $group: { _id: null, totalEarnings: { $sum: "$totalAmount" } } }
  ]);
  const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;

  const pendingBookings = await Booking.find({ status: "Pending" });
  let newRequestsCount = 0;
  for (const booking of pendingBookings) {
    const service = await Service.findById(booking.service);
    if (service && service.category === professional.category) newRequestsCount++;
  }

  return res.status(200).json({
    message: "Professional booking stats retrieved successfully",
    stats: { completed: completedCount, accepted: acceptedCount, cancelled: cancelledCount, totalEarnings, newRequests: newRequestsCount }
  });
});

const paymentPaid = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;
  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  booking.paymentStatus = "Paid";
  await booking.save();
  return res.status(200).json({ message: "Payment status updated successfully", booking });
});

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
  getCancelledBookingByProfessional
};
