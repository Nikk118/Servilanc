   
import {Router} from "express"
import {verifyJWT} from "../middleware/auth.middleware.js"
import {verifyProfessional} from "../middleware/professionalAuth.middleware.js"
import {addBooking, getBooking,cancleBooking,accpetBooking, completeBooking} from "../controller/booking.controller.js"
const router=Router()

router.route("/addBooking/:serviceId").post(verifyJWT,addBooking)

router.route("/getBookings").get(verifyJWT,getBooking)  

router.route("/cancleBooking/:bookingId").patch(verifyJWT,cancleBooking)

router.route("/accpetBooking/:bookingId").patch(verifyProfessional,accpetBooking)

router.route("/completeBooking/:bookingId").patch(verifyProfessional,completeBooking)


export default router