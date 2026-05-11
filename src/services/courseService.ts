import pool from "../config/database";

export const getAllCourses = async () => {
  const [rows] = await pool.execute("SELECT * FROM course");
  return rows;
};