// models/userModel.js

// Define the User model schema
const User = {
    UserID: 'INT PRIMARY KEY AUTO_INCREMENT',
    Name: 'VARCHAR(50)',
    Email: 'VARCHAR(100)',
    Password: 'VARCHAR(50)'
  };
  
module.exports = User;
  