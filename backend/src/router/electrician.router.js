import { verifyAdmin } from "../middleware/adminAuth.middleware.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addElectricianService, allElectricianService, removeElectricianService } from "../controller/electrician.controller.js";

const router = Router();

router.route("/addElectricianService").post(verifyAdmin, upload.single("image_url"), addElectricianService);
router.route("/allElectricianService").get(allElectricianService);
router.route("/removeElectricianService/:electricianId").delete(verifyAdmin, removeElectricianService);

export default router;
