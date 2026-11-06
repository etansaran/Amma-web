"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Volume2, VolumeX } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import {
  isChantPlaying,
  resumeIfRemembered,
  subscribeChant,
  toggleChant,
} from "@/lib/chant";
import { cn } from "@/lib/cn";

const NO_BAR = ["/book-a-visit", "/pooja-booking", "/donate", "/launch"];

/** Floating chant on/off control (bottom-left). Soft volume, off by default. */
export function MusicToggle({ tone = "light" }: { tone?: "light" | "dark" }) {
  const t = useTranslations("Common");
  const playing = useSyncExternalStore(subscribeChant, isChantPlaying, () => false);
  const barHidden = NO_BAR.includes(usePathname());

  useEffect(() => {
    resumeIfRemembered();
  }, []);

  return (
    <button
      type="button"
      onClick={toggleChant}
      aria-pressed={playing}
      aria-label={playing ? t("chantPause") : t("chantPlay")}
      title={playing ? t("chantPause") : t("chantPlay")}
      className={cn(
        "group fixed left-4 md:left-6 z-30 h-12 rounded-full inline-flex items-center gap-2.5 pl-3 pr-3 md:pr-4 shadow-night transition-[background-color,border-color,transform] duration-300 active:scale-95",
        barHidden
          ? "bottom-[calc(16px+env(safe-area-inset-bottom))] md:bottom-6"
          : "bottom-[calc(86px+env(safe-area-inset-bottom))] md:bottom-6",
        tone === "dark"
          ? "bg-night-2/90 border border-night-line-2 text-on-night hover:border-gold"
          : "bg-white/95 border border-line-2 text-ink hover:border-gold backdrop-blur",
      )}
    >
      <span
        className={cn(
          "w-8 h-8 rounded-full inline-flex items-center justify-center shrink-0",
          playing ? "bg-saffron text-ink" : tone === "dark" ? "bg-night text-gold-light" : "bg-sand text-saffron-text",
        )}
        aria-hidden
      >
        {playing ? <Volume2 size={17} /> : <VolumeX size={17} />}
      </span>
      {/* Small "now playing" bars — CSS only, still under reduced motion */}
      <span className={cn("chant-bars items-end gap-[3px] h-4", playing ? "inline-flex" : "hidden")} aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="hidden md:inline text-[13px] font-semibold whitespace-nowrap">
        <span lang="ta" className="ta">ஓம் நமசிவாய</span>
      </span>
    </button>
  );
}
