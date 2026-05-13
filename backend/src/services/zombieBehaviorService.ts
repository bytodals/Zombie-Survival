import pool, { dbAvailable } from "../config/database.js";

export const getAllZombieBehaviors = async () => {
  if (!dbAvailable) return [];
  const [rows] = await pool.execute("SELECT * FROM zombie_behavior");
  return rows;
};