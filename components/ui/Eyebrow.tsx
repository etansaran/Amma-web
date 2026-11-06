import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** `gold` is used on night backgrounds. */
  tone?: "saffron" | "gold" | "gold-text";
  className?: string;
};

export function Eyebrow({ children, tone = "saffron", className }: Props) {
  return (
    <p
      className={cn(
        "eyebrow",
        tone === "gold" && "text-gold-light!",
        tone === "gold-text" && "text-gold-text!",
        className,
      )}
    >
      {children}
    </p>
  );
}
