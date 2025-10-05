import { verifyAdmin } from "../middleware/adminAuth.middleware.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
    addService,
    allServices,
    removeService,
    updateService
} from "../controller/service.controller.js";

const router = Router();

router.route("/addService").post(verifyAdmin, upload.single("image_url"), addService);
router.route("/allServices").get(allServices);
router.route("/removeService/:serviceId").delete(verifyAdmin, removeService);
router.route("/updateService/:serviceId").patch(verifyAdmin, upload.single("image_url"), updateService);

export default router;