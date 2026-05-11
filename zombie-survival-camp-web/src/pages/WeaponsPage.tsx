import { useEffect, useState } from "react";
import { getWeapons } from "../api/weapons";
import type { Weapon } from "../../../shared/types/api";

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
      <h1>Weapons ({rows.length})</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Damage</th>
            <th>Quantity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((w) => (
            <tr key={w.weapon_id}>
              <td>{w.weapon_id}</td>
              <td>{w.name}</td>
              <td>{w.damage}</td>
              <td>{w.quantity}</td>
              <td>{w.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
