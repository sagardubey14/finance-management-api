const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'API'
}, (err, connection) => {
  if (err) {
    console.error('Error establishing MySQL connection:', err.message);
  } else {
    console.log('MySQL connection established successfully.');
    // Here you can send your message
  }
});

module.exports = pool;
