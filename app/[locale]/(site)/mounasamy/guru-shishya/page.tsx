import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  BookOpen,
  Flame,
  HandHeart,
  HandHelping,
  House,
  Landmark,
  MicOff,
  Mountain,
  Sparkles,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OverlayFigure } from "@/components/ui/OverlayFigure";
import { IconCircle } from "@/components/ui/IconCircle";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/mounasamy/guru-shishya",
    title: "Mouna Guru Siddhar Tiruvannamalai: Maataji & Mounasamy",
    description:
      "How Mouna Siddhar of Tiruvannamalai reached silence under his guru Maataji, Sathguru Siva Sri Thiyaneswar Amma — the guru–shishya story as the ashram tells it.",
    image: images.mounasamyGarland,
  });
}

const bond = [
  { n: "1", title: "Seeking.", text: "The seeker comes to the guru with a longing he cannot name." },
  {
    n: "2",
    title: "Seva.",
    text: "Years of service — kitchen, altar, path, people — that quietly wear down the ego.",
  },
  {
    n: "3",
    title: "Sadhana.",
    text: "The guru gives the practices one at a time, each when the shishya is ready.",
  },
  {
    n: "4",
    title: "Diksha.",
    text: "Initiation — a name, a mantra, a vow. For Mounasamy, the vow was silence.",
  },
  {
    n: "5",
    title: "Care, for life.",
    text: "The guru keeps watch over the shishya to the end — which is why Mounasamy now lives at Maataji's ashram.",
    night: true,
  },
];

type Teaching = {
  icon: LucideIcon;
  tamil: string;
  title: string;
  text: string;
  highlight?: boolean;
};

const teachings: Teaching[] = [
  {
    icon: Wind,
    tamil: "சிவயோகம்",
    title: "Sivayogam — breath and stillness",
    text: "The asana and pranayama that let a body sit upright for days. What devotees see as a miracle of endurance is, first, a well-taught practice.",
  },
  {
    icon: Flame,
    tamil: "சிவ பூஜை",
    title: "Daily Siva pooja",
    text: "The altar he sits before — its lamp, flowers and vibhuti — follows the pooja Maataji teaches every morning at the ashram.",
  },
  {
    icon: BookOpen,
    tamil: "திருவாசகம்",
    title: "Thiruvasagam, inwardly",
    text: "Manikkavasagar's hymns, learnt in Maataji's classes, are now recited without a sound — the words went inside when the voice stopped.",
  },
  {
    icon: Sparkles,
    tamil: "விபூதி",
    title: "Vibhuti and dhyana",
    text: "The sacred ash that covers him is the mark of a Saiva sadhu; the meditation beneath it is Maataji's Siva dhyana.",
  },
  {
    icon: HandHeart,
    tamil: "சேவை",
    title: "Seva before silence",
    text: "Before he stopped speaking he served — annadhanam, the Girivalam path, sadhus. Maataji's rule: feed first, then sit.",
  },
  {
    icon: MicOff,
    tamil: "மௌனம்",
    title: "Mouna — the final teaching",
    text: "When the practices had done their work, Maataji gave him the vow of silence. It has not been broken since.",
    highlight: true,
  },
];

type Stage = {
  icon: LucideIcon;
  when: string;
  whenSuffix?: string;
  stage: string;
  gave: string;
  changed: string;
};

const stages: Stage[] = [
  {
    icon: Mountain,
    when: "Year",
    stage: "Arrival at Arunachala",
    gave: "Shelter, food, a place at the ashram's work",
    changed: "Leaves the milk trade and the city for good",
  },
  {
    icon: HandHelping,
    when: "Years",
    stage: "Guru seva",
    gave: "Daily duties: kitchen, altar, Girivalam path, sadhus",
    changed: "About ten years of service; the ego thins",
  },
  {
    icon: Wind,
    when: "Year",
    stage: "Sivayogam and Siva pooja",
    gave: "Asana, pranayama, the morning pooja, Thiruvasagam",
    changed: "Can sit for long hours; the mind settles",
  },
  {
    icon: MicOff,
    when: "Year",
    stage: "Diksha",
    gave: "A vow of mouna; vibhuti; the discipline of not lying down",
    changed: "Stops speaking. Sits before his altar day and night",
  },
  {
    icon: Landmark,
    when: "Years",
    stage: "Sri Mouna Swami Peetam",
    gave: "Maataji's oversight of his care from a distance",
    changed: "Pilgrims begin to call him Mouna Siddhar",
  },
  {
    icon: House,
    when: "Year",
    whenSuffix: " – today",
    stage: "At Thiyaneswar Amma Ashram",
    gave: "Daily care: food, altar, protection of his silence",
    changed: "Darshan for thousands; still silent",
  },
];

