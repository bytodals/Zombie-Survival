-- Seeds for junction tables
-- Use: mysql -h localhost -u root -p zombie_survival_camp < backend/schema/seeds.sql
INSERT IGNORE INTO participant_course (participant_id, course_id) VALUES
  (1,1),(2,1),(3,2),(4,2),(5,3),(6,3),(7,4),(8,1),(9,2),(10,4);


INSERT IGNORE INTO course_zombie_behavior (course_id, behavior_id) VALUES
  (1,1),(2,2),(3,3),(4,4);

INSERT IGNORE INTO weapon_zombie_behavior (weapon_id, behavior_id) VALUES
  (1,1),(2,2),(3,3),(4,4),(5,2);

INSERT IGNORE INTO course_behavior (course_id, behavior_id) VALUES
  (1,1),(2,2),(3,3);

