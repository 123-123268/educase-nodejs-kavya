const express = require("express");
const router = express.Router();
const db = require("../db"); 

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const R = 6371; 

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get Schools Route
router.get("/listSchools", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const sql = "SELECT * FROM schools";
    const [results] = await db.promise().query(sql);

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // Calculate distance for each school and sort by proximity
    const sortedSchools = results
      .map((school) => ({
        ...school,
        distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
      }))
      .sort((a, b) => a.distance - b.distance); // Sort nearest to farthest

    res.json(sortedSchools);
  } catch (err) {
    console.error("Error fetching schools:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router; // Export the router
