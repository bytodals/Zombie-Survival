import { useEffect, useState } from "react";
import { getCourses } from "../api/courses";
import type { Course } from "../../../shared/types/api";

export default function CoursesPage() {
  const [rows, setRows] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCourses()
      .then((res) => setRows(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Courses ({rows.length})</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.course_id}>
              <td>{c.course_id}</td>
              <td>{c.name}</td>
              <td>{new Date(c.start_date).toLocaleDateString()}</td>
              <td>{new Date(c.end_date).toLocaleDateString()}</td>
              <td>{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
