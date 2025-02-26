const express = require('express');
const mysql = require('mysql2');  // Use require instead of import
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test@123',
    database: 'hsbc_bank'
});

// Connect to database before starting the server
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Database connected');

    // Start the server only if the database connection is successful
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
});

// API Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});
