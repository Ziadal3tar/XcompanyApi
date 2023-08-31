import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as userControl from './controller/user.controller.js'
import { endPoints } from "./user.endPoint.js";
const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: 'user Module' })
})
router.put("/addToCart",auth(endPoints.user), userControl.addToCart)
router.put("/removeFromCart",auth(endPoints.user), userControl.removeFromCart)
router.put("/clearCart",auth(endPoints.user), userControl.clearCart)
router.post("/searchUser",auth(endPoints.allAdmins), userControl.searchUser)
router.get("/getAllUser", userControl.getAllUser)
router.put("/addAdmin",auth(endPoints.addAdmin), userControl.addAdmin)
router.put("/addSuperAdmin",auth(endPoints.addAdmin), userControl.addSuperAdmin)
router.put("/removeAdmin",auth(endPoints.addAdmin), userControl.removeAdmin)
export default router
