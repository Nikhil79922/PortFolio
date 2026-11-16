# Nikhil Kumar Singh — Portfolio

Personal portfolio of a Java Backend Developer (Spring Boot · Microservices · Kafka · Redis · AWS).

**Live:** https://nikhil-portfolio-79922.vercel.app/

![Preview](public/og-image.png)

## Stack

- React 18 + TypeScript, built with Vite 7
- Tailwind CSS with shadcn/ui primitives (Radix UI)
- Light / Dark / System theme, responsive layout, keyboard and screen-reader friendly
- Zero third-party requests at runtime: fonts and logos are self-hosted
- Strict Content-Security-Policy injected at build time (see `vite.config.ts`), plus security
  and caching headers served by Vercel (see `vercel.json`)

## Edit the content

Everything shown on the site lives in **`src/lib/DynamicValues.ts`** — profile, stats,
experience, projects, skills, achievements and links.

- **Résumé:** put a PDF (with phone number / address removed) at `src/assets/resume.pdf`.
  It is picked up automatically and served from the site; otherwise the Google Drive link is used.
- **Logos:** add an SVG to `src/assets/logos/` and reference it with `logo("name")`.
- Use direct `https://` links only — no URL shorteners.

## Develop

Requires Node.js 20.19+.

```bash
npm ci            # install exact locked dependencies
npm run dev       # http://localhost:3000/
npm run check     # lint + typecheck + production build
npm run preview   # serve the production build locally (http://localhost:4173/)
```

## Deploy (Vercel)

The site is hosted on [Vercel](https://vercel.com), connected to this GitHub repository.
Deploying is just pushing:

```bash
git add -A
git commit -m "Update portfolio"
git push origin master
```

Every push to `master` triggers a production deployment; pushes to other branches get a
preview deployment. Build settings, security headers and asset caching live in
[`vercel.json`](vercel.json) — no settings need to be configured in the Vercel dashboard.

## License

Code: MIT (see [LICENSE](LICENSE)). Personal content is not covered by the license.
Originally based on a template by [p32929](https://github.com/p32929).
