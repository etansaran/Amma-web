# Build conventions — Siva Sri Thiyaneswar Amma Ashram website

Next.js 16 (App Router, TypeScript, Turbopack) · Tailwind v4 · next-intl 4 · `motion` (framer-motion) · `lucide-react` v1.

The approved designs live in `../ashram-website-handoff/design/*.dc.html` (one file per page, inline styles, English copy). Convert them **faithfully**: same sections, same order, same wording, same colours and type. Fix typos only.

## Where things go

| What | Path |
|---|---|
| Page | `app/[locale]/(site)/<route>/page.tsx` (server component) |
| Page-only client pieces (forms, tabs, calendars) | `components/<page>/…` with `"use client"` |
| Shared UI | `components/ui/*` (see list below) |
| Site chrome (header, footer, modal) | `components/site/*` — already done, do not edit |
| Data that will move to a CMS later | `content/*.ts` (typed arrays) |
| Constants / facts | `lib/site.ts` (do not edit — define page-local constants in the page file) |
| Images | `lib/images.ts` → `images.<key>` (`src,width,height,alt,kind`) — the only images that exist |

## Page skeleton

```tsx
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/maataji",                     // route without locale prefix
    title: "…≤ 60 chars, keyword first…", // site name is appended automatically
    description: "…≤ 155 chars…",
    image: images.maatajiPortrait,        // optional OG image
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (<>…</>);
}
```

## Shared components (import from `@/components/ui/...` and `@/components/motion/Reveal`)

- `PageHero` — inner-page hero. Props: `variant="sand"|"night"`, `breadcrumbs=[{label,href}]`, `eyebrow`, `title`, `tamil`, `lede`, `actions` (Buttons), `extra` (chips row), `aside` (a `PhotoFigure` or card).
- `SectionHeading` — `eyebrow`, `title`, `tamil`, `lede`, `action` (an `ArrowLink`), `align="center"`, `onNight`.
- `Eyebrow` (`tone="saffron"|"gold"`), `Breadcrumbs`.
- `Button` — `href` (internal → locale Link, `https:`/`mailto:`/`tel:` → `<a>`), or no href → `<button>`. `variant`: `saffron` (default) · `night` · `outline-gold` (on night) · `outline-saffron` · `outline-night` · `white`. `size`: `sm`|`md`|`lg`. `block` stretches.
- `ArrowLink` — "Full calendar →" style link. `tone="gold"` on night backgrounds.
- `PhotoFigure` — `image={images.x}`, `ratio="3/4"`, `position="50% 15%"`, `frame="gold"|"line"|"none"`, `rounded="card"|"lg"|"arch"`, `caption`, `badge` (Photo/Illustration label — keep it on for people photos), `priority` for above-the-fold.
- `StatTile` (`value`, `label`, `onNight`), `InfoCard` (`icon`, `eyebrow`, `title`, `note`), `IconCircle` (`icon`, `tone`), `EventCard` (`day`, `meta`, `title`, `description`, `cta`, `featured`).
- `FAQ` — `items=[{question, answer}]`; emits FAQPage JSON-LD automatically.
- `StatusChip` — `status="awaiting_approval"|"awaiting_confirmation"|"confirmed"|"not_available"`.
- `Stepper` — `steps=[…]`, `current` (0-based).
- `VideoCard` — click-to-load YouTube (`youtubeId`, `poster`, `title`, `caption`).
- `Placeholder` — `<Placeholder label="₹ daily cost" />` for every `[PLACEHOLDER]` in the design. Never invent a value.
- `JsonLd` + helpers in `lib/schema.ts`: `maatajiPersonSchema()`, `mounasamyPersonSchema()`, `faqSchema()`, `eventSchema()`, `breadcrumbSchema()`, `articleSchema()`, `videoSchema()`. Organization + PlaceOfWorship are already on every page via the layout.
- Motion: wrap each section's content in `<Reveal>` (`delay`, `immediate` for hero content, `as`), and card grids in `<RevealGroup>` + `<RevealItem>` (stagger comes from CSS). They are plain server-safe components driven by CSS and one shared observer (`components/motion/RevealObserver.tsx`); content is never hidden when JavaScript is missing. The header toggle and `prefers-reduced-motion` switch all motion off. Use `motion/react` only for interactive transitions (menus, steps, lightbox).

