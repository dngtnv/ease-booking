const User = require('../models/user');
const Transaction = require('../models/transaction');
const Hotel = require('../models/hotel');
const Room = require('../models/room');
const mongoose = require('mongoose');

exports.authUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username, password, isAdmin: true })
    .then((user) => {
      if (user) {
        return res.status(200).json({ user, message: 'User authenticated!' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    });
};

exports.dashboard = async (req, res) => {
  try {
    // get numbers of users excluding the admin
    const usersPromise = User.countDocuments({ isAdmin: false });
    // get numbers of transactions
    const transactionsPromise = Transaction.countDocuments();
    // get total earnings from all transactions
    const earningsPromise = Transaction.aggregate([{ $group: { _id: null, total: { $sum: '$price' } } }]);
    // calculate the average balance of all transactions
    const balancePromise = Transaction.aggregate([{ $group: { _id: null, average: { $avg: '$price' } } }]);

    // Wait for all promises to resolve
    const [users, transactions, earnings, balance] = await Promise.all([
      usersPromise,
      transactionsPromise,
      earningsPromise,
      balancePromise,
    ]);

    // Format the earnings and balance values
    const formatter = new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const formattedEarnings = earnings.length > 0 ? formatter.format(earnings[0].total) : '0';
    const formattedBalance = balance.length > 0 ? formatter.format(balance[0].average) : '0';

    res.status(200).json({ users, transactions, earnings: formattedEarnings, balance: formattedBalance });

    // You can send these values as response or do other operations here
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.latestTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      // populate user and hotel fields
      .populate('hotel', 'name')
      // populate room field
      .populate('room', 'roomNumbers')
      .sort({ createdAt: -1 })
      .limit(8);

    // Map over the transactions to format the response
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction._doc,
      hotel: transaction.hotel.name,
      room: transaction.room.flatMap((room) => room.roomNumbers).join(', '),
      date: `${new Date(transaction.dateStart).toLocaleDateString('en-GB')} - ${new Date(
        transaction.dateEnd
      ).toLocaleDateString('en-GB')}`,
      price: `$${transaction.price}`,
    }));

    let latestTransactions = [];
    latestTransactions = formattedTransactions;

    res.status(200).json({ latestTransactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      // populate user and hotel fields
      .populate('hotel', 'name')
      // populate room field
      .populate('room', 'roomNumbers')
      .sort({ createdAt: -1 });

    // Map over the transactions to format the response
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction._doc,
      hotel: transaction.hotel.name,
      room: transaction.room.flatMap((room) => room.roomNumbers).join(', '),
      date: `${new Date(transaction.dateStart).toLocaleDateString('en-GB')} - ${new Date(
        transaction.dateEnd
      ).toLocaleDateString('en-GB')}`,
      price: `$${transaction.price}`,
    }));

    res.status(200).json({ transactions: formattedTransactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    if (!hotels) {
      return res.status(404).json([]);
    }

    res.status(200).json({ hotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteHotelById = (req, res) => {
  const hotelId = req.params.hotelId;

  // check if hotel exists in any transaction, if true, prevent deletion
  Transaction.findOne({ hotel: hotelId })
    .then((transaction) => {
      if (transaction) {
        return res.status(400).json({ message: 'Hotel is in use and cannot be deleted' });
      } else {
        // Delete hotel
        Hotel.findByIdAndDelete(hotelId)
          .then(() => {
            res.status(200).json({ message: 'Hotel deleted successfully' });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    });
};

exports.addHotel = async (req, res) => {
  const { name, type, city, address, price, title, distance, images, description, featured, rooms } = req.body;
  // Split the rooms input value by line breaks to get an array of room titles
  const roomTitles = rooms.split('\n');

  // For each room title, create a new Room document and get its ObjectId
  const roomIds = await Promise.all(
    roomTitles.map(async (title) => {
      const room = new Room({ title });
      try {
        await room.save();
        return room._id.toString();
      } catch (error) {
        if (error.code === 11000) {
          throw new Error(`Room title "${title}" already exists.`);
        } else {
          throw error;
        }
      }
    })
  );

  const hotel = new Hotel({
    name,
    type,
    city,
    address,
    cheapestPrice: price,
    title,
    distance,
    photos: images.split(', '),
    desc: description,
    featured,
    rooms: roomIds,
  });

  hotel
    .save()
    .then((hotel) => {
      res.status(201).json({ hotel, message: 'Hotel added successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
};

exports.editHotelById = async (req, res) => {
  const hotelId = req.params.hotelId;
  const { name, type, city, address, price, title, distance, images, description, featured, rooms } = req.body;

  // Split the rooms input value by line breaks to get an array of room titles
  const roomTitles = rooms.split('\n');

  // For each room title, create a new Room document and get its ObjectId
  const roomIds = await Promise.all(
    roomTitles.map(async (title) => {
      let room = await Room.findOne({ title });
      if (!room) {
        room = new Room({ title });
        try {
          await room.save();
        } catch (error) {
          if (error.code === 11000) {
            throw new Error(`Room title "${title}" already exists.`);
          } else {
            throw error;
          }
        }
      }
      return room._id.toString();
    })
  );

  Hotel.findByIdAndUpdate(hotelId, {
    name,
    type,
    city,
    address,
    cheapestPrice: price,
    title,
    distance,
    photos: images.split(', '),
    desc: description,
    featured,
    rooms: roomIds,
  })
    .then(() => {
      res.status(200).json({ message: 'Hotel updated successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    if (!rooms) {
      return res.status(404).json([]);
    }

    res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteRoomById = (req, res) => {
  const roomId = req.params.roomId;

  // check if room exists in any transaction, if true, prevent deletion
  Transaction.findOne({ 'room._id': roomId })
    .then((transaction) => {
      if (transaction) {
        return res.status(400).json({ message: 'Room is in use and cannot be deleted' });
      } else {
        // Delete room
        Room.findByIdAndDelete(roomId)
          .then(() => {
            // Remove room from rooms array in Hotel document
            Hotel.updateMany({}, { $pull: { rooms: new mongoose.Types.ObjectId(roomId) } })
              .then(() => {
                res.status(200).json({ message: 'Room deleted successfully' });
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json({ message: 'Error updating hotel' });
              });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    });
};

exports.addRoom = async (req, res) => {
  const { title, price, description, maxPeople, rooms, hotel } = req.body;

  const room = new Room({
    title,
    price,
    desc: description,
    maxPeople,
    roomNumbers: rooms.split(',').map((room) => room.trim()),
  });

  room
    .save()
    .then((room) => {
      // Add room to Hotel document
      Hotel.findByIdAndUpdate(hotel, { $push: { rooms: room._id } })
        .then(() => {
          res.status(201).json({ room, message: 'Room added successfully' });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Error updating hotel' });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
};

exports.getRoomById = async (req, res) => {
  const roomId = req.params.roomId;

  Room.findById(roomId)
    .then((room) => {
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.status(200).json({ room });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
};

exports.editRoomById = async (req, res) => {
  const roomId = req.params.roomId;
  const { title, price, description, maxPeople, rooms } = req.body;

  Room.findByIdAndUpdate(roomId, {
    title,
    price,
    desc: description,
    maxPeople,
    roomNumbers: rooms.split(',').map((room) => room.trim()),
  })
    .then(() => {
      res.status(200).json({ message: 'Room updated successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
};
