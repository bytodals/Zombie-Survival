CREATE TABLE IF NOT EXISTS participant_course (
  participant_id INT NOT NULL,
  course_id INT NOT NULL,
  PRIMARY KEY (participant_id, course_id),
  CONSTRAINT fk_participant_course_participant
    FOREIGN KEY (participant_id) REFERENCES participant(participant_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_participant_course_course
    FOREIGN KEY (course_id) REFERENCES course(course_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS course_weapon (
  course_id INT NOT NULL,
  weapon_id INT NOT NULL,
  PRIMARY KEY (course_id, weapon_id),
  CONSTRAINT fk_course_weapon_course
    FOREIGN KEY (course_id) REFERENCES course(course_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_course_weapon_weapon
    FOREIGN KEY (weapon_id) REFERENCES weapon(weapon_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS course_zombie_behavior (
  course_id INT NOT NULL,
  behavior_id INT NOT NULL,
  PRIMARY KEY (course_id, behavior_id),
  CONSTRAINT fk_course_zombie_behavior_course
    FOREIGN KEY (course_id) REFERENCES course(course_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_course_zombie_behavior_behavior
    FOREIGN KEY (behavior_id) REFERENCES zombie_behavior(behavior_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS weapon_zombie_behavior (
  weapon_id INT NOT NULL,
  behavior_id INT NOT NULL,
  PRIMARY KEY (weapon_id, behavior_id),
  CONSTRAINT fk_weapon_zombie_behavior_weapon
    FOREIGN KEY (weapon_id) REFERENCES weapon(weapon_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_weapon_zombie_behavior_behavior
    FOREIGN KEY (behavior_id) REFERENCES zombie_behavior(behavior_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);
