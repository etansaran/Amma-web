import type { ReactNode } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Clock,
  Flame,
  Globe,
  MapPin,
  Navigation,
  Newspaper,
  Plane,
  Stamp,
  Utensils,
  Zap,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { cn } from "@/lib/cn";
import { WhatsappIcon } from "@/components/ui/BrandIcons";

/**
 * Building blocks for the search-guide pages (temple, siddhars, places, Mouna
 * Swami). Every guide answers the searcher first, then invites them to the ashram.
 */

/** A short, self-contained answer — the line search engines and AI answers quote. */
export function QuickAnswer({
  question,
  children,
  className,
}: {
  question: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border-l-4 border-saffron bg-white border border-line p-5 md:p-6 flex gap-3.5",
        className,
      )}
    >
      <span className="icon-circle w-9! h-9! bg-amber-bg! text-saffron-text! mt-0.5" aria-hidden>
        <Zap size={16} />
      </span>
      <div className="min-w-0">
        <p className="eyebrow-gold">Quick answer · {question}</p>
        <div className="mt-1.5 text-[16px] md:text-[17px] leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  );
}

/** Horizontal "jump to" chips for long guides. */
export function JumpLinks({ items, onNight = false }: { items: { href: string; label: string }[]; onNight?: boolean }) {
  return (
    <nav aria-label="On this page" className="flex flex-wrap gap-2">
      {items.map((i) => (
        <a
          key={i.href}
          href={i.href}
          className={cn(
            "inline-flex items-center min-h-11 px-4 rounded-pill border text-sm font-semibold transition-colors active:scale-[.97]",
            onNight
              ? "border-night-line-2 text-on-night hover:border-gold hover:text-on-night-head"
              : "border-line-2 bg-white text-ink hover:border-gold hover:text-saffron-text",
          )}
        >
          {i.label}
        </a>
      ))}
    </nav>
  );
}

/** Small inline card: "stop at the ashram" — used mid-article. */
export function AshramStopCard({ context }: { context?: string }) {
  return (
    <aside className="rounded-2xl bg-night text-on-night p-5 md:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
      <Image
        src={images.logo.src}
        alt=""
        width={64}
        height={64}
        className="w-14 h-14 rounded-full bg-ivory p-1 object-contain shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="eyebrow text-gold-light!">{context ?? "On the Girivalam path"}</p>
        <p className="font-display text-[20px] md:text-[22px] leading-snug text-on-night-head">
          Stop at {site.name}, Adi Annamalai
        </p>
        <p className="text-sm text-on-night-2 mt-1">
          Free annadhanam every day · Mounasamy Siddhar&apos;s darshan, standing {site.mounasamyStandingShort} ·
          Maataji&apos;s darshan {site.maatajiDarshan.daysShort}
        </p>
      </div>
      <Link href="/book-a-visit" className="btn btn-saffron btn-sm shrink-0">
        Plan a visit
      </Link>
    </aside>
  );
}

/** Full-width closing band that turns readers into visitors. */
export function VisitAshramBand({ heading }: { heading?: string }) {
  return (
    <section className="relative bg-night text-on-night overflow-hidden">
      <Image
        src={images.girivalamWalk.src}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,26,60,.95),rgba(14,26,60,.75))]" aria-hidden />
      <div className="container-site relative section-pad flex flex-wrap items-center gap-8 md:gap-12">
        <div className="flex-[1_1_480px] flex flex-col gap-4 min-w-0">
          <p className="eyebrow text-gold-light!">Visiting Tiruvannamalai?</p>
          <h2 className="h2 text-on-night-head">
            {heading ?? "Walk the Girivalam path — and rest with us at Adi Annamalai."}
          </h2>
          <p className="text-on-night-body">
            {site.name} is on the Girivalam road at Adi Annamalai, the quiet side of Arunachala. Every
            visitor is welcome to a free meal, to sit with Mounasamy Siddhar — the silent sadhu of
            Tiruvannamalai — and to join satsang. There is no fee.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <li className="flex items-center gap-2.5 rounded-xl bg-night-2/80 border border-night-line px-3.5 py-3">
              <Utensils size={18} className="text-gold-light shrink-0" aria-hidden /> Annadhanam {site.daily.programmeShort}
            </li>
            <li className="flex items-center gap-2.5 rounded-xl bg-night-2/80 border border-night-line px-3.5 py-3">
              <Flame size={18} className="text-gold-light shrink-0" aria-hidden /> Mounasamy stands {site.mounasamyStandingShort}
            </li>
            <li className="flex items-center gap-2.5 rounded-xl bg-night-2/80 border border-night-line px-3.5 py-3">
              <MapPin size={18} className="text-gold-light shrink-0" aria-hidden /> Vediyappanur Road
            </li>
          </ul>
        </div>
        <div className="flex-[0_1_320px] flex flex-col gap-3 w-full">
          <Link href="/book-a-visit" className="btn btn-saffron btn-lg w-full">
            <CalendarCheck size={18} aria-hidden /> Plan your visit
          </Link>
          <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold btn-lg w-full">
            <Navigation size={18} aria-hidden /> Directions to the ashram
          </a>
          <Link href="/mounasamy/darshan" className="link-arrow-gold justify-center mt-1">
            Mounasamy darshan details
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Source line for researched facts. */
export function Sources({ items }: { items: { label: string; href: string }[] }) {
  return (
    <p className="text-[13px] text-ink-2">
      <span className="font-semibold text-ink">Sources:</span>{" "}
      {items.map((s, i) => (
        <span key={s.href}>
          {i > 0 ? " · " : ""}
          <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
            {s.label}
          </a>
        </span>
      ))}
    </p>
  );
}

