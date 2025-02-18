import {Router} from "express"
import {createAddress, deleteAddress, getAddress,
    updateAddress
} from "../controller/address.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
const router = Router()

router.route("/createAddress").post(verifyJWT,createAddress)

router.route("/getAddress").get(verifyJWT,getAddress)

router.route("/deleteAddress").delete(verifyJWT,deleteAddress)

router.route("/updateAddress").patch(verifyJWT,updateAddress)

export default router   