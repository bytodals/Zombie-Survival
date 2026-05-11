import { useEffect, useState } from "react";
import { getParticipants } from "../api/participants";
import type { Participant } from "../types/api";

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
      <h1>Participants</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Enrollment date</th>
            <th>Skill level</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.participant_id}>
              <td>{p.participant_id}</td>
              <td>{p.first_name}</td>
              <td>{p.last_name}</td>
              <td>{p.enrollment_date}</td>
              <td>{p.survival_skill_level}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
