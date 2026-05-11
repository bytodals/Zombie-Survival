import pool from "../config/database.js";

export const getAllParticipants = async () => {
  const [rows] = await pool.execute("SELECT * FROM participant");
  return rows;
};

export const getParticipantById = async (id: string) => {
  const [rows] = await pool.execute(
    "SELECT * FROM participant WHERE participant_id = ?",
    [id]
  );
  return rows;
};