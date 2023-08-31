import { Schema, model, Types } from "mongoose";


const servicesSchema = new Schema({
    servicesName: {
        type: String,
        required: [true, 'Services name is required'],
        min: [2, 'minimum length 2 char'],

    },
    servicesDescription: {
        type: String,
        required: [true, 'Services description is required'],
        min: [2, 'minimum length 2 char'],

    },
    servicesBrief: {
        type: String,
        required: [true, 'Services description is required'],
        min: [2, 'minimum length 2 char'],

    },
    servicesPrice: {
        type: Number,
        required: [true, 'Services price is required'],
        min: [2, 'minimum length 2 char'],

    },

    image:{
        type:String,
        default:'https://res.cloudinary.com/dqaf8jxn5/image/upload/v1671116089/1106076_n5oakd.png'
    },
    imageId: String,

    pointes: {
      type: [
        {
          title: {
            type: String,
          },
          description: {
            type: String,
          }
        },
      ],
    },

    orders: {
      type: [Types.ObjectId],
      ref: "orders",

    },
}, {
    timestamps: true
})

const servicesModel = model('services', servicesSchema);
export default servicesModel
