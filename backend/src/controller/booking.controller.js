import {asyncHandler} from "../utils/asyncHandler.js";
import { Booking } from "../models/booking.model.js";
import { Salon } from "../models/Salon.model.js";
import { Plumbing } from "../models/Plumbing.model.js";
import { Cleaning } from "../models/cleaning.model.js";
import { Electrician } from "../models/electrician.model.js";
import { Carpentry } from "../models/carpentry.model.js";
import { PestControl } from "../models/pestControl.model.js";
import { sendEmail } from "../utils/emailService.js";

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
    const user = req.user; // Ensure this contains username and email
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

    return res.status(201).json({
        message: "Booking created successfully. You will be notified when a professional accepts it.",
        booking: newBooking,
    });
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



const cancleBooking=asyncHandler(async(req,res)=>{
    const {bookingId}=req.params

    if(!bookingId){
        return res.status(400).json({message:"bookingId is required"})
    }
    const booking=await Booking.findByIdAndUpdate(
        bookingId,
        {status:"Cancelled"},
        {new:true}
    )

    return res.status(200).json({message:"Booking cancle successfully",booking})
})

const accpetBooking=asyncHandler(async(req,res)=>{
    const {bookingId}=req.params
    const professionalId=req.professional._id

    if(!bookingId){
        return res.status(400).json({message:"bookingId is required"})
    }
    const booking=await Booking.findByIdAndUpdate(
        bookingId,
        {status:"Accepted",
            professional:professionalId
            
        },
        {new:true}
    )

    return res.status(200).json({message:"accpet Booking successfully",booking})
    }
)

const completeBooking=asyncHandler(async(req,res)=>{
    const {bookingId}=req.params
    const professionalId=req.professional._id
    if(!bookingId){
        return res.status(400).json({message:"bookingId is required"})
    }
    const booking=await Booking.findByIdAndUpdate(
        bookingId,
        {status:"Completed",
            professional:professionalId
        },
        {new:true}
    )

    return res.status(200).json({message:"complete Booking successfully",booking})
})

export {
    addBooking,
    getBooking,
    cancleBooking,
    accpetBooking,
    completeBooking
}