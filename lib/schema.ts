import { site } from "./site";
import { images } from "./images";
import { absoluteUrl } from "./seo";

type JsonLd = Record<string, unknown>;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: `${site.address.locality}, ${site.address.city}`,
  postalCode: site.address.postalCode,
  addressRegion: site.address.region,
  addressCountry: "IN",
};

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "NGO"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: ["Thiyaneswar Amma Ashram", "Sri Thiyaneswar Amma Asramam"],
    url: site.url,
    logo: absoluteUrl(images.logo.src),
    image: absoluteUrl(images.maatajiBanner.src),
    foundingDate: site.trust.founded,
    founder: { "@id": `${site.url}/#maataji` },
    slogan: site.motto,
    description:
      "Charitable trust and ashram of Sathguru Siva Sri Thiyaneswar Amma (Maataji) at Adi Annamalai on the Girivalam path, Tiruvannamalai: daily annadhanam for sadhus, Shiva pooja, Thiruvasagam and Kailaya Vathiyam classes, satsang, and home of Mounasamy Siddhar.",
    telephone: site.phone,
    email: site.email,
    address: postalAddress,
    location: { "@id": `${site.url}/#place` },
    areaServed: "Tiruvannamalai, Tamil Nadu, India",
    knowsAbout: [
      "Annadhanam",
      "Shiva bhakti",
      "Thiruvasagam",
      "Kailaya Vathiyam",
      "Sivayogam",
      "Girivalam",
      "Karthigai Deepam",
      "Arunachala",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        email: site.email,
        contactType: "ashram office",
        availableLanguage: ["Tamil", "English", "Telugu", "Hindi"],
      },
    ],
    sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
  };
}

/** The website as an entity (helps search engines tie pages to the organisation). */
export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    alternateName: ["Thiyaneswar Amma Ashram", "Sri Thiyaneswar Amma Ashram"],
    url: `${site.url}/`,
    inLanguage: ["en-IN", "ta-IN", "te-IN", "hi-IN"],
    publisher: { "@id": `${site.url}/#organization` },
    about: [{ "@id": `${site.url}/#maataji` }, { "@id": `${site.url}/#place` }],
  };
}

export function placeOfWorshipSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["PlaceOfWorship", "HinduTemple"],
    "@id": `${site.url}/#place`,
    name: site.name,
    url: site.url,
    image: absoluteUrl(images.maatajiBanner.src),
    telephone: site.phone,
    email: site.email,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: site.mapsHref,
    openingHoursSpecification: site.openingHoursSpec.map((o) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: o.dayOfWeek.map((d) => `https://schema.org/${d}`),
      opens: o.opens,
      closes: o.closes,
    })),
    isAccessibleForFree: true,
    publicAccess: true,
    sameAs: [site.social.facebook, site.social.instagram],
    parentOrganization: { "@id": `${site.url}/#organization` },
  };
}

export function maatajiPersonSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#maataji`,
    name: "Sathguru Siva Sri Thiyaneswar Amma",
    alternateName: [
      "Maataji",
      "Thiyaneswar Amma",
      "Sath Guru Thiyaneswar Amma",
      "Sathguru Amma Siva Rajeswari",
    ],
    description:
      "Founder of Siva Sri Thiyaneswar Amma Ashram at Adi Annamalai, Tiruvannamalai; Shiva bhakta, teacher of Thiruvasagam, writer of songs and books, and guru of Mounasamy Siddhar.",
    image: absoluteUrl(images.maatajiPortrait.src),
    jobTitle: "Spiritual teacher and founder",
    knowsAbout: ["Shiva bhakti", "Thiruvasagam", "Annadhanam", "Sivayogam", "Arunachala"],
    homeLocation: { "@id": `${site.url}/#place` },
    subjectOf: {
      "@type": "VideoObject",
      name: `${site.song.titleLatin} — lyrics by Thiyaneswar Amma`,
      url: site.song.youtubeUrl,
    },
    affiliation: { "@id": `${site.url}/#organization` },
    worksFor: { "@id": `${site.url}/#organization` },
    url: absoluteUrl("/en/maataji"),
    sameAs: [site.social.facebook, site.social.instagram],
  };
}

export function mounasamyPersonSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#mounasamy`,
    name: "Mounasamy Siddhar",
    alternateName: [
      "Mouna Siddhar",
      "Mouna Swami",
      "Vibhuti Siddhar",
      "Mounasamy",
      "Tiruvannamalai Mouna Siddhar",
    ],
    description:
      "The silent sadhu of Tiruvannamalai, who has kept a vow of silence for more than fifteen years and lives at Siva Sri Thiyaneswar Amma Ashram, Adi Annamalai, under the care of his guru Maataji.",
    image: absoluteUrl(images.mounasamyGarland.src),
    homeLocation: { "@id": `${site.url}/#place` },
    affiliation: { "@id": `${site.url}/#organization` },
    url: absoluteUrl("/en/mounasamy"),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type EventInput = {
  name: string;
  startDate: string;
  endDate?: string;
  description: string;
  url?: string;
  image?: string;
};

export function eventSchema(e: EventInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    startDate: e.startDate,
    endDate: e.endDate ?? e.startDate,
    description: e.description,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    image: e.image ? absoluteUrl(e.image) : absoluteUrl(images.maatajiBanner.src),
    url: e.url ? absoluteUrl(e.url) : undefined,
    location: {
      "@type": "Place",
      name: site.name,
      address: postalAddress,
    },
    organizer: { "@id": `${site.url}/#organization` },
  };
}

export function videoSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${site.song.titleLatin} — Thiyaneshwara Song`,
    description:
      "Devotional song with lyrics written by Maataji, Sathguru Siva Sri Thiyaneswar Amma, sung by Solar Sai for Jothi TV.",
    thumbnailUrl: [`https://i.ytimg.com/vi/${site.song.youtubeId}/hqdefault.jpg`],
    uploadDate: site.song.published,
    embedUrl: `https://www.youtube-nocookie.com/embed/${site.song.youtubeId}`,
    contentUrl: site.song.youtubeUrl,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export type ArticleInput = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
};

export function articleSchema(a: ArticleInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    mainEntityOfPage: absoluteUrl(a.path),
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    image: absoluteUrl(a.image ?? images.maatajiBanner.src),
    author: {
      "@type": "Organization",
      name: a.author ?? site.name,
    },
    publisher: {
      "@id": `${site.url}/#organization`,
    },
  };
}
