import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  imgSrc: [{
    type: String,
    required: true,
  }],
  pricePerNight: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  agent: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  amenities: [{
    type: String,
    required: true,
  }],
  guests: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: String,
    required: true,
  },
  bathrooms: {
    type: String,
    required: true,
  },
});

// Create a model for the schema
const Property = mongoose.model('Property', propertySchema);

export default Property;
