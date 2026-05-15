# Zombie Survival Camp

Zombie Survival Camp is a full-stack TypeScript app for exploring survivors, training courses, weapons, zombie threat intelligence, and simulator relationships.

<img width="1896" height="906" alt="image" src="https://github.com/user-attachments/assets/5fa56561-fb11-43cb-b598-3a2506e888f1" />

## Project layout

- `frontend/` — React + Vite UI
- `backend/` — Express + MySQL API
- `backend/shared/` — shared TypeScript API types used by both sides

## What it does

- REST JSON API for participants, courses, weapons, and zombie behaviors
- Dashboard UI with reusable cards, tables, badges, stats, and an overview simulator page
- Graceful fallback when the database is unavailable, so the UI still loads without crashing
- Centralized backend error handling and health check endpoint

## Installation

Follow the steps below to get the project running locally.

Prerequisites

- Node.js v18 or newer (LTS recommended)
- npm or pnpm
- MySQL 8 (or compatible) for the backend database
- git

Clone the repository

```bash
git clone https://github.com/<your-username>/Zombie-Survival.git
cd Zombie-Survival
```

Backend (API)

1. Install dependencies and start the dev server:

```bash
cd backend
npm install
npm run dev
```

1. Create a `.env` in `backend/` (example values):

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=zombie_survival_camp
```

Database

Create the database and populate schema and seeds:

```bash
# create database (one-time)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS zombie_survival_camp DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# load schema and seed data
mysql -h localhost -u root -p zombie_survival_camp < backend/schema/junction-tables.sql
mysql -h localhost -u root -p zombie_survival_camp < backend/schema/seeds.sql
```

Notes: the seed scripts use `INSERT IGNORE` so they are safe to run multiple times.

Frontend (UI)

1. Install and start the frontend:

```bash
cd frontend
npm install
npm run dev
```

1. Create `frontend/.env` with the API base URL used by the client (example):

```env
VITE_API_BASE_URL=http://localhost:3000/
```

Run the app

- Start the backend (default: <http://localhost:3000>)
- Start the frontend (Vite default: <http://localhost:5173>)

Open the frontend URL in your browser. The UI reads `VITE_API_BASE_URL` to call the backend endpoints.

Common troubleshooting

- Database connection errors: verify `.env` values and that MySQL is running and reachable from your machine.
- Port conflicts: change `PORT` in `backend/.env` or the Vite dev port in `frontend` if needed.
- CORS: the backend enables CORS for localhost in dev; if you run frontend from another host/port, add it to allowed origins.

Optional: run MySQL in Docker

for Docker, run:

```bash
docker run --name zsc-mysql -e MYSQL_ROOT_PASSWORD=your_password -e MYSQL_DATABASE=zombie_survival_camp -p 3306:3306 -d mysql:8
```

Then run the `mysql ... < backend/schema/*.sql` commands above to load schema/seeds.

## Notes

- The backend currently falls back to empty responses if MySQL credentials are placeholders or the database is unavailable.
- Shared API types live in `backend/shared/types/api.ts` and are imported from the frontend API client.
- The app uses Tailwind CSS v4 in the frontend.