/** "In the news" strip pointing to Raghava Lawrence's visit — used on the Mounasamy pages. */
export function LawrenceVisitCard({ className }: { className?: string }) {
  return (
    <Link
      href="/raghava-lawrence-mouna-siddhar"
      className={cn(
        "group card card-hover rounded-2xl p-4 md:p-5 flex items-center gap-4 border-l-4 border-l-gold",
        className,
      )}
    >
      <span className="icon-circle w-11! h-11! bg-amber-bg! text-saffron-text! shrink-0" aria-hidden>
        <Newspaper size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="eyebrow-gold block">In the news · November 2026</span>
        <span className="block font-display text-[18px] md:text-[20px] leading-snug text-ink">
          Raghava Lawrence in Tiruvannamalai: his visit to Mouna Siddhar
        </span>
      </span>
      <ArrowRight size={18} className="text-saffron-text shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}

/** Format an ISO date (YYYY-MM-DD) as "7 November 2026". */
function longDate(iso: string) {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

/**
 * Who wrote this guide and when its facts were last checked — the trust line
 * readers (and search engines) look for on travel and pilgrimage advice.
 */
export function GuideByline({ checked, className }: { checked: string; className?: string }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-2 border-t border-line pt-3",
        className,
      )}
    >
      <BadgeCheck size={16} className="text-saffron-text shrink-0" aria-hidden />
      <span>
        Written by the {site.shortName} team, who live on the Girivalam path in Tiruvannamalai. Facts
        checked against official sources on <time dateTime={checked}>{longDate(checked)}</time>.
      </span>
      <Link href="/contact" className="font-semibold text-saffron-text underline-offset-2 hover:underline">
        Report a correction
      </Link>
    </p>
  );
}

/** Practical notes for devotees travelling from the USA, UK, Gulf, Singapore and Malaysia. */
export function AbroadVisitors({ id = "from-abroad" }: { id?: string }) {
  const items: { icon: typeof Plane; title: string; text: ReactNode }[] = [
    {
      icon: Plane,
      title: "Fly into Chennai or Bengaluru",
      text: "Chennai airport (MAA) is about 175 km away — roughly 4 hours by taxi. Bengaluru (BLR) is about 200 km via Krishnagiri. Both have direct flights from Singapore, Kuala Lumpur and Dubai; from the UK and USA most journeys have one stop.",
    },
    {
      icon: Stamp,
      title: "Visa",
      text: (
        <>
          Indian passport holders and OCI cardholders need no visa. Most other visitors — including US,
          UK, Singapore and Malaysian citizens — can apply for an Indian e-Visa on the official site,{" "}
          <a
            href="https://indianvisaonline.gov.in/evisa/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            indianvisaonline.gov.in
          </a>
          . Apply only there, not through agents.
        </>
      ),
    },
    {
      icon: Clock,
      title: "Pournami is in Indian time",
      text: "Girivalam and Pournami dates follow the full moon in India Standard Time (UTC+5:30). Plan your flights so you arrive the day before.",
    },
    {
      icon: Globe,
      title: "Best season",
      text: "December to February is cool and dry. Karthigai Deepam (November–December) and Pournami nights draw very large crowds — book rooms well ahead.",
    },
  ];
  return (
    <section id={id} className="bg-sand border-y border-line scroll-mt-24">
      <div className="container-site section-pad flex flex-col gap-7">
        <div className="flex flex-col gap-3 max-w-[680px]">
          <p className="eyebrow-gold">Coming from abroad</p>
          <h2 className="h2">Visiting Tiruvannamalai from the USA, UK, Dubai, Singapore or Malaysia.</h2>
          <p className="text-ink-2">
            Many devotees of Arunachala live overseas. Here is what they ask us most before they travel.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((i) => (
            <li key={i.title} className="card rounded-2xl p-5 flex flex-col gap-2.5">
              <span className="icon-circle" aria-hidden>
                <i.icon size={20} />
              </span>
              <h3 className="text-[18px] leading-snug">{i.title}</h3>
              <p className="text-[15px] text-ink-2">{i.text}</p>
            </li>
          ))}
        </ul>
        <div className="card rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-display text-[20px] leading-snug text-ink">
              Planning from overseas? Message the ashram on WhatsApp.
            </p>
            <p className="text-sm text-ink-2 mt-1">
              We answer in English and Tamil, and can help with rooms at the ashram (book in advance), darshan timings
              and Pournami dates.
            </p>
          </div>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-saffron shrink-0">
            <WhatsappIcon size={18} /> {site.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
