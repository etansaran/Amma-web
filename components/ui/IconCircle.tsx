import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  icon: LucideIcon;
  size?: number;
  className?: string;
  tone?: "saffron" | "sand" | "night" | "gold";
};

/** Saffron circle with a lucide icon — used on activity cards. */
export function IconCircle({ icon: Icon, size = 22, className, tone = "saffron" }: Props) {
  return (
    <span
      className={cn(
        "icon-circle",
        tone === "sand" && "bg-sand! text-saffron-text!",
        tone === "night" && "bg-night! text-gold-light!",
        tone === "gold" && "bg-gold-light! text-ink!",
        className,
      )}
      aria-hidden
    >
      <Icon size={size} strokeWidth={2} />
    </span>
  );
}
