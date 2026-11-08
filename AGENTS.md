# AGENTS.md

NextStep is a Next.js 16 (App Router, React 19, TypeScript strict) SaaS for AI-assisted job applications. AI work runs asynchronously in Inngest; auth is Supabase; data is MongoDB/Mongoose; billing is Stripe; resume/cover-letter PDFs are rendered with Puppeteer and stored in Cloudinary. See `README.md` for product features.

## Commands

- `npm run dev` — start the app on `http://localhost:3000`.
- `npm run build` / `npm start`.
- `npm run lint` — ESLint 9 flat config (`eslint`, whole repo).
- `npx tsc --noEmit` — typecheck. There is no `typecheck` script.
- No test suite, test runner, or CI workflow exists. Don't invent test commands.
- On this Windows setup PowerShell blocks `npm.ps1` / `npx.ps1`; use `npm.cmd` / `npx.cmd`.
- `tsc` includes `.next/types/**`, so stale build artifacts can report errors for routes that no longer exist (previously `app/resume/print/[id]`). Delete `.next/` and rerun before debugging phantom type errors.
- `main` is not lint-clean: ~50 pre-existing errors (mostly `no-explicit-any`, `react/no-unescaped-entities`, React hook rules) plus warnings. Don't treat them as regressions or fix unrelated files.

## Layout and import rules

- `app/` — App Router pages, layouts, and route handlers (`app/api/**/route.ts`). There is no `pages/`.
- `src/` — server-side domain code: `database/`, `models/`, `helpers/`, `inngest/`, `stripe/`; also the Redux store (`src/store/`).
- `lib/` — static marketing copy/data (`offers.ts`, `faqItems.ts`, `pricing.ts`, ...), Gemini prompts (`prompts.ts`), and Supabase clients (`lib/supabase/{client,server,proxy}.ts`).
- `components/` — UI; `components/ui/` is shadcn/ui, `components/analysis/` and `components/dashboard/` hold feature UI. `icons/` holds SVGs.
- `@/*` maps to the repo root, so imports are `@/src/...`, `@/lib/...`, `@/components/...`.
- `proxy.ts` (root) is Next 16's middleware replacement, not an HTTP proxy. It refreshes the Supabase session and redirects `/dashboard` to `/sign-in`; real logic is `lib/supabase/proxy.ts`. Don't add `middleware.ts`.
- Shared domain types live in `types/global.d.ts`.

## Async AI/PDF flow

- API routes authenticate, validate, create a Mongo record with `status: "queued"`, then call `inngest.send({ name, data })` and return the record id. They do not call Gemini or render PDFs.
- `src/inngest/functions.ts` owns the six functions: job/resume analysis, resume build, cover-letter generation, then resume/letter PDF rendering. They update the record to `completed`/`failed`; resume/letter flows emit `pdf/resume.generate` / `pdf/letter.generate`.
- Register any new function in `app/api/inngest/route.ts` in the `serve({ functions: [...] })` list.
- Prompts are in `lib/prompts.ts` and filled with `.replace("{placeholder}", value)`. Resume building intentionally makes two Gemini calls (`RESUME_BUILDER_PROMPT_1/2`).
- Clients poll result endpoints (`/api/job-results/:id`, `/api/resume-results/:id`, etc.) every 2s until `completed`/`failed`.
- `INNGEST_DEV=1` makes the SDK target a local Inngest dev server; AI jobs won't run locally unless that server is running and pointed at `http://localhost:3000/api/inngest`.
- Gemini uses `AI_API_KEY` and `AI_MODEL` from env.

## Conventions and gotchas

- Protected route handlers use `requireAuth()` (`src/helpers/requireAuth.ts`): `const auth = await requireAuth(); if (auth.unauthorized) return auth.unauthorized;`
- Share validation constants/helpers from `src/helpers/validation.ts` between server routes and client forms; don't duplicate limits.
- Next 16: `params`, `searchParams`, and `cookies()` are async — `await` them. Route handlers type params as `{ params }: { params: Promise<{ id: string }> }`.
- Mongo: always `await connectToDatabase()` (`src/database/mongodb.ts`, connection cached on `global`). Models follow `mongoose.models.X || mongoose.model("X", schema)` to survive dev HMR.
- There is no server-side plan/quota enforcement in API routes; limits in `lib/pricing.ts` are display-only. `Subscription` docs are created in `app/auth/callback/route.ts` via `POST /api/subscriptions`; plans are `FREE | STANDARD | PREMIUM`.
- `src/stripe/stripe.ts` throws at import if `STRIPE_SECRET_KEY` is unset.
- API responses usually use `{ status: "OK" | "ERROR", message? }`; a few older handlers return `{ error }`. Match the endpoint you're editing.
- Tailwind is v4 CSS-first: no `tailwind.config.*`. Theme tokens and `@theme` live in `app/globals.css`; components use CSS vars such as `rgb(var(--bg-primary))` and `font-heading`. shadcn config is `components.json` (`new-york`, RSC, alias `@/components`, utils `@/lib/utils`).

## Env and deployment

- Env is loaded from `.env` (present locally, gitignored; no `.env.example`). Required: `MONGODB_URI`, `AI_API_KEY`, `AI_MODEL`, `INNGEST_DEV`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL_DEV`, `NEXT_PUBLIC_SITE_URL_PROD`, `NEXT_PUBLIC_WEB3FORM_ACCESS_KEY`, Stripe (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_STANDARD_PRICE_ID`, `STRIPE_PREMIUM_PRICE_ID`), Cloudinary (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`). Never print or commit `.env`.
- `src/database/mongodb.ts`'s error text says `.env.local`, but this repo uses `.env`.
- `app/sign-up/page.tsx` reads `NEXT_PUBLIC_SITE_URL`, which isn't defined; other code selects `NEXT_PUBLIC_SITE_URL_DEV` / `_PROD` by `NODE_ENV`. Check this when touching auth redirects.
- PDF rendering: dev uses local `puppeteer`; production uses `@sparticuz/chromium` + `puppeteer-core`; both are `serverExternalPackages`. Add any new PDF route to `next.config.ts` `outputFileTracingIncludes` (chromium bin + font assets) or Vercel will omit them. Note the config currently points at `./src/helpers/pdf/font/**` while the assets live in `src/helpers/pdf/fonts/`.
- PDFs are cached in Cloudinary under content-hash keys (`src/helpers/pdf/key.ts`). Bump `RESUME_TEMPLATE_VERSION` after changing the resume template so old PDFs aren't reused.
