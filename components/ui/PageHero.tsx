import type { ReactNode } from "react";
import Image from "next/image";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { images } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = {
  variant?: "sand" | "night";
  breadcrumbs?: Crumb[];
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Tamil line under the title. */
  tamil?: ReactNode;
  lede?: ReactNode;
  /** Buttons / links row. */
  actions?: ReactNode;
  /** Small facts row under the actions (chips etc.). */
  extra?: ReactNode;
  /** Right column — a <PhotoFigure>, a card, etc. */
  aside?: ReactNode;
  /** Night variant: show the Arunachala backdrop. */
  backdrop?: boolean;
  className?: string;
  /** Column widths; defaults suit text-left / image-right. */
  asideClassName?: string;
};

/** Inner-page hero in sand (default) or night. */
export function PageHero({
  variant = "sand",
  breadcrumbs,
  eyebrow,
  title,
  tamil,
  lede,
  actions,
  extra,
  aside,
  backdrop = variant === "night",
  className,
  asideClassName,
}: Props) {
  const night = variant === "night";
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-line",
        night ? "bg-night text-on-night border-night-line" : "bg-sand",
        className,
      )}
    >
      {night && backdrop ? (
        <>
          <Image
            src={images.arunachalaNight.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50 animate-drift"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,26,60,.96)_0%,rgba(14,26,60,.82)_45%,rgba(14,26,60,.35)_100%)]"
          />
        </>
      ) : null}
      <div className="container-site relative py-14 md:py-[72px] flex flex-wrap items-center gap-10 md:gap-14">
        <Reveal immediate className="flex-[1_1_520px] flex flex-col gap-4 md:gap-[18px] min-w-0">
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} onNight={night} /> : null}
          {eyebrow ? <Eyebrow tone={night ? "gold" : "saffron"}>{eyebrow}</Eyebrow> : null}
          <h1 className={cn("h1-page", night && "text-on-night-head")}>{title}</h1>
          {tamil ? (
            <p
              lang="ta"
              className={cn(
                "ta text-[20px] md:text-[22px] leading-snug",
                night ? "text-gold-light" : "text-saffron-text",
              )}
            >
              {tamil}
            </p>
          ) : null}
          {lede ? (
            <p
              className={cn(
                "lede max-w-[600px]",
                night ? "text-on-night-body" : "text-ink-2",
              )}
            >
              {lede}
            </p>
          ) : null}
          {actions ? (
            <div className="flex flex-wrap gap-3.5 mt-1.5">{actions}</div>
          ) : null}
          {extra ? <div className="mt-2">{extra}</div> : null}
        </Reveal>
        {aside ? (
          <Reveal
            immediate
            delay={0.15}
            className={cn(
              "flex-[0_1_400px] w-full flex flex-col items-center gap-4 min-w-0",
              asideClassName,
            )}
          >
            {aside}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
