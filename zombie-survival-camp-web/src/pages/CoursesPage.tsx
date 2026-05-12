import { useEffect, useState } from "react";
import { BookOpen, Plus, Calendar, Clock, Search, Filter } from "lucide-react";
import { getCourses } from "../api/courses";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import type { Course } from "../../../shared/types/api";

export default function CoursesPage() {
  const [rows, setRows] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCourses()
      .then((res) => setRows(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredRows = rows.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const now = new Date();
  const activeCourses = rows.filter((c) => new Date(c.start_date) <= now && new Date(c.end_date) >= now).length;
  const upcomingCourses = rows.filter((c) => new Date(c.start_date) > now).length;

  const getCourseStatus = (course: Course) => {
    const start = new Date(course.start_date);
    const end = new Date(course.end_date);
    if (start > now) return { label: "Upcoming", variant: "info" as const };
    if (end < now) return { label: "Completed", variant: "default" as const };
    return { label: "Active", variant: "success" as const };
  };

  const getDuration = (course: Course) => {
    const start = new Date(course.start_date);
    const end = new Date(course.end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading training programs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error loading courses</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Training Programs</h1>
          <p className="text-muted-foreground">Manage survival courses and training schedules</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Course
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Courses" value={rows.length} icon={BookOpen} color="primary" />
        <StatCard title="Active Now" value={activeCourses} subtitle="In progress" icon={BookOpen} color="teal" />
        <StatCard title="Upcoming" value={upcomingCourses} subtitle="Scheduled" icon={Calendar} color="accent" />
        <StatCard title="Completed" value={rows.length - activeCourses - upcomingCourses} subtitle="Finished" icon={Clock} color="destructive" />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRows.map((course) => {
          const status = getCourseStatus(course);
          return (
            <Card key={course.course_id} hover>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-safe-teal/15">
                  <BookOpen className="h-5 w-5 text-safe-teal" />
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </CardHeader>
              <CardContent>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{course.name}</h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                  {course.description || "Essential survival training program for camp participants."}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {new Date(course.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {new Date(course.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Duration: {getDuration(course)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRows.length === 0 && (
        <div className="flex h-48 items-center justify-center rounded-xl border border-border bg-card">
          <p className="text-muted-foreground">No courses found matching your search</p>
        </div>
      )}
    </div>
  );
}
