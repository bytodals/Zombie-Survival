import pool, { dbAvailable } from "../config/database.js";

export const getAllWeapons = async () => {
  if (!dbAvailable) return [];
  const [rows] = await pool.execute("SELECT * FROM weapon");
  return rows;
};

export const getWeaponById = async (id: string) => {
  if (!dbAvailable) return [];
  const [rows] = await pool.execute(
    "SELECT * FROM weapon WHERE weapon_id = ?",
    [id]
  );
  return rows;
};