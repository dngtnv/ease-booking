const mongoose = require('mongoose');
const { Schema } = mongoose;

const type = ['hotel', 'apartment', 'resort', 'villa', 'cabin'];

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
    enum: type,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: false,
    min: 0,
    max: 5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rooms: {
    type: [Schema.Types.ObjectId],
    ref: 'Room',
    required: true,
  },
});

module.exports = mongoose.model('Hotel', hotelSchema);
