const express = require('express');
const router = express.Router();
const verifyToken = require('../middle/tokenVerification')
const validateTransaction = require('../middle/validateTransactions')
const transactionController = require('../controllers/transactionController');

// Route to add a new transaction
router.post('/',verifyToken ,validateTransaction.validateAddTransactionInput ,transactionController.addTransaction);

// Route to retrieve a list of transactions
router.get('/',verifyToken ,validateTransaction.validateGetTransactionsInput , transactionController.getTransactions);

// Route to retrieve a summary of transactions for a given period
router.get('/summary',verifyToken ,validateTransaction.validateGetTransactionSummaryInput , transactionController.getTransactionSummary);

// Route to delete a specific transaction
router.delete('/:id',verifyToken ,validateTransaction.validateDeleteTransactionInput , transactionController.deleteTransaction);

module.exports = router;
