   
import {Router} from "express"
import {verifyJWT} from "../middleware/auth.middleware.js"
import {addBooking, getBooking,cancleBooking} from "../controller/booking.controller.js"
const router=Router()
router.route("/addBooking/:serviceId").post(verifyJWT,addBooking)
router.route("/getBooking").get(verifyJWT,getBooking)  

router.route("/cancleBooking/:bookingId").patch(verifyJWT,cancleBooking)
export default router