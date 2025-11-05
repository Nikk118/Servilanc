import cron from "node-cron";
import {Booking} from "../models/booking.model.js";
import { sendEmail } from "../utils/emailService.js";

export function startBookingScheduler() {
  cron.schedule("* * * * *", async () => {
    try {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

      const pendingBookings = await Booking.find({
        status: "pending",
        createdAt: { $lte: fifteenMinutesAgo },
      }).populate("userId");

      for (const booking of pendingBookings) {
        booking.status = "cancelled";
        await booking.save();

        await sendEmail(
          booking.userId.email,
          "Booking Cancelled - Servielliance",
          `Hello ${booking.userId.username},\n\nYour booking (ID: ${booking._id}) was not accepted within 15 minutes, so it has been automatically cancelled.\n\nTeam Servielliance`
        );
      }

      if (pendingBookings.length > 0) {
        console.log(`${pendingBookings.length} booking(s) auto-cancelled.`);
      }
    } catch (error) {
      console.error("Error in booking scheduler:", error);
    }
  });
}
