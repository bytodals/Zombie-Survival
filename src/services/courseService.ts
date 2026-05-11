import pool from "../config/database.js";

export const getAllCourses = async () => {
  const [rows] = await pool.execute("SELECT * FROM course");
  return rows;
};