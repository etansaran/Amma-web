"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import {
  CalendarCheck,
  Flame,
  HandHeart,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import { images } from "@/lib/images";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MotionToggle } from "./MotionToggle";
import { Portal } from "@/components/ui/Portal";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Headroom: hide the bar while reading down, bring it back on any scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        setScrolled(y > 8);
        if (y < 160) setHidden(false);
        else if (delta > 6) setHidden(true);
        else if (delta < -6) setHidden(false);
        lastY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock scroll while the sheet is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "sticky top-0 z-40 border-b bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85",
        "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform",
        scrolled ? "border-line-2 shadow-[0_6px_24px_rgba(14,26,60,.08)]" : "border-line",
        hidden && !open && "-translate-y-full shadow-none",
      )}
    >
      <nav aria-label={t("mainNavigation")} className="container-site py-2.5 lg:py-3.5 flex flex-nowrap lg:flex-wrap items-center gap-x-3 lg:gap-x-7 gap-y-3">
        <Link href="/" className="flex flex-1 lg:flex-none items-center gap-2.5 lg:gap-3 text-ink min-w-0">
          <Image
            src={images.logo.src}
            alt={images.logo.alt}
            width={54}
            height={54}
            priority
            className={cn("w-10 h-10 object-contain transition-[width,height] duration-300", scrolled ? "lg:w-11 lg:h-11" : "lg:w-[54px] lg:h-[54px]")}
          />
          <span className="flex flex-col leading-[1.15] min-w-0">
            <span className="font-display text-[13px] sm:text-[16px] lg:text-[19px] leading-[1.15] lg:whitespace-nowrap">
              {tc("siteName")}
            </span>
            <span lang="ta" className="ta text-[10px] lg:text-[12px] text-gold-text truncate">
              <span className="lg:hidden">{tc("place")}</span>
              <span className="hidden lg:inline">{tc("siteSubtitle")}</span>
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex flex-wrap justify-end gap-x-6 gap-y-1 order-last basis-full pt-2.5 mt-1 border-t border-line/70 text-[15px] font-medium">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-block py-1 text-ink hover:text-saffron-text transition-colors",
                    "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-saffron after:origin-left after:transition-transform after:duration-300 after:ease-[cubic-bezier(.22,1,.36,1)]",
                    active ? "text-saffron-text after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop controls */}
        <div className="hidden lg:flex items-center gap-2.5 ml-auto">
          <MotionToggle />
          <LanguageSwitcher />
          <Link href="/donate" className="btn btn-saffron btn-sm">
            {tc("donate")}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2 ml-auto shrink-0">
          <LanguageSwitcher compact />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={tc("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="w-11 h-11 rounded-xl border border-line-2 bg-white text-ink inline-flex items-center justify-center hover:border-gold transition-colors"
          >
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </nav>

      <Portal>
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-night/60 lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.aside
              key="sheet"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t("mainNavigation")}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(88vw,380px)] bg-ivory shadow-modal flex flex-col lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-line">
                <span className="flex items-center gap-2.5">
                  <Image
                    src={images.logo.src}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="font-display text-[15px] leading-tight">{tc("siteName")}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={tc("closeMenu")}
                  className="w-11 h-11 rounded-xl border border-line-2 bg-white inline-flex items-center justify-center"
                >
                  <X size={20} aria-hidden />
                </button>
              </div>

              <ul className="flex flex-col px-3 py-3">
                {navItems.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.key}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={close}
                        className={cn(
                          "flex items-center justify-between px-3 py-3 rounded-xl text-[17px] font-medium text-ink hover:bg-sand",
                          active && "bg-sand text-saffron-text",
                        )}
                      >
                        {t(item.key)}
                        {active ? <Flame size={16} className="text-saffron" aria-hidden /> : null}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="px-5 pb-4 flex flex-col gap-3">
                <p className="eyebrow-gold">{t("quickLinks")}</p>
                <div className="grid grid-cols-2 gap-2.5">
                  <Link href="/book-a-visit" onClick={close} className="card px-3.5 py-3 flex items-center gap-2.5 text-sm font-semibold text-ink hover:border-gold">
                    <CalendarCheck size={18} className="text-saffron-text" aria-hidden />
                    {t("bookVisit")}
                  </Link>
                  <Link href="/pooja-booking" onClick={close} className="card px-3.5 py-3 flex items-center gap-2.5 text-sm font-semibold text-ink hover:border-gold">
                    <Flame size={18} className="text-saffron-text" aria-hidden />
                    {t("poojaBooking")}
                  </Link>
                  <Link href="/tiruvannamalai-guide" onClick={close} className="card px-3.5 py-3 flex items-center gap-2.5 text-sm font-semibold text-ink hover:border-gold col-span-2">
                    <HandHeart size={18} className="text-saffron-text" aria-hidden />
                    {t("guide")}
                  </Link>
                </div>
                <div className="flex items-center gap-2.5 pt-1">
                  <MotionToggle />
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-1.5 h-10 px-3 rounded-pill border border-line-2 bg-white text-ink-2 text-[13px] font-medium"
                  >
                    <Phone size={14} aria-hidden /> {tc("callUs")}
                  </a>
                </div>
              </div>

              <div className="mt-auto px-5 py-4 border-t border-line flex gap-2.5">
                <Link href="/book-a-visit" onClick={close} className="btn btn-outline-night flex-1 h-12">
                  {tc("bookVisit")}
                </Link>
                <Link href="/donate" onClick={close} className="btn btn-saffron flex-1 h-12">
                  {tc("donate")}
                </Link>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
      </Portal>
    </header>
  );
}
