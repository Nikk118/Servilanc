import { verifyAdmin } from "../middleware/adminAuth.middleware.js"
import {Router} from "express"
import {upload} from "../middleware/multer.middleware.js"
import {addCleaningService,allCleaningService, removeCleaningService} from "../controller/Cleaning.controller.js"
const router=Router()    

router.route("/addCleaningService").post(verifyAdmin,upload.single("image_url"),addCleaningService)

router.route("/allCleaningService").get(verifyAdmin,allCleaningService)

router.route("/removeCleaningService/:cleaningId").delete(verifyAdmin,removeCleaningService)

export default router