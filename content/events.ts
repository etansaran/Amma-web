/**
 * Pooja & events calendar (brief §9 — Event JSON-LD on /events).
 * Dates follow the approved Events design; Pournami rows match content/girivalam-dates.ts.
 * Ashram pooja times are still to be confirmed by the office — never hard-code a guess.
 */
export type EventType = "pournami" | "festival" | "satsang" | "class" | "annadhanam";

export type AshramEvent = {
  slug: string;
  title: string;
  type: EventType;
  /** Secondary categories the event also belongs to (used by the list filters). */
  also?: EventType[];
  /** ISO date (YYYY-MM-DD). */
  startDate: string;
  endDate?: string;
  description: string;
  /** Pournami tithi span as printed in the design, e.g. "10:47 AM, 23 Dec → 6:57 AM, 24 Dec". */
  tithi?: string;
  /** Small uppercase label above the title, e.g. "Festival · Pournami". */
  label: string;
  bookingHref?: string;
  /** Text for the booking button; defaults to "Book sankalpa". */
  bookingLabel?: string;
  /** Second, outlined link (Deepam guide etc.). */
  secondary?: { label: string; href: string };
  /** True when the ashram pooja time is a placeholder the office must confirm. */
  poojaTimePending?: boolean;
  /** Night-coloured card in the list. */
  featured?: boolean;
  /** False for the "Also every month" Pournami dates that only appear in the strip and calendar. */
  listed?: boolean;
};

export const events: AshramEvent[] = [
  {
    slug: "karthigai-deepam-2026",
    title: "Karthigai Maha Deepam · Karthigai Pournami pooja",
    type: "festival",
    also: ["pournami", "annadhanam"],
    startDate: "2026-11-24",
    description:
      "Maha Deepam on the hill ~6 PM · ashram pooja · annadhanam all night. Bharani Deepam inside Arunachaleswarar temple around 4 AM, the Maha Deepam lit on the summit around 6 PM, Pournami Girivalam all night.",
    tithi: "11:42 PM, 23 Nov → 8:23 PM, 24 Nov",
    label: "Festival · Pournami",
    bookingHref: "/pooja-booking",
    secondary: { label: "Deepam guide", href: "/tiruvannamalai-guide#deepam" },
    poojaTimePending: true,
    listed: true,
  },
  {
    slug: "margazhi-pournami-2026",
    title: "Margazhi Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2026-12-23",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "10:47 AM, 23 Dec → 6:57 AM, 24 Dec",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: true,
  },
  {
    slug: "thiruvadhirai-2026",
    title: "Thiruvadhirai · Arudra Darshan",
    type: "festival",
    startDate: "2026-12-24",
    description:
      "Special pooja for Nataraja, Thiruvasagam recital, thiruvadhirai kali prasadam.",
    label: "Festival",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: true,
  },
  {
    slug: "thai-pournami-2027",
    title: "Thai Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2027-01-22",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "9:29 PM, 21 Jan → 5:46 PM, 22 Jan",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: true,
  },
  {
    slug: "maasi-pournami-2027",
    title: "Maasi Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2027-02-20",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "7:59 AM, 20 Feb → 4:52 AM, 21 Feb",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: true,
  },
  {
    slug: "maha-shivaratri-2027",
    title: "Maha Shivaratri — night-long pooja",
    type: "festival",
    also: ["annadhanam", "satsang"],
    startDate: "2027-03-06",
    endDate: "2027-03-07",
    description:
      "Four-kala abhishekam and pooja through the night, bhajans, satsang, annadhanam at dawn.",
    label: "Festival",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    featured: true,
    listed: true,
  },
  {
    slug: "panguni-pournami-2027",
    title: "Panguni Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2027-03-22",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "6:21 PM, 21 Mar → 4:13 PM, 22 Mar",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: true,
  },
  {
    slug: "chitra-pournami-2027",
    title: "Chitra Pournami — pooja, Girivalam & Sivayogam initiations",
    type: "pournami",
    also: ["annadhanam", "class"],
    startDate: "2027-04-20",
    description:
      "The ashram's traditional day for new initiations: Pournami pooja, Girivalam annadhanam and Sivayogam initiations.",
    tithi: "4:51 AM, 20 Apr → 3:56 AM, 21 Apr",
    label: "Pournami · Initiations",
    bookingHref: "/book-a-visit",
    bookingLabel: "Plan a visit",
    listed: true,
  },
  {
    slug: "vaikasi-pournami-2027",
    title: "Vaikasi Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2027-05-20",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "4:02 PM, 19 May → 4:28 PM, 20 May",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: false,
  },
  {
    slug: "aani-pournami-2027",
    title: "Aani Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2027-06-18",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "4:34 AM, 18 Jun → 6:13 AM, 19 Jun",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: false,
  },
  {
    slug: "guru-pournami-2027",
    title: "Guru Pournami — Guru pooja for Maataji, satsang & annadhanam",
    type: "pournami",
    also: ["satsang", "annadhanam"],
    startDate: "2027-07-18",
    description:
      "Guru pooja for Maataji, satsang and annadhanam; disciples gather from across India.",
    tithi: "6:48 PM, 17 Jul → 9:14 PM, 18 Jul",
    label: "Pournami · Guru Pournami",
    bookingHref: "/book-a-visit",
    bookingLabel: "Plan a visit",
    listed: true,
  },
  {
    slug: "aavani-pournami-2027",
    title: "Aavani Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2027-08-17",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "10:28 AM, 16 Aug → 12:58 PM, 17 Aug",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: false,
  },
  {
    slug: "purattasi-pournami-2027",
    title: "Purattasi Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2027-09-15",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "2:48 AM, 15 Sep → 4:32 AM, 16 Sep",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: false,
  },
  {
    slug: "aippasi-pournami-2027",
    title: "Aippasi Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2027-10-14",
    endDate: "2027-10-15",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "6:49 PM, 14 Oct → 7:16 PM, 15 Oct",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: false,
  },
  {
    slug: "karthigai-pournami-2027",
    title: "Karthigai Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2027-11-14",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "9:55 AM, 13 Nov → 8:55 AM, 14 Nov",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: false,
  },
  {
    slug: "margazhi-pournami-2027",
    title: "Margazhi Pournami pooja & Girivalam annadhanam",
    type: "pournami",
    also: ["annadhanam"],
    startDate: "2027-12-13",
    description: "Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers.",
    tithi: "11:54 PM, 12 Dec → 9:38 PM, 13 Dec",
    label: "Pournami",
    bookingHref: "/pooja-booking",
    poojaTimePending: true,
    listed: false,
  },
];

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Deterministic date parts from an ISO date, independent of server time zone and ICU data. */
export function dateParts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return {
    day: String(d),
    monthShort: MONTHS_SHORT[m - 1],
    monthLong: MONTHS_LONG[m - 1],
    year: String(y),
    weekdayShort: WEEKDAYS_SHORT[weekday],
    weekdayLong: WEEKDAYS_LONG[weekday],
  };
}

/** "Nov 2026 · Tue" */
export function eventMeta(iso: string) {
  const p = dateParts(iso);
  return `${p.monthShort} ${p.year} · ${p.weekdayShort}`;
}

export function eventMatches(e: AshramEvent, type: EventType | "all") {
  if (type === "all") return true;
  return e.type === type || (e.also ?? []).includes(type);
}
