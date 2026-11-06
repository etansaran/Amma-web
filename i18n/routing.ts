import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ta", "te", "hi"] as const;
export type Locale = (typeof locales)[number];

/**
 * Tamil is the ashram's first language and will become the default locale
 * once the Tamil copy is in place. Until then English is the default so that
 * every page reads correctly for the first visitors.
 */
export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeCookie: {
    name: "lang",
    maxAge: 60 * 60 * 24 * 365,
  },
});

export const localeNames: Record<
  Locale,
  { code: string; name: string; native: string; sample: string; htmlLang: string }
> = {
  en: {
    code: "EN",
    name: "English",
    native: "English",
    sample: "Welcome to the ashram",
    htmlLang: "en-IN",
  },
  ta: {
    code: "TA",
    name: "Tamil",
    native: "தமிழ்",
    sample: "ஆசிரமத்திற்கு வரவேற்கிறோம்",
    htmlLang: "ta-IN",
  },
  te: {
    code: "TE",
    name: "Telugu",
    native: "తెలుగు",
    sample: "ఆశ్రమానికి స్వాగతం",
    htmlLang: "te-IN",
  },
  hi: {
    code: "HI",
    name: "Hindi",
    native: "हिन्दी",
    sample: "आश्रम में आपका स्वागत है",
    htmlLang: "hi-IN",
  },
};
