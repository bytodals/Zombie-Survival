# Final Project F25D Backend Course - Design Document

## Knowledge Domain

**Zombie Survival Camp** is a simulated post-apocalyptic training camp where survivors register to learn essential skills to survive in a zombie-infested world. The current application focuses on read-only exploration of participants, courses, weapons, zombie behaviors, and simulator relationship data.

## Database Design

The application uses four core interconnected entities:

- **Participants**
- **Courses**
- **Weapons**
- **Zombie Behaviors**

These entities are strongly connected through relationships (including junction tables for many-to-many relationships).

### Main Entities and Attributes

**Participants**

- participant_id (PK)
- name
- join_date (DATE)
- age
- skill_level

**Courses**

- course_id (PK)
- name
- start_date (DATE)
- end_date (DATE)
- description

## Weapons

- weapon_id (PK)
- name
- damage (INT)
- quantity (INT)
- description

## Zombie Behaviors

- behavior_id (PK)
- name
- danger_level (INT)
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
- **Shared Code**: API types live in `backend/shared/types/api.ts` and are reused by the frontend API client
- **Extra features**: Graceful shutdown, centralized error handling, health check endpoint, and graceful empty-state fallback when the database is unavailable
- **Frontend UI**: Tailwind CSS v4 with custom theme tokens defined in `frontend/src/index.css`
- **Current UI Mode**: Read-only dashboard and entity views; no create/edit/delete workflows are wired up

## Frontend Design

The project now includes a dedicated frontend (`frontend/`) that presents and explores all core entities through a user-friendly interface.

### Frontend Pages

- **DashboardPage**: Shows summary cards, recent survivors, threat assessment, training programs, and arsenal inventory.
- **CoursesPage**: Displays and manages courses with dates and difficulty.
- **ParticipantsPage**: Displays and manages participants, including status and skill level.
- **WeaponsPage**: Displays and manages weapon inventory and weapon details.
- **ZombieBehaviorsPage**: Displays and manages zombie behavior data and threat information.
- **SimulatorPage**: Displays the full overview and many-to-many relationship tables.

### Frontend Goals

- Provide a clear visual overview of all entities in the system.
- Separate UI logic from API logic using dedicated client modules in `src/api/`.
- Reuse shared TypeScript types (`backend/shared/types/api.ts`) for consistency between backend and frontend.
- Keep the interface optimized for readability and contrast on a dark theme.

## API and Frontend Integration

The frontend communicates with the backend through REST endpoints, with separate API client files for each entity:

- `courses.ts`
- `participants.ts`
- `weapons.ts`
- `zombieBehaviors.ts`
- `simulator.ts`

## API Endpoints

The current backend routes are:

- `GET /health`
- `GET /participant`
- `GET /participant/:id`
- `GET /participant/:id/courses`
- `GET /course`
- `GET /weapon`
- `GET /weapon/:id`
- `GET /zombie-behavior`
- `GET /simulator/overview`

This structure improves maintainability and makes it easier to extend the system with additional pages and features.
