import { Router } from "express";

import {loginAdmin,getAdmin,logoutAdmin} from "../controller/admin.controller.js"
import { verifyAdmin } from "../middleware/adminAuth.middleware.js";

const router=Router()

router.route("/loginAdmin").get(loginAdmin)

router.route("/logoutAdmin").get(verifyAdmin,logoutAdmin)

router.route("/getAdmin").get(verifyAdmin,getAdmin)

export default router