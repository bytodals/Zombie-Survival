import { useEffect, useState } from "react";
import { getZombieBehaviors } from "../api/zombieBehaviors";
import type { ZombieBehavior } from "../types/api";

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
      <h1>Zombie Behaviors</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Behavior type</th>
            <th>Threat level</th>
            <th>Speed</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((z) => (
            <tr key={z.behavior_id}>
              <td>{z.behavior_id}</td>
              <td>{z.behavior_type}</td>
              <td>{z.threat_level}</td>
              <td>{z.speed}</td>
              <td>{z.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
