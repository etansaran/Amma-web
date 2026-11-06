"use client";

import { useState } from "react";
import { Calendar, Clock, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { images } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { Post } from "@/content/posts";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { categoryLabels, formatDate, type Category } from "./postMeta";

/** Light, serialisable card data (no body) passed from the server page. */
export type PostCard = Pick<
  Post,
  "slug" | "title" | "excerpt" | "category" | "publishedAt" | "readMinutes" | "image"
>;


const chips: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Guide", label: categoryLabels.Guide },
  { key: "Mounasamy", label: categoryLabels.Mounasamy },
  { key: "Festivals", label: categoryLabels.Festivals },
  { key: "Ashram life", label: categoryLabels["Ashram life"] },
  { key: "Teachings", label: categoryLabels.Teachings },
];

type Props = {
  posts: PostCard[];
  /** Slug of the post highlighted with a saffron border (the official Mounasamy account). */
  highlightSlug?: string;
};

/**
 * Category chips (aria-pressed), a search box and the filtered card grid.
 * Pure client state; no network.
 */
export function PostFilter({ posts, highlightSlug }: Props) {
  const [active, setActive] = useState<"all" | Category>("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visible = posts.filter((p) => {
    if (active !== "all" && p.category !== active) return false;
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      categoryLabels[p.category].toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter articles">
        {chips.map((c) => {
          const pressed = active === c.key;
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(c.key)}
              className={cn(
                "h-11 px-5 rounded-pill text-[15px] font-semibold border transition-colors",
                pressed
                  ? "bg-night text-on-night border-night"
                  : "bg-white text-ink border-line-2 hover:border-saffron",
              )}
            >
              {c.label}
            </button>
          );
        })}
        <label className="w-full sm:w-auto sm:ml-auto inline-flex items-center gap-2 h-11 px-3.5 rounded-pill bg-white border border-line-2 focus-within:border-saffron">
          <Search size={16} className="text-ink-2 shrink-0" aria-hidden />
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="bg-transparent outline-none text-[15px] w-full sm:w-[180px] min-w-0"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "article" : "articles"} shown
      </p>

      {visible.length === 0 ? (
        <p className="card p-6 text-ink-2">
          No articles match that search yet. Try another word, or choose “All”.
        </p>
      ) : (
        <RevealGroup
          key={`${active}-${q}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {visible.map((p) => {
            const highlighted = p.slug === highlightSlug;
            return (
              <RevealItem key={p.slug} as="article" className="h-full">
                <Link
                  href={`/blog/${p.slug}`}
                  className={cn(
                    "card card-hover overflow-hidden flex flex-col h-full text-ink rounded-[20px]",
                    highlighted && "border-2 border-saffron",
                  )}
                >
                  <PhotoFigure
                    image={images[p.image]}
                    ratio="16/10"
                    frame="none"
                    rounded="card"
                    position={p.image === "mounasamyGarland" ? "50% 15%" : "50% 50%"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="rounded-b-none [&>div]:rounded-b-none"
                  />
                  <span className="p-[22px] flex flex-col gap-2 flex-1">
                    <span className={cn("eyebrow-gold", highlighted && "text-saffron-text!")}>
                      {highlighted ? "Mounasamy Siddhar · official" : categoryLabels[p.category]}
                    </span>
                    <span className="font-display text-[22px] leading-[1.3]">{p.title}</span>
                    <span className="text-sm text-ink-2">{p.excerpt}</span>
                    <span className="mt-auto pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-2">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={14} aria-hidden /> {formatDate(p.publishedAt, true)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={14} aria-hidden /> {p.readMinutes} min
                      </span>
                      <span className="inline-flex gap-1" aria-label="Available in Tamil, English, Telugu and Hindi">
                        {["TA", "EN", "TE", "HI"].map((l) => (
                          <span key={l} className="px-1.5 py-px border border-line rounded-[4px] text-[11px] font-semibold">
                            {l}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      )}
    </div>
  );
}
