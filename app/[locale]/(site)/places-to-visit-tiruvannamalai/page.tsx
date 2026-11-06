import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Bus,
  CalendarDays,
  Footprints,
  Landmark,
  Mountain,
  Plane,
  Sun,
  TrainFront,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCircle } from "@/components/ui/IconCircle";
import { FAQ } from "@/components/ui/FAQ";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { AshramStopCard, JumpLinks, QuickAnswer, Sources, VisitAshramBand } from "@/components/guide/GuideBits";
import { cn } from "@/lib/cn";

type Props = { params: Promise<{ locale: Locale }> };

const PATH = "/places-to-visit-tiruvannamalai";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: PATH,
    title: "Places to visit in Tiruvannamalai (பார்க்க வேண்டிய இடங்கள்)",
    description:
      "Places to visit in Tiruvannamalai: Arunachaleswarar Temple, Girivalam and the 8 lingams, Ramanasramam, Skandashram, Adi Annamalai, ashrams and day trips.",
    image: images.girivalamWalk,
  });
}

type Place = {
  name: string;
  tamil: string;
  text: string;
  where: string;
  visit?: string;
  ours?: boolean;
  link?: { href: string; label: string };
};

const inTown: Place[] = [
  {
    name: "Arunachaleswarar (Annamalaiyar) Temple",
    tamil: "அருணாசலேஸ்வரர் கோயில்",
    text: "The Pancha Bhoota Sthalam of fire (Agni) and one of the largest temples in India — about 25 acres, with an eastern Rajagopuram of 11 storeys (about 66 m). Inside, the Kambathu Ilaiyanar shrine marks where, tradition says, Murugan appeared from a pillar for Arunagirinathar.",
    where: "Centre of town",
    visit: "Entry free · darshan 5:30 AM – 8 PM (7:30 PM weekends, Pournami)",
    link: { href: "/tiruvannamalai-guide#timings", label: "Temple timings" },
  },
  {
    name: "Girivalam path",
    tamil: "கிரிவலப் பாதை",
    text: "The 14 km walk around Arunachala hill, done barefoot with the hill on your right, starting and ending at the temple. Most walk it on Pournami (full-moon) nights; it takes about 3 to 5 hours on foot. The path is lit at night.",
    where: "Around the hill",
    visit: "Any time; vehicles are restricted on Pournami and Deepam",
    link: { href: "/tiruvannamalai-guide#calendar", label: "Girivalam dates 2026–27" },
  },
  {
    name: "Sri Ramanasramam",
    tamil: "ஸ்ரீ ரமணாஸ்ரமம்",
    text: "The ashram of Ramana Maharshi on Chengam Road at the foot of the hill, with his samadhi hall and the old hall where he sat. Vedic chanting at 8 AM and 5 PM.",
    where: "Chengam Road, on the Girivalam path",
    visit: "5:30 AM – 8:30 PM · samadhi hall closed 11 AM – 2 PM · free",
  },
  {
    name: "Virupaksha Cave and Skandashram",
    tamil: "விருபாக்ஷ குகை · ஸ்கந்தாஸ்ரமம்",
    text: "Where Ramana Maharshi lived on the hill — Virupaksha Cave from 1899 to 1916, then Skandashram higher up. A paved path of about 1.5 km climbs from behind Ramanasramam, with views over the temple towers.",
    where: "Southeastern slope of Arunachala",
    visit: "Roughly 8 AM – 4 PM · free",
  },
  {
    name: "Seshadri Swamigal Ashram",
    tamil: "சேஷாத்ரி சுவாமிகள் ஆசிரமம்",
    text: "The samadhi of Seshadri Swamigal, the saint of Tiruvannamalai who was close to the young Ramana. Next to Ramanasramam on the Girivalam path.",
    where: "Chengam Road, beside Ramanasramam",
  },
  {
    name: "Yogi Ramsuratkumar Ashram",
    tamil: "யோகி ராம்சுரத்குமார் ஆசிரமம்",
    text: "A large ashram dedicated to Yogi Ramsuratkumar, the 'Visiri Saamiyaar', at Agraharakollai on Chengam Road; annadhanam is served.",
    where: "Chengam Road",
  },
  {
    name: "Adi Annamalaiyar Temple",
    tamil: "ஆதி அண்ணாமலையார் கோயில்",
    text: "On the Girivalam path on the far side of the hill, between the Varuna and Vayu lingams. Tradition holds this temple to be older than the main one; Appar sang of it, and it is linked with Manikkavasagar's Thiruvembavai.",
    where: "Adi Annamalai, about 7 km round the path",
  },
  {
    name: "Siva Sri Thiyaneswar Amma Ashram — our ashram",
    tamil: "சிவ ஸ்ரீ தியானேஸ்வர் அம்மா ஆசிரமம்",
    text: "Maataji's ashram at Adi Annamalai, on the quiet side of the hill. Free annadhanam for sadhus and pilgrims every day, satsang and classes, and the darshan of Mounasamy Siddhar — the silent sadhu of Tiruvannamalai — who stands for darshan every evening.",
    where: `${site.address.street}, Adi Annamalai`,
    visit: `Open daily · annadhanam ${site.daily.programmeShort} · Mounasamy stands ${site.mounasamyStandingShort} · free`,
    ours: true,
    link: { href: "/mounasamy/darshan", label: "Mounasamy darshan details" },
  },
];

