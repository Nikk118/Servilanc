import { Router } from "express";

import {signupAdmin,loginAdmin} from "../controller/admin.controller.js"

const router=Router()

router.route("/signupAdmin").post(signupAdmin)

router.route("/loginAdmin").get(loginAdmin)

export default router