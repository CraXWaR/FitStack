# 🏋️ FitStack

> Your personal digital gym journal and smart coach. Fast, minimalist, and built for people who train seriously.

---

## What it does

- **Workout Logging** — Log sets, reps, and weight. See what you did last session without leaving the screen.
- **Program Management** — Build Push/Pull/Legs, Upper/Lower, or any custom split. FitStack tracks which day is next.
- **Progressive Overload** — The app tells you when to increase weight or reps based on your history.

---

## Stack

| Layer | Tech |
|-------|------|
| Language | TypeScript |
| Backend | Node.js, Express |
| Database | PostgreSQL, Prisma |
| Frontend | React |

---

## Getting Started

```bash
# Clone
git clone https://github.com/CraXWaR/FitStack.git

# Backend
cd backend && npm install
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm run dev

# Frontend
cd ../frontend && npm install
npm run dev
```

---

## Seed Database

Run the seeder to populate the database with a default user and a full exercise library:

```bash
cd server
npx prisma db seed
```

This will create:
- A default user account for testing
- A predefined list of exercises (Push, Pull, Legs, and accessory movements)

> Seed data is defined in `prisma/seeders/seed.ts`.

---

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/fitstack
JWT_SECRET=your_secret_here
PORT=5000
```

---

## Roadmap

- [x] Auth & workout logging
- [x] Program management
- [ ] Progressive overload suggestions