const lingams = [
  { n: "Indra Lingam", t: "இந்திர லிங்கம்", d: "East" },
  { n: "Agni Lingam", t: "அக்னி லிங்கம்", d: "South-east" },
  { n: "Yama Lingam", t: "எம லிங்கம்", d: "South" },
  { n: "Niruthi Lingam", t: "நிருதி லிங்கம்", d: "South-west" },
  { n: "Varuna Lingam", t: "வருண லிங்கம்", d: "West" },
  { n: "Vayu Lingam", t: "வாயு லிங்கம்", d: "North-west" },
  { n: "Kubera Lingam", t: "குபேர லிங்கம்", d: "North" },
  { n: "Esanya Lingam", t: "ஈசான்ய லிங்கம்", d: "North-east" },
];

const dayTrips: Place[] = [
  {
    name: "Sathanur Dam",
    tamil: "சாத்தனூர் அணை",
    text: "A dam on the Thenpennai river built in the 1950s, with gardens, a crocodile farm and a fish grotto — a family half-day out.",
    where: "About 30 km",
  },
  {
    name: "Gingee (Senji) Fort",
    tamil: "செஞ்சிக் கோட்டை",
    text: "A fort spread over three hills — Rajagiri, Krishnagiri and Chakkiliya Durg — protected by the Archaeological Survey of India and part of the UNESCO-listed Maratha Military Landscapes of India.",
    where: "About 40 km",
    visit: "ASI ticket; go early, the climb is steep",
  },
  {
    name: "Parvathamalai",
    tamil: "பர்வதமலை",
    text: "A steep pilgrimage hill with the Mallikarjunar temple on the summit, climbed by devotees on full-moon nights.",
    where: "About 30 km",
  },
  {
    name: "Padavedu Renugambal Temple",
    tamil: "படவேடு ரேணுகாம்பாள் கோயில்",
    text: "A celebrated goddess temple in a valley village of many old temples linked to the Sambuvarayar rulers.",
    where: "About 55 km, via Polur",
  },
  {
    name: "Javadhu Hills and Jamunamarathur",
    tamil: "ஜவ்வாது மலை · ஜமுனாமரத்தூர்",
    text: "Cool forested hills with Beema Falls and the Vainu Bappu Observatory at Kavalur.",
    where: "About 75 km",
  },
];

const faqs = [
  {
    question: "What are the best places to visit in Tiruvannamalai?",
    answer:
      "The Arunachaleswarar (Annamalaiyar) Temple; the 14 km Girivalam path with its eight lingams; Sri Ramanasramam; Virupaksha Cave and Skandashram on the hill; the Seshadri Swamigal and Yogi Ramsuratkumar ashrams; the Adi Annamalaiyar temple; and Siva Sri Thiyaneswar Amma Ashram at Adi Annamalai, home of Mounasamy Siddhar. Day trips: Sathanur Dam, Gingee Fort, Parvathamalai, Padavedu and the Javadhu Hills.",
  },
  {
    question: "திருவண்ணாமலையில் பார்க்க வேண்டிய இடங்கள் எவை?",
    answer:
      "அருணாசலேஸ்வரர் கோயில், 14 கி.மீ கிரிவலப் பாதை மற்றும் அஷ்ட லிங்கங்கள், ஸ்ரீ ரமணாஸ்ரமம், விருபாக்ஷ குகை, ஸ்கந்தாஸ்ரமம், சேஷாத்ரி சுவாமிகள் ஆசிரமம், யோகி ராம்சுரத்குமார் ஆசிரமம், ஆதி அண்ணாமலையார் கோயில், மௌனசாமி சித்தர் வசிக்கும் ஆதி அண்ணாமலை சிவ ஸ்ரீ தியானேஸ்வர் அம்மா ஆசிரமம். அருகில்: சாத்தனூர் அணை, செஞ்சிக் கோட்டை, பர்வதமலை, படவேடு, ஜவ்வாது மலை.",
  },
  {
    question: "How many days do I need in Tiruvannamalai?",
    answer:
      "Two days is comfortable: one for the temple, Ramanasramam and the caves on the hill; one for the Girivalam walk with stops at the eight lingams, Adi Annamalai and the ashrams on the path. Add a day for Gingee Fort or Sathanur Dam.",
  },
  {
    question: "Can I climb Arunachala hill?",
    answer:
      "Climbing to the summit has been restricted by the Forest Department since the December 2024 landslide, including during Chitra Pournami and Karthigai Deepam 2025. The paved path to Virupaksha Cave and Skandashram is usually open. Check with the Forest Department or district administration before you go.",
  },
  {
    question: "When is the best time to visit Tiruvannamalai?",
    answer:
      "December to February is coolest; April to June is very hot. Pournami (full-moon) nights and Karthigai Deepam (Tuesday 24 November 2026) are the most special — and the most crowded — so book rooms early.",
  },
];

