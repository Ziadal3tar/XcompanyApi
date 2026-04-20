import { Schema, model, Types } from "mongoose";

const ordersSchema = new Schema({
  clientId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },

  service: {
    type: Types.ObjectId,
    ref: "services",
    required: true,
  },

  serviceSnapshot: {
    name: String,
    price: Number
  },

  status: {
    type: String,
    default: 'In progress',
    enum: ['Done', 'In progress', 'Canceled']
  }

}, {
  timestamps: true
});

const ordersModel = model('orders', ordersSchema);
export default ordersModel;