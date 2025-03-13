import {Router } from "express";
import {createRegister,getRegister,deleteRegister} from "../controller/registers.controller.js"

const router=Router()

router.route("/createRegister").post(createRegister)

router.route("/getRegister").get(getRegister)

router.route("/deleteRegister/:registerId").delete(deleteRegister)

export default router