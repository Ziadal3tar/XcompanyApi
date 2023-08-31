import userModel from '../../../../DB/model/user.model.js'
import { sendEmail } from '../../../services/email.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../../../services/asyncHandler.js';
import { findById, findByIdAndDelete, findOneAndUpdate, findOne, find, findByIdAndUpdate, create, findOneAndDelete } from '../../../../DB/DBMethods.js';
import { paginate } from '../../../services/pagination.js';
import cloudinary from '../../../services/cloudinary.js'
import servicesModel from '../../../../DB/model/services.model.js';
import clientsModel from '../../../../DB/model/clients.model.js';

export const addClient = asyncHandler(async (req, res, next) => {
  const { clientName, services } = req.body;
  let logoUrl
  let logoId
  let Theservices = services.split(',')
  let servicesData = []
  for (let i = 0; i < Theservices.length; i++) {
    const name = Theservices[i];
    let imagesUrls = []
    let imageIds = []
    for (let i = 0; i < req.files.length; i++) {
      const element = req.files[i];
      if (element.fieldname == 'logo') {
        await cloudinary.uploader.upload(element.path, { folder: "velocityImages/client" }, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            logoUrl = result.secure_url
            logoId = result.public_id
          }
        })
      }
      if (element.fieldname == name) {
        await cloudinary.uploader.upload(element.path, { folder: "velocityImages/client" }, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            imagesUrls.push(result.secure_url)
            imageIds.push(result.public_id)
          }
        })
      }
    }
    let obj = { name,  imagesUrls, imageIds }
    servicesData.push(obj)
  }
  let newClient = create({ model: clientsModel, data: { clientName, image: logoUrl, imageId: logoUrl, clientServices: servicesData } })
  if (newClient) {
    res.status(201).json({ message: "added successfully", newClient })
  } else {
    res.status(401).json({ message: "added failed" })
  }
})
export const getAllClients = asyncHandler(async (req, res, next) => {

  let allClients = await find({ model: clientsModel })

  if (allClients) {
    res.status(201).json({ allClients })

  } else {
    res.status(404).json({ message: "failed" })
  }
})
export const deleteClient = asyncHandler(async (req, res, next) => {
  let { id } = req.params
  let client = await findByIdAndDelete({ model: clientsModel, condition: id })
  if (client) {
    return res.status(201).json({ message: "deleted" })
  }
})
