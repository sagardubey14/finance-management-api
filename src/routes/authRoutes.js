// routes/authRoutes.js
const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();

// Route to register a new user
router.post('/register', authController.registerUser);

// Route to log in a user
router.post('/login', authController.loginUser);

module.exports = router;
