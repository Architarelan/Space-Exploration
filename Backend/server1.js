const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Change if you have a different username
    password: '',  // Change if you have a password
    database: 'SHOP'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// API Endpoint to Store User Data
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO USERS (username, email, password) VALUES (?, ?, ?)';
    
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving user');
        } else {
            res.status(200).send('User registered successfully');
        }
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
