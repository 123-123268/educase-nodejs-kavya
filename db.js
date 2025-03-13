const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:",  JSON.stringify(err, null, 2));
    return;
  }
  console.log("✅ Connected to Railway MySQL!");
  connection.release(); // release the initial test connection
});

module.exports = pool;
