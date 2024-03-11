const express = require('express');
const authRoutes = require('./authRoutes');
const transactionRoutes = require('./transactionRoutes');

const router = express.Router();

// Mounting auth routes
router.use('/auth', authRoutes);

// Mounting transaction routes
router.use('/transactions', transactionRoutes);

module.exports = router;
