import type { ReactNode } from "react";
import Image from "next/image";
import { CalendarCheck, Flame, MapPin, Navigation, Utensils, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { cn } from "@/lib/cn";

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
