"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { images } from "@/lib/images";
import { cn } from "@/lib/cn";

const CHOSEN_KEY = "lang-chosen";

const fontFor: Record<Locale, string> = {
  en: "font-display",
  ta: "ta",
  te: "te",
  hi: "hi",
};

/**
 * First-visit language pop-up. Shown once; the choice is remembered in
 * localStorage (and in the `lang` cookie that the locale routing sets).
 */
export function LanguageWelcomeModal() {
  const t = useTranslations("LanguageModal");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Locale>(locale);
  const [remember, setRemember] = useState(true);
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let chosen = false;
    try {
      chosen =
        localStorage.getItem(CHOSEN_KEY) === "1" ||
        sessionStorage.getItem(CHOSEN_KEY) === "1";
    } catch {
      chosen = true;
    }
    if (!chosen) {
      const id = window.setTimeout(() => setOpen(true), 400);
      return () => window.clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    continueRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(locale);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function persist(choice: Locale) {
    try {
      const store = remember ? localStorage : sessionStorage;
      store.setItem(CHOSEN_KEY, "1");
      if (remember) localStorage.setItem("lang", choice);
      document.cookie = `lang=${choice}; path=/; max-age=${remember ? 31536000 : 0}; SameSite=Lax`;
    } catch {
      /* ignore */
    }
  }

  function close(choice: Locale) {
    persist(choice);
    setOpen(false);
    if (choice !== locale) {
      router.replace({ pathname, params } as never, { locale: choice });
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="lang-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-night"
        >
          <Image
            src={images.arunachalaNight.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 blur-[2px]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-night/55" aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lang-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[860px] max-h-[calc(100dvh-32px)] overflow-y-auto bg-ivory text-ink rounded-[22px] md:rounded-[28px] p-6 md:p-[40px_44px_36px] shadow-modal flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <Image
                src={images.logo.src}
                alt={images.logo.alt}
                width={72}
                height={72}
                className="w-14 h-14 md:w-[72px] md:h-[72px] object-contain shrink-0"
              />
              <div className="flex flex-col gap-1">
                <h1 id="lang-title" className="font-display text-[22px] md:text-[30px] leading-[1.15]">
                  {t("title")}
                </h1>
                <p className="text-[15px] md:text-[17px] text-ink-2">
                  <span lang="ta" className="ta">வணக்கம்</span> ·{" "}
                  <span lang="te" className="te">స్వాగతం</span> ·{" "}
                  <span lang="hi" className="hi">स्वागत है</span> · {t("subtitle")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" role="radiogroup" aria-label={t("selectLanguage")}>
              {locales.map((l) => {
                const info = localeNames[l];
                const on = selected === l;
                return (
                  <button
                    key={l}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    lang={info.htmlLang}
                    onClick={() => setSelected(l)}
                    onDoubleClick={() => close(l)}
                    className={cn(
                      "min-h-[130px] md:min-h-[150px] rounded-[20px] border-2 bg-white p-4 md:p-[22px_20px] flex flex-col gap-1.5 items-start text-left transition-[border-color,box-shadow,transform] duration-200 hover:border-gold hover:-translate-y-0.5",
                      on ? "border-saffron shadow-[0_0_0_4px_rgba(233,132,28,.25)]" : "border-line",
                    )}
                  >
                    <span className="flex w-full items-center">
                      <span className="text-[12px] md:text-[13px] tracking-[.14em] uppercase text-gold-text font-semibold">
                        {info.name}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "ml-auto w-[26px] h-[26px] rounded-full border-2 inline-flex items-center justify-center transition-colors",
                          on ? "bg-saffron border-saffron text-ink" : "border-line-2 text-transparent",
                        )}
                      >
                        <Check size={14} strokeWidth={3} />
                      </span>
                    </span>
                    <span className={cn("text-[26px] md:text-[34px] leading-[1.2]", fontFor[l])}>
                      {info.native}
                    </span>
                    <span className={cn("text-[13px] md:text-[15px] text-ink-2", fontFor[l])}>
                      {info.sample}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3.5">
              <label className="inline-flex items-center gap-2.5 text-[15px] text-ink-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-5 h-5 accent-saffron"
                />
                {t("remember")}
              </label>
              <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <span className="text-[13px] text-ink-2 hidden md:inline">{t("changeAnyTime")}</span>
                <button
                  ref={continueRef}
                  type="button"
                  onClick={() => close(selected)}
                  className="btn btn-saffron btn-lg w-full sm:w-auto"
                >
                  {t("continueIn", { language: localeNames[selected].native })}
                  <ArrowRight size={18} aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
