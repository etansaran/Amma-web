"use client";

import {
  Flame,
  Flower,
  Images,
  Moon,
  Users,
  Utensils,
  Video,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { scrollToId } from "@/components/ui/SharedFilter";
import { galleryFilter, galleryFilterOptions, type GalleryFilterValue } from "./galleryFilter";

const icons: Record<GalleryFilterValue, LucideIcon> = {
  all: Images,
  maataji: Flower,
  annadhanam: Utensils,
  deepam: Flame,
  mounasamy: Moon,
  satsang: Users,
  videos: Video,
};

/** Album chips in the Gallery hero. */
export function GalleryFilters() {
  const current = galleryFilter.useValue();
  return (
    <div role="group" aria-label="Albums" className="flex flex-wrap gap-2.5">
      {galleryFilterOptions.map((opt) => {
        const Icon = icons[opt.value];
        const active = opt.value === current;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => {
              galleryFilter.set(opt.value === "videos" ? "all" : opt.value);
              scrollToId(opt.target);
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
    </div>
  );
}
