import { verifyAdmin } from "../middleware/adminAuth.middleware.js"
import {Router} from "express"
import {upload} from "../middleware/multer.middleware.js"
import {addSalonService,allSalonService, removeSalonService,updateSalonService} from "../controller/salon.controller.js"
const router=Router()    

router.route("/addSalonService").post(verifyAdmin,upload.single("image_url"),addSalonService)

router.route("/allSalonService").get(allSalonService)

router.route("/removeSalonService/:salonId").delete(verifyAdmin,removeSalonService)

router.route("/updateSalonService/:salonId").patch(upload.single("image_url"), updateSalonService);



export default router
