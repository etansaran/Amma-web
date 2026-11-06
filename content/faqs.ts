/**
 * Direct-answer FAQs for search and AI answer engines (AEO/GEO).
 * Each answer stands on its own: names, place and numbers are repeated so it
 * can be quoted without the surrounding page. Facts only from
 * ../ashram-website-handoff/content/verified-facts.md and the office (6 Nov 2026).
 */
import { site, rupees } from "@/lib/site";
import type { FaqItem } from "@/lib/schema";

const address = `${site.address.street}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}, ${site.address.region}`;

export const maatajiFaqs: FaqItem[] = [
  {
    question: "Who is Thiyaneswar Amma?",
    answer: `Sathguru Siva Sri Thiyaneswar Amma, known to devotees as Maataji (also Sathguru Amma Siva Rajeswari), is a Shiva bhakta and spiritual teacher in Tiruvannamalai. She founded ${site.name} at Adi Annamalai on the Girivalam path, a charitable trust registered on ${site.trust.foundedText} (Reg ${site.trust.registration}). She leads daily annadhanam for sadhus, teaches Thiruvasagam, and writes books and devotional songs.`,
  },
  {
    question: "Where is Thiyaneswar Amma's ashram?",
    answer: `${site.name} is at ${address} — on the Girivalam path around Arunachala, on the Adi Annamalai side of the hill. Phone ${site.phone}, WhatsApp ${site.whatsapp}.`,
  },
  {
    question: "When can I have Maataji's darshan?",
    answer: `Maataji's darshan is on Fridays and on Pournami (full moon) days, 9 AM to 7 PM, as her schedule and health allow. A personal meeting cannot be guaranteed. Satsang and annadhanam are open to everyone every day, ${site.daily.programme}.`,
  },
  {
    question: "What books has Thiyaneswar Amma written?",
    answer:
      "Maataji's books include “Sivam in my Experience”, “Thiruvannamalai itself is Thirukailayam” and “Amma's Biography”, published in Tamil and English.",
  },
  {
    question: "Who wrote the Thiyaneshwara song?",
    answer: `The lyrics of “${site.song.titleLatin}” (தியானேஷ்வரா! தியானேஷ்வரா!!) were written by Maataji, Sathguru Siva Sri Thiyaneswar Amma. It was sung by ${site.song.singer} for ${site.song.channel} in January 2024 and has been viewed more than 6.2 million times on YouTube.`,
  },
  {
    question: "Is Thiyaneswar Amma the guru of Mounasamy Siddhar?",
    answer:
      "Yes, as the ashram states. Mounasamy Siddhar — also called Mouna Siddhar, Mouna Swami or Vibhuti Siddhar — is Maataji's shishya. His vow of silence and sitting sadhana were shaped under her guidance, and he lives at her ashram at Adi Annamalai, Tiruvannamalai, in her care.",
  },
];

export const ashramFaqs: FaqItem[] = [
  {
    question: "Where is Siva Sri Thiyaneswar Amma Ashram in Tiruvannamalai?",
    answer: `The ashram is at ${address}, on the Girivalam path at Adi Annamalai, on the western side of Arunachala hill. Phone ${site.phone}, WhatsApp ${site.whatsapp}, email ${site.email}.`,
  },
  {
    question: "What are the ashram's timings?",
    answer: `The ashram is open every day. Satsang, classes and annadhanam are held ${site.daily.programme}. Mounasamy Siddhar stands to give darshan every evening, ${site.mounasamyStanding}. Maataji's darshan is on Fridays and Pournami days, 9 AM to 7 PM, as her health allows.`,
  },
  {
    question: "Is there accommodation at the ashram?",
    answer:
      "Yes. Rooms are available for devotees, and booking in advance is required. Request a room when you request your visit date on the ashram's website or by phone or WhatsApp.",
  },
  {
    question: "Is annadhanam at the ashram free?",
    answer: `Yes. Annadhanam is free for sadhus, pilgrims and everyone who comes, 365 days a year — about ${site.annadhanam.dailyPlates} plates on an ordinary day and about ${site.annadhanam.pournamiPlates} on a Pournami night. Devotees can sponsor a day of annadhanam (${rupees(site.annadhanam.dailyCost)}).`,
  },
  {
    question: "Is there an entry fee or do I need to book?",
    answer:
      "There is no entry fee. Visits, darshan, satsang and annadhanam are free. Booking is not required, but requesting a visit date helps the office keep a place for you; rooms must be booked in advance.",
  },
  {
    question: "How do I reach the ashram at Adi Annamalai?",
    answer:
      "Tiruvannamalai is about 175 km from Chennai airport, with a railway station and frequent buses from Chennai, Bengaluru and Puducherry; the bus stand is about 2 km from the Arunachaleswarar temple. From town, take an auto to Adi Annamalai on the Girivalam road and ask for the ashram on Vediyappanur Road.",
  },
  {
    question: "Who runs Siva Sri Thiyaneswar Amma Ashram?",
    answer: `The ashram is run by a charitable trust founded on ${site.trust.foundedText} by Smt. Rajeswari — Maataji, Sathguru Siva Sri Thiyaneswar Amma — registration ${site.trust.registration}. Its registered office is at ${site.registeredOffice}.`,
  },
];
