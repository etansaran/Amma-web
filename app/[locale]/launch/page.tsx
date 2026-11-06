import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { LaunchScreen } from "@/components/launch/LaunchScreen";
import { MusicToggle } from "@/components/site/MusicToggle";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

export const metadata: Metadata = {
  title: { absolute: `Website launch — ${site.name}` },
  description: "Launch ceremony screen for thiyaneswaramma.org.",
  robots: { index: false, follow: false },
};

/** Full-screen launch ceremony (no site header/footer). Not linked or indexed. */
export default async function LaunchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <LaunchScreen />
      <MusicToggle tone="dark" />
      <RevealObserver />
    </>
  );
}
