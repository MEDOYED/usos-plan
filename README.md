# USOS Timetable Web Application (Uniwersytet Łódzki)

Modern, accessible, and fast web application for students of the **University of Lodz (Uniwersytet Łódzki)** to view their class schedules in Polish, designed with **Material Design 3 Expressive** and **Feature-Sliced Design (FSD v2.1)** architecture.

---

## 🌟 Key Features

- **Guaranteed Polish Language**: All course names, groups, room identifiers, and class types (`Wykład`, `Ćwiczenia`, `Laboratorium`, `Ćwiczenia konwersatoryjne`) are displayed natively in Polish.
- **Material Design 3 Expressive**:
  - Full system tokens (primary, secondary, tertiary, surface containers, elevations, shapes).
  - Dark Mode and Light Mode with instant toggle and persistence.
  - Expressive pill badges, interactive cards, smooth spring-inspired transitions.
- **FSD v2.1 Architecture**: Clear separation of concerns (`app`, `pages`, `widgets`, `features`, `entities`, `shared`).
- **Storybook Documentation**: Comprehensive component stories for buttons, cards, badges, chips, dialogs, and skeletons.
- **Full Test Coverage**:
  - Backend unit tests (`bun:test`) for iCal parsing, timezone logic, and week calculation.
  - Frontend unit tests (`vitest` + `@testing-library/react`) for UI components, state store, and date utilities.
- **Vercel Ready**: Ready to be deployed as separate frontend and backend instances on Vercel.
- **PWA & Mobile First**: Optimized for iPhone Safari "Add to Home Screen" with touch-friendly layout and mobile navigation bar.

---

## 🏗️ Project Structure

```
├── backend/                  # Node.js + Express + TypeScript + Bun
│   ├── api/index.ts          # Vercel serverless function entrypoint
│   ├── src/
│   │   ├── config/           # Environment & calendar configuration
│   │   ├── controllers/      # Express route controllers
│   │   ├── routes/           # REST endpoints
│   │   ├── services/         # iCal parsing & timetable cache service
│   │   ├── types/            # TypeScript schemas & DTOs
│   │   ├── app.ts            # Express application setup with CORS
│   │   └── index.ts          # Local server entrypoint
│   ├── tests/                # Bun unit tests
│   └── vercel.json           # Vercel deployment configuration
│
└── frontend/                 # React 19 + TypeScript + Vite + FSD v2.1
    ├── .storybook/           # Storybook configuration & preview
    ├── src/
    │   ├── app/              # Router, Layout & App entrypoint
    │   ├── pages/            # Timetable, Today, Courses, Settings
    │   ├── widgets/          # Header, TimetableGrid, ClassModal, BottomNav
    │   ├── features/         # ThemeSwitcher, WeekNavigator, TypeFilter
    │   ├── entities/         # ClassSession (ClassCard, ClassBadge)
    │   ├── shared/
    │   │   ├── api/          # Typed API client
    │   │   ├── lib/          # Date & Polish localization utilities
    │   │   ├── styles/       # MD3 tokens, _light.scss, _dark.scss, global
    │   │   └── ui/           # Button, Card, Chip, Badge, Dialog, Skeleton
    │   └── test/             # Vitest setup
    └── vercel.json           # Vercel SPA rewrites configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.1+) or Node.js (v20+)

### 1. Running the Backend

```bash
cd backend
bun install
bun run dev
```
The backend will be available at `http://localhost:4000`.
- Health check: `http://localhost:4000/api/health`
- Timetable feed: `http://localhost:4000/api/timetable`
- Today's schedule: `http://localhost:4000/api/timetable/today`
- Courses summary: `http://localhost:4000/api/timetable/summary`

### 2. Running the Frontend

```bash
cd frontend
bun install
bun run dev
```
The frontend will start at `http://localhost:3000` (with automatic proxy to the backend on `/api`).

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
bun test
```

### Frontend Tests
```bash
cd frontend
bun run test
```

---

## 📚 Storybook

To view component documentation and interact with MD3 Expressive UI components:

```bash
cd frontend
bun run storybook
```
Or to build static Storybook docs:
```bash
bun run build-storybook
```

---

## ☁️ Vercel Deployment

Both `frontend/` and `backend/` are pre-configured for separate Vercel projects:

1. **Backend Deployment**:
   - In Vercel, import the repository and set **Root Directory** to `backend`.
   - Set Environment Variable (optional): `CALENDAR_URL` (defaults to the configured USOS feed).
   - Vercel will automatically use `backend/vercel.json` and `backend/api/index.ts`.

2. **Frontend Deployment**:
   - In Vercel, import the repository and set **Root Directory** to `frontend`.
   - Set Environment Variable: `VITE_API_URL` pointing to your deployed backend URL (e.g. `https://my-backend.vercel.app/api`).
   - `frontend/vercel.json` ensures all client-side routes (`/today`, `/courses`, `/settings`) redirect correctly to `index.html`.

---

## 📱 Adding to iPhone Home Screen

1. Open the deployed frontend website in **Safari** on your iPhone.
2. Tap the **Share** button (box with upward arrow) at the bottom.
3. Select **Add to Home Screen (Do ekranu początkowego)**.
4. Tap **Add**. You now have a standalone Polish timetable app with no English localization glitches!
