# Zombie Survival Camp API

Backend REST API for managing a post-apocalyptic zombie survival training camp.

## Knowledge Domain

Manages participants, courses, weapons, and simulated zombie behaviors for a survival training environment.

## Features

- RESTful JSON API
- MySQL persistence
- Layered architecture (controllers, services, repositories)
- Graceful shutdown and error handling
- Written in TypeScript (ESM)

## Tech Stack

- Node.js + Express
- TypeScript
- MySQL (mysql2/promise)

## Installation & Setup

1. Clone the repository

   ```bash
   git clone <repo-url>
   cd zombie-survival-camp-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a .env file (example)

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_DATABASE=zombie_camp
   ```

4. Build and run

   ```bash
   npm run build
   npm start
   ```

5. Development

   ```bash
   npm run dev
   ```

## API

The server exposes REST endpoints (JSON). Example:

- GET /health
- GET /participants
- POST /participants
- GET /courses

Refer to the source code or OpenAPI spec (if included) for full routes and payloads.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Submit a PR with tests and a clear description
