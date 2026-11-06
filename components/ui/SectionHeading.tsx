import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Optional Tamil line under the title. */
  tamil?: ReactNode;
  lede?: ReactNode;
  /** Right-aligned action (an ArrowLink usually). */
  action?: ReactNode;
  align?: "left" | "center";
  onNight?: boolean;
  className?: string;
  as?: "h1" | "h2";
};

/** Eyebrow + heading (+ lede), optionally with an action on the right. */
export function SectionHeading({
  eyebrow,
  title,
  tamil,
  lede,
  action,
  align = "left",
  onNight = false,
  className,
  as: Tag = "h2",
}: Props) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-wrap gap-4",
        centered
          ? "flex-col items-center text-center"
          : "items-end justify-between",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2.5 max-w-[680px]",
          centered && "items-center",
        )}
      >
        {eyebrow ? (
          <Eyebrow tone={onNight ? "gold" : "saffron"}>{eyebrow}</Eyebrow>
        ) : null}
        <Tag className={cn("h2", onNight && "text-on-night-head")}>{title}</Tag>
        {tamil ? (
          <p
            lang="ta"
            className={cn(
              "ta text-[20px] md:text-[22px] leading-snug",
              onNight ? "text-gold-light" : "text-saffron-text",
            )}
          >
            {tamil}
          </p>
        ) : null}
        {lede ? (
          <p className={cn("lede", onNight ? "text-on-night-body" : "text-ink-2")}>
            {lede}
          </p>
        ) : null}
      </div>
      {action ? <div className="min-w-0 max-w-full">{action}</div> : null}
    </div>
  );
}
