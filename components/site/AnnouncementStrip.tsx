import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

/** Night strip above the header with the next big date. */
export function AnnouncementStrip() {
  const t = useTranslations("Announcement");
  return (
    <div className="bg-night text-on-night text-[13px] md:text-sm">
      <div className="container-site py-2 md:py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
        <span className="inline-flex items-center gap-2.5">
          <span className="lamp-dot" aria-hidden />
          <span className="hidden sm:inline">{t("text")}</span>
          <span className="sm:hidden">{t("textShort")}</span>
        </span>
        <Link
          href="/annadhanam"
          className="inline-flex items-center gap-1.5 text-gold-light font-semibold hover:text-on-night-head"
        >
          <span className="hidden sm:inline">{t("cta")}</span>
          <span className="sm:hidden">{t("ctaShort")}</span>
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
