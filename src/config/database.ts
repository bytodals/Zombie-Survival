import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  throw new Error("Missing required database environment variables");
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+00:00"
});

// real connection test
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log(" MySQL connected successfully");
    conn.release();
  } catch (err) {
    console.error(" MySQL connection failed:", err);
  }
})();

export default pool;