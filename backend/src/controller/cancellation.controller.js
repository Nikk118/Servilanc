import {asyncHandler} from "../utils/asyncHandler.js";
import {Cancellation} from "../models/Cancellation.model.js";
import {Booking} from "../models/booking.model.js";
import {User} from "../models/user.model.js"
import { sendEmail } from "../utils/emailService.js"
import { Salon } from "../models/Salon.model.js";
import { Plumbing } from "../models/Plumbing.model.js";
import { Cleaning } from "../models/Cleaning.model.js";
import { Electrician } from "../models/electrician.model.js";
import { Carpentry } from "../models/carpentry.model.js";
import { PestControl } from "../models/pestControl.model.js";



const findServiceById = async (serviceId) => {
  try {
      console.log("Searching for service with ID:", serviceId);

      // Search in all six collections simultaneously
      const [plumbing, cleaning, salon, electrician, carpentry, pestControl] = await Promise.all([
          Plumbing.findById(serviceId),
          Cleaning.findById(serviceId),
          Salon.findById(serviceId),
          Electrician.findById(serviceId),
          Carpentry.findById(serviceId),
          PestControl.findById(serviceId),
      ]);

      console.log("Results:", { plumbing, cleaning, salon, electrician, carpentry, pestControl });

      // Return the first found service
      return plumbing || cleaning || salon || electrician || carpentry || pestControl || null;
  } catch (error) {
      console.error("Error finding service:", error);
      return null;
  }
};
// Cancel Booking by Professional
const cancelBookingByProfessional = asyncHandler(async (req, res) => {
    try {
        const { bookingId } = req.params;
        const professionalId = req.professional._id;
        const { reason } = req.body;

        if (!bookingId || !reason || !professionalId) {
            return res.status(400).json({ message: "Booking ID, professional ID, and reason are required" });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Update booking status
        booking.status = "Cancelled";
        booking.cancelledBy = "Professional";
        await booking.save();

        // Store cancellation record
        const cancellation = new Cancellation({
            booking: bookingId,
            cancelledBy: "Professional",
            reason
        });
        await cancellation.save();

        // Fetch user details
        const user = await User.findById(booking.user);
        if (!user) {
            return res.status(400).json({ message: "User details not found" });
        }

        // Fetch service details correctly
        const Service = await findServiceById(booking.service); // ✅ Added "await"
        console.log("Service:", Service);

        if (!Service) {
            console.error("Service not found for ID:", booking.service);
            return res.status(404).json({ message: "Service details not found" });
        }

        // Send response before sending email
        res.status(200).json({
            message: "Booking cancelled successfully",
            cancellation
        });

        // Send email notification with service title
        try {
            await sendEmail(
                user.email,
                "Booking Cancelled",
                `Dear ${user.username},\n\nYour booking for **${Service.name}** has been cancelled by the professional.\n\nReason: ${reason}\n\nThank you!`
            );
            console.log("Cancellation email sent to:", user.email);
        } catch (error) {
            console.error("Error sending email:", error);
        }

    } catch (error) {
        console.error("Error cancelling booking:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});



export { cancelBookingByProfessional };
