-- Seeds for junction tables created during development
-- Use: mysql -h localhost -u root -p zombie_survival_camp < backend/schema/seeds.sql

INSERT IGNORE INTO course_zombie_behavior (course_id, behavior_id) VALUES
  (1,1),(2,2),(3,3),(4,4);

INSERT IGNORE INTO weapon_zombie_behavior (weapon_id, behavior_id) VALUES
  (1,1),(2,2),(3,3),(4,4),(5,2);

INSERT IGNORE INTO course_behavior (course_id, behavior_id) VALUES
  (1,1),(2,2),(3,3);

-- Note: participant_behavior already contains development rows; add here if you need to seed them