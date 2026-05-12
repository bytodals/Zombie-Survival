import pool, { dbAvailable } from "../config/database";

export const getAllParticipants = async () => {
  if (!dbAvailable) return [];
  const [rows] = await pool.execute("SELECT * FROM participant");
  return rows;
};

export const getParticipantById = async (id: string) => {
  if (!dbAvailable) return [];
  const [rows] = await pool.execute(
    "SELECT * FROM participant WHERE participant_id = ?",
    [id]
  );
  return rows;
};