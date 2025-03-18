import { asyncHandler } from "../utils/asyncHandler.js";
import { Booking } from "../models/booking.model.js";
import { Salon } from "../models/Salon.model.js";
import { Plumbing } from "../models/Plumbing.model.js";
import { Cleaning } from "../models/cleaning.model.js";
import { User } from "../models/user.model.js";
import { Professional } from "../models/professional.model.js";
import sendSMS from "../utils/smsService.js";

const findServiceById = async (serviceId) => {
  try {
    const [plumbing, cleaning, salon] = await Promise.all([
      Plumbing.findById(serviceId).populate("professional"),
      Cleaning.findById(serviceId).populate("professional"),
      Salon.findById(serviceId).populate("professional"),
    ]);

    return plumbing || cleaning || salon || null;
  } catch (error) {
    console.error("Error finding service:", error);
    return null;
  }
};

const addBooking = asyncHandler(async (req, res) => {
  console.log("Received booking request:", req.body);
  const { bookingDate, bookingTime, transactionId } = req.body;
  const user = req.user;
  const { serviceId } = req.params;

  if (!serviceId) {
    return res.status(400).json({ message: "Service ID is required" });
  }

  const service = await findServiceById(serviceId);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  const professional = await Professional.findById(service.professional);
  if (!professional) {
    return res.status(404).json({ message: "Assigned professional not found" });
  }

  if (!bookingDate || !bookingTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newBooking = await Booking.create({
    user: user._id,
    service: serviceId,
    bookingDate,
    bookingTime,
    transactionId: transactionId || null,
    paymentStatus: transactionId ? "Paid" : "Pending",
    totalAmount: service.price,
  });

  // Send SMS to Professional
  const messageToProfessional = `New Booking: ${service.serviceName} by ${user.name}. Check your dashboard to accept/reject.`;
  await sendSMS(professional.phone, messageToProfessional);

  res
    .status(201)
    .json({ message: "Booking created successfully", booking: newBooking });
});

const getBooking = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch user bookings sorted by newest first
    const bookings = await Booking.find({ user: user._id }).sort({
      createdAt: -1,
    });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    // Populate service details
    const populatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const serviceDetails = await findServiceById(booking.service);
        return {
          ...booking.toObject(),
          service: serviceDetails || "Service not found",
        };
      })
    );

    return res.status(200).json({
      message: "Bookings found successfully",
      bookings: populatedBookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const accpetBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const professionalId = req.professional._id;

  if (!bookingId) {
    return res.status(400).json({ message: "Booking ID is required" });
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: "Accepted", professional: professionalId },
    { new: true }
  ).populate("user");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // Send SMS to User
  const messageToUser = `Your booking for ${booking.service} has been accepted by the professional.`;
  await sendSMS(booking.user.phone, messageToUser);

  res.status(200).json({ message: "Booking accepted successfully", booking });
});

const cancleBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  if (!bookingId) {
    return res.status(400).json({ message: "Booking ID is required" });
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: "Cancelled" },
    { new: true }
  ).populate("user");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // Send SMS to User
  const messageToUser = `Your booking for ${booking.service} has been cancelled by the professional.`;
  await sendSMS(booking.user.phone, messageToUser);

  res.status(200).json({ message: "Booking cancelled successfully", booking });
});

const completeBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const professionalId = req.professional._id;

  if (!bookingId) {
    return res.status(400).json({ message: "Booking ID is required" });
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: "Completed", professional: professionalId },
    { new: true }
  ).populate("user");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // Send SMS to User
  const messageToUser = `Your booking for ${booking.service} has been successfully completed.`;
  await sendSMS(booking.user.phone, messageToUser);

  res.status(200).json({ message: "Booking completed successfully", booking });
});

export {
  addBooking,
  getBooking,
  cancleBooking,
  accpetBooking,
  completeBooking,
};
