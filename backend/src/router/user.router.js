import {Router} from "express";
import {userSignUp,userLogin,userLogout,getCurrentUser,updateProfile} from "../controller/user.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(userSignUp);

router.route("/login").get(userLogin)

router.route("/logout").get(verifyJWT,userLogout)

router.route("/getCurrentUser").get(verifyJWT,getCurrentUser)

router.route("/updateProfile").patch(verifyJWT,updateProfile)

export default router