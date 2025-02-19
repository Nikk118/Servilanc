import { verifyAdmin } from "../middleware/adminAuth.middleware.js"
import {Router} from "express"
import {upload} from "../middleware/multer.middleware.js"
import {addSalon} from "../controller/salon.controller.js"
const router=Router()    

router.route("/addSalon").post(verifyAdmin,upload.single("image_url"),addSalon)

export default router
