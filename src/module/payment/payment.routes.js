import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as paymentControl from './controller/payments.controller.js'
// import { endPoints } from "./user.endPoint.js";
const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: 'user Module' })
})

router.post("/proceedPayment", paymentControl.proceedPayment)

export default router