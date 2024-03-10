const pool = require('../config/config');

// Function to handle adding a new transaction
const addTransaction = async (req, res) => {
  try {
    const { UserID, Type, Amount, Date, Description } = req.body;
    const query = 'INSERT INTO transactions (UserID, Type, Amount, Date, Description) VALUES (?, ?, ?, ?, ?)';
    pool.query(query, [UserID, Type, Amount, Date, Description], (error, results) => {
      if (error) {
        console.error('Error creating transaction:', error);
        return res.status(500).json({ error: 'Error creating transaction' });
      }
      res.status(201).json({ message: 'Transaction created successfully', transactionID: results.insertId });
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Error creating transaction' });
  }
};

// Function to retrieve a list of transactions
const getTransactions = async (req, res) => {
  try {
    pool.query('SELECT * FROM transactions', (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to retrieve a summary of transactions for a given period
const getTransactionSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Validate start date and end date
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    // Convert start date and end date to JavaScript Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Query to retrieve transaction summary for the given period
    const query = 'SELECT Type, SUM(Amount) AS TotalAmount FROM transactions WHERE Date BETWEEN ? AND ? GROUP BY Type';
    pool.query(query, [startDateObj, endDateObj], (error, results) => {
      if (error) {
        console.error('Error retrieving transaction summary:', error);
        return res.status(500).json({ error: 'Error retrieving transaction summary' });
      }
      
      // Format summary data
      const summary = results.map(result => ({
        type: result.Type,
        totalAmount: result.TotalAmount
      }));

      res.status(200).json({ summary });
    });
  } catch (error) {
    console.error('Error retrieving transaction summary:', error);
    res.status(500).json({ error: 'Error retrieving transaction summary' });
  }
};

// Function to delete a specific transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    pool.query('DELETE FROM transactions WHERE TransactionID = ?', [id], (error, results) => {
      if (error) throw error;
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(204).end();
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionSummary,
  deleteTransaction
};
