const express = require('express');
const transactionController = require('../controllers/transaction');

const router = express.Router();

// create a new transaction
router.post('/transaction', transactionController.createTransaction);

// get all transactions
router.get('/transactions', transactionController.getAllTransactions);

module.exports = router;
