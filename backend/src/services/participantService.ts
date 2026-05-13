import pool, { dbAvailable } from "../config/database.js";

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

export const getParticipantCourses = async (participantId: string) => {
  if (!dbAvailable) return [];
  const [rows] = await pool.execute(
    `SELECT c.*, pc.participant_id
     FROM course c
     INNER JOIN participant_course pc ON c.course_id = pc.course_id
     WHERE pc.participant_id = ?
     ORDER BY c.course_id`,
    [participantId]
  );
  return rows;
};