import { createFeedback, getAllFeedback } from "../controller/feedback.controller.js";
import {Router} from "express"
import  { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router()

router.route("/createFeedback").post(verifyJWT,createFeedback)

router.route("/getAllFeedback").get(verifyJWT,getAllFeedback)

export default router