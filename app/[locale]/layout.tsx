import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, localeNames, type Locale } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "../globals.css";

export const viewport: Viewport = {
  themeColor: "#0E1A3C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: site.name,
    template: "%s · Thiyaneswar Amma Ashram",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const htmlLang = localeNames[locale as Locale].htmlLang;

  return (
    <html lang={htmlLang} className={`${fontVariables} h-full`} suppressHydrationWarning>
      <head>
        <script
          // Apply the saved motion preference before first paint to avoid a flash.
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if(localStorage.getItem('motion')==='off'){document.documentElement.classList.add('no-motion')}}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <NextIntlClientProvider>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
