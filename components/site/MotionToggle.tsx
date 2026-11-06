"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { useMotionPreference } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/cn";

export function MotionToggle({ className }: { className?: string }) {
  const t = useTranslations("Common");
  const { userEnabled, toggle } = useMotionPreference();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={userEnabled}
      aria-label={t("toggleMotion")}
      className={cn(
        "inline-flex items-center gap-1.5 h-10 px-3 rounded-pill border border-line-2 bg-white text-ink-2 text-[13px] font-medium hover:border-gold transition-colors",
        className,
      )}
    >
      <Sparkles size={15} aria-hidden className={userEnabled ? "text-saffron-text" : ""} />
      {userEnabled ? t("motionOn") : t("motionOff")}
    </button>
  );
}
