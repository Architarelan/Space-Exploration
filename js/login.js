const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const port = 8081;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 📂 Serve static frontend files
app.use(express.static(path.join(__dirname, "public"))); 

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  
    password: "",  
    database: "shop"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

// ✅ **User Registration API**
app.post("/register", (req, res) => {
    const { name, username, email, phone, password } = req.body;

    if (!name || !username || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }

        const sql = "INSERT INTO users (name, username, email, phone, password) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [name, username, email, phone, hashedPassword], (err, result) => {
            if (err) {
                console.error("❌ Error inserting user:", err);
                return res.status(500).json({ message: "Registration failed" });
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
