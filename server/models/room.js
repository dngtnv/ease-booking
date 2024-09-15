const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: false,
  },
  maxPeople: {
    type: Number,
    required: false,
  },
  desc: {
    type: String,
    required: false,
    trim: true,
  },
  roomNumbers: {
    type: [Number],
    required: false,
  },
});

module.exports = mongoose.model('Room', roomSchema);
