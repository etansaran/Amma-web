import Image from "next/image";
import { useTranslations } from "next-intl";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = {
  image: SiteImage;
  /** Override alt text when the context needs something specific. */
  alt?: string;
  caption?: string;
  /** CSS aspect ratio, e.g. "3/4". Omit to use the natural ratio. */
  ratio?: string;
  /** object-position, e.g. "50% 15%". */
  position?: string;
  /** Gold frame as in the design's Mounasamy figure. */
  frame?: "none" | "gold" | "line";
  rounded?: "card" | "lg" | "arch";
  /** Show the Photo / Illustration badge. */
  badge?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** Max width on wide screens. */
  maxWidth?: number;
};

/** Photo with a "Photo" or "Illustration" badge — never show a generated image as a photo. */
export function PhotoFigure({
  image,
  alt,
  caption,
  ratio,
  position = "50% 50%",
  frame = "line",
  rounded = "lg",
  badge = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 480px",
  className,
  imgClassName,
  maxWidth,
}: Props) {
  const t = useTranslations("Common");
  const label = image.kind === "photo" ? t("photo") : t("illustration");
  const radius =
    rounded === "arch"
      ? "rounded-t-[200px] rounded-b-[28px]"
      : rounded === "card"
        ? "rounded-card"
        : "rounded-lg";
  return (
    <figure
      className={cn("m-0 w-full", className)}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-sand",
          radius,
          frame === "gold" && "border-[3px] border-gold",
          frame === "line" && "border border-line",
        )}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <Image
          src={image.src}
          alt={alt ?? image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          className={cn(
            "w-full h-full object-cover",
            ratio && "absolute inset-0",
            imgClassName,
          )}
          style={{ objectPosition: position }}
        />
        {badge ? (
          <span
            className={cn(
              "absolute left-3.5 bottom-3.5 text-[11px] tracking-[.14em] uppercase font-bold px-2 py-1 rounded-md",
              image.kind === "photo"
                ? "bg-saffron text-ink"
                : "bg-white/90 text-ink-2 border border-line",
            )}
          >
            {label}
          </span>
        ) : null}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[13px] text-ink-2">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
