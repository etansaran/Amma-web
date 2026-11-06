import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = Omit<ComponentProps<"input">, "type" | "className" | "children" | "size"> & {
  children: ReactNode;
  type?: "checkbox" | "radio";
  className?: string;
  /** Larger, card-like pill (used for payment methods). */
  size?: "md" | "lg";
};

/** Pill-shaped checkbox / radio with its label — "Satsang", "Post prasadam to me". */
export function CheckPill({ children, type = "checkbox", className, size = "md", ...input }: Props) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2.5 min-h-11 border border-line-2 bg-white text-[15px] text-ink cursor-pointer select-none transition-colors",
        "hover:border-gold has-[:checked]:border-saffron has-[:checked]:bg-amber-bg/60 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-saffron/25",
        size === "lg"
          ? "min-h-12 px-4 py-2.5 rounded-[14px] font-semibold has-[:checked]:border-2"
          : "px-3.5 py-2 rounded-pill",
        className,
      )}
    >
      <input type={type} className="accent-saffron w-4 h-4 shrink-0" {...input} />
      <span>{children}</span>
    </label>
  );
}
