import express from "express";
import { cancelBookingByProfessional } from "../controller/cancellation.controller.js";
import { verifyProfessional } from "../middleware/professionalAuth.middleware.js";

const router = express.Router();


router.route("/professionalCancelBooking/:bookingId").patch(verifyProfessional,cancelBookingByProfessional);



export default router;