function PlaceCard({ p, i }: { p: Place; i: number }) {
  return (
    <article
      className={cn(
        "rounded-2xl p-5 md:p-6 flex flex-col gap-2.5 h-full",
        p.ours ? "bg-night text-on-night border border-gold/50" : "card card-hover",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "w-9 h-9 rounded-full inline-flex items-center justify-center font-display text-[17px] shrink-0",
            p.ours ? "bg-saffron text-ink" : "bg-sand text-saffron-text",
          )}
          aria-hidden
        >
          {i + 1}
        </span>
        <div className="min-w-0">
          <h3 className={cn("text-[20px] md:text-[21px] leading-snug", p.ours && "text-on-night-head")}>{p.name}</h3>
          <p lang="ta" className={cn("ta text-[15px]", p.ours ? "text-gold-light" : "text-saffron-text")}>
            {p.tamil}
          </p>
        </div>
      </div>
      <p className={cn("text-[15px]", p.ours ? "text-on-night-body" : "text-ink-2")}>{p.text}</p>
      <p className={cn("text-[13px] font-semibold", p.ours ? "text-gold-light" : "text-gold-text")}>{p.where}</p>
      {p.visit ? <p className={cn("text-[13px]", p.ours ? "text-on-night-2" : "text-ink-2")}>{p.visit}</p> : null}
      {p.link ? (
        <Link href={p.link.href} className={cn("mt-auto", p.ours ? "link-arrow-gold" : "link-arrow")}>
          {p.link.label} →
        </Link>
      ) : null}
    </article>
  );
}

const practical: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Sun, title: "Best time", text: "December–February is coolest. Pournami nights and Karthigai Deepam are special but very crowded — book rooms early." },
  { icon: Plane, title: "By air", text: "Chennai airport is about 175 km by road (3.5–4.5 hours). Bengaluru airport is the other option." },
  { icon: TrainFront, title: "By train", text: "Tiruvannamalai station is on the Katpadi–Villupuram line, a few km from the temple." },
  { icon: Bus, title: "By bus", text: "SETC and private buses from Chennai, Bengaluru and Puducherry; extra buses on Pournami. The bus stand is about 2 km from the temple." },
  { icon: Footprints, title: "Girivalam tips", text: "Walk barefoot, keep the hill on your right, carry water, start early morning or after sunset, and allow 3–5 hours." },
  { icon: TriangleAlert, title: "Hill climbing", text: "Summit climbing has been restricted since the 2024 landslide. Check with the Forest Department before planning a climb." },
];

