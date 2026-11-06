# Siva Sri Thiyaneswar Amma Ashram — website

Next.js 16 (App Router, TypeScript, Turbopack) · Tailwind CSS v4 · next-intl 4 (en / ta / te / hi) · `motion` animations · `lucide-react` icons.

Built from the approved designs in `../ashram-website-handoff/design/` following `../ashram-website-handoff/BUILD-BRIEF.md`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build: static pages + a standalone server in .next/standalone
npm run start:prod # run that server (port 3100 behind Caddy on the VPS)
```

Hosting: your Hostinger VPS (Caddy + systemd). Setup, HTTPS and updates are in [docs/DEPLOY-VPS.md](docs/DEPLOY-VPS.md).

Quality gates: `npm run typecheck`, `npm run lint`.

The site address is `https://thiyaneswaramma.org` (override with `NEXT_PUBLIC_SITE_URL`, see `.env.example`). It drives canonical links, hreflang, the sitemap and JSON-LD.

## What is here

| Route | Page |
|---|---|
| `/` | Home |
| `/maataji`, `/ashram`, `/annadhanam` | About pages (volunteer + sponsor forms) |
| `/mounasamy`, `/mounasamy/guru-shishya`, `/mounasamy/darshan` | Mounasamy Siddhar hub, story, darshan details |
| `/teachings`, `/events`, `/gallery`, `/blog`, `/blog/[slug]` | Content pages (8 posts in `content/posts.ts`) |
| `/book-a-visit`, `/pooja-booking`, `/donate`, `/contact` | 4-step flows and contact form (front-end only for now) |
| `/tiruvannamalai-guide` | Temple timings, Girivalam dates table, Deepam |
| `/privacy`, `/terms`, `/refund-policy`, `/accessibility` | Legal pages |

Every route exists under `/en`, `/ta`, `/te` and `/hi`. The header, footer, menus, announcement strip and the first-visit language pop-up are translated in `messages/*.json`; page body copy is English for now and falls back to English in the other locales.

## Project layout

- `app/[locale]/(site)/…` — pages
- `components/ui` — shared UI (documented in `docs/BUILD-CONVENTIONS.md`)
- `components/site` — header, footer, mobile bar, language pop-up
- `components/motion` — motion provider (header toggle + reduced-motion) and `Reveal`
- `content/` — posts, events, poojas, Girivalam dates (ready to move to a CMS)
- `lib/` — site facts, images, SEO metadata, JSON-LD helpers
- `i18n/` + `proxy.ts` — locale routing

## Not yet built (next phases from the brief)

1. Tamil, Telugu and Hindi page copy (chrome is translated; set `defaultLocale` to `ta` in `i18n/routing.ts` once Tamil copy exists).
2. CMS (Sanity) for events, posts, gallery, poojas and settings.
3. Backend for visit requests, pooja bookings, donations and volunteer/contact forms (database, email/WhatsApp notifications).
4. Razorpay orders + webhooks; the payment buttons are present but disabled until then.
5. Office-supplied facts: everything rendered with the dashed amber `Placeholder` style (search for `<Placeholder` in the code).
