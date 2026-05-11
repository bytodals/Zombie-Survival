import { useEffect, useState } from "react";
import { getParticipants } from "../api/participants";
import type { Participant } from "../../../shared/types/api";

export default function ParticipantsPage() {
  const [rows, setRows] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getParticipants()
      .then((res) => setRows(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading participants...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Participants ({rows.length})</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Join Date</th>
            <th>Skill Level</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.participant_id}>
              <td>{p.participant_id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{new Date(p.join_date).toLocaleDateString()}</td>
              <td>{p.skill_level}/10</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
