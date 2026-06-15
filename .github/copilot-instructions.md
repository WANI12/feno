# Feno Recruit Copilot Instructions

- This workspace is a Laravel 12 app with Inertia.js, React, Tailwind, and Vite.
- Keep the UI aligned with the dark, glassy recruitment SaaS style already used in the landing page and dashboard.
- The main user flows are landing, dashboard, candidates, jobs, scheduling, and analytics.
- Prefer minimal, focused edits over broad refactors.
- Use demo data in the React pages unless the user asks for persistence or backend CRUD.
- Run `npm run build` after frontend changes when validation is needed.
- Run `composer run dev` or `php artisan serve` plus `npm run dev` only when the user explicitly wants the app launched.
