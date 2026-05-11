import { useEffect, useState } from "react";
import { getZombieBehaviors } from "../api/zombieBehaviors";
import type { ZombieBehavior } from "../../../shared/types/api";

export default function ZombieBehaviorsPage() {
  const [rows, setRows] = useState<ZombieBehavior[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getZombieBehaviors()
      .then((res) => setRows(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading zombie behaviors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Zombie Behaviors ({rows.length})</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Danger Level</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((z) => (
            <tr key={z.behavior_id}>
              <td>{z.behavior_id}</td>
              <td>{z.name}</td>
              <td>{z.danger_level}/10</td>
              <td>{z.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
