export type ApiListResponse<T> = {
  success: boolean;
  count: number;
  data: T[];
};

export type Participant = {
  participant_id: number;
  name: string;
  age: number;
  join_date: string;
  skill_level: number;
};

export type Course = {
  course_id: number;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
};

export type Weapon = {
  weapon_id: number;
  name: string;
  damage: number;
  quantity: number;
  description: string;
};

export type ZombieBehavior = {
  behavior_id: number;
  name: string;
  danger_level: number;
  description: string;
};

export type ParticipantCourseLink = {
  participant_id: number;
  course_id: number;
  participant_name: string;
  course_name: string;
};

export type CourseWeaponLink = {
  course_id: number;
  weapon_id: number;
  course_name: string;
  weapon_name: string;
};

export type CourseZombieBehaviorLink = {
  course_id: number;
  behavior_id: number;
  course_name: string;
  behavior_name: string;
};

export type WeaponZombieBehaviorLink = {
  weapon_id: number;
  behavior_id: number;
  weapon_name: string;
  behavior_name: string;
};

export type ParticipantBehaviorLink = {
  participant_id: number;
  behavior_id: number;
  participant_name: string;
  behavior_name: string;
  training_date: string;
};

export type CourseBehaviorLink = {
  course_id: number;
  behavior_id: number;
  course_name: string;
  behavior_name: string;
};

export type SimulatorOverview = {
  participants: Participant[];
  courses: Course[];
  weapons: Weapon[];
  zombieBehaviors: ZombieBehavior[];
  participantCourses: ParticipantCourseLink[];
  courseWeapons: CourseWeaponLink[];
  courseZombieBehaviors: CourseZombieBehaviorLink[];
  weaponZombieBehaviors: WeaponZombieBehaviorLink[];
  participantBehaviors: ParticipantBehaviorLink[];
  courseBehaviors: CourseBehaviorLink[];
};
