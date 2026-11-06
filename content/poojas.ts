/**
 * Special poojas that can be booked online (brief §Special pooja booking).
 * Will move to the CMS `pooja` collection. Dakshina amounts are planning figures
 * proposed on 6 Nov 2026 for the office to confirm; postage is in lib/site.ts.
 */
export type Pooja = {
  id: string;
  name: string;
  /** Tamil name. */
  tamil: string;
  /** Card eyebrow — when it happens. */
  when: string;
  description: string;
  /** ₹ dakshina, confirmed by the office. */
  dakshina?: number;
};

export const poojas: Pooja[] = [
  {
    id: "pournami",
    dakshina: 1116,
    name: "Pournami Pooja",
    tamil: "பௌர்ணமி பூஜை",
    when: "Every full moon",
    description:
      "Pooja at the ashram on the full-moon night, followed by annadhanam for the thousands walking Girivalam.",
  },
  {
    id: "pradosham",
    dakshina: 501,
    name: "Pradosham",
    tamil: "பிரதோஷம்",
    when: "Twice a month",
    description:
      "Evening abhishekam and pooja to Lord Shiva and Nandi at the pradosha hour, on the thirteenth tithi.",
  },
  {
    id: "rudrabhishekam",
    dakshina: 2501,
    name: "Rudrabhishekam",
    tamil: "ருத்ராபிஷேகம்",
    when: "Any day · by booking",
    description:
      "Abhishekam to Shiva with the chanting of Sri Rudram — for health, peace at home and a new beginning.",
  },
  {
    id: "karthigai-deepam",
    dakshina: 2501,
    name: "Karthigai Deepam",
    tamil: "கார்த்திகை தீபம்",
    when: "Tue 24 Nov 2026",
    description:
      "Pooja and deepam on the ashram's largest night of the year, with annadhanam for the Deepam Girivalam crowds.",
  },
  {
    id: "maha-shivaratri",
    dakshina: 5001,
    name: "Maha Shivaratri 4-kala pooja",
    tamil: "மகா சிவராத்திரி நான்கு கால பூஜை",
    when: "Sat 6 Mar 2027",
    description:
      "Four-kala abhishekam and pooja through the night, with bhajans, satsang and annadhanam at dawn.",
  },
  {
    id: "thiruvadhirai",
    dakshina: 1116,
    name: "Thiruvadhirai · Arudra Darshan",
    tamil: "திருவாதிரை",
    when: "Thu 24 Dec 2026",
    description:
      "Special pooja for Nataraja's cosmic dance, with Thiruvasagam recital and thiruvadhirai kali prasadam.",
  },
  {
    id: "maheswara-poojai",
    dakshina: 5001,
    name: "Maheswara Poojai",
    tamil: "மகேஸ்வர பூஜை",
    when: "Festival days · by booking",
    description:
      "Honouring sadhus as Shiva himself — vastram, a full meal and dakshina offered to them in your name.",
  },
  {
    id: "guru-pooja",
    dakshina: 1116,
    name: "Guru Pooja",
    tamil: "குரு பூஜை",
    when: "Guru Pournami · by booking",
    description:
      "Pooja to the Guru lineage, with satsang and annadhanam, offered in gratitude for guidance received.",
  },
];

/** Date choices offered in the booking form (from the design). */
export const poojaDateOptions = [
  "Tue 24 Nov 2026 · Karthigai Pournami / Deepam",
  "Wed 23 Dec 2026 · Margazhi Pournami",
  "Thu 24 Dec 2026 · Thiruvadhirai",
  "Fri 22 Jan 2027 · Thai Pournami",
  "Sat 6 Mar 2027 · Maha Shivaratri",
  "Any other day — I will choose",
] as const;

export const poojaForOptions = [
  "Myself",
  "My family",
  "A named person",
  "In memory of a departed soul",
] as const;
