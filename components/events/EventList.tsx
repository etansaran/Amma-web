"use client";

import { Clock, Moon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { useMotionPreference } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/cn";
import {
  dateParts,
  eventMatches,
  eventMeta,
  type AshramEvent,
} from "@/content/events";
import { eventFilter, eventFilterOptions } from "./eventFilter";

type Props = { events: AshramEvent[] };

const EASE = [0.22, 1, 0.36, 1] as const;

/** "Pournami tithi 10:47 AM, 23 Dec → 6:57 AM, 24 Dec · ashram pooja [TIME]" */
function EventNote({ e }: { e: AshramEvent }) {
  const night = e.featured;
  const cls = cn("text-sm flex flex-wrap items-center gap-x-1.5", night ? "text-on-night-2" : "text-ink-2");

  if (e.slug === "karthigai-deepam-2026") {
    return (
      <span className={cls}>
        Maha Deepam on the hill ~6 PM · ashram pooja <Placeholder label="TIME" /> · annadhanam
        all night
      </span>
    );
  }
  if (e.slug === "thiruvadhirai-2026") {
    return (
      <span className={cls}>
        Special pooja for Nataraja, Thiruvasagam recital, thiruvadhirai kali prasadam ·{" "}
        <Placeholder label="TIME" />
      </span>
    );
  }
  if (e.slug === "maha-shivaratri-2027") {
    return (
      <span className={cls}>
        Four-kala abhishekam and pooja through the night, bhajans, satsang, annadhanam at dawn ·
        from <Placeholder label="TIME" />
      </span>
    );
  }
  if (e.slug === "chitra-pournami-2027") {
    return (
      <span className={cls}>
        Pournami tithi {e.tithi} · the ashram's traditional day for new initiations
      </span>
    );
  }
  if (e.slug === "guru-pournami-2027") {
    return (
      <span className={cls}>
        Pournami tithi {e.tithi} · disciples gather from across India
      </span>
    );
  }
  return (
    <span className={cls}>
      {e.tithi ? <>Pournami tithi {e.tithi} · </> : null}
      ashram pooja <Placeholder label="TIME" />
    </span>
  );
}

function EventRow({ e }: { e: AshramEvent }) {
  const night = e.featured;
  const p = dateParts(e.startDate);
  return (
    <article
      id={e.slug}
      className={cn(
        "flex flex-wrap gap-5 items-center rounded-card px-5 py-5 md:px-[26px] md:py-[22px] card-hover scroll-mt-24",
        night ? "card-night" : "card",
      )}
    >
      <div className="w-[84px] text-center shrink-0">
        <span
          className={cn(
            "block font-display text-[40px] leading-none",
            night ? "text-gold-light" : "text-saffron-text",
          )}
        >
          {p.day}
        </span>
        <span className={cn("text-[13px]", night ? "text-on-night-2" : "text-ink-2")}>
          {eventMeta(e.startDate)}
        </span>
      </div>
      <div className="flex-[1_1_320px] flex flex-col gap-1 min-w-0">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-[12px] tracking-[.14em] uppercase font-semibold",
            night ? "text-gold-light" : "text-gold-text",
          )}
        >
          {e.type === "pournami" || e.also?.includes("pournami") ? (
            <Moon size={12} aria-hidden />
          ) : (
            <Clock size={12} aria-hidden />
          )}
          {e.label}
        </span>
        <h3 className={cn("text-[22px]", night && "text-on-night-head")}>{e.title}</h3>
        <EventNote e={e} />
      </div>
      <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
        {e.bookingHref ? (
          <Button
            href={e.bookingHref}
            size="sm"
            variant={
              e.slug === "karthigai-deepam-2026" || night
                ? "saffron"
                : "outline-saffron"
            }
          >
            {e.bookingLabel ?? "Book sankalpa"}
          </Button>
        ) : null}
        {e.secondary ? (
          <Button href={e.secondary.href} size="sm" variant="white">
            {e.secondary.label}
          </Button>
        ) : null}
      </div>
    </article>
  );
}

/** Filtered "Upcoming" list; reads the hero chips' selection. */
export function EventList({ events }: Props) {
  const filter = eventFilter.useValue();
  const { enabled } = useMotionPreference();
  const listed = events.filter((e) => e.listed !== false && eventMatches(e, filter));
  const label = eventFilterOptions.find((o) => o.value === filter)?.label ?? "All";

  const weeklyNote =
    filter === "satsang" ? (
      <p className="card-ivory px-5 py-4 text-sm text-ink-2">
        Weekly satsang and classes run every week — days to be confirmed by the office. See{" "}
        <a href="#weekly" className="link-arrow">
          the ashram's weekly rhythm
        </a>
        .
      </p>
    ) : null;

  const list = (
    <div className="flex flex-col gap-3.5" aria-live="polite" aria-label={`${label} events`}>
      {weeklyNote}
      {listed.length === 0 ? (
        <p className="card px-5 py-6 text-ink-2 text-center">
          No dated events in this category yet. Choose “All” to see the full calendar.
        </p>
      ) : null}
      {enabled ? (
        <AnimatePresence initial={false} mode="popLayout">
          {listed.map((e) => (
            <motion.div
              key={e.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <EventRow e={e} />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        listed.map((e) => <EventRow key={e.slug} e={e} />)
      )}
    </div>
  );

  return list;
}
