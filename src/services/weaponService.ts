import pool from "../config/database";

export const getAllWeapons = async () => {
  const [rows] = await pool.execute("SELECT * FROM weapon");
  return rows;
};

export const getWeaponById = async (id: string) => {
  const [rows] = await pool.execute(
    "SELECT * FROM weapon WHERE weapon_id = ?",
    [id]
  );
  return rows;
};