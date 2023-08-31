import { Router } from "express";


import { fileValidation, HME, myMulter } from "../../services/multer.js";

import * as servicesControl from './controller/services.controller.js'
const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: 'services Module' })
})

router.post("/addServices",myMulter(fileValidation.image).array("image"), HME, servicesControl.addServices)
router.put("/editServices",myMulter(fileValidation.image).array("image"), HME, servicesControl.editServices)
router.get("/getAllServices", servicesControl.getAllServices)
router.delete("/deleteService/:id", servicesControl.deleteService)
export default router
