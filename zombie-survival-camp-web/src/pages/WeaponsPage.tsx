import { useEffect, useState } from "react";
import { getWeapons } from "../api/weapons";
import type { Weapon } from "../types/api";

export default function WeaponsPage() {
  const [rows, setRows] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getWeapons()
      .then((res) => setRows(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading weapons...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Weapons</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Damage</th>
            <th>In stock</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((w) => (
            <tr key={w.weapon_id}>
              <td>{w.weapon_id}</td>
              <td>{w.name}</td>
              <td>{w.type}</td>
              <td>{w.damage}</td>
              <td>{w.quantity_in_stock}</td>
              <td>{w.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
