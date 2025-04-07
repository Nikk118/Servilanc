import {asyncHandler} from "../utils/asyncHandler.js";
import { Booking } from "../models/booking.model.js";
import { Salon } from "../models/Salon.model.js";
import { Plumbing } from "../models/Plumbing.model.js";
import { Cleaning } from "../models/Cleaning.model.js";
import { Electrician } from "../models/electrician.model.js";
import { Carpentry } from "../models/carpentry.model.js";
import { PestControl } from "../models/pestControl.model.js";
import { sendEmail } from "../utils/emailService.js";
import { Professional } from "../models/professional.model.js";
import {Cancellation} from "../models/Cancellation.model.js"
import {User} from "../models/user.model.js"

const findServiceById = async (serviceId) => {
    try {
       
        const [plumbing, cleaning, salon, electrician, carpentry, pestControl] = await Promise.all([
            Plumbing.findById(serviceId),
            Cleaning.findById(serviceId),
            Salon.findById(serviceId),
            Electrician.findById(serviceId),
            Carpentry.findById(serviceId),
            PestControl.findById(serviceId),
        ]);

        // Return the first found service
        return plumbing || cleaning || salon || electrician || carpentry || pestControl || null;
    } catch (error) {
        console.error("Error finding service:", error);
        return null;
    }
};


const addBooking = asyncHandler(async (req, res) => {
    console.log("Received booking request", req.body);
    
    const { bookingDate, bookingTime, transactionId } = req.body;
    const user = req.user; 
    const { serviceId } = req.params;

    if (!serviceId) {
        return res.status(400).json({ message: "Service ID is required" });
    }

    const service = await findServiceById(serviceId);

    if (!service) {
        console.log("Service not found");
        return res.status(404).json({ message: "Service not found" });
    }

    if (!bookingDate || !bookingTime) {
        return res.status(400).json({ message: "All fields are required" });
    }

    let newBooking;
    if (!transactionId) {
        newBooking = await Booking.create({
            user: user._id,
            service: serviceId,
            bookingDate,
            bookingTime,
            totalAmount: service.price,
        });
    } else {
        newBooking = await Booking.create({
            user: user._id,
            service: serviceId,
            bookingDate,
            bookingTime,
            transactionId: transactionId,
            paymentStatus: "Paid",
            totalAmount: service.price,
        });
    }

    // Extract username and service name
    const userName = user.username || "User"; // Default to "User" if undefined
    const serviceName = service.name || "the service"; // Default if service name is missing
     res.status(201).json({
        message: "Booking created successfully. You will be notified when a professional accepts it.",
        booking: newBooking,
    });

    // Send booking request email
    try {
        await sendEmail(
            user.email,  // toEmail
            "Your Booking Request is Pending",  // subject
            `Hello ${userName},\n\nYour booking request for ${serviceName} on ${bookingDate} at ${bookingTime} is pending. We will notify you when a professional accepts it. If no professional accepts, your request will be automatically canceled.\n\nThank you for choosing our service!` // message
        );
        
        console.log("Booking request email sent to:", user.email);
    } catch (error) {
        console.error("Error sending booking request email:", error);
    }

    
});


const getBooking = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Fetch user bookings sorted by newest first
        const bookings = await Booking.find({ user: user._id }).sort({ createdAt: -1 });

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



const cancelBookingByUser = asyncHandler(async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user._id;
        const { reason } = req.body;

        if (!bookingId || !reason || !userId) {
            return res.status(400).json({ message: "Booking ID, user ID, and reason are required" });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Ensure the booking belongs to the user
        if (booking.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized: You can only cancel your own bookings" });
        }

        // Update booking status
        booking.status = "Cancelled";
        booking.cancelledBy = "User";
        await booking.save();

        // Store cancellation record
        const cancellation = new Cancellation({
            booking: bookingId,
            cancelledBy: "User",
            reason
        });
        await cancellation.save();

        // Fetch service details
        const Service = await findServiceById(booking.service);
        if (!Service) {
            return res.status(404).json({ message: "Service details not found" });
        }

        // Send response before sending email
        res.status(200).json({
            message: "Booking cancelled successfully",
            cancellation
        });

        // Send email notification only if a professional is assigned
        if (booking.professional) {
            const professional = await Professional.findById(booking.professional);
            if (professional) {
                try {
                    await sendEmail(
                        professional.email,
                        "Booking Cancelled",
                        `Dear ${professional.name},\n\nThe booking for **${Service.name}** has been cancelled by the user.\n\nReason: ${reason}\n\nThank you!`
                    );
                    console.log("Cancellation email sent to:", professional.email);
                } catch (error) {
                    console.error("Error sending email:", error);
                }
            }
        }

    } catch (error) {
        console.error("Error cancelling booking:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});






const accpetBooking = asyncHandler(async (req, res) => {
    try {
        const { bookingId } = req.params;
        const professionalId = req.professional._id;

        if (!bookingId) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        // Update booking status to "Accepted" and assign professional
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            {
                status: "Accepted",
                professional: professionalId,
            },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Fetch user, professional, and service details
        const user = await User.findById(booking.user);
        const professional = await Professional.findById(booking.professional);
        const service = await findServiceById(booking.service);

        if (!user || !professional || !service) {
            return res.status(400).json({ message: "User, professional, or service details not found" });
        }
        
         res.status(200).json({ message: "Booking accepted successfully", booking });
        // Send email notification to user
        try {
            await sendEmail(
                user.email,
                "Your Booking Request has been Accepted!",
                `Hello ${user.username},\n\nGood news! Your booking request for ${service.name} has been accepted by ${professional.name}.\n\nYou can contact the professional at ${professional.email} or ${professional.phone}.\n\nThank you for choosing our platform!\n\nBest Regards,\nYour Service Team`
            );
            console.log(`Booking acceptance email sent to: ${user.email}`);
        } catch (error) {
            console.error("Error sending email:", error);
        }


    } catch (error) {
        console.error("Error accepting booking:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


const completeBooking = asyncHandler(async (req, res) => {
    try {
        const { bookingId } = req.params;
        const professionalId = req.professional._id;

        if (!bookingId) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        // Update booking status to "Completed"
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: "Completed", professional: professionalId },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Fetch user, professional, and service details
        const user = await User.findById(booking.user);
        const professional = await Professional.findById(booking.professional);
        const service = await findServiceById(booking.service);

        if (!user || !service || !professional) {
            return res.status(400).json({ message: "User, service, or professional details not found" });
        }

        // ✅ **Send response first (Prevents network error)**
        res.status(200).json({ message: "Booking completed successfully", booking });

        // ✅ **Send feedback email in the background**
        try {
            await sendEmail(
                user.email,
                "Your Booking is Successfully Completed!",
                `Hello ${user.username},\n\nYour booking for ${service.name} has been successfully completed by ${professional.name}.\n\nWe would love to hear your feedback! Please take a moment to rate your experience.\n\nThank you for choosing our platform!`
            );
            console.log("Completion feedback email sent to:", user.email);
        } catch (error) {
            console.error("Error sending feedback email:", error);
        }

        return;
    } catch (error) {
        console.error("Error completing booking:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});





export {
    addBooking,
    getBooking,
    cancelBookingByUser,
    accpetBooking,
    completeBooking
}