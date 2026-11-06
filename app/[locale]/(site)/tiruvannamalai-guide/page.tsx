import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import {
  Backpack,
  Bus,
  Car,
  Clock,
  Flame,
  Footprints,
  Landmark,
  Moon,
  Sunrise,
  Timer,
  TrainFront,
  Utensils,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { breadcrumbSchema } from "@/lib/schema";
import { girivalamDates } from "@/content/girivalam-dates";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { Placeholder } from "@/components/ui/Placeholder";
import { FAQ } from "@/components/ui/FAQ";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/tiruvannamalai-guide",
    title: "Tiruvannamalai Temple Timings, Deepam 2026 & Girivalam Dates",
    description:
      "Tiruvannamalai temple timings (5:30 AM–12:30 PM, 3:30–9 PM), Karthigai Deepam 2026 on 24 November, Pournami Girivalam dates 2026–27 with tithi times, route, ashrams and how to reach.",
    image: images.arunachalaNight,
  });
}

const onThisPage = [
  { href: "#timings", label: "Temple timings" },
  { href: "#deepam", label: "Karthigai Deepam 2026" },
  { href: "#calendar", label: "Girivalam dates 2026–27" },
  { href: "#route", label: "Girivalam route" },
  { href: "#reach", label: "How to reach" },
  { href: "#ashrams", label: "Ashrams" },
  { href: "#faq", label: "FAQ" },
];

const lingams = [
  { n: "1 · East", name: "Indra Lingam" },
  { n: "2 · South-east", name: "Agni Lingam" },
  { n: "3 · South", name: "Yama Lingam" },
  { n: "4 · South-west", name: "Niruthi Lingam" },
  { n: "5 · West", name: "Varuna Lingam" },
  { n: "6 · North-west", name: "Vayu Lingam · Adi Annamalai · the ashram", here: true },
  { n: "7 · North", name: "Kubera Lingam" },
  { n: "8 · North-east", name: "Esanya Lingam" },
];

const faqs = [
  {
    question: "What are the Tiruvannamalai temple timings?",
    answer:
      "Arunachaleswarar Temple is open daily from 5:30 AM to 12:30 PM and 3:30 PM to 9:00 PM, with extended hours on Pournami and festival days.",
  },
  {
    question: "When is Karthigai Deepam in 2026?",
    answer:
      "Tuesday, 24 November 2026. The Bharani Deepam is lit inside the temple around 4 AM and the Maha Deepam on the hill around 6 PM.",
  },
  {
    question: "When is the next Pournami Girivalam?",
    answer:
      "24 November 2026 (Karthigai Pournami, the same day as Deepam), then 23 December 2026, 22 January 2027 and so on — see the calendar above.",
  },
  {
    question: "How long is Girivalam and how long does it take?",
    answer:
      "The path is about 14 km around Arunachala, walked clockwise and usually barefoot. Most people take 3 to 4 hours; longer on Pournami nights.",
  },
  {
    question: "Where can I get free food (annadhanam) during Girivalam?",
    answer:
      "Siva Sri Thiyaneswar Amma Ashram at Adi Annamalai serves annadhanam to sadhus and pilgrims every day, and all night on Pournami and Deepam.",
  },
  {
    question: "Can I meet Maataji if I visit the ashram?",
    answer:
      "Maataji meets devotees as her schedule and health allow; a visit request does not guarantee a personal meeting. Satsang, pooja and annadhanam are open to everyone.",
  },
];

const th = "text-left px-3.5 py-3 bg-sand text-ink-2 text-[12px] tracking-[.12em] uppercase font-semibold border-b border-line whitespace-nowrap";
const td = "px-3.5 py-3 border-b border-[#EFE6D3] align-top";

