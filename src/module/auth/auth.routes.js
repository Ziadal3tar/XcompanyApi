import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { logInValidation, signUpValidation, updateRoleValidation } from "./auth.validation.js";
import * as registerControl from './controller/registration.js'
const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: 'Auth Module' })
})
// ,validation(signUpValidation)
router.post("/signUp", registerControl.signUp)
router.get("/getUserRole/:token" , registerControl.getUserRole)
router.get("/confirmEmail/:token", registerControl.confirmEmail)
router.get("/refreshToken/:token", registerControl.resendConfirmEmail)
router.post("/logIn",validation(logInValidation), registerControl.logIn)

export default router