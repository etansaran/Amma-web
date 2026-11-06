import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";

type Messages = Record<string, unknown>;

function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = out[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      current &&
      typeof current === "object" &&
      !Array.isArray(current)
    ) {
      out[key] = deepMerge(current as Messages, value as Messages);
    } else {
      out[key] = value;
    }
  }
  return out;
}

async function loadMessages(locale: Locale): Promise<Messages> {
  const en = (await import("../messages/en.json")).default as Messages;
  if (locale === "en") return en;
  const local = (await import(`../messages/${locale}.json`)).default as Messages;
  // English is the fallback for any string not yet translated.
  return deepMerge(en, local);
}

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }
  const resolved = locale as Locale;

  return {
    locale: resolved,
    messages: await loadMessages(resolved),
    timeZone: "Asia/Kolkata",
  };
});
