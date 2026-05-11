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
