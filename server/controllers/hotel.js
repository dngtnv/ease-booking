const Hotel = require('../models/hotel');
const Transaction = require('../models/transaction.js');

exports.getHotelsByCity = (req, res) => {
  const cities = ['Ha Noi', 'Ho Chi Minh', 'Da Nang'];

  Hotel.aggregate([
    {
      $group: {
        _id: '$city',
        count: { $sum: 1 },
      },
    },
  ])
    .then((hotels) => {
      const result = hotels.map((hotel) => {
        return {
          name: hotel._id,
          numberOfHotels: hotel.count,
          image: `./images/${hotel._id}.jpg`,
        };
      });

      // Add cities that are not in the result
      cities.forEach((city) => {
        if (!result.some((hotel) => hotel.name === city)) {
          result.push({
            name: city,
            numberOfHotels: 0,
            image: `./images/${city}.jpg`,
          });
        }
      });

      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    });
};

exports.getHotelsByType = (req, res) => {
  const types = ['hotel', 'apartment', 'resort', 'villa', 'cabin'];

  Hotel.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
      },
    },
  ])
    .then((hotels) => {
      const result = hotels.map((hotel) => {
        return {
          name: hotel._id,
          count: hotel.count,
          image: `./images/type_${types.indexOf(hotel._id) + 1}.jpg`,
        };
      });

      // Add types that are not in the result
      types.forEach((type) => {
        if (!result.some((hotel) => hotel.name === type)) {
          result.push({
            name: type,
            count: 0,
            image: `./images/type_${types.indexOf(type) + 1}.jpg`,
          });
        }
      });

      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    });
};

exports.getTopHotels = (req, res) => {
  Hotel.find()
    // sort hotels by rating in descending order
    .sort({ rating: -1 })
    .limit(3)
    .then((hotels) => {
      if (hotels.length === 0) {
        return res.status(200).json({ hotels: [] });
      }
      return res.status(200).json({ hotels });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    });
};

exports.searchHotels = async (req, res) => {
  const { city, duration, adult, children, room } = req.query;
  const totalPeople = Number(adult) + Number(children);

  // Split the duration string into start and end dates
  const [startDate, endDate] = duration.split(' to ').map((dateStr) => new Date(dateStr));

  try {
    // Get all transactions that overlap with the requested date range
    const overlappingTransactions = await Transaction.find({
      dateStart: { $lt: endDate },
      dateEnd: { $gt: startDate },
    });

    // Get the hotel IDs and room numbers of the overlapping transactions
    const overlappingHotelIds = overlappingTransactions.map((transaction) => transaction.hotel);
    const overlappingRoomNumbers = overlappingTransactions.flatMap((transaction) =>
      transaction.room.map((room) => room.roomNumbers)
    );

    // Get all hotels in the city that are not in the list of overlapping hotel IDs
    const hotels = await Hotel.find({
      city: city,
      _id: { $nin: overlappingHotelIds },
    }).populate('rooms');

    if (hotels.length === 0) {
      console.log('No hotels found');
      return res.status(404).json([]);
    }

    // Filter out hotels that don't have enough available rooms
    const availableHotels = hotels.filter((hotel) => {
      const availableRooms = hotel.rooms.filter((room) => !overlappingRoomNumbers.includes(room.roomNumber));
      return availableRooms.length >= room && availableRooms.some((room) => room.maxPeople >= totalPeople);
    });

    res.status(200).json(availableHotels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getHotelById = (req, res) => {
  const { id } = req.params;

  Hotel.findById(id)
    .populate('rooms')
    .then((hotel) => {
      if (!hotel) {
        console.log('Hotel not found');
        return res.status(404).json([]);
      }

      res.status(200).json(hotel);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    });
};

exports.getAvailableRooms = async (req, res) => {
  const { hotelId } = req.params;
  // get startDate and endDate from query
  const { duration } = req.query;

  const [startDate, endDate] = duration.split(' to ').map((dateStr) => new Date(dateStr));

  try {
    // Get all transactions that overlap with the requested date range
    const overlappingTransactions = await Transaction.find({
      hotel: hotelId,
      dateStart: { $lt: endDate },
      dateEnd: { $gt: startDate },
    });

    // Get the room numbers of the overlapping transactions
    let overlappingRoomNumbers = overlappingTransactions.flatMap((transaction) =>
      transaction.room.map((room) => room.roomNumbers)
    );

    // Flatten the array
    overlappingRoomNumbers = overlappingRoomNumbers.flat();

    // Populate the rooms field of the hotel
    const hotel = await Hotel.findById(hotelId).populate('rooms');
    if (!hotel) {
      console.log('Hotel not found');
      return res.status(404).json([]);
    }

    // Filter out room numbers that are not available
    const availableRooms = hotel.rooms.map((room) => ({
      ...room._doc,
      roomNumbers: room.roomNumbers.filter((roomNumber) => {
        return !overlappingRoomNumbers.includes(roomNumber);
      }),
    }));

    res.status(200).json(availableRooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
