const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/addSchool", async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    const values = [name, address, parseFloat(latitude), parseFloat(longitude)];

    // Use db.promise() for async/await support
    const [result] = await db.promise().execute(sql, values);

    res.status(201).json({ message: "School added successfully", schoolId: result.insertId });
  } catch (err) {
    console.error("Error adding school:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
