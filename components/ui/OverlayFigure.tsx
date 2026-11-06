import type { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = {
  image: SiteImage;
  /** Override alt text when the context needs something specific. */
  alt?: string;
  /** Display-font line over the gradient at the bottom. */
  title: ReactNode;
  /** Small muted line under the title. */
  sub?: ReactNode;
  /** CSS aspect ratio, e.g. "4/5". */
  ratio?: string;
  /** object-position, e.g. "50% 20%". */
  position?: string;
  frame?: "gold" | "line" | "none";
  /** Show the Photo / Illustration badge (keep it on for people photos). */
  badge?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Photo with a caption printed over a night gradient at the bottom —
 * the "Maataji — the guru" portrait cards and the darshan photo strip.
 */
export function OverlayFigure({
  image,
  alt,
  title,
  sub,
  ratio = "4/5",
  position = "50% 30%",
  frame = "line",
  badge = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 420px",
  className,
}: Props) {
  const t = useTranslations("Common");
  const label = image.kind === "photo" ? t("photo") : t("illustration");
  return (
    <figure
      className={cn(
        "relative m-0 w-full overflow-hidden rounded-[22px] bg-night",
        frame === "gold" && "border-[3px] border-gold",
        frame === "line" && "border border-line",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={image.src}
        alt={alt ?? image.alt}
        fill
        loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-[18px] pb-3.5 pt-10 bg-[linear-gradient(180deg,rgba(14,26,60,0),rgba(14,26,60,.85))] text-on-night">
        <span className="min-w-0">
          <span className="block font-display text-[18px] md:text-[22px] leading-tight text-on-night-head">
            {title}
          </span>
          {sub ? (
            <span className="block mt-0.5 text-[13px] text-on-night-2">{sub}</span>
          ) : null}
        </span>
        {badge ? (
          <span
            className={cn(
              "shrink-0 text-[11px] tracking-[.14em] uppercase font-bold px-2 py-1 rounded-md",
              image.kind === "photo"
                ? "bg-saffron text-ink"
                : "bg-white/90 text-ink-2 border border-line",
            )}
          >
            {label}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
