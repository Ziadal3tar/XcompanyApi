
import { asyncHandler } from '../../../services/asyncHandler.js';
import { findById, findByIdAndDelete, findOneAndUpdate, findOne, find, findByIdAndUpdate, create, findOneAndDelete } from '../../../../DB/DBMethods.js';
import cloudinary from '../../../services/cloudinary.js'
import servicesModel from '../../../../DB/model/services.model.js';

const getServicesPop = [


  {
    path: "orders",
},

];

export const addServices = asyncHandler(async (req, res, next) => {
  let arr = []
  if (req.body.pointesNum != 0) {
    for (let i = 1; i <= req.body.pointesNum; i++) {
      let opj = { title: req.body[`title${i}`], description: req.body[`description${i}`] }
      arr.push(opj)
    }
  }
  if (req.files) {
    for (const file of req.files) {
      await cloudinary.uploader.upload(file.path, { folder: "velocityImages/services" }, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          req.body.image = result.secure_url
          req.body.imageId = result.public_id
        }
      });
    }
  }
  const { servicesName, servicesDescription, servicesPrice, imageId, image, servicesBrief } = req.body;
  let newServices = create({ model: servicesModel, data: { servicesName, servicesDescription, servicesPrice, imageId, image, pointes: arr, servicesBrief } })
  if (newServices) {
    res.status(201).json({ message: "added successfully", newServices })
  } else {
    await cloudinary.uploader.destroy(req.body.imageId);
    res.status(401).json({ message: "added failed" })
  }
})
export const getAllServices = asyncHandler(async (req, res, next) => {

  let allServices = await find({ model: servicesModel ,populate:[...getServicesPop]})

  if (allServices) {
    res.status(201).json({ allServices })

  } else {
    res.status(404).json({ message: "failed" })
  }
})
export const editServices = asyncHandler(async (req, res, next) => {
  const { servicesName, servicesDescription, servicesPrice, id } = req.body;

  let service = await findById({ model: servicesModel, condition: id })

  if (!service) {
    res.status(404).json({ message: "service not found"})

  } else {
    if (req.files.length != 0) {

      for (const file of req.files) {
        await cloudinary.uploader.upload(file.path, { folder: "velocityImages/services" }, (error, result) => {

          if (error) {
            console.error(error);
          } else {
            req.body.image = result.secure_url
            req.body.imageId = result.public_id
            if (req.body.image && req.body.imageId) {
              cloudinary.uploader.destroy(service.imageId);
            }


          }
        });
      }

    }

    if (req.files.length == 0) {


      req.body.image = service.image
      req.body.imageId = service.imageId
    }
    let updatedService = await findByIdAndUpdate({ model: servicesModel, condition: id, data: req.body, options: { new: true } })
    if (updatedService) {
      return res.status(201).json({ message: "DONE", updatedService })
    }
  }

})

export const deleteService = asyncHandler(async (req, res, next) => {
  let { id } = req.params
  let service = await findByIdAndDelete({ model: servicesModel, condition: id })
  if (service) {
    return res.status(201).json({ message: "deleted" })
  }
})
