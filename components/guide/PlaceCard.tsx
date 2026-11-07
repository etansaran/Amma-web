import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type Place = {
  name: string;
  tamil: string;
  text: string;
  where: string;
  visit?: string;
  /** Marks our own ashram — rendered in night colours. */
  ours?: boolean;
  link?: { href: string; label: string };
};

/** Numbered card for list guides (places, temples, ashrams). */
export function PlaceCard({ p, i }: { p: Place; i: number }) {
  return (
    <article
      className={cn(
        "rounded-2xl p-5 md:p-6 flex flex-col gap-2.5 h-full",
        p.ours ? "bg-night text-on-night border border-gold/50" : "card card-hover",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "w-9 h-9 rounded-full inline-flex items-center justify-center font-display text-[17px] shrink-0",
            p.ours ? "bg-saffron text-ink" : "bg-sand text-saffron-text",
          )}
          aria-hidden
        >
          {i + 1}
        </span>
        <div className="min-w-0">
          <h3 className={cn("text-[20px] md:text-[21px] leading-snug", p.ours && "text-on-night-head")}>{p.name}</h3>
          <p lang="ta" className={cn("ta text-[15px]", p.ours ? "text-gold-light" : "text-saffron-text")}>
            {p.tamil}
          </p>
        </div>
      </div>
      <p className={cn("text-[15px]", p.ours ? "text-on-night-body" : "text-ink-2")}>{p.text}</p>
      <p className={cn("text-[13px] font-semibold", p.ours ? "text-gold-light" : "text-gold-text")}>{p.where}</p>
      {p.visit ? <p className={cn("text-[13px]", p.ours ? "text-on-night-2" : "text-ink-2")}>{p.visit}</p> : null}
      {p.link ? (
        <Link href={p.link.href} className={cn("mt-auto", p.ours ? "link-arrow-gold" : "link-arrow")}>
          {p.link.label} →
        </Link>
      ) : null}
    </article>
  );
}
