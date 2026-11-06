import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  Flame,
  HandHeart,
  Heart,
  Images,
  Mountain,
  Quote,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { maatajiPersonSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { IconCircle } from "@/components/ui/IconCircle";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/maataji",
    title: "Thiyaneswar Amma — Sathguru Siva Rajeswari, Maataji",
    description:
      "About Maataji, Sathguru Siva Sri Thiyaneswar Amma (Siva Rajeswari): her journey, teachings, books and the ashram she founded at Adi Annamalai, Tiruvannamalai.",
    image: images.maatajiPortrait,
  });
}

type Milestone = {
  when: ReactNode;
  title: string;
  text: ReactNode;
  dot: "gold" | "saffron" | "night";
};

const journey: Milestone[] = [
  {
    when: (
      <>
        <Placeholder label="YEAR" /> · Early life
      </>
    ),
    title: "A childhood turned towards Shiva",
    text: (
      <Placeholder label="Place of birth, family and the first signs of devotion — two or three sentences in Amma's own words, from “Amma's Biography”." />
    ),
    dot: "gold",
  },
  {
    when: (
      <>
        <Placeholder label="YEAR" /> · Arunachala calls
      </>
    ),
    title: "Coming to Tiruvannamalai",
    text: (
      <Placeholder label="How Amma came to the hill, her sadhana and the experiences she describes in “Sivam in my Experience”." />
    ),
    dot: "gold",
  },
  {
    when: "More than 25 years ago · Annadhanam begins",
    title: "Feeding sadhus on Pournami and festival days",
    text: "Amma begins offering food to sadhus, pilgrims and the poor on full-moon days, Karthigai Deepam and Shivaratri — a seva the ashram says has continued for over 25 years and now runs every single day.",
    dot: "saffron",
  },
  {
    when: "24 April 2017 · The trust is born",
    title: "Siva Sri Thiyaneswar Amma Asramam, Reg 63/BK4/2017",
    text: "Amma — Smt. Siva Rajeswari — registers the charitable trust and establishes the ashram at Adi Annamalai on the Girivalam path, with annadhanam, Sivayogam, free medical camps, Girivalam-path cleaning and village education as its work.",
    dot: "saffron",
  },
  {
    when: "2019 – 2021 · Deepam, Maheswara Poojai, Covid care",
    title: "One lakh meals on a single Deepam night",
    text: "The ashram reports feeding one lakh people on Karthigai Deepam, conducts Maheswara Poojai for sadhus, and through the pandemic runs Covid-care relief for the town.",
    dot: "saffron",
  },
  {
    when: "January 2024 · A song for the world",
    title: "“Thiyaneshwara! Thiyaneshwara!!”",
    text: "Lyrics written by Amma are sung by Solar Sai and released by Jothi TV; the song crosses six million views and carries her name far beyond Tamil Nadu.",
    dot: "saffron",
  },
  {
    when: "Today",
    title: "365 days of annadhanam, and a growing family of disciples",
    text: "Daily food for sadhus on the Girivalam road, Thiruvasagam and Kailaya Vathiyam classes, satsangs, monthly Pournami poojas and special festival poojas — carried by Maataji and the disciples she has guided.",
    dot: "night",
  },
];

const dotClass: Record<Milestone["dot"], string> = {
  gold: "bg-gold",
  saffron: "bg-saffron",
  night: "bg-night",
};

const pillars: { tamil: string; title: string; text: string; icon: LucideIcon }[] = [
  {
    tamil: "அன்பே சிவம்",
    title: "Love is Shiva",
    text: "See Shiva in every being you meet — the sadhu, the stranger, the one who hurt you. Compassion for all living beings is not separate from Siva worship; it is Siva worship.",
    icon: Heart,
  },
  {
    tamil: "அதுவே தவம்",
    title: "Service is the penance",
    text: "Feed before you fast, serve before you seek. A plate of food placed in a hungry hand is a prayer Arunachala always hears.",
    icon: HandHeart,
  },
  {
    tamil: "திருவண்ணாமலையே திருக்கயிலாயம்",
    title: "This hill is Kailash",
    text: "The title of Amma's book says it plainly: you do not need to travel to the Himalayas. Walk around Arunachala with a quiet mind and you are already there.",
    icon: Mountain,
  },
  {
    tamil: "சிவயோகம்",
    title: "Simple daily sadhana",
    text: "A short daily Siva pooja, a few minutes of Sivayogam breath and meditation, Thiruvasagam on the lips — small, steady practices that anyone can keep, taught free of cost.",
    icon: Flame,
  },
];

