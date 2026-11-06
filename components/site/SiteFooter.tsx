import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsappIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { Link } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import {
  footerParticipateLinks,
  footerVisitLinks,
  legalLinks,
  site,
} from "@/lib/site";
import { images } from "@/lib/images";
import { cn } from "@/lib/cn";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tc = useTranslations("Common");
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-on-night-2 pt-14 md:pt-[72px] pb-[calc(28px+env(safe-area-inset-bottom))] md:pb-7">
      <div className="container-site flex flex-wrap gap-10">
        <div className="flex-[2_1_320px] flex flex-col gap-3.5">
          <div className="flex items-center gap-3">
            <Image
              src={images.logo.src}
              alt=""
              width={56}
              height={56}
              className="w-14 h-14 object-contain"
            />
            <span className="font-display text-[20px] text-on-night-head leading-tight">
              {tc("siteName")}
              <span lang="ta" className="ta block text-[13px] text-on-night-2 mt-1">
                {site.motto}
              </span>
            </span>
          </div>
          <p className="text-sm max-w-[420px]">{t("about")}</p>
          <div className="flex gap-3">
            {[
              { href: site.social.youtube, label: "YouTube", Icon: YoutubeIcon },
              { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
              { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-night-line-2 inline-flex items-center justify-center text-on-night hover:bg-night-2 hover:border-gold transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex-[1_1_160px] flex flex-col gap-2.5 text-[15px]">
          <p className="eyebrow-gold text-gold-light! mb-1">{t("visit")}</p>
          {footerVisitLinks.map((l) => (
            <Link key={l.key} href={l.href} className="text-on-night hover:text-gold-light">
              {t(l.key)}
            </Link>
          ))}
        </div>

        <div className="flex-[1_1_160px] flex flex-col gap-2.5 text-[15px]">
          <p className="eyebrow-gold text-gold-light! mb-1">{t("participate")}</p>
          {footerParticipateLinks.map((l) => (
            <Link key={l.key} href={l.href} className="text-on-night hover:text-gold-light">
              {t(l.key)}
            </Link>
          ))}
        </div>

        <address className="not-italic flex-[1_1_240px] flex flex-col gap-2.5 text-[15px]">
          <p className="eyebrow-gold text-gold-light! mb-1">{t("contact")}</p>
          <p className="flex gap-2.5 text-on-night">
            <MapPin size={18} className="shrink-0 mt-1 text-gold-light" aria-hidden />
            <span>
              {t("addressLine1")}
              <br />
              {t("addressLine2")}
              <br />
              {t("addressLine3")}
            </span>
          </p>
          <a href={site.phoneHref} className="flex items-center gap-2.5 text-on-night hover:text-gold-light">
            <Phone size={18} className="shrink-0 text-gold-light" aria-hidden />
            {site.phone}
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-on-night hover:text-gold-light"
          >
            <WhatsappIcon size={18} className="shrink-0 text-gold-light" />
            {site.whatsapp}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-on-night hover:text-gold-light break-all">
            <Mail size={18} className="shrink-0 text-gold-light" aria-hidden />
            {site.email}
          </a>
          <p className="flex items-center gap-2.5 text-on-night">
            <Clock size={18} className="shrink-0 text-gold-light" aria-hidden />
            {t("visitingHours")}
          </p>
          <p className="mt-1.5 text-[13px] flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{t("languages")}:</span>
            {locales.map((l, i) => (
              <span key={l} className="inline-flex items-center gap-2">
                {i > 0 ? <span aria-hidden>·</span> : null}
                <Link
                  href="/"
                  locale={l}
                  lang={localeNames[l].htmlLang}
                  hrefLang={localeNames[l].htmlLang}
                  className={cn(
                    "text-gold-light hover:text-on-night-head",
                    l === locale && "underline underline-offset-4",
                    l === "ta" && "ta",
                    l === "hi" && "hi",
                    l === "te" && "te",
                  )}
                >
                  {localeNames[l].native}
                </Link>
              </span>
            ))}
          </p>
        </address>
      </div>

      <div className="container-site mt-10 pt-5 border-t border-night-line flex flex-wrap justify-between gap-x-6 gap-y-2.5 text-[13px]">
        <span>
          {t("copyright", { year })} · {t("registration")}
        </span>
        <span className="flex flex-wrap gap-x-[18px] gap-y-1">
          {legalLinks.map((l) => (
            <Link key={l.key} href={l.href} className="text-on-night-2 hover:text-on-night">
              {t(l.key)}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}
