import { useEffect, useState } from "react";
import { Users, Sword, BookOpen, Skull, AlertTriangle, Shield, Activity } from "lucide-react";
import { StatCard } from "../components/ui/StatCard";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ProgressBar } from "../components/ui/ProgressBar";
import { getParticipants } from "../api/participants";
import { getCourses } from "../api/courses";
import { getWeapons } from "../api/weapons";
import { getZombieBehaviors } from "../api/zombieBehaviors";
import type { Participant, Course, Weapon, ZombieBehavior } from "../../../backend/shared/types/api";

export default function DashboardPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [zombies, setZombies] = useState<ZombieBehavior[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getParticipants().then((res) => setParticipants(res.data)).catch(() => {}),
      getCourses().then((res) => setCourses(res.data)).catch(() => {}),
      getWeapons().then((res) => setWeapons(res.data)).catch(() => {}),
      getZombieBehaviors().then((res) => setZombies(res.data)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const totalWeapons = weapons.reduce((sum, w) => sum + w.quantity, 0);
  const avgSkillLevel = participants.length
    ? Math.round((participants.reduce((sum, p) => sum + p.skill_level, 0) / participants.length) * 10) / 10
    : 0;
  const highThreatZombies = zombies.filter((z) => z.danger_level >= 7).length;

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Initializing survival systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
          <p className="text-muted-foreground">Overview of Zombie Survival Camp operations</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-warning-amber/30 bg-warning-amber/10 px-4 py-2">
          <AlertTriangle className="h-5 w-5 text-warning-amber" />
          <span className="text-sm font-medium text-warning-amber">Elevated Threat Level</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Survivors" value={participants.length} subtitle={`Avg skill: ${avgSkillLevel}/10`} icon={Users} color="primary" trend={{ value: 12, positive: true }} />
        <StatCard title="Training Courses" value={courses.length} subtitle="Programs available" icon={BookOpen} color="teal" />
        <StatCard title="Weapons in Arsenal" value={totalWeapons} subtitle={`${weapons.length} weapon types`} icon={Sword} color="accent" />
        <StatCard title="Known Threats" value={zombies.length} subtitle={`${highThreatZombies} high danger`} icon={Skull} color="destructive" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Survivors</CardTitle>
              <p className="text-sm text-muted-foreground">Latest camp registrations</p>
            </div>
            <Badge variant="success">{participants.length} Total</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {participants.slice(0, 5).map((p) => (
                <div key={p.participant_id} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Joined {new Date(p.join_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">Skill Level</p>
                      <div className="w-24">
                        <ProgressBar value={p.skill_level} max={10} size="sm" color={p.skill_level >= 7 ? "primary" : p.skill_level >= 4 ? "accent" : "destructive"} />
                      </div>
                    </div>
                    <span className="min-w-[2.5rem] text-right text-lg font-bold text-primary">{p.skill_level}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Skull className="h-5 w-5 text-destructive" />
              Threat Assessment
            </CardTitle>
            <p className="text-sm text-muted-foreground">Known zombie behaviors</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {zombies.slice(0, 5).map((z) => (
                <div key={z.behavior_id} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        z.danger_level >= 7
                          ? "bg-destructive/15 text-destructive"
                          : z.danger_level >= 4
                            ? "bg-warning-amber/15 text-warning-amber"
                            : "bg-primary/15 text-primary"
                      }`}
                    >
                      <Activity className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground">{z.name}</span>
                  </div>
                  <Badge variant={z.danger_level >= 7 ? "danger" : z.danger_level >= 4 ? "warning" : "success"}>
                    Level {z.danger_level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-safe-teal" />
              Active Training Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courses.slice(0, 4).map((c) => (
                <div key={c.course_id} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3">
                  <div>
                    <p className="font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(c.start_date).toLocaleDateString()} - {new Date(c.end_date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="info">Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sword className="h-5 w-5 text-warning-amber" />
              Arsenal Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weapons.slice(0, 4).map((w) => (
                <div key={w.weapon_id} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning-amber/15">
                      <Shield className="h-4 w-4 text-warning-amber" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{w.name}</p>
                      <p className="text-xs text-muted-foreground">DMG: {w.damage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{w.quantity}</p>
                    <p className="text-xs text-muted-foreground">in stock</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
