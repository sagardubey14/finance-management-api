const pool = require('../config/config');

// Function to handle adding a new transaction
const addTransaction = async (req, res) => {
  try {
    const UserID = req.userID
    const { Type, Amount, Date, Description } = req.body;
    const query = 'INSERT INTO transaction (UserID, Type, Amount, Date, Description) VALUES (?, ?, ?, ?, ?)';
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
    const UserID  = req.userID; // Assuming the user ID is passed in the request body
    
    const { startDate, endDate } = req.body;

    // Check if startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required.' });
    }

    // Check if userId is provided
    if (!UserID) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // Fetch transactions for the specified user ID
    const query = 'SELECT * FROM transaction WHERE UserID = ? AND Date BETWEEN ? AND ?';
    pool.query(query, [UserID, startDate, endDate], (error, results) => {
      if (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ error: 'Error fetching transactions' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
};




// Function to retrieve a summary of transactions for a given period
const getTransactionSummary = async (req, res) => {
  try {
    const UserID  = req.userID;
    const { startDate, endDate } = req.query;

    // Validate start date and end date
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    // Query to retrieve transaction summary for the given period
    const query = `
      SELECT 
        CASE 
          WHEN Type = 'income' THEN 'TotalIncome'
          WHEN Type = 'expense' THEN 'TotalExpenses'
          ELSE 'Savings' 
        END AS Category,
        SUM(Amount) AS TotalAmount
      FROM transaction WHERE UserID = ? AND Date BETWEEN ? AND ? GROUP BY Category`;

    pool.query({sql:query, nestTables: true}, [UserID ,startDate, endDate], (error, results) => {
      if (error) {
        console.error('Error retrieving transaction summary:', error);
        return res.status(500).json({ error: 'Error retrieving transaction summary' });
      }

      // Initialize summary object
      const summary = {
        totalIncome: 0,
        totalExpenses: 0,
        savings: 0
      };
      results.forEach(result => {
        if (result[''].Category === 'TotalExpenses') {
            summary.totalExpenses = result[''].TotalAmount;
        } else if (result[''].Category === 'TotalIncome') {
            summary.totalIncome = result[''].TotalAmount;
        }
      });
      summary.savings = summary.totalIncome - summary.totalExpenses;
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
    const UserID = req.userID;
    const { id } = req.params;
    console.log(UserID,id);
    pool.query('DELETE FROM transaction WHERE UserID = ? AND TransactionID = ?', [UserID,id], (error, results) => {
      if (error) throw error;
      console.log(results);
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
