const validateAddTransactionInput = (req, res, next) => {
    const { Type, Amount, Date, Description } = req.body;
    if (!Type || !Amount || !Date || !Description) {
        return res.status(400).json({ error: 'Type, Amount, Date, and Description are required fields' });
    }
    next(); // Proceed to addTransaction controller if validation passes
};

// Middleware to validate input for retrieving transactions
const validateGetTransactionsInput = (req, res, next) => {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
    }
    next();// Proceed to getTransactions controller if validation passes
};

// Middleware to validate input for retrieving transaction summary
const validateGetTransactionSummaryInput = (req, res, next) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
    }
    next(); // Proceed to getTransactionSummary controller if validation passes
};

// Middleware to validate input for deleting a transaction
const validateDeleteTransactionInput = (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Transaction ID is required' });
    }
    next(); // Proceed to deleteTransaction controller if validation passes
};

module.exports = {validateAddTransactionInput, validateGetTransactionsInput, validateGetTransactionSummaryInput , validateDeleteTransactionInput}