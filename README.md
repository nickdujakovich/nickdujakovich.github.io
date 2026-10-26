# Nikolas Dujakovich — Portfolio

Live at **https://nickdujakovich.github.io** (deploys from `main` via `.github/workflows/deploy.yml`).

Single-page portfolio built with **SolidJS**, **TypeScript**, **Tailwind CSS v4**, and **Vite**, tested with **Vitest**. Every figure on the site is sourced from `NikolasDujakovichResume.pdf`, guarded by a data-integrity test suite (`src/data/resume.test.ts`).

## Scripts

| Command           | What it does                      |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the Vite dev server         |
| `npm run build`   | Production build into `dist/`     |
| `npm run preview` | Serve the production build        |
| `npm run test`    | Run the Vitest suite once         |
| `npm run typecheck` | Strict `tsc --noEmit`           |

## Deploy

`npm run build` emits a fully static `dist/` (JS + CSS + resume PDF) — host it on GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static file host.
