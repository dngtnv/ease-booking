const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/auth/signup', userController.createUser);

router.post('/auth/login', userController.getAuthUser);

module.exports = router;
