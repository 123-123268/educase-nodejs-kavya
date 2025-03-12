const express = require("express");
const router = express.Router();
const db = require("../db.js"); 


router.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  const values = [name, address, latitude, longitude];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({ message: "✅ School added successfully", schoolId: result.insertId });
  });
});

module.exports = router; // Export the router
