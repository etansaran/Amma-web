import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  BookOpen,
  CalendarDays,
  ChefHat,
  Clock,
  Flame,
  HandHeart,
  Languages,
  Map,
  Drum,
  MapPin,
  Moon,
  Plane,
  Shirt,
  Sparkles,
  Sun,
  Utensils,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { IconCircle } from "@/components/ui/IconCircle";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/ashram",
    title: "Tiruvannamalai Ashram near Girivalam Path, Adi Annamalai",
    description:
      "About Siva Sri Thiyaneswar Amma Ashram, a Tiruvannamalai ashram near the Girivalam path at Adi Annamalai: daily annadhanam, Sivayogam, classes, timings and visitor information.",
    image: images.girivalamWalk,
  });
}

const purpose: {
  num: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    num: "01 · Feed",
    title: "Annadhanam, every day",
    text: "Food for sadhus, pilgrims, the poor and the sick on the Girivalam road, 365 days a year, swelling to lakhs of plates on Pournami nights, Karthigai Deepam and Shivaratri. Vastram (cloth) and Maheswara Poojai for sadhus every year.",
    cta: "About Annadhanam",
    href: "/annadhanam",
    icon: Utensils,
  },
  {
    num: "02 · Teach",
    title: "Saivam, Sivayogam and sound",
    text: "Thiruvasagam and the Panniru Thirumurai, the lives of the 63 Nayanmars, free Sivayogam (yoga and meditation on the Ministry of AYUSH model), Kailaya Vathiyam and Pancha Vathiyam for village children, satsangs every week and on every full moon.",
    cta: "Teachings & classes",
    href: "/teachings",
    icon: BookOpen,
  },
  {
    num: "03 · Serve",
    title: "Girivalam path and village",
    text: "Cleaning the 14 km Girivalam path, free medical camps and ambulance support, Covid-care relief, desilting village ponds around the hill, skill training for women (sewing, cooking, weaving) and education support for village children.",
    cta: "Support this work",
    href: "/donate",
    icon: HandHeart,
  },
];

const day: { time: ReactNode; text: ReactNode; icon: LucideIcon; night?: boolean }[] = [
  {
    time: "Before dawn",
    text: (
      <>
        <strong>Kitchen seva begins.</strong> Rice, sambar and vegetables for the day's annadhanam.
      </>
    ),
    icon: ChefHat,
  },
  {
    time: <Placeholder label="06:00" />,
    text: (
      <>
        <strong>Daily Siva pooja</strong> in the ashram shrine, open to all.
      </>
    ),
    icon: Flame,
  },
  {
    time: site.daily.morning,
    text: (
      <>
        <strong>Morning satsang and classes</strong> — Sivayogam (breath, asana and meditation),
        free of cost.
      </>
    ),
    icon: Wind,
  },
  {
    time: site.daily.programmeShort,
    text: (
      <>
        <strong>Annadhanam</strong> for sadhus and pilgrims on the Girivalam road, morning and
        evening. Volunteers serve.
      </>
    ),
    icon: Utensils,
  },
  {
    time: site.daily.evening,
    text: (
      <>
        <strong>Thiruvasagam and Kailaya Vathiyam classes</strong> for children and devotees, and
        the evening satsang — bhajans, a reading, a word from Maataji when she is present.
      </>
    ),
    icon: Drum,
  },
  {
    time: site.mounasamyStanding,
    text: (
      <>
        <strong>Mounasamy stands to give darshan</strong> — the one hour of the day he rises from
        his seat.
      </>
    ),
    icon: Sun,
  },
  {
    time: "Pournami",
    text: (
      <>
        <strong>Full-moon pooja</strong> at the ashram and annadhanam through the night for
        Girivalam walkers.
      </>
    ),
    icon: Moon,
    night: true,
  },
];

