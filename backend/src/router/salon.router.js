import { verifyAdmin } from "../middleware/adminAuth.middleware.js"
import {Router} from "express"
import {upload} from "../middleware/multer.middleware.js"
import {addSalonService,allSalonService, removeSalonService} from "../controller/salon.controller.js"
const router=Router()    

router.route("/addSalonService").post(verifyAdmin,upload.single("image_url"),addSalonService)

router.route("/allSalonService").get(verifyAdmin,allSalonService)

router.route("/removeSalonService/:salonId").delete(verifyAdmin,removeSalonService)

export default router
