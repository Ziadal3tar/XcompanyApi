import { Schema, model, Types } from "mongoose";

const clientsSchema = new Schema({
  clientName: {
    type: String,
    required: true
  },

  slug: String,

  logo: String,
  coverImage: String,

  industry: String,

  description: String,
  website: String,

  stats: {
    projectsDone: { type: Number, default: 0 },
    growth: { type: String, default: "0%" },
    duration: String
  },

  servicesUsed: [
    {
      serviceId: {
        type: Types.ObjectId,
        ref: "services"
      },
      serviceName: String
    }
  ],

  projects: [
    {
      title: String,
      description: String,
      images: {
        type: [String],
        default: []
      },

      results: [
        {
          label: String,
          value: String
        }
      ]
    }
  ],

  testimonial: {
    text: String,
    author: String,
    position: String
  }

}, {
  timestamps: true
});

const clientsModel = model('clients', clientsSchema);
export default clientsModel;