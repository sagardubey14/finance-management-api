const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const headersPart = req.headers['authorization'];
  token = headersPart.split(" ")[1]
  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, 'SAGARDUBEY' , (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    // Extract user ID from the decoded token
    req.userID = decoded.userID;
    next();
  });
};

module.exports = verifyToken;
