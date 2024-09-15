const mongoose = require('mongoose');
const { Schema } = mongoose;

const payment = ['Credit Card', 'Cash'];
const status = ['Booked', 'CheckIn', 'CheckOut'];

const RoomSchema = new Schema({
  _id: Schema.Types.ObjectId,
  roomNumbers: [Number],
});

const transactionSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  room: {
    type: [RoomSchema],
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
    enum: payment,
    default: 'Cash',
  },
  status: {
    type: String,
    required: true,
    enum: status,
    default: 'Booked',
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
