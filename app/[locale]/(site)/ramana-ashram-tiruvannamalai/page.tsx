import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, BedDouble, CircleAlert, Clock, Info, Mountain, Shirt, Smartphone, Utensils, VolumeX } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { FAQ } from "@/components/ui/FAQ";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  AbroadVisitors,
  AshramStopCard,
  GuideByline,
  JumpLinks,
  QuickAnswer,
  Sources,
  VisitAshramBand,
} from "@/components/guide/GuideBits";

type Props = { params: Promise<{ locale: Locale }> };

const PATH = "/ramana-ashram-tiruvannamalai";
const CHECKED = "2026-11-07";
const OFFICIAL = "https://www.gururamana.org";
const STAY = "https://stay.gururamana.org";

const TITLE = "Ramana Ashram Tiruvannamalai: Sri Ramanasramam visitor guide";
const DESCRIPTION =
  "Sri Ramanasramam (Ramana Maharshi Ashram), Tiruvannamalai: timings, daily schedule, how to book a room, dress code, Skandasramam and Virupaksha Cave, and tips for overseas visitors.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: PATH, title: TITLE, description: DESCRIPTION, image: images.arunachalaNight });
}

const schedule: { time: string; what: string; note?: string }[] = [
  { time: "5:30 AM", what: "Ashram opens" },
  { time: "6:00 AM", what: "Aksharamanamalai chanting", note: "New Hall" },
  { time: "6:45 AM", what: "Chanting and milk offering", note: "Samadhi Hall" },
  { time: "8:00 AM", what: "Vedic chanting", note: "Before Bhagavan's shrine" },
  { time: "9:00 AM", what: "Puja at Bhagavan's shrine, then the Mother's shrine" },
  { time: "11 AM – 2 PM", what: "Samadhi Hall and Mother's shrine closed" },
  { time: "4:00 PM", what: "Tamil reading, then English reading at 4:30", note: "Reading Hall" },
  { time: "5:00 PM", what: "Vedic chanting, then puja at both shrines" },
  { time: "6:00 PM", what: "Tamil parayana", note: "Monday to Saturday" },
  { time: "8:30 PM", what: "Ashram closes" },
];

const places: { name: string; text: string }[] = [
  { name: "Samadhi Hall", text: "A marble meditation hall over Bhagavan's samadhi, with a Siva lingam on a white marble lotus." },
  { name: "Old Hall", text: "Where Ramana Maharshi spent almost all his time until about a year before his passing — still a favourite place for meditation." },
  { name: "Matrubhuteswara Temple", text: "The Mother's shrine, over the samadhi of his mother Alagammal, with a Siva lingam and a Sri Chakra Meru. Entered from the New Hall." },
  { name: "New Hall", text: "With a life-size statue of Bhagavan and a stone couch." },
  { name: "Nirvana Room", text: "East of the New Hall, where he spent his last days; kept as it was in his time." },
  { name: "Pali Tirtham, library and bookstall", text: "The tank Bhagavan walked beside, the Sri Ramana Library (browsing 8:30–11 AM and 2–5 PM) and the bookstall." },
];

const etiquette: { icon: typeof Shirt; title: string; text: string }[] = [
  { icon: Shirt, title: "Dress modestly", text: "Cover shoulders and knees. Sarees, salwar or loose sleeved clothes for women; dhoti, kurta or a sleeved shirt with long trousers for men. Shorts and beachwear are not acceptable." },
  { icon: VolumeX, title: "Keep silence", text: "No conversation in the halls, shrines and temple. The ashram asks visitors to come for quiet study and meditation, not sightseeing." },
  { icon: Smartphone, title: "Phones off", text: "Switch your phone off, or at least to silent, everywhere inside the ashram." },
  { icon: CircleAlert, title: "Footwear and photos", text: "Leave footwear at the free shoe stall. The ashram's rules for guests list photography in the grounds as prohibited — ask before taking any picture." },
];

