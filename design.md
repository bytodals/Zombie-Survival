# Slutprojekt Backend F25 - Design Document

## Knowledge Domain

**Zombie Survival Camp** is a simulated post-apocalyptic training camp where survivors register to learn essential skills to survive in a zombie-infested world. The system manages participant registration, weapon distribution, courses, and documentation of zombie behaviors to improve training effectiveness.

## Database Design

The database contains four core interconnected entities:

- **Participants**
- **Courses**
- **Weapons**
- **Zombie Behaviors**

These entities are strongly connected through relationships (including junction tables for many-to-many relationships).

### Main Entities and Attributes

**Participants** (contains date + numeric attribute)

- participant_id (PK)
- first_name, last_name
- enrollment_date (DATE)
- survival_skill_level (INT 1-100)
- status

**Courses** (contains start and end dates)

- course_id (PK)
- course_name
- start_date (DATE)
- end_date (DATE)
- difficulty_level

**Weapons**

- weapon_id (PK)
- name
- type (Melee, Firearm, Explosive, etc.)
- damage (INT)
- quantity_in_stock (INT)
- value (DECIMAL)

**Zombie Behaviors**

- behavior_id (PK)
- behavior_type
- threat_level (INT)
- speed
- description

### Relationships

- Participants ↔ Courses (Many-to-Many)
- Courses ↔ Weapons (Many-to-Many)
- Courses ↔ Zombie Behaviors (Many-to-Many)
- Weapons ↔ Zombie Behaviors (Many-to-Many)

### 3NF Justification

The database is designed in **3rd Normal Form (3NF)**:

- All attributes are atomic (1NF)
- No partial dependencies (2NF)
- No transitive dependencies (3NF) — every non-key attribute depends only on the primary key.

Junction tables are used for all many-to-many relationships to avoid redundancy.

## Technology & Architecture Decisions

- **Framework**: Express.js
- **Language**: TypeScript + ESM
- **Database**: MySQL (existing database from previous course)
- **Data Access**: mysql2/promise with async/await
- **Architecture**: Layered (Routes - Database) with clear separation of concerns
- **Extra features**: Graceful shutdown, centralized error handling, health check endpoint
