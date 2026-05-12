import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Database, Link2, Network, Users, BookOpen, Sword, Skull } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { DataTable } from "../components/ui/DataTable";
import { getSimulatorOverview } from "../api/simulator";
import type {
  SimulatorOverview,
  Participant,
  Course,
  Weapon,
  ZombieBehavior,
  ParticipantCourseLink,
  CourseWeaponLink,
  CourseZombieBehaviorLink,
  WeaponZombieBehaviorLink
} from "../../../backend/shared/types/api";

const emptyOverview: SimulatorOverview = {
  participants: [],
  courses: [],
  weapons: [],
  zombieBehaviors: [],
  participantCourses: [],
  courseWeapons: [],
  courseZombieBehaviors: [],
  weaponZombieBehaviors: [],
  participantBehaviors: [],
  courseBehaviors: []
};

function SectionCard({
  title,
  subtitle,
  icon: Icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: typeof Database;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function SimulatorPage() {
  const [overview, setOverview] = useState<SimulatorOverview>(emptyOverview);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSimulatorOverview()
      .then(setOverview)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalRelations = useMemo(
    () =>
      overview.participantCourses.length +
      overview.courseWeapons.length +
      overview.courseZombieBehaviors.length +
      overview.weaponZombieBehaviors.length +
      overview.participantBehaviors.length +
      overview.courseBehaviors.length,
    [overview]
  );

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading simulator view...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error loading simulator data</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const participantColumns = [
    { key: "participant_id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
    { key: "join_date", header: "Join Date", render: (item: Participant) => new Date(item.join_date).toLocaleDateString() },
    { key: "skill_level", header: "Skill" },
  ];

  const courseColumns = [
    { key: "course_id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "start_date", header: "Start", render: (item: Course) => new Date(item.start_date).toLocaleDateString() },
    { key: "end_date", header: "End", render: (item: Course) => new Date(item.end_date).toLocaleDateString() },
    { key: "description", header: "Description" },
  ];

  const weaponColumns = [
    { key: "weapon_id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "damage", header: "Damage" },
    { key: "quantity", header: "Qty" },
    { key: "description", header: "Description" },
  ];

  const zombieColumns = [
    { key: "behavior_id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "danger_level", header: "Danger" },
    { key: "description", header: "Description" },
  ];

  const participantCourseColumns = [
    { key: "participant_id", header: "Participant ID" },
    { key: "participant_name", header: "Participant" },
    { key: "course_id", header: "Course ID" },
    { key: "course_name", header: "Course" },
  ];

  const courseWeaponColumns = [
    { key: "course_id", header: "Course ID" },
    { key: "course_name", header: "Course" },
    { key: "weapon_id", header: "Weapon ID" },
    { key: "weapon_name", header: "Weapon" },
  ];

  const courseZombieColumns = [
    { key: "course_id", header: "Course ID" },
    { key: "course_name", header: "Course" },
    { key: "behavior_id", header: "Behavior ID" },
    { key: "behavior_name", header: "Behavior" },
  ];

  const weaponZombieColumns = [
    { key: "weapon_id", header: "Weapon ID" },
    { key: "weapon_name", header: "Weapon" },
    { key: "behavior_id", header: "Behavior ID" },
    { key: "behavior_name", header: "Behavior" },
  ];

  const participantBehaviorColumns = [
    { key: "participant_id", header: "Participant ID" },
    { key: "participant_name", header: "Participant" },
    { key: "behavior_id", header: "Behavior ID" },
    { key: "behavior_name", header: "Behavior" },
    { key: "training_date", header: "Training Date" },
  ];

  const courseBehaviorColumns = [
    { key: "course_id", header: "Course ID" },
    { key: "course_name", header: "Course" },
    { key: "behavior_id", header: "Behavior ID" },
    { key: "behavior_name", header: "Behavior" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Data</h1>
          <p className="text-muted-foreground">
            Complete view of all entities and their many-to-many relationships.
          </p>
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          {totalRelations} total links
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Participants" value={overview.participants.length} icon={Users} color="primary" />
        <StatCard title="Courses" value={overview.courses.length} icon={BookOpen} color="teal" />
        <StatCard title="Weapons" value={overview.weapons.length} icon={Sword} color="accent" />
        <StatCard title="Zombie Behaviors" value={overview.zombieBehaviors.length} icon={Skull} color="destructive" />
      </div>

      <SectionCard title="Core Tables" subtitle="All base entities in one view" icon={Database}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={participantColumns} data={overview.participants} keyExtractor={(item) => item.participant_id} emptyMessage="No participants available" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={courseColumns} data={overview.courses} keyExtractor={(item) => item.course_id} emptyMessage="No courses available" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weapons</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={weaponColumns} data={overview.weapons} keyExtractor={(item) => item.weapon_id} emptyMessage="No weapons available" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zombie Behaviors</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={zombieColumns} data={overview.zombieBehaviors} keyExtractor={(item) => item.behavior_id} emptyMessage="No zombie behaviors available" />
            </CardContent>
          </Card>
        </div>
      </SectionCard>

      <SectionCard title="Junction Tables" subtitle="Many-to-many links used by the simulator" icon={Network}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="h-4 w-4 text-primary" />Participants ↔ Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={participantCourseColumns} data={overview.participantCourses} keyExtractor={(item) => `${item.participant_id}-${item.course_id}`} emptyMessage="No participant-course links" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="h-4 w-4 text-primary" />Courses ↔ Weapons</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={courseWeaponColumns} data={overview.courseWeapons} keyExtractor={(item) => `${item.course_id}-${item.weapon_id}`} emptyMessage="No course-weapon links" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="h-4 w-4 text-primary" />Courses ↔ Zombie Behaviors</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={courseZombieColumns} data={overview.courseZombieBehaviors} keyExtractor={(item) => `${item.course_id}-${item.behavior_id}`} emptyMessage="No course-zombie behavior links" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="h-4 w-4 text-primary" />Weapons ↔ Zombie Behaviors</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={weaponZombieColumns} data={overview.weaponZombieBehaviors} keyExtractor={(item) => `${item.weapon_id}-${item.behavior_id}`} emptyMessage="No weapon-zombie behavior links" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="h-4 w-4 text-primary" />Participants ↔ Zombie Behaviors</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={participantBehaviorColumns} data={overview.participantBehaviors} keyExtractor={(item) => `${item.participant_id}-${item.behavior_id}`} emptyMessage="No participant-zombie behavior links" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="h-4 w-4 text-primary" />Courses ↔ Zombie Behaviors (Training)</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={courseBehaviorColumns} data={overview.courseBehaviors} keyExtractor={(item) => `${item.course_id}-${item.behavior_id}`} emptyMessage="No course-zombie behavior training links" />
            </CardContent>
          </Card>
        </div>
      </SectionCard>
    </div>
  );
}
