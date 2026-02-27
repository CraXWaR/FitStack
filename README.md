# 🏋️ FitStack

> Your personal digital gym journal. Fast, minimalist, and built for people who train seriously.

---

## What it does

- **Workout Logging** — Log sets, reps, and weight. See what you did last session without leaving the screen.
- **Program Management** — Build Push/Pull/Legs, Upper/Lower, or any custom split. FitStack tracks which day is next.
- **Progressive Overload** — The app tells you when to increase weight or reps based on your history.
---

## Stack

| Layer | Tech |
|-------|------|
| Backend | Node.js, Express |
| Database | PostgreSQL, Prisma |
| Frontend | React |
---

## Getting Started

```bash
# Clone
git clone https://github.com/CraXWaR/FitStack.git

# Backend
cd server && npm install
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm run dev

# Frontend
cd ../client && npm install
npm run dev
```
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
