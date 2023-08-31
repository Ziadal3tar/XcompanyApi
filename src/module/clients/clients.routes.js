import { Router } from "express";
import { fileValidation, HME, myMulter } from "../../services/multer.js";
import * as clientsControl from './controller/clients.controller.js'
const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: 'clients Module' })
})
router.post("/addClient",myMulter(fileValidation.image).any(), HME, clientsControl.addClient)
router.get("/getAllClients", clientsControl.getAllClients)
router.delete("/deleteClient/:id", clientsControl.deleteClient)
export default router
