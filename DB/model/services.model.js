import { Schema, model, Types } from "mongoose";

const servicesSchema = new Schema({
  servicesName: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    unique: true
  },

  servicesBrief: {
    type: String,
    required: true
  },

  servicesDescription: {
    type: String,
    required: true
  },

  servicesPrice: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: 'USD'
  },

  image: {
    type: String,
    required: true
  },

  gallery: {
    type: [String],
    default: []
  },

  category: {
    type: String,
    required: true
  },

  tags: {
    type: [String],
    default: []
  },

  features: [
    {
      title: String,
      description: String,
      icon: String
    }
  ],

  benefits: {
    type: [String],
    default: []
  },

  duration: String,
  deliveryType: String,

  rating: {
    type: Number,
    default: 4.5
  },

  reviewsCount: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

const servicesModel = model('services', servicesSchema);
export default servicesModel;