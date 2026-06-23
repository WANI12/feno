# Feno Recruit

Feno Recruit is a Laravel 12 + React + Tailwind recruitment platform inspired by the Ashby-style all-in-one hiring workflow. It includes a marketing landing page, an authenticated hiring dashboard, and dedicated views for candidates, jobs, scheduling, and analytics.

## Stack

- Laravel 12
- Inertia.js + React
- Tailwind CSS
- Vite

## What it covers

- ATS pipeline tracking
- Interview scheduling coordination
- Hiring analytics and funnel reporting
- Authenticated dashboard navigation
- Dark, glassy SaaS-style UI

## Local setup

```bash
composer install
npm install
php artisan key:generate
php artisan serve
```

In a second terminal, run the frontend watcher:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Main routes

- `/` landing page
- `/dashboard` hiring overview
- `/candidates` candidate pipeline
- `/jobs` requisitions
- `/scheduling` interview coordination
- `/analytics` reporting

 
