import { Schema, model, Types } from "mongoose";


const ordersSchema = new Schema({
  clientId: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "User  is required"],
  },
    status:{
        type:String,
default:'In progress',
        enum: ['Done', 'In progress','Canceled']
    },

    service: {
      type: Types.ObjectId,
      ref: "services",
      required: [true, "services  is required"],
    },

}, {
    timestamps: true
})

const ordersModel = model('orders', ordersSchema);
export default ordersModel
