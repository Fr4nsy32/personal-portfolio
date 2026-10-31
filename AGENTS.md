# Repository Guidelines

## Project Structure & Module Organization
This portfolio uses React, TypeScript, Vite, and Tailwind CSS, with Cloudflare Pages Functions for the contact API.
- `src/pages/` contains page features; `src/routes/` defines navigation.
- `src/components/` contains shared components, including UI primitives in `ui/`; `src/layout/` provides the app shell.
- `src/data/`, `src/types/`, `src/lib/`, and `src/services/` hold static content, shared types, utilities, and API calls.
- `src/locales/en/` and `src/locales/it/` contain translations. Update both languages when changing user-facing text.
- `src/assets/` contains images, animations, and CV PDFs; `public/` contains directly served static assets.
- `functions/api/contact.ts` implements `/api/contact`. No automated test suite currently exists.

## Build, Test, and Development Commands
- `npm ci`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server.
- `npm run build`: run TypeScript project checks and create `dist/`.
- `npm run lint`: run ESLint, including TypeScript, React Hooks, and React Refresh rules.
- `npm run preview`: serve the production frontend locally.
- `npx wrangler pages dev dist`: serve a built site with Cloudflare Functions locally. Vite alone does not run the contact endpoint.

## Coding Style & Naming Conventions
Follow adjacent source files: application code generally uses two-space indentation, double quotes, and semicolons. No dedicated formatter is configured. Use PascalCase component names, camelCase functions and variables, and kebab-case feature filenames such as `project-details.tsx`. Prefer `@/` imports for modules within `src/` and explicit TypeScript types for shared contracts. Keep styling in Tailwind utilities and shared CSS; preserve reduced-motion behavior.

## Testing Guidelines
Run lint and build before submitting changes. There is no test command or coverage threshold. Manually verify affected routes, responsive layouts, keyboard navigation, both languages, and reduced-motion settings. For contact changes, check validation and success/error handling with the local Functions runtime.

## Commit & Pull Request Guidelines
History mixes short descriptive messages, version commits such as `0.1.3`, and merge commits; no consistent Conventional Commits format is established. Use concise, descriptive commits. PRs should explain the change, link relevant issues, report verification, and include screenshots for visual changes.

## Security & Configuration
Keep `DISCORD_WEBHOOK_URL` server-side in Cloudflare secrets or local `.dev.vars`. Never commit secrets. Treat every `VITE_` variable as public browser data; use `.env.example` for configuration names.
