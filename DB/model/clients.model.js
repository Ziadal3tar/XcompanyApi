import { Schema, model, Types } from "mongoose";


const clientsSchema = new Schema({
    clientName: {
        type: String,
        required: [true, 'Client name is required'],
        min: [2, 'minimum length 2 char'],

    },
    image:{
        type:String,
    },
    imageId: String,
    clientServices: {
      type: [
        {
          name: {
            type: String,
          },
          imagesUrls:{
            type:[String],
        },
        imageIds: [String],
        },
      ],
    },


}, {
    timestamps: true
})

const clientsModel = model('clients', clientsSchema);
export default clientsModel
