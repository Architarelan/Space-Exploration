const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Change if you have a password
    database: 'SHOP'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database');
});

// 🟢 Login Route - Check username & password in USERS table
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("🔐 Login attempt: ", username, password); // log login attempt

    if (!username || !password) {
        return res.status(400).send("Username and password required!");
    }

    const sql = 'SELECT * FROM USERS WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error("❌ Error checking user:", err);
            return res.status(500).send('Database error');
        }

        if (results.length > 0) {
            const dbPassword = results[0].password;
            console.log("👉 Found user, DB password:", dbPassword); // debug info

            // If your passwords are stored in plain text (NOT hashed), replace this:
            // bcrypt.compare(password, dbPassword, (err, match) => {
            //     if (match) { ...

            // 🔧 TEMP: compare plain passwords directly
            if (password === dbPassword) {
                const user = {
                    id: results[0].id,
                    username: results[0].username,
                    email: results[0].email,
                    address: results[0].address,
                    phone: results[0].phone
                };
                return res.status(200).json(user);
            } else {
                return res.status(401).send("Invalid username or password!");
            }

        } else {
            return res.status(401).send("User not found!");
        }
    });
});


// 🟢 Registration Route - Stores hashed password
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("All fields are required!");
    }

    console.log("🔹 Received Data:", req.body);

    // 🛑 Hash the password before storing
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("❌ Error hashing password:", err);
            return res.status(500).send('Error processing request');
        }

        const sql = 'INSERT INTO USERS (username, email, password) VALUES (?, ?, ?)';
        db.query(sql, [username, email, hash], (err, result) => {
            if (err) {
                console.error("❌ Error inserting data:", err);
                return res.status(500).send('Error saving user');
            }
            console.log("✅ User registered successfully:", result);
            res.status(200).send('User registered successfully');
        });
    });
});

app.listen(8083, () => {
    console.log('🚀 Server running on port 8083');
});