const mysql = require('mysql');


// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: "",
  database: 'finance_api'
});

// Listen for errors on the pool
pool.on('error', (err) => {
  console.error('Error in MySQL connection pool:', err.message);
});

// Export the pool object
module.exports = pool;