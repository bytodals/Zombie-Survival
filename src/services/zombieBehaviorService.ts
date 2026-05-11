import pool from "../config/database";

export const getAllZombieBehaviors = async () => {
  const [rows] = await pool.execute("SELECT * FROM zombie_behavior");
  return rows;
};