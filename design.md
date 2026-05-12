# Final Project F25D Backend Course - Design Document

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
- join_date (DATE)
- survival_skill_level (INT 1-100)
- status

**Courses** (contains start and end dates)

- course_id (PK)
- course_name
- start_date (DATE)
- end_date (DATE)
- difficulty_level

## Weapons

- weapon_id (PK)
- name
- type (Melee, Firearm, Explosive, etc.)
- damage (INT)
- quantity_in_stock (INT)
- value (DECIMAL)

## Zombie Behaviors

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

- **Backend Framework**: Express.js
- **Frontend Framework**: React + Vite
- **Language**: TypeScript (backend + frontend)
- **Database**: MySQL (existing database from previous course)
- **Data Access**: mysql2/promise with async/await
- **Architecture**: Fullstack layered architecture
  - Backend: Routes → Controllers → Services → Database
  - Frontend: Pages → API Client → Backend REST API
- **Shared Code**: API types live in `backend/shared/types/api.ts` and are reused by both apps
- **Extra features**: Graceful shutdown, centralized error handling, health check endpoint, and graceful empty-state fallback when the database is unavailable

## Frontend Design

The project now includes a dedicated frontend (`frontend/`) that presents and manages all core entities through a user-friendly interface.

### Frontend Pages

- **CoursesPage**: Displays and manages courses with dates and difficulty.
- **ParticipantsPage**: Displays and manages participants, including status and skill level.
- **WeaponsPage**: Displays and manages weapon inventory and weapon details.
- **ZombieBehaviorsPage**: Displays and manages zombie behavior data and threat information.

### Frontend Goals

- Provide a clear visual overview of all entities in the system.
- Make CRUD operations easier and more intuitive than manual API usage.
- Separate UI logic from API logic using dedicated client modules in `src/api/`.
- Reuse shared TypeScript types (`backend/shared/types/api.ts`) for consistency between backend and frontend.

## API and Frontend Integration

The frontend communicates with the backend through REST endpoints, with separate API client files for each entity:

- `courses.ts`
- `participants.ts`
- `weapons.ts`
- `zombieBehaviors.ts`

## API Endpoints

The current backend routes are:

- `GET /health`
- `GET /participant`
- `GET /participant/:id`
- `GET /course`
- `GET /weapon`
- `GET /weapon/:id`
- `GET /zombie-behavior`

This structure improves maintainability and makes it easier to extend the system with additional pages and features.
