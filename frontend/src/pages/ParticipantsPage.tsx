import { useEffect, useState } from "react";
import { Users, UserPlus, Filter } from "lucide-react";
import { getParticipants } from "../api/participants";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Badge } from "../components/ui/Badge";
import { ProgressBar } from "../components/ui/ProgressBar";
import { StatCard } from "../components/ui/StatCard";
import type { Participant } from "../../../backend/shared/types/api";

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

  const filteredRows = rows;
  const avgSkill = rows.length ? Math.round((rows.reduce((sum, p) => sum + p.skill_level, 0) / rows.length) * 10) / 10 : 0;
  const eliteSurvivors = rows.filter((p) => p.skill_level >= 8).length;
  const newRecruits = rows.filter((p) => p.skill_level <= 3).length;

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading survivor roster...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error loading survivors</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const columns = [
    {
      key: "name",
      header: "Survivor",
      render: (p: Participant) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
            {p.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-foreground">{p.name}</p>
            <p className="text-xs text-muted-foreground">ID: {p.participant_id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "age",
      header: "Age",
      render: (p: Participant) => <span className="text-foreground">{p.age} years</span>,
    },
    {
      key: "join_date",
      header: "Joined",
      render: (p: Participant) => (
        <span className="text-muted-foreground">
          {new Date(p.join_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "skill_level",
      header: "Skill Level",
      render: (p: Participant) => (
        <div className="flex items-center gap-3">
          <div className="w-24">
            <ProgressBar
              value={p.skill_level}
              max={10}
              size="sm"
              color={p.skill_level >= 7 ? "primary" : p.skill_level >= 4 ? "accent" : "destructive"}
            />
          </div>
          <span className="min-w-[3rem] font-mono text-sm font-bold text-foreground">{p.skill_level}/10</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (p: Participant) => (
        <Badge variant={p.skill_level >= 7 ? "success" : p.skill_level >= 4 ? "warning" : "danger"}>
          {p.skill_level >= 7 ? "Elite" : p.skill_level >= 4 ? "Trained" : "Rookie"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Survivors Registry</h1>
          <p className="text-muted-foreground">Manage camp participants and their training progress</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <UserPlus className="h-4 w-4" />
          Add Survivor
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Survivors" value={rows.length} icon={Users} color="primary" />
        <StatCard title="Average Skill" value={avgSkill} subtitle="Out of 10" icon={Users} color="teal" />
        <StatCard title="Elite Survivors" value={eliteSurvivors} subtitle="Skill 8+" icon={Users} color="accent" />
        <StatCard title="New Recruits" value={newRecruits} subtitle="Skill 3 or below" icon={Users} color="destructive" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Survivors</CardTitle>
            <p className="text-sm text-muted-foreground">{filteredRows.length} registered</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredRows} keyExtractor={(p) => p.participant_id} loading={loading} emptyMessage="No survivors found" />
        </CardContent>
      </Card>
    </div>
  );
}
