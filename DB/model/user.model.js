import { Schema, model, Types } from "mongoose";
import bcrypt from 'bcrypt'

let cartSchema = new Schema({



        productId: {
          type: Types.ObjectId,
          ref: "services",
          required: [true, "services  is required"],
        },



})



const userSchema = new Schema({
    userName: {
        type: String,
        unique: [true, 'must be unique value'],
        required: [true, 'userName is required'],
        min: [3, 'minimum length 2 char'],
        max: [20, 'max length 20 char']
    },
    email: {
        type: String,
        required: [true, 'userName is required'],
        unique: [true, 'must be unique value']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin'],
    },

    confirmEmail: {
        type: Boolean,
        default: 'true',
    },

    cartSchema: [cartSchema],
    orders: {
      type: [Types.ObjectId],
      ref: "orders",
      
    },
}, {
    timestamps: true
})
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.ROUNDS))
    next()
})

const userModel = model('User', userSchema);
export default userModel
