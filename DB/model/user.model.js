import { Schema, model, Types } from "mongoose";
import bcrypt from 'bcrypt';

let cartSchema = new Schema({
  productId: {
    type: Types.ObjectId,
    ref: "services",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
  },

  phone: String,

  role: {
    type: String,
    default: 'User',
    enum: ['User', 'Admin', 'Super admin']
  },

  confirmEmail: {
    type: Boolean,
    default: false
  },

  cartSchema: [cartSchema],

  orders: [
    {
      type: Types.ObjectId,
      ref: "orders"
    }
  ]

}, {
  timestamps: true
});

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, parseInt(process.env.ROUNDS));
  next();
});

const userModel = model('User', userSchema);
export default userModel;