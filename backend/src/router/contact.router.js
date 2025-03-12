import {Router} from "express"
import { createContact,getContact,deleteContact } from "../controller/contact.controller.js"

const router = Router()

router.route("/createContact").post(createContact)

router.route("/getContact").get(getContact)

router.route("/deleteContact/:contactId").delete(deleteContact)

export default router