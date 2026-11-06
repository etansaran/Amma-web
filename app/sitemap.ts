import type { MetadataRoute } from "next";
import { locales, localeNames } from "@/i18n/routing";
import { allRoutes, site } from "@/lib/site";
import { posts } from "@/content/posts";

export const dynamic = "force-static";

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeNames[l].htmlLang.toLowerCase()] = `${site.url}/${l}${path === "/" ? "" : path}`;
  }
  languages["x-default"] = `${site.url}/en${path === "/" ? "" : path}`;
  return locales.map((l) => ({
    url: `${site.url}/${l}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const route of allRoutes) {
    const legal = ["/privacy", "/terms", "/refund-policy", "/accessibility"].includes(route);
    const priority = route === "/" ? 1 : route.startsWith("/mounasamy") ? 0.9 : legal ? 0.3 : 0.7;
    out.push(...entry(route, priority, route === "/events" || route === "/blog" ? "weekly" : "monthly"));
  }
  for (const post of posts) {
    out.push(...entry(`/blog/${post.slug}`, 0.6, "monthly"));
  }
  return out;
}
