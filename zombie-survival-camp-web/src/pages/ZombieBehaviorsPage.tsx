import { useEffect, useState } from "react";
import { Skull, Plus, Search, Filter, AlertTriangle, Activity, Eye } from "lucide-react";
import { getZombieBehaviors } from "../api/zombieBehaviors";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import { ProgressBar } from "../components/ui/ProgressBar";
import type { ZombieBehavior } from "../../../shared/types/api";

export default function ZombieBehaviorsPage() {
  const [rows, setRows] = useState<ZombieBehavior[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getZombieBehaviors()
      .then((res) => setRows(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredRows = rows.filter((z) => z.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const criticalThreats = rows.filter((z) => z.danger_level >= 8).length;
  const highThreats = rows.filter((z) => z.danger_level >= 5 && z.danger_level < 8).length;
  const avgDanger = rows.length ? Math.round((rows.reduce((sum, z) => sum + z.danger_level, 0) / rows.length) * 10) / 10 : 0;

  const getThreatLevel = (level: number) => {
    if (level >= 8) return { label: "Critical", variant: "danger" as const, color: "destructive" as const };
    if (level >= 5) return { label: "High", variant: "warning" as const, color: "accent" as const };
    return { label: "Moderate", variant: "success" as const, color: "primary" as const };
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-destructive border-t-transparent" />
          <p className="text-muted-foreground">Analyzing threat intelligence...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error loading threat data</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Threat Intelligence</h1>
          <p className="text-muted-foreground">Monitor and analyze zombie behavior patterns</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90">
          <Plus className="h-4 w-4" />
          Report Threat
        </button>
      </div>

      {criticalThreats > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <span className="text-sm font-medium text-destructive">
            {criticalThreats} critical threat{criticalThreats > 1 ? "s" : ""} detected - Exercise extreme caution
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Known Behaviors" value={rows.length} icon={Skull} color="destructive" />
        <StatCard title="Critical Threats" value={criticalThreats} subtitle="Danger 8+" icon={AlertTriangle} color="destructive" />
        <StatCard title="High Threats" value={highThreats} subtitle="Danger 5-7" icon={Activity} color="accent" />
        <StatCard title="Avg Danger Level" value={avgDanger} subtitle="Out of 10" icon={Eye} color="teal" />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search zombie behaviors..."
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
        {filteredRows.map((behavior) => {
          const threat = getThreatLevel(behavior.danger_level);
          return (
            <Card key={behavior.behavior_id} hover>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                  behavior.danger_level >= 8 ? "bg-destructive/15" : behavior.danger_level >= 5 ? "bg-warning-amber/15" : "bg-primary/15"
                }`}>
                  <Skull className={`h-6 w-6 ${
                    behavior.danger_level >= 8 ? "text-destructive" : behavior.danger_level >= 5 ? "text-warning-amber" : "text-primary"
                  }`} />
                </div>
                <Badge variant={threat.variant}>{threat.label}</Badge>
              </CardHeader>
              <CardContent>
                <h3 className="mb-1 text-lg font-semibold text-foreground">{behavior.name}</h3>
                <p className="mb-4 text-xs text-muted-foreground">Behavior ID: {behavior.behavior_id}</p>

                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Danger Level</span>
                      <span className="text-sm font-bold text-foreground">{behavior.danger_level}/10</span>
                    </div>
                    <ProgressBar value={behavior.danger_level} max={10} size="md" color={threat.color} />
                  </div>

                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {behavior.description || "Documented zombie behavior pattern requiring tactical awareness during encounters."}
                  </p>

                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className={`h-4 w-4 ${
                        behavior.danger_level >= 8 ? "text-destructive" : behavior.danger_level >= 5 ? "text-warning-amber" : "text-primary"
                      }`} />
                      <span className="text-xs text-muted-foreground">
                        {behavior.danger_level >= 8 ? "Extreme Caution" : behavior.danger_level >= 5 ? "Stay Alert" : "Standard Protocol"}
                      </span>
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline">View Details</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRows.length === 0 && (
        <div className="flex h-48 items-center justify-center rounded-xl border border-border bg-card">
          <p className="text-muted-foreground">No threats found matching your search</p>
        </div>
      )}
    </div>
  );
}
