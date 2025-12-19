const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Change if you have a password
    database: 'SHOP'
});

// Connect to database
db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database');
});

// User Registration Endpoint
app.post('/register', (req, res) => {
    const { username, email, password, address, phone } = req.body;

    // Check for missing fields
    if (!username || !email || !password || !address || !phone) {
        return res.status(400).send("All fields are required!");
    }

    // Debugging: Log received data
    console.log("🔹 Received Data:", req.body);

    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM USERS WHERE email = ?';
    db.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            console.error("❌ Error checking user:", err);
            return res.status(500).send('Server error');
        }
        if (results.length > 0) {
            return res.status(400).send('User already exists!');
        }

        // Insert new user
        const sql = 'INSERT INTO USERS (username, email, password, address, phone) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [username, email, password, address, phone], (err, result) => {
            if (err) {
                console.error("❌ Error inserting data:", err);
                return res.status(500).send('Error saving user');
            }
            console.log("✅ User registered successfully:", result);
            res.status(200).send('User registered successfully');
        });
    });
});

// Start server
app.listen(3000, () => {
    console.log('🚀 Server running on port 3000');
});
