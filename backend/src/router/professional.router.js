import {Router} from "express";
import {professionalLogin,professionalLogout,getCurrentprofessional,updateProfile} from "../controller/professional.controller.js";

import {verifyProfessional} from "../middleware/professionalAuth.middleware.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router();



router.route("/login").get(professionalLogin)

router.route("/logout").get(verifyProfessional,professionalLogout)

router.route("/getCurrentProfessional").get(verifyProfessional,getCurrentprofessional)

router.route("/updateProfile").patch(verifyProfessional,upload.single("profilePicture"),updateProfile)

export default router