import { useEffect, useState } from "react";
import { getCourses } from "../api/courses";
import type { Course } from "../types/api";

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
      <h1>Courses</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course name</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.course_id}>
              <td>{c.course_id}</td>
              <td>{c.course_name}</td>
              <td>{c.start_date}</td>
              <td>{c.end_date}</td>
              <td>{c.difficulty_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
