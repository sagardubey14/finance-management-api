// models/transactionModel.js

// Define the Transaction model schema
const Transaction = {
    TransactionID: 'INT PRIMARY KEY AUTO_INCREMENT',
    UserID: 'INT',
    Type: 'VARCHAR(20)',
    Amount: 'DECIMAL(10, 2)',
    Date: 'DATE',
    Description: 'TEXT',
    ForeignKeys: ['FOREIGN KEY (UserID) REFERENCES User(UserID)']
  };
  
  module.exports = Transaction;
  