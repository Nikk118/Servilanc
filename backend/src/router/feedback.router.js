import { createFeedback, get10Feedback,getAllFeedback } from "../controller/feedback.controller.js";
import {Router} from "express"
import  { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router()

router.route("/createFeedback").post(verifyJWT,createFeedback)

router.route("/get10Feedback").get(verifyJWT,get10Feedback)

router.route("/getAllFeedback").get(getAllFeedback)

export default router