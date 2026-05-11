import app from "./app";
import pool from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
  console.log("Health check: http://localhost:" + PORT + "/health");
});

const shutdown = async () => {
  console.log("Shutting down gracefully...");
  
  server.close(async () => {
    try {
      await pool.end();
      console.log("MySQL pool closed");
      console.log("Server shut down successfully");
      process.exit(0);
    } catch (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);