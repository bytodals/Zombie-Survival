import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const databaseName = process.env.DB_DATABASE || process.env.DB_NAME;

if (!process.env.DB_HOST || !process.env.DB_USER || !databaseName) {
  throw new Error(
    "Missing required database environment variables: DB_HOST, DB_USER, and DB_DATABASE (or DB_NAME)"
  );
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: databaseName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+00:00"
});

// Export a runtime flag indicating whether DB connection succeeded.
export let dbAvailable = false;

// real connection test
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log(" MySQL connected successfully");
    conn.release();
    dbAvailable = true;
  } catch (err) {
    console.error(" MySQL connection failed:", err);
    dbAvailable = false;
  }
})();

export default pool;