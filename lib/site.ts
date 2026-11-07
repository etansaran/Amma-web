/** Verified facts about the ashram. Keep in sync with the office. */
export const site = {
  name: "Siva Sri Thiyaneswar Amma Ashram",
  nameTamil: "சிவ ஸ்ரீ தியானேஸ்வர் அம்மா ஆசிரமம்",
  shortName: "Thiyaneswar Amma Ashram",
  motto: "அன்பே சிவம் · அதுவே தவம்",
  mottoEnglish: "Love is Shiva — that itself is tapas.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thiyaneswaramma.org",
  phone: "+91 87781 68013",
  phoneHref: "tel:+918778168013",
  /** WhatsApp line supplied by the office on 6 Nov 2026. */
  whatsapp: "+91 90690 66768",
  whatsappHref: "https://wa.me/919069066768",
  whatsappTelHref: "tel:+919069066768",
  email: "srithiyanesamma@gmail.com",
  address: {
    street: "Thiyaneswar Veedhi, Vediyappanur Road",
    locality: "Adi Annamalai",
    city: "Tiruvannamalai",
    postalCode: "606604",
    region: "Tamil Nadu",
    country: "India",
  },
  registeredOffice: "6/31 Gandhi Road, Anna Nagar, Pammal, Chennai 600075",
  trust: {
    founded: "2017-04-24",
    foundedText: "24 April 2017",
    registration: "63/BK4/2017",
    /** The trust holds 80G; the office will send the registration number. */
    has80G: true,
    eightyGNumber: undefined as string | undefined,
    /** Not confirmed — keep foreign-card payments hidden until it is. */
    fcraRegistered: false,
  },
  /** Timings supplied by the office on 6 Nov 2026. */
  maatajiDarshan: {
    days: "Every Friday and on Pournami",
    daysInline: "every Friday and on Pournami",
    daysShort: "Fridays & Pournami",
    hours: "9:00 AM – 7:00 PM",
    hoursShort: "9 AM – 7 PM",
  },
  /** Satsang, annadhanam serving and classes — every day. */
  daily: {
    programme: "9–11 AM and 4–6 PM",
    programmeShort: "9–11 AM · 4–6 PM",
    morning: "9:00 – 11:00 AM",
    evening: "4:00 – 6:00 PM",
  },
  /** Mounasamy stands to give darshan every evening. */
  mounasamyStanding: "7:00 – 8:00 PM",
  mounasamyStandingShort: "7–8 PM",
  openingHoursSpec: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "11:00",
    },
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
      opens: "16:00",
      closes: "20:00",
    },
    { dayOfWeek: ["Friday"], opens: "09:00", closes: "20:00" },
  ],
  /** Rooms exist; a stay must be booked in advance. */
  accommodation: "Rooms are available for devotees — booking in advance is required.",
  /**
   * Annadhanam scale from the office; costs are planning estimates to be confirmed
   * (₹50 a plate on ordinary days, ₹40 a plate for the Pournami crowd).
   */
  annadhanam: {
    dailyPlates: "500",
    dailyCost: 25000,
    pournamiPlates: "25,000",
    pournamiCost: 1000000,
    pournamiShareMeals: "1,000",
    pournamiShareCost: 40000,
  },
  /** Prasadam by post, within India. */
  postage: 150,
  geo: { lat: 12.2353, lng: 79.0531 },
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Siva+Sri+Thiyaneswar+Amma+Ashram+Adi+Annamalai+Tiruvannamalai",
  social: {
    facebook: "https://www.facebook.com/Srithiyanesamma",
    instagram: "https://www.instagram.com/thiyaneswaramma",
    youtube: "https://www.youtube.com/watch?v=QlJ8HgrFHvk",
  },
  song: {
    title: "தியானேஷ்வரா! தியானேஷ்வரா!!",
    titleLatin: "Thiyaneshwara! Thiyaneshwara!!",
    youtubeId: "QlJ8HgrFHvk",
    youtubeUrl: "https://www.youtube.com/watch?v=QlJ8HgrFHvk",
    singer: "Solar Sai",
    channel: "Jothi TV",
    published: "2024-01-28",
    views: "6.2 million+",
  },
  temple: {
    /** Official HR&CE temple website (annamalaiyar.hrce.tn.gov.in), checked 6 Nov 2026. */
    timings: "5:30 AM – 8:00 PM",
    timingsNote: "Darshan until 7:30 PM on weekends, Pournami, holidays and crowded days",
    weekend: "5:30 AM – 7:30 PM",
    officialSite: "https://annamalaiyar.hrce.tn.gov.in/",
    morning: "5:30 AM – 8:00 PM",
    evening: "5:30 AM – 7:30 PM",
  },
  dates: {
    karthigaiDeepam: "2026-11-24",
    thiruvadhirai: "2026-12-24",
    mahaShivaratri: "2027-03-06",
  },
} as const;

export const navItems = [
  { key: "home", href: "/" },
  { key: "maataji", href: "/maataji" },
  { key: "ashram", href: "/ashram" },
  { key: "annadhanam", href: "/annadhanam" },
  { key: "mounasamy", href: "/mounasamy" },
  { key: "teachings", href: "/teachings" },
  { key: "events", href: "/events" },
  { key: "gallery", href: "/gallery" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export const footerVisitLinks = [
  { key: "aboutMaataji", href: "/maataji" },
  { key: "aboutAshram", href: "/ashram" },
  { key: "mounasamy", href: "/mounasamy" },
  { key: "bookVisit", href: "/book-a-visit" },
  { key: "guide", href: "/tiruvannamalai-guide" },
  { key: "templeGuide", href: "/arunachaleswarar-temple" },
  { key: "placesToVisit", href: "/places-to-visit-tiruvannamalai" },
  { key: "siddhars", href: "/siddhars-of-tiruvannamalai" },
  { key: "contact", href: "/contact" },
] as const;

export const footerParticipateLinks = [
  { key: "annadhanam", href: "/annadhanam" },
  { key: "poojaBooking", href: "/pooja-booking" },
  { key: "donate", href: "/donate" },
  { key: "events", href: "/events" },
  { key: "teachings", href: "/teachings" },
] as const;

export const legalLinks = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "refund", href: "/refund-policy" },
  { key: "accessibility", href: "/accessibility" },
] as const;

/** Every static route on the site (used by the sitemap). */
export const allRoutes = [
  "/",
  "/maataji",
  "/ashram",
  "/annadhanam",
  "/mounasamy",
  "/mounasamy/guru-shishya",
  "/mounasamy/darshan",
  "/teachings",
  "/events",
  "/book-a-visit",
  "/pooja-booking",
  "/donate",
  "/blog",
  "/gallery",
  "/contact",
  "/tiruvannamalai-guide",
  "/arunachaleswarar-temple",
  "/places-to-visit-tiruvannamalai",
  "/siddhars-of-tiruvannamalai",
  "/mouna-swami",
  "/raghava-lawrence-mouna-siddhar",
  "/temples-in-tiruvannamalai",
  "/ashrams-in-tiruvannamalai",
  "/ramana-ashram-tiruvannamalai",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/accessibility",
] as const;

/** ₹ formatting in the Indian system: 1000000 → "₹10,00,000". */
export function rupees(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
