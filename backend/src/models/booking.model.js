import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true
        },
        professional: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Professional",
          
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true
        },
        bookingDate: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Completed", "Cancelled"],
            default: "Pending"
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending"
        },
        transactionId: {
            type: String,
            default: null
        },
        totalAmount: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export { Booking };