const visitor: { eyebrow: string; title: ReactNode; note: ReactNode; icon: LucideIcon; lang?: string }[] = [
  {
    eyebrow: "Where",
    title: "Thiyaneswar Veedhi, Vediyappanur Road, Adi Annamalai, Tiruvannamalai 606604",
    note: "On the Girivalam path. Autos from the temple and bus stand know “Adi Annamalai”.",
    icon: MapPin,
  },
  {
    eyebrow: "When",
    title: (
      <>
        Open daily · satsang and annadhanam {site.daily.programme}
      </>
    ),
    note: `Maataji's darshan ${site.maatajiDarshan.daysInline}, ${site.maatajiDarshan.hoursShort}. Mounasamy stands for darshan ${site.mounasamyStandingShort} daily. Pournami nights, Karthigai Deepam and Maha Shivaratri run through the night.`,
    icon: Clock,
  },
  {
    eyebrow: "Dress & conduct",
    title: "Modest, traditional clothing; footwear off indoors",
    note: "Vegetarian only, no alcohol or smoking. Ask before photographing Maataji or sadhus.",
    icon: Shirt,
  },
  {
    eyebrow: "Facilities",
    title: "Pooja hall, dining hall, drinking water, restrooms",
    note: (
      <>
        {site.accommodation} <Placeholder label="Parking: confirm." />
      </>
    ),
    icon: Sparkles,
  },
  {
    eyebrow: "From abroad",
    title: "Chennai airport is about 175 km away",
    note: "Taxi 4–5 hours; trains and buses to Tiruvannamalai. Tamil is spoken; English, Hindi and Telugu help is available at the office.",
    icon: Plane,
  },
  {
    eyebrow: "Languages",
    title: "தமிழ் · English · తెలుగు · हिन्दी",
    note: "This whole website, the booking steps and every confirmation are available in all four.",
    icon: Languages,
  },
];

