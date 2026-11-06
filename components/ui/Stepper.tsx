import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  steps: string[];
  /** 0-based index of the current step. */
  current: number;
  className?: string;
};

/** Horizontal progress for the 4-step booking flows. */
export function Stepper({ steps, current, className }: Props) {
  return (
    <ol className={cn("flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3", className)} aria-label="Progress">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li
            key={step}
            aria-current={active ? "step" : undefined}
            className={cn(
              "flex items-center gap-2.5 h-11 pl-1.5 rounded-pill border text-sm font-semibold transition-[background-color,color,border-color] duration-300 shrink-0",
              active ? "pr-4 min-w-0 shrink" : "pr-1.5 sm:pr-4",
              active && "bg-night text-on-night border-night",
              done && "bg-green-bg text-green-text border-green-bg",
              !active && !done && "bg-white text-ink-2 border-line",
            )}
          >
            <span
              className={cn(
                "w-8 h-8 rounded-full inline-flex items-center justify-center text-[13px] font-bold",
                active && "bg-saffron text-ink",
                done && "bg-green-text text-white",
                !active && !done && "bg-sand text-ink-2",
              )}
            >
              {done ? <Check size={14} strokeWidth={3} aria-hidden /> : i + 1}
            </span>
            <span className={cn("truncate", !active && "sr-only sm:not-sr-only")}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
