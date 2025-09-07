# EnergeX Full-Stack Assessment – Reference Implementation

This repo implements the assessment: Lumen (PHP) API with JWT + MySQL, Node.js (TypeScript) cache layer with Redis, a React frontend, unit tests, Docker, and CI.
Spin up everything with:

```bash
docker compose up --build
```

Services:
- **api** (Lumen) → http://localhost:8000
- **cache** (Node/TS) → http://localhost:4000
- **web** (React) → http://localhost:5173
- **mysql** on 3306, **redis** on 6379

Login flow:
1) Register at `POST /api/register`
2) Login at `POST /api/login` → copy `token`
3) Use `Authorization: Bearer <token>` for `POST /api/posts`

Run tests locally (no Docker): see each subfolder README.
