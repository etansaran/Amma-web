"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type Props = { compact?: boolean; className?: string };

/** Pill that opens a menu of the four languages, linking to the same page in each. */
export function LanguageSwitcher({ compact = false, className }: Props) {
  const t = useTranslations("LanguageModal");
  const tc = useTranslations("Common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = localeNames[locale];

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${tc("changeLanguage")}. ${t("currentLanguage", { language: current.name })}`}
        className={cn(
          "inline-flex items-center gap-1.5 h-10 rounded-pill border border-line-2 bg-white text-ink font-semibold text-sm hover:border-gold transition-colors",
          compact ? "px-2.5 text-[12px] font-bold" : "px-3.5",
        )}
      >
        <Globe size={16} aria-hidden />
        {compact ? current.code : current.native}
        {!compact ? <ChevronDown size={12} strokeWidth={2.5} aria-hidden /> : null}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            id={menuId}
            role="menu"
            aria-label={t("selectLanguage")}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[220px] p-1.5 rounded-2xl bg-white border border-line shadow-card"
          >
            {locales.map((l) => {
              const info = localeNames[l];
              const active = l === locale;
              return (
                <li key={l} role="none">
                  <Link
                    role="menuitem"
                    href={{ pathname, params } as never}
                    locale={l}
                    lang={info.htmlLang}
                    hrefLang={info.htmlLang}
                    onClick={() => {
                      setOpen(false);
                      try {
                        localStorage.setItem("lang", l);
                        localStorage.setItem("lang-chosen", "1");
                      } catch {
                        /* ignore */
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-ink text-[15px] hover:bg-sand",
                      active && "bg-ivory font-semibold",
                    )}
                  >
                    <span className="flex flex-col leading-tight">
                      <span className={cn(l === "ta" && "ta", l === "hi" && "hi", l === "te" && "te")}>
                        {info.native}
                      </span>
                      <span className="text-[12px] text-ink-2">{info.name}</span>
                    </span>
                    {active ? <Check size={16} className="text-saffron-text" aria-hidden /> : null}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
