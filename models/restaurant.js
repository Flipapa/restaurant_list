const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  name_en: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  google_map: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)