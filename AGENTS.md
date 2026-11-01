# Repository Guidelines

## Project Structure & Module Organization
This portfolio uses React, TypeScript, Next.js App Router, and Tailwind CSS, with a Next.js route handler for the contact API.
- `features/` contains page features; root-level `app/` defines routes and layouts.
- `components/` contains shared components, including UI primitives in `ui/`; `layout/` provides the app shell.
- `data/`, `types/`, `lib/`, and `services/` hold static content, shared types, utilities, and API calls.
- `locales/en/` and `locales/it/` contain translations. Update both languages when changing user-facing text.
- `assets/` contains images and animations; `public/assets/pdf/` contains CV PDFs; `public/` contains directly served static assets.
- `app/api/contact/route.ts` implements `/api/contact`. No automated test suite currently exists.

## Build, Test, and Development Commands
- `npm ci`: install dependencies from `package-lock.json`.
- `npm run dev`: start Next.js with the frontend and contact API.
- `npm run build`: run Next.js production build and TypeScript checks.
- `npm run lint`: run ESLint, including TypeScript and React Hooks rules.
- `npm run preview`: serve the production frontend locally.
- `npm start`: serve the production Next.js application, including the contact endpoint.

## Coding Style & Naming Conventions
Follow adjacent source files: application code generally uses two-space indentation, double quotes, and semicolons. No dedicated formatter is configured. Use PascalCase component names, camelCase functions and variables, and kebab-case feature filenames such as `project-details.tsx`. Prefer `@/` imports for modules within the project root and explicit TypeScript types for shared contracts. Keep styling in Tailwind utilities and shared CSS; preserve reduced-motion behavior.

## Testing Guidelines
Run lint and build before submitting changes. There is no test command or coverage threshold. Manually verify affected routes, responsive layouts, keyboard navigation, both languages, and reduced-motion settings. For contact changes, check validation and success/error handling with the local Next.js runtime.

## Commit & Pull Request Guidelines
History mixes short descriptive messages, version commits such as `0.1.3`, and merge commits; no consistent Conventional Commits format is established. Use concise, descriptive commits. PRs should explain the change, link relevant issues, report verification, and include screenshots for visual changes.

## Security & Configuration
Keep `DISCORD_WEBHOOK_URL` server-side in deployment environment variables or local `.env.local`. Never commit secrets. Treat every `NEXT_PUBLIC_` variable as public browser data; use `.env.example` for configuration names.
