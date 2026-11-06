import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Broom,
  CalendarHeart,
  Check,
  ChefHat,
  Flame,
  Footprints,
  HandHeart,
  Hand,
  Languages,
  Moon,
  Repeat,
  ShoppingBasket,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { cn } from "@/lib/cn";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { StatTile } from "@/components/ui/StatTile";
import { IconCircle } from "@/components/ui/IconCircle";
import { Placeholder } from "@/components/ui/Placeholder";
import { FAQ } from "@/components/ui/FAQ";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SponsorForm } from "@/components/annadhanam/SponsorForm";
import { VolunteerForm } from "@/components/annadhanam/VolunteerForm";
import { site, rupees } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/annadhanam",
    title: "Annadhanam Tiruvannamalai — Sponsor Annadhanam, 365 Days",
    description:
      "Annadhanam in Tiruvannamalai every day of the year for sadhus and pilgrims on the Girivalam road. Sponsor annadhanam for a day or a Pournami night, send groceries or volunteer.",
    image: images.maatajiSeva,
  });
}

const steps: { num: string; title: string; text: string; icon: LucideIcon }[] = [
  {
    num: "1",
    title: "The kitchen lights before dawn",
    text: "Volunteers and ashram cooks prepare rice, sambar, vegetables and buttermilk — simple sattvic food, cooked as an offering to Shiva.",
    icon: Flame,
  },
  {
    num: "2",
    title: "Served on the Girivalam road",
    text: "Food goes to sadhus where they sit along the path and to everyone who comes to the ashram dining hall. Sadhus are served first, with respect.",
    icon: Footprints,
  },
  {
    num: "3",
    title: "Pournami and festival nights",
    text: "On full-moon nights, Karthigai Deepam and Shivaratri the kitchen runs through the night for the lakhs walking Girivalam — the ashram's biggest seva of the year.",
    icon: Moon,
  },
];

const ways: {
  eyebrow: string;
  title: string;
  price?: ReactNode;
  text: string;
  cta: string;
  href: string;
  featured?: boolean;
  icon: LucideIcon;
}[] = [
  {
    eyebrow: "Most chosen",
    title: "Sponsor one day",
    price: `${rupees(site.annadhanam.dailyCost)} · about ${site.annadhanam.dailyPlates} plates`,
    text: `Feeds about ${site.annadhanam.dailyPlates} sadhus and pilgrims that day. Choose the date — a birthday, an anniversary, a remembrance.`,
    cta: "Sponsor a day",
    href: "/donate",
    featured: true,
    icon: CalendarHeart,
  },
  {
    eyebrow: "Full moon",
    title: "Sponsor a Pournami night",
    price: `${rupees(site.annadhanam.pournamiCost)} · about ${site.annadhanam.pournamiPlates} plates`,
    text: `The kitchen runs all night for about ${site.annadhanam.pournamiPlates} Girivalam walkers. Share it: ${site.annadhanam.pournamiShareMeals} plates for ${rupees(site.annadhanam.pournamiShareCost)}. Your name is read at the Pournami sankalpa.`,
    cta: "Choose a Pournami",
    href: "/donate",
    icon: Moon,
  },
  {
    eyebrow: "Monthly",
    title: "Annadhanam supporter",
    price: "₹501 / month and up",
    text: "A small steady amount keeps the daily fire lit. Cancel any time; receipt every month.",
    cta: "Give monthly",
    href: "/donate",
    icon: Repeat,
  },
  {
    eyebrow: "In kind",
    title: "Send groceries",
    text: "Rice, toor dal, cooking oil, vegetables, jaggery, tamarind, spices — delivered to the ashram or bought locally with a grocery voucher.",
    cta: "Ask the office",
    href: "/contact",
    icon: ShoppingBasket,
  },
];

const receives: ReactNode[] = [
  "Instant receipt by email and WhatsApp",
  "Your name or your loved one's name read at the sankalpa",
  "A photo of that day's seva sent to you",
  <span key="80g">80G tax-exemption receipt (give your PAN)</span>,
];

const deepamTiles: { value: ReactNode; label: string }[] = [
  { value: "~4 AM", label: "Bharani Deepam inside the temple" },
  { value: "~6 PM", label: "Maha Deepam lit on the summit" },
  { value: "All night", label: "Annadhanam on the Girivalam road" },
  { value: <Placeholder label="N" />, label: "volunteers needed — sign up below" },
];

