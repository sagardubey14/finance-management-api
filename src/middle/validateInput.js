// Function to validate email format
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Function to validate password strength
  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Function to validate input fields
  const validateInput = (Name, Email, Password) => {
    
    if (!Name || !Email || !Password) {
      return 'Name, Email, and Password are required fields';
    }
    if (!validateEmail(Email)) {
      return 'Invalid email format';
    }
    if (!validatePassword(Password)) {
      return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character';
    }
    return null; // No errors
  };

module.exports = validateInput;