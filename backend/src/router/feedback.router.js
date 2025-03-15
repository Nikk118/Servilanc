import { createFeedback, deleteFeedback, get10Feedback,getAllFeedback } from "../controller/feedback.controller.js";
import {Router} from "express"
import  { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/adminAuth.middleware.js";


const router=Router()

router.route("/createFeedback").post(verifyJWT,createFeedback)

router.route("/get10Feedback").get(verifyJWT,get10Feedback)

router.route("/getAllFeedback").get(getAllFeedback)

router.route("/deleteFeedback/:feedbackId").delete(verifyAdmin,deleteFeedback)

export default router