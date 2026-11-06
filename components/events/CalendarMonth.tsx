"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMotionPreference } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/cn";
import type { AshramEvent } from "@/content/events";

type Props = {
  events: AshramEvent[];
  /** "YYYY-MM" to open on. */
  initialMonth: string;
  /** Inclusive bounds for the month switcher. */
  minMonth: string;
  maxMonth: string;
  className?: string;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const EASE = [0.22, 1, 0.36, 1] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function shiftMonth(ym: string, delta: number) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}`;
}
function monthLabel(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  });
}
function daysInMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}
function firstWeekday(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
}
/** Every ISO day an event covers (start → end inclusive). */
function eventDays(e: AshramEvent) {
  const days = [e.startDate];
  if (e.endDate && e.endDate !== e.startDate) {
    const [y, m, d] = e.startDate.split("-").map(Number);
    const cur = new Date(Date.UTC(y, m - 1, d));
    const end = e.endDate;
    for (let i = 0; i < 7; i++) {
      cur.setUTCDate(cur.getUTCDate() + 1);
      const iso = `${cur.getUTCFullYear()}-${pad(cur.getUTCMonth() + 1)}-${pad(cur.getUTCDate())}`;
      days.push(iso);
      if (iso === end) break;
    }
  }
  return days;
}

/* Today's ISO date, only known on the client — the server renders no "today" ring. */
const noop = () => () => {};
function readToday() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Month grid with Pournami / festival days marked, as in the Events design. */
export function CalendarMonth({ events, initialMonth, minMonth, maxMonth, className }: Props) {
  const [month, setMonth] = useState(initialMonth);
  const [dir, setDir] = useState(1);
  const today = useSyncExternalStore(noop, readToday, () => null);
  const { enabled } = useMotionPreference();
  const headingId = useId();

  const marks = new Map<string, AshramEvent[]>();
  for (const e of events) {
    if (e.type !== "pournami" && e.type !== "festival") continue;
    for (const day of eventDays(e)) {
      const list = marks.get(day) ?? [];
      list.push(e);
      marks.set(day, list);
    }
  }

  const total = daysInMonth(month);
  const offset = firstWeekday(month);
  const cells: (number | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  const canPrev = month > minMonth;
  const canNext = month < maxMonth;
  const go = (delta: number) => {
    setDir(delta);
    setMonth((m) => shiftMonth(m, delta));
  };

  const grid = (
    <div role="grid" aria-labelledby={headingId} className="flex flex-col gap-1.5">
      <div role="row" className="grid grid-cols-7 gap-1.5 text-[13px] text-center text-gold-text font-semibold">
        {WEEKDAYS.map((d) => (
          <span key={d} role="columnheader" aria-label={d}>
            {d}
          </span>
        ))}
      </div>
      <div role="rowgroup" className="grid grid-cols-7 gap-1.5 text-[15px] text-center">
        {cells.map((day, i) => {
          if (day === null) {
            return <span key={`pad-${i}`} role="gridcell" aria-hidden className="h-10" />;
          }
          const iso = `${month}-${pad(day)}`;
          const dayEvents = marks.get(iso);
          const isToday = today === iso;
          const base = "h-10 flex items-center justify-center rounded-[10px] transition-colors";
          if (dayEvents) {
            const names = dayEvents.map((e) => e.title).join("; ");
            return (
              <a
                key={iso}
                role="gridcell"
                href={`#${dayEvents[0].slug}`}
                aria-label={`${day} ${monthLabel(month)}: ${names}`}
                title={names}
                className={cn(
                  base,
                  "bg-saffron text-ink font-bold hover:bg-[#f0924f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night",
                  isToday && "ring-2 ring-line-2 ring-offset-1",
                )}
              >
                {day}
              </a>
            );
          }
          return (
            <span
              key={iso}
              role="gridcell"
              aria-label={`${day} ${monthLabel(month)}${isToday ? ", today" : ""}`}
              className={cn(base, isToday && "border border-line-2 font-semibold")}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={cn("card rounded-lg p-5 md:p-[26px] flex flex-col gap-3.5", className)}>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          aria-label="Previous month"
          disabled={!canPrev}
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full border border-line-2 bg-white text-ink inline-flex items-center justify-center hover:border-gold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} strokeWidth={2.5} aria-hidden />
        </button>
        <span id={headingId} aria-live="polite" className="font-display text-[20px] md:text-[22px]">
          {monthLabel(month)}
        </span>
        <button
          type="button"
          aria-label="Next month"
          disabled={!canNext}
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full border border-line-2 bg-white text-ink inline-flex items-center justify-center hover:border-gold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={18} strokeWidth={2.5} aria-hidden />
        </button>
      </div>

      {enabled ? (
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={month}
              initial={{ opacity: 0, x: 24 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 * dir }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {grid}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        grid
      )}

      <ul className="flex flex-col gap-1.5 text-[13px] text-ink-2 mt-auto">
        <li className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[3px] bg-saffron inline-block" aria-hidden />
          Deepam &amp; Pournami
        </li>
        <li className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[3px] border border-line-2 inline-block" aria-hidden />
          Today
        </li>
        <li className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[3px] bg-night inline-block" aria-hidden />
          Satsang every day · 9–11 AM, 4–6 PM
        </li>
      </ul>
    </div>
  );
}
