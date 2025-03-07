import {asyncHandler} from "../utils/asyncHandler.js";
import { Booking } from "../models/booking.model.js";
import { Salon } from "../models/Salon.model.js";
import { Plumbing } from "../models/Plumbing.model.js";
import { Cleaning } from "../models/cleaning.model.js";

const findServiceById = async (serviceId) => {
    try {
      // Search in all three collections simultaneously
      const [plumbing, cleaning, salon] = await Promise.all([
        Plumbing.findById(serviceId),
        Cleaning.findById(serviceId),
        Salon.findById(serviceId),
      ]);
  
      // Return the first found service
      return plumbing || cleaning || salon || null;
    } catch (error) {
      console.error("Error finding service:", error);
      return null;
    }
  };

const addBooking=asyncHandler(async(req,res)=>{
    console.log("samna ye aaya",req.body)
    const {bookingDate,bookingTime}=req.body 
    const user=req.user
    const {serviceId}=req.params

    if (!serviceId) {
        return res.status(400).json({message:"service id is  required"})
    }
   
        
    const service = await findServiceById(serviceId);

    if (!service) {
      console.log("Service not found");
    } else {
      console.log("Service found:", service);
    }
    
    
    if(!bookingDate || !bookingTime){
        return res.status(400).json({message:"All fields are required"})    
    }

    

    const newBooking=await Booking.create({
        user:user._id,
        service:serviceId,
        bookingDate,
        bookingTime,
        totalAmount:service.price
    })

    return res.status(201).json({message:"Booking created successfully",booking:newBooking})
}) 

const getBooking = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Fetch user bookings
        const bookings = await Booking.find({ user: user._id });

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
            bookings: populatedBookings, // renamed key to be more intuitive
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