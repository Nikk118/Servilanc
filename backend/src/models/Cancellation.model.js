import mongoose from "mongoose";

const cancellationSchema = new mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true
        },
        cancelledBy: {
            type: String,
            enum: ["User", "Professional"],
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        cancelledAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const Cancellation = mongoose.model("Cancellation", cancellationSchema);
export { Cancellation };
