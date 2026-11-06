import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: ReactNode;
  note?: ReactNode;
  /** `night` is the "Total" card in the dakshina step. */
  tone?: "ivory" | "night";
  className?: string;
};

/** Small review-step card: gold eyebrow, bold line, grey note. */
export function SummaryCard({ eyebrow, title, note, tone = "ivory", className }: Props) {
  const night = tone === "night";
  return (
    <div
      className={cn(
        "flex-[1_1_200px] min-w-0 rounded-[14px] p-4",
        night ? "bg-night text-on-night" : "bg-ivory border border-line",
        className,
      )}
    >
      <p className={cn("eyebrow-gold", night && "text-gold-light!")}>{eyebrow}</p>
      <p
        className={cn(
          "mt-1 break-words",
          night ? "font-display text-[26px] leading-tight text-on-night-head" : "font-semibold",
        )}
      >
        {title}
      </p>
      {note ? (
        <p className={cn("text-sm", night ? "text-on-night-2" : "text-ink-2")}>{note}</p>
      ) : null}
    </div>
  );
}
