import { asyncHandler } from "../utils/asyncHandler.js";
import { Cancellation } from "../models/Cancellation.model.js";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/emailService.js";
import { Service } from "../models/service.model.js";

// Cancel Booking by Professional
const cancelBookingByProfessional = asyncHandler(async (req, res) => {
    try {
        const { bookingId } = req.params;
        const professionalId = req.professional?._id;
        const { reason } = req.body;

        if (!bookingId || !reason) {
            return res.status(400).json({ message: "Booking ID and reason are required" });
        }

        if (!professionalId) {
            return res.status(401).json({ message: "Unauthorized: Professional not found" });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // Ensure the booking belongs to this professional
        if (booking.professional.toString() !== professionalId.toString()) {
            return res.status(403).json({ message: "Unauthorized: You can only cancel your own bookings" });
        }

        // Update booking status
        booking.status = "Cancelled";
        booking.cancelledBy = "Professional";
        await booking.save();

        // Store cancellation record
        const cancellation = await Cancellation.create({
            booking: bookingId,
            cancelledBy: "Professional",
            reason
        });

        // Fetch user and service details
        const user = await User.findById(booking.user);
        if (!user) return res.status(400).json({ message: "User details not found" });

        const serviceDetails = await Service.findById(booking.service);
        if (!serviceDetails) return res.status(404).json({ message: "Service details not found" });

        // Respond to professional
        res.status(200).json({
            message: "Booking cancelled successfully",
            cancellation
        });

        // Send email notification asynchronously
        sendEmail(
            user.email,
            "Booking Cancelled",
            `Dear ${user.username},\n\nYour booking for **${serviceDetails.name}** has been cancelled by the professional.\n\nReason: ${reason}\n\nThank you!`
        ).then(() => console.log("Cancellation email sent to:", user.email))
         .catch(error => console.error("Error sending email:", error));

    } catch (error) {
        console.error("Error cancelling booking:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export { cancelBookingByProfessional };
