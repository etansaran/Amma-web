import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { AnnouncementStrip } from "@/components/site/AnnouncementStrip";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileBar } from "@/components/site/MobileBar";
import { LanguageWelcomeGate } from "@/components/site/LanguageWelcomeGate";
import { BackToTop } from "@/components/site/BackToTop";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema, placeOfWorshipSchema } from "@/lib/schema";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("Common");
  return (
    <>
      <a href="#main" className="skip-link">
        {t("skipToContent")}
      </a>
      <JsonLd data={[organizationSchema(), placeOfWorshipSchema()]} />
      <AnnouncementStrip />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 pb-[78px] md:pb-0 outline-none">
        {children}
      </main>
      <SiteFooter />
      <MobileBar />
      <BackToTop />
      <LanguageWelcomeGate />
      <RevealObserver />
    </>
  );
}
