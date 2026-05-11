export type ApiListResponse<T> = {
  success: boolean;
  count: number;
  data: T[];
};

export type Participant = {
  participant_id: number;
  first_name: string;
  last_name: string;
  enrollment_date: string;
  survival_skill_level: number;
  status: string;
};

export type Course = {
  course_id: number;
  course_name: string;
  start_date: string;
  end_date: string;
  difficulty_level: string;
};

export type Weapon = {
  weapon_id: number;
  name: string;
  type: string;
  damage: number;
  quantity_in_stock: number;
  value: number;
};

export type ZombieBehavior = {
  behavior_id: number;
  behavior_type: string;
  threat_level: number;
  speed: string;
  description: string;
};