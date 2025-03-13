const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT), // Ensure the port is treated as a number
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000, // Increased timeout
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", JSON.stringify(err, null, 2));
    return;
  }
  console.log("Connected to Railway MySQL!");

  pool.query("SELECT DATABASE();", (error, results) => {
    if (error) {
      console.error("Query error:", JSON.stringify(error, null, 2));
    } else {
      console.log("Current Database:", results[0]);
    }

    connection.release(); // Release the connection
  });
});

module.exports = pool;
