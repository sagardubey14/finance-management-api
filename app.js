const express = require('express')
const pool = require('./src/config/config')


const app = express()
// Import routes
const transactionRoutes = require('./src/routes/transactionRoutes');
const authRoutes = require('./src/routes/authRoutes')
// Import other routes as needed

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/transactions', transactionRoutes);
app.use('/auth', authRoutes);

app.listen(3001, () => {
    console.log('Server is listening on http://localhost:3001');
});
// app.get('/', (req, res) => {
//     // Retrieve a connection from the pool
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.error('Error getting MySQL connection:', err.message);
//             res.status(500).send('Internal Server Error');
//         } else {
//             console.log('Got a MySQL connection from the pool.');
//             // Release the connection back to the pool
//             connection.release();
//             res.send('hello');
//         }
//     });
// });