// routes/authRoutes.js
const authController = require('../controllers/authController');
const express = require('express');
const validateInput = require('../middle/validateInput');
const router = express.Router();


// Route to register a new user
router.post('/register' , (req, res, next) => {
    const { Name, Email, Password } = req.body;
    const validationError = validateInput(Name, Email, Password);
    if (validationError) {
      console.log('validationError');
      return res.status(400).json({ error: validationError });
    }
    next(); // Proceed to registerUser controller if validation passes
  }, authController.registerUser);

// Route to log in a user
router.post('/login', (req, res, next) => {
    const { Email, Password } = req.body;
    const validationError = validateInput(true, Email, Password);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    next(); // Proceed to loginUser controller if validation passes
  }, authController.loginUser);

module.exports = router;
