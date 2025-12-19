const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "shop"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// Fetch all products
app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Search Route
app.get("/api/search", (req, res) => {
    const searchQuery = req.query.q;
    const sql = "SELECT * FROM products WHERE product_name LIKE ?";

    db.query(sql, [`%${searchQuery}%`], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Start Server
app.listen(8081, () => {
    console.log("Server running on http://localhost:8081");
});
