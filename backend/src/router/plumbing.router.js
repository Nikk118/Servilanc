import { verifyAdmin } from "../middleware/adminAuth.middleware.js"
import {Router} from "express"
import {upload} from "../middleware/multer.middleware.js"

import {addPlumbingService,allPlumbingService, removePlumbingService} from "../controller/plumbing.controller.js"
const router=Router()    

router.route("/addPlumbingService").post(verifyAdmin,upload.single("image_url"),addPlumbingService)

router.route("/allPlumbingService").get(allPlumbingService)

router.route("/removePlumbingService/:plumbingId").delete(verifyAdmin,removePlumbingService)

export default router