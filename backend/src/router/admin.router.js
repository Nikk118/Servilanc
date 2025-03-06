import { Router } from "express";

import {loginAdmin,getAdmin,logoutAdmin,addProfessional,adminSignUp,totalServices,
    userstats,bookingsStats
} from "../controller/admin.controller.js"
import { verifyAdmin } from "../middleware/adminAuth.middleware.js";

const router=Router()

router.route("/signup").post(adminSignUp)

router.route("/login").post(loginAdmin)

router.route("/logout").get(verifyAdmin,logoutAdmin)

router.route("/getAdmin").get(verifyAdmin,getAdmin)

router.route("/addProfessional").post(verifyAdmin,addProfessional)

router.route("/userstats").get(verifyAdmin,userstats)

router.route("/totalServices").get(verifyAdmin,totalServices)

router.route("/bookingsStats").get(verifyAdmin,bookingsStats)

export default router