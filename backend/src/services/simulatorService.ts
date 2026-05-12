import pool, { dbAvailable } from "../config/database";
import type {
  Course,
  CourseWeaponLink,
  CourseZombieBehaviorLink,
  Participant,
  ParticipantCourseLink,
  SimulatorOverview,
  Weapon,
  WeaponZombieBehaviorLink,
  ZombieBehavior
} from "../../shared/types/api";

const emptyOverview = (): SimulatorOverview => ({
  participants: [],
  courses: [],
  weapons: [],
  zombieBehaviors: [],
  participantCourses: [],
  courseWeapons: [],
  courseZombieBehaviors: [],
  weaponZombieBehaviors: []
});

const fetchRows = async <T>(query: string, params: any[] = []) => {
  const [rows] = await pool.execute(query, params as any);
  return rows as T[];
};

const safeFetchRows = async <T>(query: string, label: string, params: unknown[] = []) => {
  try {
    return await fetchRows<T>(query, params);
  } catch (error) {
    console.warn(`Simulator query failed for ${label}; returning empty results.`, error);
    return [] as T[];
  }
};

export const getSimulatorOverview = async (): Promise<SimulatorOverview> => {
  if (!dbAvailable) {
    return emptyOverview();
  }

  const [participants, courses, weapons, zombieBehaviors] = await Promise.all([
    safeFetchRows<Participant>("SELECT * FROM participant ORDER BY participant_id", "participant"),
    safeFetchRows<Course>("SELECT * FROM course ORDER BY course_id", "course"),
    safeFetchRows<Weapon>("SELECT * FROM weapon ORDER BY weapon_id", "weapon"),
    safeFetchRows<ZombieBehavior>("SELECT * FROM zombie_behavior ORDER BY behavior_id", "zombie_behavior")
  ]);

  const [participantCourses, courseWeapons, courseZombieBehaviors, weaponZombieBehaviors] = await Promise.all([
    safeFetchRows<ParticipantCourseLink>(`
      SELECT
        pc.participant_id,
        pc.course_id,
        p.name AS participant_name,
        c.name AS course_name
      FROM participant_course pc
      INNER JOIN participant p ON p.participant_id = pc.participant_id
      INNER JOIN course c ON c.course_id = pc.course_id
      ORDER BY pc.participant_id, pc.course_id
    `, "participant_course"),
    safeFetchRows<CourseWeaponLink>(`
      SELECT
        cw.course_id,
        cw.weapon_id,
        c.name AS course_name,
        w.name AS weapon_name
      FROM course_weapon cw
      INNER JOIN course c ON c.course_id = cw.course_id
      INNER JOIN weapon w ON w.weapon_id = cw.weapon_id
      ORDER BY cw.course_id, cw.weapon_id
    `, "course_weapon"),
    safeFetchRows<CourseZombieBehaviorLink>(`
      SELECT
        cz.course_id,
        cz.behavior_id,
        c.name AS course_name,
        z.name AS behavior_name
      FROM course_zombie_behavior cz
      INNER JOIN course c ON c.course_id = cz.course_id
      INNER JOIN zombie_behavior z ON z.behavior_id = cz.behavior_id
      ORDER BY cz.course_id, cz.behavior_id
    `, "course_zombie_behavior"),
    safeFetchRows<WeaponZombieBehaviorLink>(`
      SELECT
        wz.weapon_id,
        wz.behavior_id,
        w.name AS weapon_name,
        z.name AS behavior_name
      FROM weapon_zombie_behavior wz
      INNER JOIN weapon w ON w.weapon_id = wz.weapon_id
      INNER JOIN zombie_behavior z ON z.behavior_id = wz.behavior_id
      ORDER BY wz.weapon_id, wz.behavior_id
    `, "weapon_zombie_behavior")
  ]);

  return {
    participants,
    courses,
    weapons,
    zombieBehaviors,
    participantCourses,
    courseWeapons,
    courseZombieBehaviors,
    weaponZombieBehaviors
  };
};
