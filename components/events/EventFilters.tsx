"use client";

import { BookOpen, CalendarPlus, Flame, LayoutGrid, Moon, Users, Utensils } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { scrollToId } from "@/components/ui/SharedFilter";
import { eventFilter, eventFilterOptions, type EventFilter } from "./eventFilter";

const icons: Record<EventFilter, LucideIcon> = {
  all: LayoutGrid,
  pournami: Moon,
  festival: Flame,
  satsang: Users,
  class: BookOpen,
  annadhanam: Utensils,
};

/** Hero chip row: All / Pournami / Festivals / Satsang & classes / Annadhanam seva. */
export function EventFilters() {
  const current = eventFilter.useValue();

  return (
    <div
      role="group"
      aria-label="Filter events"
      className="flex flex-wrap items-center gap-2.5"
    >
      {eventFilterOptions.map((opt) => {
        const Icon = icons[opt.value];
        const active = opt.value === current;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => {
              eventFilter.set(opt.value);
              scrollToId("list");
            }}
            className={cn(
              "inline-flex items-center gap-2 h-11 px-5 rounded-pill text-[15px] font-semibold transition-colors duration-200",
              active
                ? "bg-night text-on-night"
                : "bg-white text-ink border border-line-2 hover:border-gold",
            )}
          >
            <Icon size={15} aria-hidden className={active ? "text-gold-light" : "text-saffron-text"} />
            {opt.label}
          </button>
        );
      })}
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 h-11 px-[18px] rounded-pill bg-white text-ink border border-line-2 hover:border-gold text-sm font-semibold sm:ml-auto transition-colors"
      >
        <CalendarPlus size={16} aria-hidden />
        Subscribe (Google / Apple calendar)
      </Link>
    </div>
  );
}
