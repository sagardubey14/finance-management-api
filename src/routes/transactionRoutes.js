const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Route to add a new transaction
router.post('/', transactionController.addTransaction);

// Route to retrieve a list of transactions
router.get('/', transactionController.getTransactions);

// Route to retrieve a summary of transactions for a given period
router.get('/summary', transactionController.getTransactionSummary);

// Route to delete a specific transaction
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
