import {Router} from "express";
import {professionalSignUp,professionalLogin,professionalLogout,getCurrentprofessional,updateProfile} from "../controller/professional.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/signup").post(professionalSignUp);

router.route("/login").get(professionalLogin)

router.route("/logout").get(verifyJWT,professionalLogout)

router.route("/getCurrentprofessional").get(verifyJWT,getCurrentprofessional)

router.route("/updateProfile").patch(verifyJWT,upload.single("profilePicture"),updateProfile)

export default router