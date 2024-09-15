const express = require('express');
const hotelController = require('../controllers/hotel');

const router = express.Router();

// get hotels depend on city
router.get('/hotels/city', hotelController.getHotelsByCity);

// get number of hotels depend on type
router.get('/hotels/type', hotelController.getHotelsByType);

// get top 3 hotels with the highest rating
router.get('/hotels/top', hotelController.getTopHotels);

// search hotels for 3 conditions: city, how long, number of guests & number of rooms
router.get('/hotels/search', hotelController.searchHotels);

// get hotel details by id
router.get('/hotel/:id', hotelController.getHotelById);

// get available rooms in a hotel
router.get('/hotel/:hotelId/rooms', hotelController.getAvailableRooms);

module.exports = router;
