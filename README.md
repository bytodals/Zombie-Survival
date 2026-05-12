# Zombie Survival Camp

Zombie Survival Camp is a full-stack TypeScript app for managing survivors, training courses, weapons, and zombie threat intelligence.

## Project layout

- `frontend/` — React + Vite UI
- `backend/` — Express + MySQL API
- `backend/shared/` — shared TypeScript API types used by both sides

## What it does

- REST JSON API for participants, courses, weapons, and zombie behaviors
- Dashboard UI with reusable cards, tables, badges, and stats
- Graceful fallback when the database is unavailable, so the UI still loads without crashing
- Centralized backend error handling and health check endpoint

## Getting started

### Backend

```bash
cd backend
npm install
npm run dev
```

Example `backend/.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=zombie_survival_camp
VITE_API_BASE_URL=http://localhost:3000/
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend reads `VITE_API_BASE_URL` and calls these endpoints:

- `GET /participant`
- `GET /course`
- `GET /weapon`
- `GET /zombie-behavior`

## Notes

- The backend currently falls back to empty responses if MySQL credentials are placeholders or the database is unavailable.
- Shared API types live in `backend/shared/types/api.ts` and are imported from both apps.