export default async function AshramPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-night text-on-night overflow-hidden min-h-[460px] md:min-h-[560px] flex items-end">
        <Image
          src={images.girivalamWalk.src}
          alt=""
          aria-hidden
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-70 animate-drift"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,60,.2)_0%,rgba(14,26,60,.92)_100%)]"
        />
        <div className="container-site relative pt-20 pb-12 md:pt-[120px] md:pb-16 w-full">
          <Reveal immediate className="flex flex-col gap-4">
            <Breadcrumbs onNight items={[{ label: "Home", href: "/" }, { label: "About the ashram" }]} />
            <Eyebrow tone="gold">The ashram</Eyebrow>
            <h1 className="h1-page text-on-night-head max-w-[820px]">
              A home on the Girivalam path, where everyone is fed first and asked questions later.
            </h1>
            <p className="lede text-on-night-body max-w-[720px]">
              Siva Sri Thiyaneswar Amma Ashram stands at Adi Annamalai, on the far side of
              Arunachala from the great temple — the stretch where the road is quiet and the hill
              is closest. A Tiruvannamalai ashram near the Girivalam path, open to every pilgrim.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Purpose */}
      <section className="container-site section-pad-lg flex flex-col gap-8 md:gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Why the ashram exists"
            title="Feed the hungry, teach the willing, serve the town."
            lede="The trust was registered on 24 April 2017 by Amma with a simple charter: welfare for the general public, offered without discrimination. Everything on this page flows from it."
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {purpose.map((p) => (
            <RevealItem
              key={p.num}
              as="article"
              className="card card-hover rounded-lg p-6 md:p-[30px] flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-sm tracking-[.14em] uppercase text-gold-text">{p.num}</p>
                <IconCircle icon={p.icon} tone="sand" className="w-10! h-10!" size={18} />
              </div>
              <h3 className="text-[24px] md:text-[26px]">{p.title}</h3>
              <p className="text-ink-2">{p.text}</p>
              <ArrowLink href={p.href} className="mt-auto">
                {p.cta}
              </ArrowLink>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* A day at the ashram */}
      <section className="bg-sand border-y border-line">
        <div className="container-site section-pad flex flex-wrap items-start gap-10 md:gap-14">
          <Reveal className="flex-[1_1_360px] flex flex-col gap-3.5">
            <Eyebrow>A day at the ashram</Eyebrow>
            <h2 className="h2">The kitchen wakes before the hill does.</h2>
            <p className="text-ink-2">
              Timings in brackets are to be confirmed by the ashram office; they change on
              Pournami and festival days.
            </p>
            <PhotoFigure
              image={images.maatajiSeated}
              alt="Maataji seated in the pooja hall"
              ratio="1/1"
              rounded="card"
              className="mt-3 max-w-[420px]"
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </Reveal>
          <RevealGroup className="flex-[1_1_520px] flex flex-col gap-3">
            {day.map((d, i) => (
              <RevealItem
                key={i}
                className={cn(
                  "flex gap-4 md:gap-5 items-start rounded-2xl px-5 py-[18px] md:px-[22px]",
                  d.night ? "card-night" : "card",
                )}
              >
                <span
                  className={cn(
                    "icon-circle w-9! h-9! mt-0.5",
                    d.night ? "bg-night-2! text-gold-light!" : "bg-sand! text-saffron-text!",
                  )}
                  aria-hidden
                >
                  <d.icon size={16} />
                </span>
                <span
                  className={cn(
                    "font-display text-[18px] w-[72px] md:w-[90px] shrink-0 pt-1",
                    d.night ? "text-gold-light" : "text-saffron-text",
                  )}
                >
                  {d.time}
                </span>
                <span className="pt-1">{d.text}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Visitor information */}
      <section className="container-site section-pad-lg flex flex-col gap-8 md:gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Visitor information"
            title="What to know before you come."
            action={<ArrowLink href="/contact">Directions &amp; map</ArrowLink>}
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {visitor.map((v) => (
            <RevealItem key={v.eyebrow} className="card card-hover p-6 md:p-[26px] flex gap-4">
              <IconCircle icon={v.icon} tone="sand" className="w-10! h-10!" size={18} />
              <div className="flex flex-col gap-2 min-w-0">
                <p className="eyebrow-gold">{v.eyebrow}</p>
                <p className="font-semibold leading-snug">{v.title}</p>
                <p className="text-sm text-ink-2">{v.note}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Image strip */}
      <section className="container-site pb-16 md:pb-[104px]">
        <RevealGroup className="flex flex-wrap gap-4">
          <RevealItem className="flex-[2_1_520px] min-w-0">
            <PhotoFigure
              image={images.girivalamWalk}
              alt="Pilgrims walking the Girivalam road at dusk with Arunachala behind"
              ratio="16/10"
              sizes="(max-width: 1024px) 100vw, 640px"
            />
          </RevealItem>
          <RevealItem className="flex-[1_1_300px] min-w-0">
            <PhotoFigure
              image={images.maatajiSeva}
              alt="Maataji offering cloth to sadhus"
              ratio="1/1"
              sizes="(max-width: 768px) 100vw, 360px"
            />
          </RevealItem>
          <RevealItem className="flex-[1_1_220px] min-w-0">
            <PhotoFigure
              image={images.maatajiFlowers}
              alt="Maataji in meditation under flowers"
              position="50% 30%"
              ratio="3/4"
              sizes="(max-width: 768px) 100vw, 280px"
            />
          </RevealItem>
        </RevealGroup>
      </section>

      {/* CTA band */}
      <section className="bg-night text-on-night">
        <div className="container-site py-14 md:py-[72px] flex flex-wrap items-center justify-between gap-6">
          <Reveal className="flex flex-col gap-2 max-w-[640px]">
            <h2 className="font-display text-[30px] md:text-[36px] leading-tight text-on-night-head">
              Come and see for yourself.
            </h2>
            <p className="text-on-night-2">
              Tell us when you are coming and we will keep a place for you at the next satsang and
              a plate at annadhanam.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col sm:flex-row flex-wrap gap-3.5 w-full sm:w-auto">
            <Button href="/book-a-visit" size="lg">
              <CalendarDays size={18} aria-hidden /> Request a visit
            </Button>
            <Button href="/tiruvannamalai-guide" variant="outline-gold" size="lg">
              <Map size={18} aria-hidden /> Travel guide
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
