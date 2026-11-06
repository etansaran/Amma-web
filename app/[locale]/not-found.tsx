import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");
  return (
    <section className="bg-sand border-b border-line">
      <div className="container-site py-24 md:py-32 flex flex-col items-center text-center gap-5 max-w-[640px]">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="h1-page">{t("title")}</h1>
        <p className="lede text-ink-2">{t("body")}</p>
        <div className="flex flex-wrap justify-center gap-3.5 mt-2">
          <Button href="/">{t("cta")}</Button>
          <Button href="/contact" variant="outline-saffron">
            {t("contact")}
          </Button>
        </div>
      </div>
    </section>
  );
}
