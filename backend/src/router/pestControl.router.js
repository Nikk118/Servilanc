import { verifyAdmin } from "../middleware/adminAuth.middleware.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
    addPestControlService,
    allPestControlService,
    removePestControlService,
    updatePestControlService
} from "../controller/pestControl.controller.js";

const router = Router();

router.route("/addPestControlService").post(verifyAdmin, upload.single("image_url"), addPestControlService);
router.route("/allPestControlService").get(allPestControlService);
router.route("/removePestControlService/:pestControlId").delete(verifyAdmin, removePestControlService);

router.route("/updatePestControlService/:pestControlId").patch(
    upload.single("image_url"),
    updatePestControlService
);

export default router;
