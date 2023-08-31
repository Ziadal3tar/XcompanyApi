import { Router } from "express";
import * as ordersControl from './controller/orders.controller.js'
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./orders.endPoint.js";
const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: 'orders Module' })
})

router.post("/addOrder",auth(endPoints.user), ordersControl.addOrder)
router.get("/getAllOrders", ordersControl.getAllOrders)
router.put("/updateOrderStatus",auth(endPoints.admin), ordersControl.updateOrderStatus)


export default router
