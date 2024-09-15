const Transaction = require('../models/transaction.js');

exports.createTransaction = (req, res) => {
  const user = req.body.user;
  const hotel = req.body.hotel;
  const room = req.body.room;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const price = req.body.price;
  const payment = req.body.payment;

  const transaction = new Transaction({
    user,
    hotel,
    room,
    dateStart,
    dateEnd,
    price,
    payment,
    status: 'Booked',
  });

  transaction
    .save()
    .then(() => {
      return res.status(201).json({ message: 'Transaction created!' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    });
};

exports.getAllTransactions = (req, res) => {
  const user = req.query.user;
  // find all transactions of the user
  Transaction.find({ user: user })
    .populate('hotel', 'name')
    .populate('room', 'roomNumbers')
    .then((transactions) => {
      if (transactions.length === 0) {
        return res.status(404).json([]);
      }
      return res.status(200).json(transactions);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    });
};
