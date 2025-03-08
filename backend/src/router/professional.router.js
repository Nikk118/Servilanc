import {Router} from "express";
import {professionalLogin,professionalLogout,getCurrentprofessional,getAcceptedBooking,updateProfile,getNewBooking  } from "../controller/professional.controller.js";

import {verifyProfessional} from "../middleware/professionalAuth.middleware.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router();



router.route("/login").post(professionalLogin)

router.route("/logout").get(verifyProfessional,professionalLogout)

router.route("/getCurrentProfessional").get(verifyProfessional,getCurrentprofessional)

router.route("/getAcceptedBooking").get(verifyProfessional,getAcceptedBooking)

router.route("/getNewBooking").get(verifyProfessional,getNewBooking)

router.route("/updateProfile").patch(verifyProfessional,upload.single("profilePicture"),updateProfile)

export default router