## CSS utilities (Tailwind v4, defined in `app/globals.css`)

Layout: `container-site` (1280px, 22/32px gutters) · `section-pad` (56/96px) · `section-pad-lg` (64/104px).
Type: `h1` · `h1-page` · `h2` · `h3` · `lede` · `eyebrow` · `eyebrow-gold` · `ta` (Noto Serif Tamil — add `lang="ta"`) · `hi` · `te` · `font-display` · `font-body`.
Forms: wrap controls in `FormField` — it adds the required `*` marker and an inline error under any field the visitor leaves invalid (`:user-invalid`). Pass `error` for a specific message.
Touch: `btn`, linked `chip`, `card-hover` links and arrow links already have press feedback and 44px tap areas; hover lift only applies on hover-capable devices.
Surfaces: `card` (white) · `card-ivory` · `card-night` · `card-hover` · `chip` · `icon-circle` · `lamp-dot` · `input` · `textarea` · `label` · `prose-site` (articles / legal).
Buttons: `btn` + `btn-saffron` | `btn-night` | `btn-outline-gold` | `btn-outline-saffron` | `btn-outline-night` | `btn-white`, sizes `btn-sm` | `btn-lg`. Links: `link-arrow`, `link-arrow-gold`.
Colours: `bg-ivory bg-sand bg-night bg-night-2 bg-white text-ink text-ink-2 text-saffron-text text-gold-text text-gold-light text-on-night text-on-night-2 text-on-night-head text-on-night-body border-line border-line-2 border-night-line bg-amber-bg text-amber-text bg-green-bg text-green-text bg-grey-bg`.
Radii: `rounded-card` (18) · `rounded-lg` (24) · `rounded-pill`. Animations: `animate-lamp animate-halo animate-drift animate-rise`.

Mobile first: stack columns on phones (`flex-wrap` with `flex-[1_1_480px]` style bases works well), 22px gutters, 44px touch targets, no horizontal overflow. Use `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/4` for card grids.

## Rules

1. Internal links: `Link` from `@/i18n/navigation` (never `next/link`) — or `Button`/`ArrowLink`. Routes are the English slugs in `lib/site.ts` → `allRoutes`.
2. Images: always `next/image` (or `PhotoFigure`). Provide `sizes`. `priority` only for the hero image. Never a raw `<img>`.
3. Copy: never promise a meeting with Maataji; miracles only as "devotees say". Real photos are labelled **Photo**, generated images **Illustration** (handled by `PhotoFigure`).
4. Icons: `lucide-react` v1. Brand icons are in `components/ui/BrandIcons.tsx` (`YoutubeIcon`, `InstagramIcon`, `FacebookIcon`, `WhatsappIcon`). Some old names were removed in v1 (`XCircle`→`CircleX`, `AlertCircle`→`CircleAlert`, `CheckCircle2`→`CircleCheck`). Check an icon exists: `grep -c "declare const <Name>:" node_modules/lucide-react/dist/lucide-react.d.ts`.
5. Lint rules that bite: no `setState` called synchronously inside `useEffect` (use event handlers, `useSyncExternalStore`, or lazy `useState(() => …)`); `react/no-unescaped-entities` is off.
6. Forms are front-end only for now: client component, local state, HTML validation, a review step, then a confirmation step with a sample reference (`SSTA-V-2026-00001` / `SSTA-P-…` / `SSTA-D-…`) and `StatusChip`. Payment buttons render but are `disabled` with the note "Online payment opens when Razorpay is connected." Never mark anything paid on the client.
7. SEO per page: keyword in title, H1 and first paragraph; one `<h1>`; `Breadcrumbs` in the hero; JSON-LD where the brief asks (Person on /maataji and /mounasamy, FAQPage where the design has FAQs, Event on /events, Article + BreadcrumbList on posts).
8. Accessibility: semantic sections, labels on every control, `aria-pressed` on toggles/selection chips, `<details>` FAQs, colour never the only signal.
9. Before finishing: `npx tsc --noEmit && npm run lint` must pass, and every page you built must return 200 from the running dev server: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3210/en/<route>`. Do **not** run `next build` or start another dev server.