const faqs = [
  {
    question: "What are Ramana Ashram's timings?",
    answer:
      "Sri Ramanasramam opens at 5:30 AM and closes at 8:30 PM. The Samadhi Hall and the Mother's shrine close from 11 AM to 2 PM. Vedic chanting is at 8 AM and 5 PM. The schedule changes on Jayanti, Aradhana, Deepam and full-moon days.",
  },
  {
    question: "How do I book a room at Ramana Ashram?",
    answer: `Only online, at ${STAY.replace("https://", "")}. Create an account, complete your ID profile and submit your dates. The ashram reviews requests in 2–3 days and can accept only about a quarter of them. Phone and walk-in requests are not accepted.`,
  },
  {
    question: "Is accommodation at Ramana Ashram free?",
    answer:
      "Yes. Accommodation is free of charge; voluntary donations are accepted with receipts. Rooms are reserved for devotees of Sri Ramana Maharshi, and simple vegetarian meals are given to registered guests.",
  },
  {
    question: "How long can foreigners stay at Ramana Ashram?",
    answer:
      "Up to 14 days for foreign nationals and up to 5 days for Indian nationals; at least 3 days is recommended. Foreigners register with a scanned passport and visa; OCI cardholders register as foreigners.",
  },
  {
    question: "Can day visitors eat at Ramana Ashram?",
    answer: `No. Meals are only for registered guests and residents. Visitors on the Girivalam path can take free annadhanam at our ashram at Adi Annamalai, ${site.daily.programme}.`,
  },
  {
    question: "Is Ramana Ashram on the Girivalam path?",
    answer:
      "Yes. Its back gate opens onto the Girivalam road, about 2 km along the path from the Arunachaleswarar temple. The ashram is about 2 km from the temple and about 3 km from the railway and bus stations.",
  },
  {
    question: "What are the timings for Skandasramam and Virupaksha Cave?",
    answer:
      "The ashram lists 8:30 AM to 4:30 PM for Skandasramam and Virupaksha Cave, a climb of about 1.5 km from behind the ashram. Climbing beyond these points, and staying overnight on the hill, is not allowed. Since the December 2024 landslide, check at the ashram office before you go.",
  },
  {
    question: "What is the official website and contact of Sri Ramanasramam?",
    answer:
      "The official website is gururamana.org. General enquiries: ashram@gururamana.org, +91 4175 237200. Accommodation: stay@gururamana.org, +91 4175 236624 (7:30 AM–12:30 PM and 2–6:30 PM IST). This page is an independent guide, not the ashram's own site.",
  },
];

