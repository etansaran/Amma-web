"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { usePathname } from "@/i18n/navigation";

const NO_BAR = ["/book-a-visit", "/pooja-booking", "/donate"];

/** Floating "back to top" control that appears after the visitor scrolls a long way. */
export function BackToTop() {
  const t = useTranslations("Common");
  const [visible, setVisible] = useState(false);
  const barHidden = NO_BAR.includes(usePathname());

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setVisible(window.scrollY > window.innerHeight * 1.5));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const reduce =
          document.documentElement.classList.contains("no-motion") ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      aria-label={t("backToTop")}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-4 md:right-6 z-30 w-12 h-12 rounded-full bg-night text-on-night shadow-night inline-flex items-center justify-center",
        barHidden ? "bottom-[calc(16px+env(safe-area-inset-bottom))] md:bottom-6" : "bottom-[calc(86px+env(safe-area-inset-bottom))] md:bottom-6",
        "transition-[opacity,transform,background-color] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:bg-night-2 active:scale-95",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none",
      )}
    >
      <ArrowUp size={20} aria-hidden />
    </button>
  );
}
