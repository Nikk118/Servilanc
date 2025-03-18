import { verifyAdmin } from "../middleware/adminAuth.middleware.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addCarpentryService, allCarpentryService, removeCarpentryService } from "../controller/carpentry.controller.js";

const router = Router();

router.route("/addCarpentryService").post(verifyAdmin, upload.single("image_url"), addCarpentryService);
router.route("/allCarpentryService").get(allCarpentryService);
router.route("/removeCarpentryService/:carpentryId").delete(verifyAdmin, removeCarpentryService);

export default router;
