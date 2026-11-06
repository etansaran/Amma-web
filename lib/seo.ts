import type { Metadata } from "next";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { site } from "./site";
import { images } from "./images";

type BuildMetadataArgs = {
  locale: Locale;
  /** Route without locale prefix, e.g. "/mounasamy/darshan". "/" for the home page. */
  path: string;
  /** ≤ 60 characters. Rendered as-is (no site-name suffix) when `absoluteTitle` is true. */
  title: string;
  /** ≤ 155 characters. */
  description: string;
  image?: { src: string; width: number; height: number; alt: string };
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

export function localePath(locale: Locale, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

/** Per-locale metadata with canonical + hreflang (x-default → English for now). */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = images.maatajiBanner,
  absoluteTitle = false,
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const info = localeNames[locale] ?? localeNames.en;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeNames[l].htmlLang.toLowerCase()] = localePath(l, path);
  }
  languages["x-default"] = localePath("en", path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: info.htmlLang.replace("-", "_"),
      url: localePath(locale, path),
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: image.src,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.src],
    },
  };
}
