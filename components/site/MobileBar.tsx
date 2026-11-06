"use client";

import { useTranslations } from "next-intl";
import { CalendarCheck, HandHeart } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";

/** Pages that already have their own primary form action. */
const HIDE_ON = ["/book-a-visit", "/pooja-booking", "/donate"];

/** Sticky bottom bar on phones: Book a visit · Donate. */
export function MobileBar() {
  const t = useTranslations("Common");
  const pathname = usePathname();
  if (HIDE_ON.includes(pathname)) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 md:hidden flex gap-2.5 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-ivory/95 backdrop-blur border-t border-line">
      <Link
        href="/book-a-visit"
        className="btn btn-outline-night flex-1 min-w-0 h-[46px] px-3 text-[14px] whitespace-normal leading-tight text-center"
      >
        <CalendarCheck size={18} className="shrink-0" aria-hidden />
        {t("bookVisitShort")}
      </Link>
      <Link
        href="/donate"
        className="btn btn-saffron flex-1 min-w-0 h-[46px] px-3 text-[14px] whitespace-normal leading-tight text-center"
      >
        <HandHeart size={18} className="shrink-0" aria-hidden />
        {t("donate")}
      </Link>
    </div>
  );
}