export default async function RamanaAshramPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const placeData = {
    "@context": "https://schema.org",
    "@type": ["PlaceOfWorship", "TouristAttraction"],
    name: "Sri Ramanasramam",
    alternateName: ["Ramana Ashram", "Sri Ramana Maharshi Ashram", "Ramanasramam", "ஸ்ரீ ரமணாஸ்ரமம்"],
    description: "The ashram of Sri Ramana Maharshi at the foot of Arunachala, Tiruvannamalai.",
    url: OFFICIAL,
    sameAs: ["https://en.wikipedia.org/wiki/Sri_Ramanasramam"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sri Ramanasramam P.O.",
      addressLocality: "Tiruvannamalai",
      postalCode: "606603",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 12.2242, longitude: 79.0567 },
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    mainEntityOfPage: absoluteUrl(`/en${PATH}`),
    datePublished: CHECKED,
    dateModified: CHECKED,
    image: absoluteUrl(images.arunachalaNight.src),
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    about: { "@type": "Place", name: "Sri Ramanasramam" },
  };

  return (
    <>
      <JsonLd
        data={[
          placeData,
          article,
          breadcrumbSchema([
            { name: "Home", path: `/${locale}` },
            { name: "Tiruvannamalai guide", path: `/${locale}/tiruvannamalai-guide` },
            { name: "Ramana Ashram", path: `/${locale}${PATH}` },
          ]),
        ]}
      />
      <PageHero
        variant="night"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tiruvannamalai guide", href: "/tiruvannamalai-guide" },
          { label: "Ramana Ashram" },
        ]}
        eyebrow="Sri Ramanasramam · Ramana Maharshi Ashram · visitor guide"
        title="Ramana Ashram, Tiruvannamalai: a visitor's guide to Sri Ramanasramam"
        tamil="ஸ்ரீ ரமணாஸ்ரமம், திருவண்ணாமலை"
        lede="Timings, the daily schedule, how rooms are allotted, what to wear, and the walk up to Skandasramam — written by a neighbouring ashram on the same Girivalam path, from the ashram's own published rules."
        extra={
          <JumpLinks
            onNight
            items={[
              { href: "#timings", label: "Timings" },
              { href: "#places", label: "Inside the ashram" },
              { href: "#stay", label: "Staying" },
              { href: "#etiquette", label: "Etiquette" },
              { href: "#hill", label: "Skandasramam" },
              { href: "#from-abroad", label: "From abroad" },
              { href: "#faq", label: "FAQ" },
            ]}
          />
        }
      />

      <section className="container-site pt-10 md:pt-14 flex flex-col gap-4">
        <Reveal>
          <QuickAnswer question="Ramana Ashram in short">
            <strong>Sri Ramanasramam</strong> is at the foot of Arunachala, about 2 km from the Arunachaleswarar
            temple, with its back gate on the Girivalam path. Open <strong>5:30 AM – 8:30 PM</strong> (shrines close
            11 AM – 2 PM). Entry is free. Rooms are free but limited to devotees of Ramana Maharshi and are booked
            only online; meals are for registered guests.
          </QuickAnswer>
        </Reveal>
        <Reveal className="rounded-2xl bg-sand border border-line p-4 md:p-5 flex gap-3 text-[15px] text-ink-2">
          <Info size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
          <p>
            <strong className="text-ink">This is not the official Ramanasramam website.</strong> We are {site.name},
            a separate ashram at Adi Annamalai. For bookings and announcements, use the official site,{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              gururamana.org
            </a>
            .
          </p>
        </Reveal>
        <GuideByline checked={CHECKED} />
      </section>

      <section className="container-site section-pad flex flex-wrap items-center gap-8 md:gap-12">
        <Reveal className="flex-[1_1_480px] flex flex-col gap-4 min-w-0">
          <SectionHeading eyebrow="Bhagavan Sri Ramana Maharshi" title="The sage who came to Arunachala and never left." />
          <p className="text-ink-2">
            Born at Tiruchuzhi on 30 December 1879, the young Venkataraman arrived at Tiruvannamalai on{" "}
            <strong>1 September 1896</strong> and stayed at the foot and on the slopes of Arunachala for the rest of
            his life — in the temple, at Virupaksha Cave (1899–1916), at Skandasramam (1916–1922) and finally at the
            ashram that grew around his mother&apos;s samadhi. He taught chiefly through silence and the question
            &ldquo;Who am I?&rdquo;, and attained Mahanirvana on <strong>14 April 1950</strong>.
          </p>
          <p className="text-ink-2">
            The ashram marks his arrival on 1 September (Advent Day), his Jayanti in December–January (Punarvasu
            star in Margazhi) and his Aradhana in April–May.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_400px] min-w-0">
          <PhotoFigure
            image={images.arunachalaNight}
            ratio="4/3"
            frame="gold"
            caption="Arunachala — the hill Ramana Maharshi called his guru."
            sizes="(max-width: 768px) 100vw, 520px"
          />
        </Reveal>
      </section>

      <section id="timings" className="bg-white border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-12">
          <Reveal className="flex-[1_1_320px] min-w-0 flex flex-col gap-3">
            <Eyebrow>Ramana Ashram timings</Eyebrow>
            <h2 className="h2">The daily schedule.</h2>
            <p className="text-ink-2">
              From the ashram&apos;s published schedule. It changes on Jayanti, Aradhana, Deepam, full-moon and
              eclipse days — check the notice board when you arrive.
            </p>
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center gap-2.5"><Clock size={16} className="text-saffron-text" aria-hidden /> Meditation Hall: 4 AM – 12:30 PM, 2 – 9 PM</li>
              <li className="flex items-center gap-2.5"><Clock size={16} className="text-saffron-text" aria-hidden /> Bookstall: 8 – 11:30 AM, 2:30 – 6 PM</li>
              <li className="flex items-center gap-2.5"><Clock size={16} className="text-saffron-text" aria-hidden /> Sri Chakra puja: Fridays, full moon and Tamil month-start evenings</li>
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="flex-[2_1_480px] min-w-0">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">Sri Ramanasramam daily schedule</caption>
              <thead>
                <tr className="border-b border-line text-[13px] uppercase tracking-wide text-gold-text">
                  <th scope="col" className="py-2 pr-4 font-semibold">Time</th>
                  <th scope="col" className="py-2 font-semibold">What happens</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((r) => (
                  <tr key={r.time + r.what} className="border-b border-line align-top">
                    <th scope="row" className="py-2.5 pr-4 font-semibold whitespace-nowrap text-ink">{r.time}</th>
                    <td className="py-2.5 text-ink-2">
                      {r.what}
                      {r.note ? <span className="block text-[13px] text-gold-text">{r.note}</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section id="places" className="container-site section-pad flex flex-col gap-8 scroll-mt-24">
        <Reveal>
          <SectionHeading eyebrow="Inside the ashram" title="Where to sit, and what to see." />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((p) => (
            <RevealItem key={p.name} as="article" className="card rounded-2xl p-5 flex flex-col gap-2">
              <h3 className="text-[19px]">{p.name}</h3>
              <p className="text-[15px] text-ink-2">{p.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="stay" className="bg-sand border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-12">
          <Reveal className="flex-[1_1_480px] min-w-0 flex flex-col gap-4">
            <Eyebrow>Staying at Ramana Ashram</Eyebrow>
            <h2 className="h2">Free rooms — for devotees of Bhagavan, booked online only.</h2>
            <ul className="grid gap-3 text-ink-2">
              <li className="flex gap-3"><BedDouble size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden /><span>Apply at <a href={STAY} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">stay.gururamana.org</a>: create an account, upload ID, and give your dates and your connection with Bhagavan&apos;s teaching. Phone, walk-in and short-notice requests are not taken.</span></li>
              <li className="flex gap-3"><Clock size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden /><span>Allow 2–3 days for a reply. Only about one request in four can be accepted, so apply early and avoid full-moon and festival dates.</span></li>
              <li className="flex gap-3"><Info size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden /><span>Stays of at least 3 days are recommended; up to 5 days for Indian nationals and 14 for foreign nationals. Check-in 7 AM – 7 PM, checkout by 1 PM.</span></li>
              <li className="flex gap-3"><Utensils size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden /><span>Rooms and simple vegetarian meals are free for registered guests; donations are welcome, with receipts.</span></li>
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_380px] min-w-0 flex flex-col gap-4">
            <div className="rounded-2xl bg-white border border-line p-5 md:p-6 flex flex-col gap-3">
              <p className="eyebrow-gold">Coming for the temple or Girivalam?</p>
              <p className="text-ink-2">
                Ramanasramam asks visitors who come mainly for the temple, Girivalam or other teachers to stay
                elsewhere. {site.name}, further along the same Girivalam path at Adi Annamalai, has rooms for
                devotees (booked in advance) and serves free annadhanam to every visitor, {site.daily.programmeShort}.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book-a-visit" className="btn btn-saffron btn-sm">Ask about a room</Link>
                <Link href="/ashrams-in-tiruvannamalai" className="btn btn-outline-saffron btn-sm">
                  Other ashrams <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="etiquette" className="container-site section-pad flex flex-col gap-8 scroll-mt-24">
        <Reveal>
          <SectionHeading eyebrow="Etiquette" title="How to be at Ramanasramam." />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {etiquette.map((e) => (
            <RevealItem key={e.title} as="article" className="card rounded-2xl p-5 flex flex-col gap-2.5">
              <span className="icon-circle" aria-hidden><e.icon size={20} /></span>
              <h3 className="text-[18px]">{e.title}</h3>
              <p className="text-[15px] text-ink-2">{e.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="hill" className="bg-night text-on-night scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-12 items-center">
          <Reveal className="flex-[1_1_480px] min-w-0 flex flex-col gap-4">
            <p className="eyebrow text-gold-light!">Skandasramam and Virupaksha Cave</p>
            <h2 className="h2 text-on-night-head">The walk up the hill, behind the ashram.</h2>
            <p className="text-on-night-body">
              A path of about 1.5 km climbs from the ashram&apos;s back gate to Virupaksha Cave, where Ramana lived from
              1899 to 1916, and on to Skandasramam, his home from 1916 to 1922. Both are kept by Ramanasramam; the
              ashram lists them as open <strong className="text-on-night-head">8:30 AM – 4:30 PM</strong>.
            </p>
            <ul className="grid gap-2.5 text-[15px] text-on-night-body">
              <li className="flex gap-2.5"><Mountain size={18} className="text-gold-light shrink-0 mt-0.5" aria-hidden /> Going beyond these points is an offence, and staying overnight on the hill or in the caves is not allowed.</li>
              <li className="flex gap-2.5"><CircleAlert size={18} className="text-gold-light shrink-0 mt-0.5" aria-hidden /> After the landslide of 1 December 2024, hill access has been restricted at times. Ask at the ashram office on the day before you climb.</li>
              <li className="flex gap-2.5"><Info size={18} className="text-gold-light shrink-0 mt-0.5" aria-hidden /> The ashram advises women not to walk on or around the hill alone.</li>
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_380px] min-w-0">
            <AshramStopCard context="Further along the Girivalam path" />
          </Reveal>
        </div>
      </section>

      <AbroadVisitors />

      <section id="faq" className="bg-white border-b border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-10">
          <Reveal className="flex-[1_1_300px] min-w-0">
            <Eyebrow>Questions people ask</Eyebrow>
            <h2 className="h2 mt-3">Ramana Ashram, Tiruvannamalai.</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0 flex flex-col gap-5">
            <FAQ items={faqs} />
            <Sources
              items={[
                { label: "gururamana.org: Ashram at a glance", href: `${OFFICIAL}/Ashram/ashram-at-a-glance` },
                { label: "Accommodation", href: `${OFFICIAL}/Ashram/accommodation` },
                { label: "Visiting us", href: `${OFFICIAL}/Ashram/visiting-us` },
                { label: "Timeline", href: `${OFFICIAL}/Bhagavan/sri-ramana-maharshi-timeline` },
                { label: "The News Minute (2024 landslide)", href: "https://www.thenewsminute.com/tamil-nadu/tiruvannamalai-landslide-arunachala-hills-closed-to-devotees-for-karthigai-deepam" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <VisitAshramBand heading="After Ramanasramam, continue round the hill to Adi Annamalai." />
    </>
  );
}