const books = [
  {
    title: "Sivam in my Experience",
    tamil: "என் அனுபவத்தில் சிவம்",
    text: "Amma's own account of grace, sadhana and the experiences that shaped her path.",
    spine: "bg-night border-gold text-gold-light",
  },
  {
    title: "Thiruvannamalai itself is Thirukailayam",
    tamil: "திருவண்ணாமலையே திருக்கயிலாயம்",
    text: "Why the hill is Shiva himself, and how to walk Girivalam as a pilgrimage of the heart.",
    spine: "bg-saffron-text border-gold text-on-night-head",
  },
  {
    title: "Amma's Biography",
    tamil: "அம்மாவின் வாழ்க்கை வரலாறு",
    text: "The full story of Maataji's life, as told by the ashram.",
    spine: "bg-gold border-night text-ink",
  },
];

export default async function MaatajiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={maatajiPersonSchema()} />

      {/* Page hero */}
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Maataji" }]}
        eyebrow="About Maataji"
        title="Sathguru Siva Sri Thiyaneswar Amma"
        tamil="சத்குரு சிவ ஸ்ரீ தியானேஸ்வர் அம்மா"
        lede="Known to her devotees simply as Maataji — a Shiva bhakta, a mother to the sadhus of Arunachala, a teacher of Thiruvasagam, a writer of songs, and the founder of the ashram at Adi Annamalai."
        actions={
          <>
            <Button href="/book-a-visit">
              <CalendarDays size={18} aria-hidden /> Plan a visit
            </Button>
            <Button href="/teachings" variant="outline-saffron">
              <BookOpen size={18} aria-hidden /> Read her teachings
            </Button>
          </>
        }
        asideClassName="flex-[0_1_380px]"
        aside={
          <div className="relative animate-halo border-[3px] border-gold rounded-t-[190px] rounded-b-[26px] p-2.5 bg-white">
            <Image
              src={images.maatajiPortrait.src}
              alt="Maataji in saffron, rudraksha and a red bindi, looking at the camera"
              width={330}
              height={410}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 240px, 330px"
              className="w-[240px] h-[300px] md:w-[330px] md:h-[410px] object-cover object-[50%_20%] rounded-t-[180px] rounded-b-[18px]"
            />
          </div>
        }
      />

      {/* Journey timeline */}
      <section className="container-site section-pad-lg flex flex-wrap gap-10 md:gap-14">
        <Reveal className="flex-[1_1_320px] flex flex-col gap-3.5 max-w-[420px]">
          <Eyebrow>Her journey</Eyebrow>
          <h2 className="h2">From a kitchen that fed sadhus to an ashram on the hill.</h2>
          <p className="text-ink-2">
            Maataji's story is told here only as she and the ashram tell it. The milestones in
            square brackets are waiting for her own words.
          </p>
          <PhotoFigure
            image={images.maatajiFlowers}
            alt="Maataji in meditation, covered in flower petals during a pooja"
            ratio="9/16"
            rounded="card"
            className="mt-2.5 max-w-[300px]"
            sizes="(max-width: 768px) 80vw, 300px"
          />
        </Reveal>
        <RevealGroup className="flex-[1_1_560px] min-w-0">
          <ol className="list-none m-0 p-0 flex flex-col border-l-2 border-line">
            {journey.map((m, i) => (
              <RevealItem
                key={m.title}
                as="li"
                className={cn("relative pl-7 md:pl-9", i < journey.length - 1 ? "pb-8 md:pb-9" : "")}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-[3px] border-ivory",
                    dotClass[m.dot],
                  )}
                />
                <p className="eyebrow-gold text-[13px]">{m.when}</p>
                <h3 className="h3 mt-1.5 mb-1.5">{m.title}</h3>
                <p className="text-ink-2">{m.text}</p>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </section>

      {/* Teachings pillars */}
      <section className="bg-night text-on-night">
        <div className="container-site section-pad flex flex-col gap-8 md:gap-10">
          <Reveal>
            <SectionHeading
              onNight
              eyebrow="What Maataji teaches"
              title="Four threads that run through her books, songs and daily seva."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {pillars.map((p) => (
              <RevealItem
                key={p.title}
                as="article"
                className="border border-night-line rounded-card p-6 md:p-7 flex flex-col gap-2.5 bg-white/[.03] card-hover"
              >
                <IconCircle icon={p.icon} tone="night" className="border border-night-line-2 mb-1" />
                <p lang="ta" className="ta text-[20px] md:text-[22px] text-gold-light break-words">
                  {p.tamil}
                </p>
                <h3 className="text-[22px] text-on-night-head">{p.title}</h3>
                <p className="text-[15px] text-on-night-2">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Books */}
      <section className="container-site section-pad flex flex-col gap-8 md:gap-9">
        <Reveal>
          <SectionHeading
            eyebrow="Books by Amma"
            title="Three books, in Tamil and English."
            action={<ArrowLink href="/teachings">All teachings</ArrowLink>}
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {books.map((b) => (
            <RevealItem
              key={b.title}
              as="article"
              className="card card-hover p-6 md:p-7 flex gap-5"
            >
              <div
                aria-hidden
                className={cn(
                  "w-[92px] h-[128px] shrink-0 rounded-md border-l-[6px] flex items-end p-2.5 font-display text-[11px] leading-[1.2]",
                  b.spine,
                )}
              >
                {b.title}
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                <h3 className="text-[22px]">{b.title}</h3>
                <p lang="ta" className="ta text-[15px] text-gold-text">
                  {b.tamil}
                </p>
                <p className="text-[15px] text-ink-2">{b.text}</p>
                <Link href="/teachings" className="link-arrow mt-auto">
                  <Placeholder label="Read / order" />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Disciples */}
      <section className="bg-sand border-y border-line">
        <div className="container-site section-pad flex flex-wrap items-center gap-10 md:gap-12">
          <Reveal className="flex-[1_1_400px] flex flex-col gap-3.5">
            <Eyebrow>Disciples &amp; community</Eyebrow>
            <h2 className="h2">A family that carries her seva.</h2>
            <p className="text-ink-2">
              Maataji has many disciples who carry her teaching and her annadhanam across Tamil
              Nadu and beyond. The best known is <strong>Mounasamy Siddhar</strong> — Mouna
              Siddhar of Tiruvannamalai — whose silence, kept for more than fifteen years, is
              itself a teaching she gave him. Sadhus of the Girivalam road, village children
              learning Kailaya Vathiyam, and devotees from Chennai to overseas all count
              themselves part of this family.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <span className="chip">
                <Users size={14} className="text-saffron-text" aria-hidden /> Disciples across Tamil Nadu and beyond
              </span>
              <span className="chip">
                <Images size={14} className="text-saffron-text" aria-hidden /> Sadhus, children, devotees
              </span>
            </div>
            <ArrowLink href="/gallery">See the community in pictures</ArrowLink>
          </Reveal>
          <RevealGroup className="flex-[1_1_440px] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RevealItem as="article" className="card card-hover p-5 flex flex-col gap-2.5">
              <PhotoFigure
                image={images.mounasamyGarland}
                alt="Mounasamy Siddhar, garlanded, ash on his face"
                ratio="1/1"
                position="50% 20%"
                rounded="card"
                frame="none"
                sizes="(max-width: 640px) 100vw, 260px"
              />
              <h3 className="text-[20px]">Mounasamy Siddhar</h3>
              <p className="text-sm text-ink-2">
                Mouna Siddhar of Tiruvannamalai. Guided into silence by Maataji; now living at the
                ashram in her care.{" "}
                <Link href="/mounasamy" className="font-semibold text-saffron-text">
                  His story →
                </Link>
              </p>
            </RevealItem>
            <RevealItem as="article" className="card card-hover p-5 flex flex-col gap-2.5">
              <PhotoFigure
                image={images.maatajiSeva}
                alt="Sadhus receiving vastram from Maataji"
                ratio="1/1"
                rounded="card"
                frame="none"
                sizes="(max-width: 640px) 100vw, 260px"
              />
              <h3 className="text-[20px]">The sadhus of Arunachala</h3>
              <p className="text-sm text-ink-2">
                Fed, clothed and honoured at Maheswara Poojai every year.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Meeting Maataji — honest note */}
      <section className="container-site section-pad flex flex-wrap items-center gap-8 md:gap-10">
        <Reveal className="flex-[1_1_520px] card rounded-[22px] p-6 md:p-9 flex flex-col gap-3.5">
          <div className="flex items-center gap-3.5">
            <IconCircle icon={CalendarCheck} tone="sand" />
            <h2 className="font-display text-[26px] md:text-[30px] leading-tight">Meeting Maataji</h2>
          </div>
          <p className="text-ink-2">
            Maataji meets devotees as her schedule and health allow, most often around satsang and
            pooja times. Requesting a visit lets us expect you and guide you — it does not
            guarantee a personal meeting. Satsang, pooja, Thiruvasagam classes and annadhanam are
            open to everyone who comes with respect.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 mt-1.5">
            <Button href="/book-a-visit">Request a visit date</Button>
            <Button href="/events" variant="outline-saffron">
              Satsang &amp; pooja dates
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_320px] flex flex-col gap-3">
          <Quote size={28} className="text-gold" aria-hidden />
          <p lang="ta" className="ta text-[24px] md:text-[26px] text-saffron-text font-bold leading-[1.4]">
            “உள்ளது எல்லாம் சிவமானது”
          </p>
          <p className="font-display text-[20px]">“All that exists is Shiva.”</p>
          <p className="text-sm text-ink-2">From the ashram's seal.</p>
        </Reveal>
      </section>
    </>
  );
}