export default async function PlacesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Places to visit in Tiruvannamalai",
    itemListElement: [...inTown, ...dayTrips].map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
        name: p.name,
        alternateName: p.tamil,
        description: p.text,
        ...(p.ours ? { url: absoluteUrl(`/${locale}/ashram`) } : {}),
      },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          itemList,
          breadcrumbSchema([
            { name: "Home", path: `/${locale}` },
            { name: "Tiruvannamalai guide", path: `/${locale}/tiruvannamalai-guide` },
            { name: "Places to visit", path: `/${locale}${PATH}` },
          ]),
        ]}
      />
      <PageHero
        variant="night"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tiruvannamalai guide", href: "/tiruvannamalai-guide" },
          { label: "Places to visit" },
        ]}
        eyebrow="Tiruvannamalai travel guide · updated November 2026"
        title="Places to visit in Tiruvannamalai"
        tamil="திருவண்ணாமலை பார்க்க வேண்டிய இடங்கள்"
        lede="The temple, the Girivalam path and its eight lingams, the ashrams of the saints, the caves on Arunachala — and the day trips around them. Written by the ashram at Adi Annamalai, on the Girivalam path, for pilgrims we meet every day."
        extra={
          <JumpLinks
            onNight
            items={[
              { href: "#in-town", label: "In town & on the path" },
              { href: "#lingams", label: "Ashta lingams" },
              { href: "#day-trips", label: "Day trips" },
              { href: "#plan", label: "Plan your trip" },
              { href: "#faq", label: "FAQ" },
            ]}
          />
        }
      />

      <section className="container-site pt-10 md:pt-14">
        <Reveal>
          <QuickAnswer question="What to see in Tiruvannamalai?">
            Arunachaleswarar Temple, the 14 km Girivalam path and its eight lingams, Sri Ramanasramam,
            Virupaksha Cave and Skandashram, the Seshadri Swamigal and Yogi Ramsuratkumar ashrams, Adi
            Annamalaiyar temple and — on the same path — our ashram at Adi Annamalai, home of Mounasamy
            Siddhar. For day trips: Sathanur Dam, Gingee Fort, Parvathamalai, Padavedu and the Javadhu Hills.
          </QuickAnswer>
        </Reveal>
      </section>

      <section id="in-town" className="container-site section-pad flex flex-col gap-8 scroll-mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="In town and on the Girivalam path"
            title="Eight places you can see in a day or two."
            tamil="நகரிலும் கிரிவலப் பாதையிலும்"
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {inTown.map((p, i) => (
            <RevealItem key={p.name} className="h-full">
              <PlaceCard p={p} i={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="lingams" className="bg-white border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-12">
          <Reveal className="flex-[1_1_380px] flex flex-col gap-4 min-w-0">
            <Eyebrow>The Ashta Lingams · அஷ்ட லிங்கங்கள்</Eyebrow>
            <h2 className="h2">Eight lingams around the hill, in walking order.</h2>
            <p className="text-ink-2">
              Walking Girivalam clockwise from the temple, you pass eight shrines, one for each direction.
              Between the Varuna and Vayu lingams the path reaches Adi Annamalai — where our ashram serves
              annadhanam and Mounasamy Siddhar gives darshan.
            </p>
            <AshramStopCard context="Between the Varuna and Vayu lingams" />
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_420px] min-w-0">
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lingams.map((l, i) => (
                <li key={l.n} className="card-ivory rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-saffron text-ink inline-flex items-center justify-center font-bold text-sm shrink-0" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{l.n}</span>
                    <span className="block text-[13px] text-ink-2">
                      <span lang="ta" className="ta">{l.t}</span> · {l.d}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section id="day-trips" className="container-site section-pad flex flex-col gap-8 scroll-mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Day trips from Tiruvannamalai"
            title="Forts, dams, hills and an ancient goddess temple."
            tamil="அருகிலுள்ள சுற்றுலா இடங்கள்"
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {dayTrips.map((p, i) => (
            <RevealItem key={p.name} className="h-full">
              <PlaceCard p={p} i={inTown.length + i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="plan" className="bg-sand border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-col gap-8">
          <Reveal>
            <SectionHeading eyebrow="Plan your trip" title="When to come, how to get here, and Girivalam tips." />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practical.map((p) => (
              <RevealItem key={p.title} className="card rounded-2xl p-5 flex gap-3.5">
                <IconCircle icon={p.icon} tone="sand" size={18} className="w-10! h-10!" />
                <div className="min-w-0">
                  <h3 className="text-[18px]">{p.title}</h3>
                  <p className="mt-1 text-sm text-ink-2">{p.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="flex flex-wrap gap-3">
            <Link href="/tiruvannamalai-guide" className="btn btn-night">
              <Landmark size={18} aria-hidden /> Temple timings & Girivalam dates
            </Link>
            <Link href="/book-a-visit" className="btn btn-outline-saffron">
              <CalendarDays size={18} aria-hidden /> Stay or visit at our ashram
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="container-site section-pad flex flex-wrap gap-8 md:gap-10 scroll-mt-24">
        <Reveal className="flex-[1_1_300px] min-w-0 flex flex-col gap-3">
          <Eyebrow>Questions people ask</Eyebrow>
          <h2 className="h2">Visiting Tiruvannamalai.</h2>
          <IconCircle icon={Mountain} tone="sand" />
        </Reveal>
        <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0 flex flex-col gap-5">
          <FAQ items={faqs} />
          <Sources
            items={[
              { label: "Wikipedia: Annamalaiyar Temple", href: "https://en.wikipedia.org/wiki/Annamalaiyar_Temple" },
              { label: "Wikipedia: Girivalam", href: "https://en.wikipedia.org/wiki/Girivalam" },
              { label: "Ramanasramam", href: "https://www.gururamana.org/Ashram/ashram-at-a-glance" },
              { label: "Tiruvannamalai district", href: "https://tiruvannamalai.nic.in/places-of-interest/" },
              { label: "Wikivoyage", href: "https://en.wikivoyage.org/wiki/Tiruvannamalai" },
            ]}
          />
        </Reveal>
      </section>

      <VisitAshramBand />
    </>
  );
}
