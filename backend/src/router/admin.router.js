import { Router } from "express";

import {loginAdmin,getAdmin,logoutAdmin,addProfessional} from "../controller/admin.controller.js"
import { verifyAdmin } from "../middleware/adminAuth.middleware.js";

const router=Router()

router.route("/login").get(loginAdmin)

router.route("/logout").get(verifyAdmin,logoutAdmin)

router.route("/getAdmin").get(verifyAdmin,getAdmin)

router.route("/addProfessional").post(verifyAdmin,addProfessional)

export default router