const sevaChips: { label: string; icon: LucideIcon }[] = [
  { label: "Kitchen", icon: ChefHat },
  { label: "Serving on the road", icon: Utensils },
  { label: "Cleaning the path", icon: Broom },
  { label: "Deepam night", icon: Flame },
  { label: "Translation & media", icon: Languages },
];

const faqItems = [
  {
    question: "Can I be present on the day I sponsor?",
    answer: "Yes. Tell us when you book and you are welcome to serve the meal yourself.",
  },
  {
    question: "Is my donation tax-deductible in India?",
    answer:
      "Yes. The trust is approved under Section 80G of the Income Tax Act, so gifts made from India qualify for the deduction. Give your PAN when you donate and your receipt will carry the trust's 80G registration details.",
  },
  {
    question: "I live outside India. Can I contribute?",
    answer:
      "The trust is a registered charitable trust in India. Gifts from outside India need FCRA approval, so please write to the office before giving from abroad and we will tell you how. Indian bank accounts and UPI work as usual.",
  },
  {
    question: "What if the date I want is already sponsored?",
    answer:
      "More than one devotee can share a day; every name is read at the sankalpa. The office will tell you if a date is full.",
  },
];

export default async function AnnadhanamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero */}
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Annadhanam" }]}
        eyebrow="Annadhanam · 365 days a year"
        title="No one walks past this kitchen hungry."
        tamil="அன்னதானம் — ஆண்டின் 365 நாட்களும்"
        lede="Every day the ashram cooks and serves a hot meal to the sadhus, pilgrims and poor who walk the Girivalam road around Arunachala — annadhanam in Tiruvannamalai, every day of the year. On Pournami nights and Karthigai Deepam, the line stretches down the road. Your support keeps the fire lit."
        actions={
          <>
            <Button href="/donate" size="lg">
              <HandHeart size={18} aria-hidden /> Sponsor one day
            </Button>
            <a href="#volunteer" className="btn btn-outline-saffron btn-lg">
              <Hand size={18} aria-hidden /> Volunteer
            </a>
          </>
        }
        asideClassName="flex-[0_1_440px]"
        aside={
          <PhotoFigure
            image={images.maatajiSeva}
            alt="Maataji handing saffron cloth and food to sadhus on the Girivalam road"
            ratio="1/1"
            priority
            sizes="(max-width: 768px) 100vw, 440px"
          />
        }
      />

      {/* Numbers */}
      <section className="container-site pt-14 md:pt-[72px]">
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <RevealItem>
            <StatTile value="365" label="days a year, no holiday" className="h-full" />
          </RevealItem>
          <RevealItem>
            <div className="card p-5 md:p-[26px] h-full">
              <p className="font-display text-[32px] md:text-[44px] leading-none text-saffron-text">
                {site.annadhanam.dailyPlates}
              </p>
              <p className="mt-2 text-sm md:text-base text-ink-2">
                plates on an ordinary day · about {site.annadhanam.pournamiPlates} on Pournami
              </p>
            </div>
          </RevealItem>
          <RevealItem>
            <StatTile value="25+" label="years of Amma's annadhanam tradition" className="h-full" />
          </RevealItem>
          <RevealItem>
            <StatTile
              onNight
              value="1 lakh"
              label="meals on one Karthigai Deepam, as reported by the ashram"
              className="h-full bg-night!"
            />
          </RevealItem>
        </RevealGroup>
      </section>

      {/* How it works */}
      <section className="container-site section-pad flex flex-col gap-8 md:gap-9">
        <Reveal>
          <SectionHeading
            eyebrow="How a day's annadhanam happens"
            title="From dawn fire to the last plate."
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {steps.map((s) => (
            <RevealItem
              key={s.num}
              as="article"
              className="card card-hover rounded-lg p-6 md:p-[30px] flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-[40px] leading-none text-gold">{s.num}</span>
                <IconCircle icon={s.icon} tone="sand" className="w-10! h-10!" size={18} />
              </div>
              <h3 className="text-[24px]">{s.title}</h3>
              <p className="text-ink-2">{s.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Ways to contribute */}
      <section className="bg-white border-y border-line">
        <div className="container-site section-pad flex flex-col gap-8 md:gap-9">
          <Reveal>
            <SectionHeading
              eyebrow="How devotees contribute"
              title="Choose a way that fits your heart and your hands."
              action={<ArrowLink href="/donate">All donation options</ArrowLink>}
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {ways.map((w) => (
              <RevealItem
                key={w.title}
                as="article"
                className={cn(
                  "card-ivory card-hover rounded-lg p-6 md:p-7 flex flex-col gap-2.5",
                  w.featured && "border-2 border-saffron",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className={cn("eyebrow-gold", w.featured && "text-saffron-text!")}>{w.eyebrow}</p>
                  <IconCircle icon={w.icon} tone={w.featured ? "saffron" : "sand"} className="w-10! h-10!" size={18} />
                </div>
                <h3 className="text-[24px]">{w.title}</h3>
                {w.price ? <p className="font-display text-[28px] md:text-[30px]">{w.price}</p> : null}
                <p className="text-[15px] text-ink-2">{w.text}</p>
                <Button
                  href={w.href}
                  variant={w.featured ? "saffron" : "outline-saffron"}
                  block
                  className="mt-auto h-12!"
                >
                  {w.cta}
                </Button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Sankalpa + what you receive */}
      <section className="container-site section-pad flex flex-wrap items-start gap-10 md:gap-12">
        <Reveal className="flex-[1_1_440px] flex flex-col gap-3.5">
          <Eyebrow>Annadhanam in a loved one's name</Eyebrow>
          <h2 className="h2">A birthday, an anniversary, a remembrance.</h2>
          <p className="text-ink-2">
            Many devotees offer a day's annadhanam for a parent's memory, a child's birthday or a
            prayer answered. Tell us the name and the occasion; it is read at the morning sankalpa
            before the food is served.
          </p>
          <div className="card p-5 md:p-[22px] flex flex-col gap-3 mt-1.5">
            <p className="font-display text-[18px]">What every sponsor receives</p>
            <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
              {receives.map((r, i) => (
                <li key={i} className="flex gap-2.5 text-[15px] text-ink-2">
                  <Check size={18} strokeWidth={2.5} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_460px] min-w-0">
          <SponsorForm />
        </Reveal>
      </section>

      {/* Deepam seva */}
      <section id="deepam" className="relative bg-night text-on-night overflow-hidden scroll-mt-24">
        <Image
          src={images.arunachalaNight.src}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,26,60,.96),rgba(14,26,60,.6))]"
        />
        <div className="container-site relative section-pad flex flex-wrap items-center gap-10">
          <Reveal className="flex-[1_1_520px] flex flex-col gap-4">
            <Eyebrow tone="gold">Karthigai Deepam · Tuesday 24 November 2026</Eyebrow>
            <h2 className="h2 text-on-night-head">
              The night the hill becomes a lamp — and the kitchen never stops.
            </h2>
            <p className="text-on-night-body">
              When the Maha Deepam is lit on the summit at dusk, lakhs begin Girivalam. The ashram
              cooks from the night before and serves until the last walker passes at dawn. Last
              time, one lakh meals. This year we need cooks, servers, cleaners and sponsors.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3.5">
              <Button href="/donate" size="lg">
                <HandHeart size={18} aria-hidden /> Sponsor Deepam annadhanam
              </Button>
              <a href="#volunteer" className="btn btn-outline-gold btn-lg">
                <Flame size={18} aria-hidden /> Volunteer on Deepam night
              </a>
            </div>
          </Reveal>
          <RevealGroup className="flex-[1_1_320px] grid grid-cols-2 gap-3">
            {deepamTiles.map((t, i) => (
              <RevealItem key={i} className="border border-night-line-2 rounded-2xl p-4 md:p-[18px]">
                <p className="font-display text-[26px] md:text-[30px] text-gold-light leading-tight">{t.value}</p>
                <p className="mt-1 text-sm text-on-night-2">{t.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="container-site section-pad flex flex-wrap items-start gap-10 md:gap-12 scroll-mt-24">
        <Reveal className="flex-[1_1_400px] flex flex-col gap-3.5">
          <Eyebrow>Volunteer</Eyebrow>
          <h2 className="h2">Come with your hands.</h2>
          <p className="text-ink-2">
            Cut vegetables at dawn, serve on the road at noon, wash vessels at dusk, or join the
            Girivalam path cleaning on Pournami mornings. A morning or a month — every pair of
            hands is seva.
          </p>
          <ul className="flex flex-wrap gap-2.5 m-0 p-0 list-none">
            {sevaChips.map((c) => (
              <li key={c.label} className="chip bg-sand! border-sand!">
                <c.icon size={14} className="text-saffron-text" aria-hidden /> {c.label}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_460px] min-w-0">
          <VolunteerForm />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-sand border-t border-line">
        <div className="container-site section-pad flex flex-wrap gap-10 md:gap-12">
          <Reveal className="flex-[1_1_300px]">
            <Eyebrow>Questions devotees ask</Eyebrow>
            <h2 className="h2 mt-3">Before you give.</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0">
            <FAQ items={faqItems} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
