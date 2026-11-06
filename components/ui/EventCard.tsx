import { ArrowLink } from "./ArrowLink";
import { cn } from "@/lib/cn";

type Props = {
  day: string;
  /** "Nov 2026 · Tuesday" */
  meta: string;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  featured?: boolean;
  className?: string;
};

/** Event tile — night variant for the headline event. */
export function EventCard({
  day,
  meta,
  title,
  description,
  cta,
  featured,
  className,
}: Props) {
  return (
    <article
      className={cn(
        "flex-[1_1_270px] rounded-card p-6 md:p-[26px] flex flex-col gap-3.5 card-hover",
        featured ? "card-night" : "card",
        className,
      )}
    >
      <div className="flex items-baseline gap-2.5">
        <span
          className={cn(
            "font-display text-[40px] md:text-[44px] leading-none",
            featured ? "text-gold-light" : "text-saffron-text",
          )}
        >
          {day}
        </span>
        <span className={cn("text-[15px]", featured ? "text-on-night-2" : "text-ink-2")}>
          {meta}
        </span>
      </div>
      <h3 className={cn("text-[22px]", featured && "text-on-night-head")}>{title}</h3>
      <p className={cn("text-sm", featured ? "text-on-night-2" : "text-ink-2")}>
        {description}
      </p>
      {cta ? (
        <ArrowLink href={cta.href} tone={featured ? "gold" : "saffron"} className="mt-auto">
          {cta.label}
        </ArrowLink>
      ) : null}
    </article>
  );
}
