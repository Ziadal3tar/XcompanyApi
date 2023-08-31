
import { asyncHandler } from '../../../services/asyncHandler.js';
import { findById, findByIdAndDelete, findOneAndUpdate, findOne, find, findByIdAndUpdate, create, findOneAndDelete } from '../../../../DB/DBMethods.js';
import { paginate } from '../../../services/pagination.js';
import cloudinary from '../../../services/cloudinary.js'
import servicesModel from '../../../../DB/model/services.model.js';
import clientsModel from '../../../../DB/model/clients.model.js';
import ordersModel from '../../../../DB/model/orders.model.js';
import userModel from '../../../../DB/model/user.model.js';
const getOrdersPop = [


  {
    path: "clientId",

  },
  {
    path: "service",

  },
];
export const addOrder = asyncHandler(async (req, res, next) => {
  const { clientId, service } = req.body;
  let newOrder = await create({ model: ordersModel, data: req.body })
  if (newOrder) {
    let orderId = newOrder._id

    let updateUser = await findByIdAndUpdate({
      model: userModel, condition: req.user._id, data: {
        $addToSet: { orders: orderId },
      },
    })
    let updateService = await findByIdAndUpdate({
      model: servicesModel, condition: service, data: {
        $addToSet: { orders: orderId },
      },
    })
  }

})
export const getAllOrders = asyncHandler(async (req, res, next) => {

  let allOrders = await find({ model: ordersModel, populate: [...getOrdersPop] })

  if (allOrders) {
    res.status(201).json({ allOrders })

  } else {
    res.status(404).json({ message: "failed" })
  }
})
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  let { id, status } = req.body
  let order = await findByIdAndUpdate({ model:ordersModel,condition: id, data: { status } })
  if (order) {
    res.status(201).json({ message: 'Done' })

  } else {
    res.status(404).json({ message: "failed" })
  }

})
