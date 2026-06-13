# Urvil Mehta — Portfolio

Personal portfolio built with **Next.js (App Router)** + React. Ported from a
single-file HTML prototype into componentized React with the same pixel/terminal
aesthetic and all the interactive bits (boot screen, typewriter, live terminal,
gravity-grid background, oneko cat, black-hole collapse, Konami → CRT mode).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.

Or from the CLI:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

## Editing content

- **Text / projects / experience / stack / stats** → `lib/content.js`
- **Styling** → `app/globals.css`
- **SEO / social preview** → `metadata` in `app/layout.jsx`
- **Resume download** → drop your PDF at `public/resume.pdf`
  (the hero "Resume ↓" button and the terminal `resume` command both use it).

## Structure

```
app/
  layout.jsx      fonts (next/font) + metadata
  page.jsx        assembles all sections
  globals.css     all styles
components/        one file per section + Effects/BlackHole
hooks/             typewriter, reveal, konami, gravity grid, oneko, black hole
lib/               content data + resume helper
```
