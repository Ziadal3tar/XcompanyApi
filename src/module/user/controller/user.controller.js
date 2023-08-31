
import { asyncHandler } from '../../../services/asyncHandler.js';
import { findById, findByIdAndDelete, findOneAndUpdate, findOne, find, findByIdAndUpdate, create, findOneAndDelete } from '../../../../DB/DBMethods.js';
import userModel from '../../../../DB/model/user.model.js';

export const addToCart = asyncHandler(async (req, res, next) => {
  let { id } = req.body
  let ifIn = req.user.cartSchema.filter(item => item.productId == id)
  if (ifIn.length == 0) {
    req.user.cartSchema.push({ productId: id })
    let addToCart = await findByIdAndUpdate({ model: userModel, condition: req.user._id, data: { cartSchema: req.user.cartSchema }, options: { new: true } })
    if (addToCart) {
      return res.status(201).json({ message: "added" })
    }
    res.status(401).json({ message: "added failed" })
  }

})

export const removeFromCart = asyncHandler(async (req, res, next) => {
  let { id } = req.body

  let arr = req.user.cartSchema.filter(item => item._id != id)

  let removeFromCart = await findByIdAndUpdate({ model: userModel, condition: req.user._id, data: { cartSchema: arr }, options: { new: true } })
  if (removeFromCart) {
    return res.status(201).json({ message: "removed" })
  }
  res.status(401).json({ message: "removed failed" })
})
export const clearCart = asyncHandler(async (req, res, next) => {
  let clearCart = await findByIdAndUpdate({ model: userModel, condition: req.user._id, data: { cartSchema: [] }, options: { new: true } })
  if (clearCart) {
    return res.status(201).json({ message: "cleared" })
  }
  res.status(401).json({ message: "removed failed" })

})
export const searchUser = asyncHandler(async (req, res, next) => {

  let allUser = []
  let { name } = req.body

  let _id = req.user._id
  const users = await userModel.find({})
  for (let i = 0; i < users.length; i++) {
    const element = users[i];
    if (element.userName.toLowerCase().includes(name.toLowerCase())) {
      if (element._id != _id) {
        allUser.push(element)
      }
    }
  }
  const unique = [
    ...new Map(allUser.map((m) => [m._id, m])).values(),
  ];
  allUser = unique
  if (allUser == 0) {
    res.status(200).json({ message: "not found", allUser })

  } else {
    res.status(200).json({ message: "users", allUser })
  }
})

export const addAdmin = asyncHandler(async (req, res, next) => {
  let { id } = req.body
  let updateRole = await findByIdAndUpdate({model:userModel,condition:id,data:{role:'Admin'}})
if (updateRole) {
  return res.status(201).json({ message: "Done" })

}
})
export const addSuperAdmin = asyncHandler(async (req, res, next) => {
  let { id } = req.body
  let updateRole = await findByIdAndUpdate({model:userModel,condition:id,data:{role:'Super admin'}})
if (updateRole) {
  return res.status(201).json({ message: "Done" })
}
})
export const removeAdmin = asyncHandler(async (req, res, next) => {
  let { id } = req.body
  let updateRole = await findByIdAndUpdate({model:userModel,condition:id,data:{role:'User'}})
if (updateRole) {
  return res.status(201).json({ message: "Done" })
}
})
export const getAllUser = asyncHandler(async (req, res, next) => {

  let allUser = await find({ model: userModel})

  if (allUser) {
    res.status(201).json({ allUser })

  } else {
  res.status(404).json({ message: "failed" })
  }
})
