# Apex Finance Dashboard

A responsive personal finance dashboard built with modern web tooling and a polished light-blue "glossy" UI. This project is a concise, production-minded single-page app suitable for showcasing on your resume and GitHub profile.

- Live demo: (run locally — see Setup)
- Status: Production-ready UI prototype

## Why this project

Apex Finance Dashboard demonstrates end-to-end front-end engineering skills: modern React (React 19), TypeScript, Tailwind CSS, Vite bundling, state management with Zustand, data fetching patterns with React Query, and a focus on UI/UX polish. The app showcases dashboards, transactions ledger, budgets, and a transaction modal with validation.

## Highlights (resume-friendly bullets)

- Built a responsive SPA with React + TypeScript and Vite for fast dev builds and tiny production bundles.
- Designed and implemented a custom light-blue glossy theme using Tailwind CSS (custom theme tokens and glass-card utilities).
- Implemented local application state via `zustand` and data utilities for transaction/budget generation.
- Added accessible forms with `react-hook-form` + `zod` validation for robust input handling.
- Charting via `recharts` for interactive area charts and financial visualizations.
- Clean component architecture and modular route-driven layout using `react-router`.

## Tech stack

- Framework: React 19
- Language: TypeScript
- Bundler/dev server: Vite
- Styling: Tailwind CSS (customized theme)
- State: Zustand
- Data fetching: @tanstack/react-query
- Forms & validation: react-hook-form + zod
- Charts: Recharts
- Icons: lucide-react

## Screenshots

Add screenshots to `assets/` or use GitHub's image upload for README. Example image reference:

![Dashboard Screenshot](./assets/dashboard-screenshot.png)

(If you don't have screenshots yet, run the app locally and capture full-width views of the dashboard and transaction modal.)

## Project structure (key files)

- [index.html](index.html)
- [package.json](package.json)
- [tailwind.config.js](tailwind.config.js)
- [src/styles/index.css](src/styles/index.css)
- [src/main.tsx](src/main.tsx)
- [src/App.tsx](src/App.tsx)
- [src/shared/components/layout/DashboardLayout.tsx](src/shared/components/layout/DashboardLayout.tsx)
- [src/features/dashboard/index.tsx](src/features/dashboard/index.tsx)
- [src/features/transactions](src/features/transactions)

## Local setup

Prerequisites:

- Node.js (16+ recommended)
- npm (or Yarn/pnpm)

Install and start dev server:

```bash
npm install
npm run dev
```

Open http://localhost:5173/ (Vite will show the port if different).

Build for production:

```bash
npm run build
npm run preview
```

## Tests

This starter does not include automated tests. If you add testing, consider `vitest` and `@testing-library/react` for component tests.

## Theming notes

- The project uses a custom Tailwind configuration with extended `colors`, `boxShadow`, and `backgroundImage` to achieve the glossy light-blue appearance.
- Utilities: `.glass-card`, `.glass-panel`, and `.glass-button` are provided in [src/styles/index.css](src/styles/index.css) to maintain consistent UI across components.

## Possible improvements (resume talking points)

- Add end-to-end tests with Playwright and unit tests with Vitest.
- Add user authentication and persist data to a backend or local persistence (IndexedDB).
- Extract chart color tokens to a design token file and implement theme switching (light/dark).
- Add CI (GitHub Actions) for linting, type-check, and build.

## Contribution & license

This repository is a personal project intended for portfolio use. Include an open-source license if you plan to share publicly (suggested: MIT).

## Contact

If this project appears on your resume, be ready to discuss architecture choices, trade-offs, and a short walkthrough of how state flows through the app.

---

_Generated and polished for a resume-ready GitHub presentation._