export default async function GuruShishyaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero: two portraits */}
      <section className="bg-sand border-b border-line">
        <div className="container-site py-14 md:py-[72px] flex flex-col gap-9">
          <Reveal immediate className="flex flex-col gap-3.5 max-w-[860px]">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Mounasamy", href: "/mounasamy" },
                { label: "Guru & shishya" },
              ]}
            />
            <Eyebrow>Guru &amp; shishya</Eyebrow>
            <h1 className="h1-page">
              Maataji and Mounasamy: the guru who taught, the shishya who fell silent.
            </h1>
            <p lang="ta" className="ta text-[20px] md:text-[22px] leading-snug text-saffron-text">
              குரு – சிஷ்யர் · தியானேஸ்வர் அம்மாவும் மௌனசாமியும்
            </p>
            <p className="lede text-ink-2">
              Mouna Siddhar of Tiruvannamalai did not arrive at silence alone. He was guided into it,
              step by step, by his guru — Sathguru Siva Sri Thiyaneswar Amma, whom the ashram calls
              Maataji. This page tells that story as the ashram tells it.
            </p>
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Reveal immediate delay={0.1} className="flex-[1_1_380px] min-w-0 max-w-[560px]">
              <OverlayFigure
                image={images.maatajiStudio}
                alt="Maataji seated in a wooden chair, saffron robes, vibhuti and rudraksha, in a warm wood-panelled studio"
                title="Maataji — the guru"
                sub="Sathguru Siva Sri Thiyaneswar Amma"
                ratio="1/1"
                position="60% 30%"
                frame="gold"
                priority
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </Reveal>
            <Reveal immediate delay={0.2} className="flex-[0_0_auto]">
              <span aria-hidden className="flex flex-col items-center gap-1.5 text-saffron-text">
                <span className="w-0.5 h-10 bg-gold" />
                <span className="font-display text-sm tracking-[.14em] uppercase">guided</span>
                <span className="w-0.5 h-10 bg-gold" />
              </span>
            </Reveal>
            <Reveal immediate delay={0.3} className="flex-[1_1_380px] min-w-0 max-w-[560px]">
              <OverlayFigure
                image={images.mounasamyGarland}
                alt="Mounasamy Siddhar garlanded, ash on his face and beard"
                title="Mounasamy — the shishya"
                sub="Mouna Siddhar of Tiruvannamalai"
                ratio="1/1"
                position="50% 20%"
                frame="gold"
                priority
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What guru-shishya means */}
      <section className="container-site section-pad-lg flex flex-wrap gap-10 md:gap-12">
        <Reveal className="flex-[1_1_360px] flex flex-col gap-3 min-w-0">
          <Eyebrow>What the bond means</Eyebrow>
          <h2 className="h2">The guru gives. The shishya serves, and receives.</h2>
          <p className="text-ink-2">
            In the Hindu tradition the guru–shishya relationship is not a class or a course. The
            shishya lives near the guru, serves without being asked, and absorbs the teaching as
            much from the guru's daily life as from her words. The guru, in turn, takes
            responsibility for the shishya's whole path — body, mind and spirit — and passes on what
            her own guru gave her. That chain is the parampara.
          </p>
          <p className="text-sm text-ink-2">
            For a longer explanation, Hinduism Today's feature on the guru–shishya tradition is a
            good starting point.{" "}
            <ArrowLink href="https://www.hinduismtoday.com/magazine/apr-may-jun-2023/guru-shishya/">
              Read it
            </ArrowLink>
          </p>
        </Reveal>
        <RevealGroup className="flex-[1_1_440px] flex flex-col gap-3 min-w-0">
          {bond.map((b) => (
            <RevealItem
              key={b.n}
              className={
                b.night
                  ? "card-night rounded-2xl px-5 py-[18px] flex gap-4 items-start"
                  : "card card-hover rounded-2xl px-5 py-[18px] flex gap-4 items-start"
              }
            >
              <span
                className={`font-display text-[28px] leading-none ${b.night ? "text-gold-light" : "text-gold"}`}
                aria-hidden
              >
                {b.n}
              </span>
              <span className={b.night ? "text-on-night" : "text-ink"}>
                <strong>{b.title}</strong> {b.text}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* What Maataji taught him */}
      <section className="bg-night text-on-night">
        <div className="container-site section-pad flex flex-col gap-9">
          <Reveal>
            <SectionHeading
              onNight
              eyebrow="What Maataji taught him"
              title="Every skill that holds his silence up was given by his guru."
              lede="As the ashram tells it, Mounasamy learnt the whole of his practice under Maataji. Each card below is a discipline she teaches at the ashram to this day — and the way it lives on in him."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachings.map((t) => (
              <RevealItem
                key={t.title}
                as="article"
                className={
                  t.highlight
                    ? "rounded-card border-2 border-saffron bg-saffron/10 p-6 flex flex-col gap-2"
                    : "rounded-card border border-night-line bg-white/[.03] p-6 flex flex-col gap-2"
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <p lang="ta" className="ta text-[20px] text-gold-light">
                    {t.tamil}
                  </p>
                  <IconCircle icon={t.icon} tone="gold" size={18} className="w-10! h-10!" />
                </div>
                <h3 className="font-display text-[22px] leading-tight text-on-night-head">{t.title}</h3>
                <p className="text-[15px] text-on-night-2">{t.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* A sadhana, stage by stage — vertical timeline */}
      <section className="container-site section-pad-lg flex flex-col gap-7">
        <Reveal>
          <SectionHeading
            eyebrow="A sadhana, stage by stage"
            title="Mounasamy's journey under Maataji's guidance."
            lede="A plain record for devotees and seekers who want to understand how silence is reached. Years and details in brackets are for Maataji and the office to confirm; nothing here should be published as fact until she has."
          />
        </Reveal>
        <RevealGroup className="card overflow-hidden">
          <ol className="m-0 p-0 list-none">
            {stages.map((s, i) => {
              const last = i === stages.length - 1;
              return (
                <RevealItem
                  key={s.stage}
                  as="li"
                  className={`flex gap-4 md:gap-6 px-5 py-5 md:px-7 md:py-6 ${last ? "bg-ivory" : "border-b border-line"}`}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <IconCircle icon={s.icon} tone={last ? "saffron" : "sand"} size={20} className="w-11! h-11!" />
                    {!last ? <span className="w-px flex-1 bg-line mt-2 -mb-7" aria-hidden /> : null}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <p className="eyebrow-gold">
                      <Placeholder label={s.when} />
                      {s.whenSuffix ?? ""}
                    </p>
                    <h3 className="h3">{s.stage}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 text-[15px]">
                      <div>
                        <p className="text-[12px] tracking-[.12em] uppercase font-semibold text-ink-2">
                          What Maataji gave
                        </p>
                        <p className="mt-1">{s.gave}</p>
                      </div>
                      <div>
                        <p className="text-[12px] tracking-[.12em] uppercase font-semibold text-ink-2">
                          What changed in him
                        </p>
                        <p className="mt-1">{s.changed}</p>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </ol>
        </RevealGroup>
      </section>

      {/* In Maataji's words + other disciples */}
      <section className="bg-sand border-y border-line">
        <div className="container-site section-pad flex flex-wrap items-start gap-8 md:gap-10">
          <Reveal className="flex-[1_1_480px] card rounded-[22px] p-7 md:p-[34px] flex flex-col gap-3.5 min-w-0">
            <Eyebrow>In Maataji's words</Eyebrow>
            {/* DRAFT words — confirm with Maataji before launch. */}
            <blockquote className="m-0 border-l-[3px] border-gold pl-5 md:pl-[22px] flex flex-col gap-3">
              <p lang="ta" className="ta text-[18px] md:text-[21px] leading-[1.6] text-saffron-text">
                “மௌனமே அவருடைய மொழி; அவர் அமர்ந்திருப்பதே சிவ வழிபாடு. அவரிடம் எதுவும் கேட்க
                வேண்டாம் — அருகில் அமைதியாக அமருங்கள்; அந்த மௌனமே உங்களுக்குக் கற்றுத்தரும்.”
              </p>
              <p className="font-display text-[21px] md:text-[26px] leading-[1.35]">
                “Silence is his language; his sitting itself is his worship of Shiva. Do not ask him for
                anything — sit near him quietly, and let that silence teach you.”
              </p>
            </blockquote>
            <p className="text-sm text-ink-2">— Sathguru Siva Sri Thiyaneswar Amma</p>
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_380px] flex flex-col gap-3.5 min-w-0">
            <Eyebrow>The wider family</Eyebrow>
            <h2 className="font-display text-[26px] md:text-[32px] leading-[1.15]">
              Mounasamy is the best known of many.
            </h2>
            <p className="text-ink-2">
              Maataji's disciples run the kitchen, teach the children, clean the path and sing at
              the temples. A few of them, with her permission, are introduced here.
            </p>
            <ul className="flex flex-wrap gap-2.5 m-0 p-0 list-none">
              {[0, 1, 2].map((i) => (
                <li key={i} className="text-sm">
                  <Placeholder label="Disciple name · seva" />
                </li>
              ))}
            </ul>
            <ArrowLink href="/maataji">About Maataji</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-site section-pad flex flex-wrap items-center justify-between gap-6">
        <Reveal className="flex flex-col gap-2 max-w-[640px]">
          <h2 className="font-display text-[28px] md:text-[34px] leading-tight">
            See the guru and the shishya in one visit.
          </h2>
          <p className="text-ink-2">
            Both are at the ashram at Adi Annamalai. Sit with Mounasamy in the day; join satsang in
            the evening, where Maataji speaks when she can.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap gap-3">
          <Button href="/mounasamy/darshan" size="lg">
            Darshan details
          </Button>
          <Button href="/donate" variant="outline-saffron" size="lg">
            <HandHeart size={18} aria-hidden /> Support his care
          </Button>
        </Reveal>
      </section>
    </>
  );
}