function TableCard({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      className="card overflow-x-auto [-webkit-overflow-scrolling:touch]"
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export default async function GuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: `/${locale}` },
          { name: "Tiruvannamalai guide", path: `/${locale}/tiruvannamalai-guide` },
        ])}
      />

      <PageHero
        variant="night"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tiruvannamalai guide" }]}
        eyebrow="Tiruvannamalai pilgrim guide · updated 5 November 2026"
        title="Tiruvannamalai: temple timings, Karthigai Deepam 2026, Girivalam dates and route"
        lede={
          <>
            Everything a pilgrim asks before coming to Arunachala, kept current by the ashram at
            Adi Annamalai on the Girivalam path. Also in{" "}
            <Link href="/tiruvannamalai-guide" locale="ta" lang="ta" className="text-gold-light hover:underline underline-offset-4">
              தமிழ்
            </Link>{" "}
            ·{" "}
            <Link href="/tiruvannamalai-guide" locale="te" lang="te" className="text-gold-light hover:underline underline-offset-4">
              తెలుగు
            </Link>{" "}
            ·{" "}
            <Link href="/tiruvannamalai-guide" locale="hi" lang="hi" className="text-gold-light hover:underline underline-offset-4">
              हिन्दी
            </Link>
            .
          </>
        }
        extra={
          <nav aria-label="On this page" className="flex flex-wrap gap-2">
            {onThisPage.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex items-center min-h-11 px-4 rounded-pill border border-night-line-2 text-on-night text-sm font-semibold hover:border-gold hover:text-on-night-head transition-colors active:scale-[.97]"
              >
                {l.label}
              </a>
            ))}
          </nav>
        }
      />

      {/* Quick answers */}
      <section className="container-site pt-10 md:pt-12">
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Clock,
              eyebrow: "Arunachaleswarar temple timings",
              value: site.temple.timings,
              note: "Every day; longer on Pournami and festival days",
            },
            {
              icon: Flame,
              eyebrow: "Karthigai Deepam 2026 date",
              value: "Tuesday, 24 November 2026",
              note: "Bharani Deepam ~4 AM · Maha Deepam ~6 PM",
            },
            {
              icon: Moon,
              eyebrow: "Next Pournami Girivalam",
              value: "24 Nov 2026 · Karthigai Pournami",
              note: "Tithi 11:42 PM, 23 Nov → 8:23 PM, 24 Nov",
            },
          ].map((q) => (
            <RevealItem
              key={q.eyebrow}
              className="card rounded-2xl border-l-4 border-l-saffron px-5 py-5 md:px-[22px] flex gap-3.5"
            >
              <span className="icon-circle w-10! h-10! bg-sand! text-saffron-text! mt-0.5" aria-hidden>
                <q.icon size={18} />
              </span>
              <div className="min-w-0">
                <p className="eyebrow-gold text-[12px]">{q.eyebrow}</p>
                <p className="mt-1.5 font-display text-[20px] md:text-[22px] leading-snug">{q.value}</p>
                <p className="mt-0.5 text-sm text-ink-2">{q.note}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Temple timings */}
      <section id="timings" className="container-site section-pad flex flex-wrap gap-10 scroll-mt-20">
        <Reveal className="flex-[1_1_360px] flex flex-col gap-3">
          <Eyebrow>Temple timings</Eyebrow>
          <h2 className="h2">Arunachaleswarar (Annamalaiyar) Temple</h2>
          <p lang="ta" className="ta text-[20px] text-saffron-text">
            அருணாசலேஸ்வரர் திருக்கோயில் நேரம்
          </p>
          <p className="text-ink-2">
            One of the Pancha Bhoota Sthalams — the temple of the fire element. Its gopuram is
            66 m tall and the Deepam on the hill behind it is lit every Karthigai. Timings can
            change on festival days; the temple office is the final word.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_520px] flex flex-col gap-4 min-w-0">
          <TableCard label="Arunachaleswarar temple timings">
            <table className="w-full border-collapse text-[15px] min-w-[560px]">
              <thead>
                <tr>
                  <th scope="col" className={th}>Session</th>
                  <th scope="col" className={th}>Timings (IST)</th>
                  <th scope="col" className={th}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className={cn(td, "text-left font-normal")}>Morning</th>
                  <td className={td}><strong>{site.temple.morning}</strong></td>
                  <td className={td}>Earliest darshan is the calmest</td>
                </tr>
                <tr>
                  <th scope="row" className={cn(td, "text-left font-normal")}>Evening</th>
                  <td className={td}><strong>{site.temple.evening}</strong></td>
                  <td className={td}>Crowded after 6 PM on weekends</td>
                </tr>
                <tr>
                  <th scope="row" className={cn(td, "text-left font-normal")}>Pournami &amp; festivals</th>
                  <td className={td}>Extended hours</td>
                  <td className={td}>Often open through the night; confirm at the temple</td>
                </tr>
                <tr>
                  <th scope="row" className={cn(td, "text-left font-normal border-b-0")}>Daily kala poojas</th>
                  <td className={cn(td, "border-b-0")}>
                    <Placeholder label="Ushakkalam · Kalasanthi · Uchikalam · Sayarakshai · Irandam Kalam · Ardhajamam — times to confirm" />
                  </td>
                  <td className={cn(td, "border-b-0")}>Six poojas a day, as in all Saiva temples</td>
                </tr>
              </tbody>
            </table>
          </TableCard>
          <TableCard label="Darshan tickets">
            <table className="w-full border-collapse text-[15px] min-w-[480px]">
              <thead>
                <tr>
                  <th scope="col" className={th}>Darshan</th>
                  <th scope="col" className={th}>Ticket</th>
                  <th scope="col" className={th}>
                    <span className="sr-only">Notes</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className={cn(td, "text-left font-normal")}>General darshan</th>
                  <td className={td}><strong>Free</strong></td>
                  <td className={td}>Queue time varies with the day</td>
                </tr>
                <tr>
                  <th scope="row" className={cn(td, "text-left font-normal")}>Special darshan</th>
                  <td className={td}>₹50</td>
                  <td rowSpan={3} className={cn(td, "text-ink-2 border-b-0")}>
                    As listed by travel guides; confirm at the counter
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={cn(td, "text-left font-normal")}>Fast-track darshan</th>
                  <td className={td}>₹100</td>
                </tr>
                <tr>
                  <th scope="row" className={cn(td, "text-left font-normal border-b-0")}>VIP darshan</th>
                  <td className={cn(td, "border-b-0")}>₹200</td>
                </tr>
              </tbody>
            </table>
          </TableCard>
        </Reveal>
      </section>

      {/* Deepam */}
      <section id="deepam" className="bg-night text-on-night scroll-mt-20">
        <div className="container-site section-pad-lg flex flex-wrap items-center gap-10">
          <Reveal className="flex-[1_1_480px] flex flex-col gap-3.5 min-w-0">
            <Eyebrow tone="gold">Karthigai Deepam 2026</Eyebrow>
            <h2 className="h2 text-on-night-head">
              Tuesday 24 November 2026 — the night the hill becomes a lamp.
            </h2>
            <p lang="ta" className="ta text-[20px] text-gold-light">
              கார்த்திகை மகா தீபம் · 24 நவம்பர் 2026
            </p>
            <p className="text-on-night-body">
              Before dawn the Bharani Deepam is lit inside the temple. At dusk its flame is carried
              to the 2,668-ft summit of Arunachala and the Maha Deepam — a giant cauldron of ghee
              with a wick of cloth — is lit and burns for days, visible across the district. Lakhs
              of devotees then walk Girivalam through the night.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-night-line-2 rounded-[14px] p-4">
                <p className="font-display text-[24px] text-gold-light">~4 AM</p>
                <p className="mt-0.5 text-sm text-on-night-2">Bharani Deepam, inside the temple</p>
              </div>
              <div className="border border-night-line-2 rounded-[14px] p-4">
                <p className="font-display text-[24px] text-gold-light">~6 PM</p>
                <p className="mt-0.5 text-sm text-on-night-2">Maha Deepam lit on the summit</p>
              </div>
              <div className="border border-night-line-2 rounded-[14px] p-4">
                <p className="font-display text-[24px] text-gold-light">10 days</p>
                <p className="mt-0.5 text-sm text-on-night-2">
                  Brahmotsavam before Deepam <Placeholder label="dates to confirm" />
                </p>
              </div>
            </div>
            <p className="text-sm text-on-night-2">
              Tips: arrive a day early; book your stay months ahead; roads near the temple close to
              vehicles; carry water and keep your phone charged; the Deepam is visible from the
              whole Girivalam path, so you need not be at the temple to see it. The ashram serves
              annadhanam on the Adi Annamalai stretch all night.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/annadhanam">
                <Utensils size={18} aria-hidden /> Deepam annadhanam seva
              </Button>
              <Button href="/pooja-booking" variant="outline-gold">
                <Flame size={18} aria-hidden /> Book a Deepam sankalpa
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_440px] w-full max-w-[560px] mx-auto lg:mx-0">
            <PhotoFigure
              image={images.arunachalaNight}
              alt="Illustration of the Deepam flame on Arunachala above the lit temple gopurams"
              ratio="16/10"
              frame="gold"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </Reveal>
        </div>
      </section>

      {/* Girivalam calendar */}
      <section id="calendar" className="container-site section-pad-lg flex flex-col gap-7 scroll-mt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Girivalam dates 2026–2027"
            title="Pournami Girivalam calendar with tithi times."
            tamil="பௌர்ணமி கிரிவலம் நாட்கள் 2026–2027"
            lede="Girivalam is walked while the Pournami tithi runs. Times are IST and apply across India; verify against the temple's notice board close to the date."
            action={<ArrowLink href="/events">Ashram poojas on these dates</ArrowLink>}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <TableCard label="Pournami Girivalam dates 2026 to 2027 with tithi times">
            <table className="w-full border-collapse text-[15px] min-w-[760px]">
              <thead>
                <tr>
                  <th scope="col" className={th}>Date</th>
                  <th scope="col" className={th}>Tamil month</th>
                  <th scope="col" className={th}>Pournami tithi begins</th>
                  <th scope="col" className={th}>Pournami tithi ends</th>
                  <th scope="col" className={th}>At the ashram</th>
                </tr>
              </thead>
              <tbody>
                {girivalamDates.map((row, i) => {
                  const last = i === girivalamDates.length - 1;
                  const cell = cn(td, row.highlight && "bg-[#FFF8EE] font-semibold", last && "border-b-0");
                  return (
                    <tr key={row.date}>
                      <th scope="row" className={cn(cell, "text-left whitespace-nowrap", !row.highlight && "font-normal")}>
                        <time dateTime={row.date}>{row.dateLabel}</time>
                      </th>
                      <td className={cell}>{row.tamilMonth}</td>
                      <td className={cell}>
                        <time dateTime={row.tithiStart}>{row.tithiBegins}</time>
                      </td>
                      <td className={cell}>
                        <time dateTime={row.tithiEnd}>{row.tithiEnds}</time>
                      </td>
                      <td className={cell}>{row.atAshram}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableCard>
        </Reveal>
        <Reveal>
          <p className="text-[13px] text-ink-2 flex flex-wrap items-center gap-1.5">
            Other 2027 festivals: Maha Shivaratri — Saturday 6 March 2027 · Thiruvadhirai 2026 —
            Thursday 24 December 2026 · Karthigai Deepam 2027 —{" "}
            <Placeholder label="date to be announced by the temple" />.
          </p>
        </Reveal>
      </section>

      {/* Route */}
      <section id="route" className="bg-white border-y border-line scroll-mt-20">
        <div className="container-site section-pad-lg flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Girivalam route"
              title="14 km, clockwise, barefoot — and the eight Ashta Lingams in order."
            />
          </Reveal>
          <Reveal>
            <PhotoFigure
              image={images.girivalamMap}
              alt="Conceptual illustration of the Girivalam route around Arunachala with the eight lingams numbered from Indra to Esanya"
              ratio="16/9"
              sizes="(max-width: 1280px) 100vw, 1216px"
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {lingams.map((l) => (
              <RevealItem
                key={l.n}
                className={cn(
                  "rounded-[14px] p-4 border",
                  l.here ? "bg-[#FFF8EE] border-saffron" : "card-ivory",
                )}
              >
                <p className="font-display text-sm text-gold-text">{l.n}</p>
                <p className="mt-0.5 font-semibold text-[15px] leading-snug">{l.name}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Timer,
                title: "How long",
                text: "3 to 4 hours at a devotional pace; 5+ on Pournami nights with the crowd.",
              },
              {
                icon: Sunrise,
                title: "When to start",
                text: "After sunset on Pournami, or before dawn on any day. Keep the hill on your right and chant “Om Arunachala”.",
              },
              {
                icon: Backpack,
                title: "What to carry",
                text: "Water, a small torch, a cloth bag for footwear if you must carry it, and nothing you would mind losing.",
              },
            ].map((c) => (
              <RevealItem key={c.title} className="card-ivory rounded-2xl p-5 flex gap-3">
                <c.icon size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="font-semibold">{c.title}</p>
                  <p className="mt-1 text-sm text-ink-2">{c.text}</p>
                </div>
              </RevealItem>
            ))}
            <RevealItem className="card-night rounded-2xl p-5 flex gap-3">
              <Utensils size={20} className="text-gold-light shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-semibold">Rest at Adi Annamalai</p>
                <p className="mt-1 text-sm text-on-night-2">
                  The ashram's annadhanam and water point is on this stretch, on the far side of
                  the hill — a natural halfway rest.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Reach + ashrams */}
      <section id="reach" className="container-site pt-14 md:pt-[88px] pb-10 flex flex-wrap gap-10 scroll-mt-20">
        <Reveal className="flex-[1_1_440px] flex flex-col gap-3.5 min-w-0">
          <Eyebrow>How to reach Tiruvannamalai</Eyebrow>
          <h2 className="h2 text-[30px] md:text-[36px]">From Chennai, Bengaluru and Puducherry.</h2>
          <div className="flex flex-col gap-2.5">
            <div className="card rounded-[14px] px-[18px] py-4 flex gap-3">
              <Car size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-semibold">Chennai → about 175 km from the airport</p>
                <p className="mt-0.5 text-sm text-ink-2">
                  Taxi 4–5 h · buses from Koyambedu · trains to Tiruvannamalai station
                </p>
              </div>
            </div>
            <div className="card rounded-[14px] px-[18px] py-4 flex gap-3">
              <Bus size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-semibold flex flex-wrap items-center gap-1.5">
                  Bengaluru → <Placeholder label="~ km" />
                </p>
                <p className="mt-0.5 text-sm text-ink-2">
                  About 5 h by road via Krishnagiri; overnight buses
                </p>
              </div>
            </div>
            <div className="card rounded-[14px] px-[18px] py-4 flex gap-3">
              <TrainFront size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-semibold">Puducherry / Vellore / Tirupati</p>
                <p className="mt-0.5 text-sm text-ink-2">Frequent buses and passenger trains</p>
              </div>
            </div>
          </div>
          <ArrowLink href="/contact">Directions to the ashram</ArrowLink>
        </Reveal>
        <div id="ashrams" className="flex-[1_1_440px] min-w-0 scroll-mt-20">
        <Reveal delay={0.1} className="flex flex-col gap-3.5">
          <Eyebrow>Ashrams in Tiruvannamalai</Eyebrow>
          <h2 className="h2 text-[30px] md:text-[36px]">Where seekers sit.</h2>
          <div className="flex flex-col gap-2.5">
            <div className="rounded-[14px] px-[18px] py-4 bg-[#FFF8EE] border border-saffron flex gap-3">
              <Landmark size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-semibold">Siva Sri Thiyaneswar Amma Ashram · Adi Annamalai</p>
                <p className="mt-0.5 text-sm text-ink-2">
                  Daily annadhanam for sadhus, Thiruvasagam and Kailaya Vathiyam classes, satsang,
                  Pournami poojas — and the home of{" "}
                  <Link href="/mounasamy" className="text-saffron-text font-semibold hover:underline underline-offset-4">
                    Mounasamy Siddhar (Mouna Siddhar)
                  </Link>
                  , Maataji's shishya, who gives darshan every day.{" "}
                  <Link href="/book-a-visit" className="text-saffron-text font-semibold hover:underline underline-offset-4">
                    Plan a visit
                  </Link>
                </p>
              </div>
            </div>
            {[
              {
                name: "Sri Ramana Ashram",
                text: "At the foot of the hill on the Girivalam road; meditation hall, library, Skandashram path.",
              },
              {
                name: "Seshadri Swamigal Ashram",
                text: "Beside Ramana Ashram; samadhi shrine of the saint.",
              },
              {
                name: "Yogi Ramsuratkumar Ashram",
                text: "Large hall for bhajans and meditation, near Agni Lingam.",
              },
            ].map((a) => (
              <div key={a.name} className="card rounded-[14px] px-[18px] py-4 flex gap-3">
                <Footprints size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="mt-0.5 text-sm text-ink-2 flex flex-wrap items-center gap-1.5">
                    {a.text} <Placeholder label="Timings" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-site pt-10 pb-14 md:pb-24 flex flex-wrap gap-10 scroll-mt-20">
        <Reveal className="flex-[1_1_300px]">
          <Eyebrow>Frequently asked</Eyebrow>
          <h2 className="h2 text-[30px] md:text-[36px] mt-3">Pilgrims' questions.</h2>
          <p className="mt-3 text-sm text-ink-2">
            Published as FAQ structured data so Google can show these answers directly.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0">
          <FAQ items={faqs} />
        </Reveal>
      </section>
    </>
  );
}
