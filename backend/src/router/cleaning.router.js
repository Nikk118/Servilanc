import { verifyAdmin } from "../middleware/adminAuth.middleware.js"
import {Router} from "express"
import {upload} from "../middleware/multer.middleware.js"
import {addCleaningService,allCleaningService, removeCleaningService,updateCleaningService} from "../controller/cleaning.controller.js"
const router=Router()    

router.route("/addCleaningService").post(verifyAdmin,upload.single("image_url"),addCleaningService)

router.route("/allCleaningService").get(allCleaningService)

router.route("/removeCleaningService/:cleaningId").delete(verifyAdmin,removeCleaningService)

router.route("/updateCleaningService/:cleaningId").patch(
    upload.single("image_url"),
    updateCleaningService
);


export default router