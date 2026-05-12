import pool, { dbAvailable } from "../config/database";

export const getAllCourses = async () => {
  if (!dbAvailable) return [];
  const [rows] = await pool.execute("SELECT * FROM course");
  return rows;
};