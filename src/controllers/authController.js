// controllers/authController.js

const pool = require('../config/config');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



// Function to register a new user
const registerUser = async (req, res) => {
  try {
    // Destructure request body
    const { Name, Email, Password } = req.body;

    // Check if required fields are present
    if (!Name || !Email || !Password) {
      return res.status(400).json({ error: 'Name, Email, and Password are required fields' });
    }
    const hashedPass = await bcrypt.hash(Password, 10);

    // Insert user into database
    const query = 'INSERT INTO user (Name, Email, Password) VALUES (?, ?, ?)';
    pool.query(query, [Name, Email, hashedPass], (error, results) => {
      if (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully', userID: results.insertId });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
    try {
        // Destructure request body
        const {Email, Password } = req.body;
        
        // Check if required fields are present
        if (!Email || !Password) {
          return res.status(400).json({ error: 'Email and Password are required fields' });
        }
        const query = 'SELECT * FROM user WHERE Email = ?';
        pool.query(query, [Email], async (error, results) => {
          if (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ error: 'Error logging in user' });
          }

          if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          // Compare provided password with hashed password from database
          const user = results[0];
          const passwordMatch = await bcrypt.compare(Password, user.Password);
    
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
          const token = jwt.sign({ userID: user.UserID }, 'your_secret_key', { expiresIn: '1h' });
          
          res.status(200).json({ message: 'Login successful', token });

        })
      } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Error logging in user' });
      }
  
};

module.exports = {
  registerUser,
  loginUser
};
