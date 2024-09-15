const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: false,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    // unique: true,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    // unique: true,
    required: false,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
