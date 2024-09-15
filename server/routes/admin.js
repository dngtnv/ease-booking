const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/login', adminController.authUser);

// get all users, orders, earnings and balance
router.get('/dashboard', adminController.dashboard);

// get 8 latest transactions
router.get('/latest-transactions', adminController.latestTransactions);

// get all transactions
router.get('/transactions', adminController.getTransactions);

// get all hotels
router.get('/hotels', adminController.getHotels);

// Delete a hotel by id
router.delete('/hotels/:hotelId', adminController.deleteHotelById);

// Add a new hotel
router.post('/hotels', adminController.addHotel);

// Edit a hotel by id
router.put('/hotels/:hotelId', adminController.editHotelById);

// Get all rooms
router.get('/rooms', adminController.getRooms);

// Delete a room by id
router.delete('/rooms/:roomId', adminController.deleteRoomById);

// Get a room by id
router.get('/rooms/:roomId', adminController.getRoomById);

// Add a new room
router.post('/rooms', adminController.addRoom);

// Edit a room by id
router.put('/rooms/:roomId', adminController.editRoomById);

module.exports = router;
