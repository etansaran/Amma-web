import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Armchair,
  Clock,
  HandHelping,
  House,
  MapPin,
  MicOff,
  Milk,
  Mountain,
  Play,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { mounasamyPersonSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { IconCircle } from "@/components/ui/IconCircle";
import { Placeholder } from "@/components/ui/Placeholder";
import { FAQRich, type FaqRichItem } from "@/components/ui/FAQRich";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LawrenceVisitCard } from "@/components/guide/GuideBits";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/mounasamy",
    title: "Mouna Siddhar Tiruvannamalai — Mounasamy, Mouna Swami",
    description:
      "Official page of Mounasamy Siddhar — Mouna Siddhar, Mouna Swami, Vibhuti Siddhar — the silent sadhu of Tiruvannamalai, now at Thiyaneswar Amma Ashram, Adi Annamalai.",
    image: images.mounasamyGarland,
  });
}

type Fact = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  note: string;
  night?: boolean;
};

const facts: Fact[] = [
  {
    icon: MicOff,
    eyebrow: "Mouna · silence",
    title: "15+ years without a word",
    note: "as devotees count it; the ashram keeps no register",
  },
  {
    icon: Armchair,
    eyebrow: "Asana",
    title: "Sits day and night",
    note: "before his altar; he does not lie down",
  },
  {
    icon: Sparkles,
    eyebrow: "Vibhuti & jata",
    title: "Ash-covered, hair to the knees",
    note: "why many call him Vibhuti Siddhar",
  },
  {
    icon: MapPin,
    eyebrow: "Where he is now",
    title: "Thiyaneswar Amma Ashram",
    note: "Vediyappanur Road, Adi Annamalai, on the Girivalam path",
    night: true,
  },
];

type Stage = {
  icon: LucideIcon;
  year: string;
  label: string;
  title: string;
  text: string;
  night?: boolean;
};

const stages: Stage[] = [
  {
    icon: Milk,
    year: "Year",
    label: "Before",
    title: "A householder's life",
    text: "Sells milk, most likely in Chennai; a growing longing for God.",
  },
  {
    icon: Mountain,
    year: "Year",
    label: "Arrival",
    title: "Comes to Tiruvannamalai",
    text: "Years of sadhana around the hill; meets Maataji.",
  },
  {
    icon: HandHelping,
    year: "Years",
    label: "Seva",
    title: "Serves his guru",
    text: "About ten years of guru seva, as devotees recount; learns the disciplines Maataji teaches.",
  },
  {
    icon: MicOff,
    year: "Year",
    label: "Mouna",
    title: "Enters silence",
    text: "Takes the vow of mouna; sits before the altar at Sri Mouna Swami Peetam on Girivalam Road.",
  },
  {
    icon: House,
    year: "Year",
    label: "Today",
    title: "At Thiyaneswar Amma Ashram",
    text: "Lives at Vediyappanur, Adi Annamalai, under Maataji's care; daily darshan.",
    night: true,
  },
];

type SearchChip = {
  label: string;
  href: string;
  locale?: Locale;
  tamil?: boolean;
};

const searches: SearchChip[] = [
  { label: "mouna siddhar tiruvannamalai location", href: "/mounasamy/darshan" },
  { label: "mouna siddhar tiruvannamalai contact number", href: "/mounasamy/darshan" },
  { label: "mouna swami ashram tiruvannamalai", href: "/mouna-swami" },
  { label: "sri mouna swami peetam", href: "/mouna-swami" },
  { label: "mouna siddhar photos", href: "/gallery" },
  { label: "mouna guru siddhar tiruvannamalai", href: "/mounasamy/guru-shishya" },
  { label: "tiruvannamalai vibhuti siddhar", href: "/mounasamy" },
  { label: "living siddhar in tiruvannamalai", href: "/siddhars-of-tiruvannamalai" },
  { label: "மௌன சித்தர் திருவண்ணாமலை", href: "/mounasamy", locale: "ta", tamil: true },
  { label: "mouna swami tiruvannamalai telugu", href: "/mounasamy", locale: "te" },
];

const faqs: FaqRichItem[] = [
  {
    question: "Who is Mouna Siddhar of Tiruvannamalai?",
    answer:
      "Mounasamy Siddhar, also called Mouna Siddhar, Mouna Swami or Vibhuti Siddhar, is a sadhu who has kept a vow of silence for many years and sits in meditation day and night without lying down. He is a shishya of Maataji, Sathguru Siva Sri Thiyaneswar Amma, and lives at her ashram at Adi Annamalai.",
    open: true,
  },
  {
    question: "Where is Mouna Siddhar now? What is the location?",
    answer:
      "Siva Sri Thiyaneswar Amma Ashram, Thiyaneswar Veedhi, Vediyappanur Road, Adi Annamalai, Tiruvannamalai 606604 — on the Girivalam path, on the far side of the hill from Arunachaleswarar Temple. He earlier sat at Sri Mouna Swami Peetam on Girivalam Road.",
  },
  {
    question: "What is the contact number for Mouna Siddhar darshan?",
    answer: (
      <>
        Mounasamy does not speak or use a phone. The ashram office answers for him:{" "}
        <a href={site.phoneHref} className="font-semibold">
          {site.phone}
        </a>{" "}
        (call), WhatsApp{" "}
        <a href={site.whatsappHref} className="font-semibold" target="_blank" rel="noopener noreferrer">
          {site.whatsapp}
        </a>
        ,{" "}
        <a href={`mailto:${site.email}`} className="font-semibold">
          {site.email}
        </a>
        .
      </>
    ),
    schemaAnswer: `Mounasamy does not speak or use a phone. The ashram office answers for him: ${site.phone} (call), WhatsApp ${site.whatsapp}, ${site.email}.`,
  },
  {
    question: "What are the darshan timings?",
    answer: (
      <>
        He can be seen every day, and he stands to give darshan every evening from{" "}
        {site.mounasamyStanding}. Satsang and annadhanam run {site.daily.programme}. Pournami and
        Deepam nights are crowded; weekday mornings are quiet.
      </>
    ),
    schemaAnswer:
      `He can be seen every day, and he stands to give darshan every evening from ${site.mounasamyStanding}. Satsang and annadhanam run ${site.daily.programme}. Pournami and Deepam nights are crowded; weekday mornings are quiet.`,
  },
  {
    question: "Is Mouna Siddhar the same as Vibhuti Siddhar?",
    answer:
      "Yes. Because his body is always covered in sacred ash, many devotees and videos call him Vibhuti Siddhar. He is not connected to Mounasamy Mutt in Kumbakonam or to the Mouna Siddhars of other towns.",
  },
  {
    question: "Can I offer something, or ask him a question?",
    answer:
      "Flowers, vibhuti and fruit may be left at his altar. Questions are held in the mind; he will not answer in words. Any seva in his name goes to the ashram's annadhanam.",
  },
];

export default async function MounasamyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={mounasamyPersonSchema()} />

      {/* Hero */}
      <PageHero
        variant="night"
        backdrop={false}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Mounasamy Siddhar" }]}
        eyebrow="Mounasamy Siddhar · Mouna Siddhar · Mouna Swami · Vibhuti Siddhar"
        title="Mounasamy Siddhar, the Mouna Siddhar of Tiruvannamalai — the silent sadhu who never lies down."
        tamil="திருவண்ணாமலை மௌன சித்தர் · மௌனசாமி"
        lede="Shishya of Maataji — Sathguru Siva Sri Thiyaneswar Amma. For years the ash-covered sadhu in silence on the Girivalam road in Tiruvannamalai, Mouna Siddhar — Mounasamy — now lives at the ashram at Adi Annamalai, Vediyappanur Road, under Maataji's care. This is the ashram's official page about him."
        actions={
          <>
            <Button href="/mounasamy/darshan" size="lg">
              Darshan: location &amp; timings
            </Button>
            <Button href="/mounasamy/guru-shishya" variant="outline-gold" size="lg">
              His journey with Maataji
            </Button>
          </>
        }
        aside={
          <>
            <div className="relative animate-halo border-[3px] border-gold rounded-[28px] p-2.5 bg-white/5 w-[260px] md:w-[340px]">
              <PhotoFigure
                image={images.mounasamyFlame}
                alt="Mounasamy Siddhar, ash-covered and garlanded, holding up a lit deepam lamp"
                ratio="340/480"
                position="50% 20%"
                frame="none"
                rounded="card"
                priority
                sizes="(max-width: 768px) 260px, 340px"
              />
            </div>
            <p className="text-center text-[13px] text-on-night-2">
              Mounasamy offering deepa aradhana
            </p>
          </>
        }
      />

      {/* Quick facts */}
      <section className="container-site pt-12 md:pt-14">
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((f) => (
            <RevealItem
              key={f.eyebrow}
              className={
                f.night
                  ? "card-night card-hover rounded-2xl p-5 flex gap-4"
                  : "card card-hover rounded-2xl p-5 flex gap-4"
              }
            >
              <IconCircle icon={f.icon} tone={f.night ? "gold" : "sand"} size={20} className="w-11! h-11!" />
              <div className="min-w-0">
                <p className={f.night ? "eyebrow-gold text-gold-light!" : "eyebrow-gold"}>{f.eyebrow}</p>
                <p className="mt-1 font-display text-[21px] md:text-[22px] leading-tight">{f.title}</p>
                <p className={`mt-1 text-[13px] ${f.night ? "text-on-night-2" : "text-ink-2"}`}>
                  {f.note}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="container-site pt-6">
        <Reveal>
          <LawrenceVisitCard />
        </Reveal>
      </section>

      {/* Who is Mounasamy */}
      <section className="container-site section-pad-lg flex flex-wrap items-start gap-10 md:gap-14">
        <Reveal className="flex-[1_1_520px] flex flex-col gap-[18px] min-w-0">
          <Eyebrow>Who is Mounasamy Siddhar?</Eyebrow>
          <h2 className="h2">A man who gave up words so that Arunachala could speak through him.</h2>
          <p className="text-ink-2">
            Before he renounced the world, Mounasamy is said to have sold milk for a living, most
            likely in Chennai. A longing for God brought him to Tiruvannamalai. He spent years in
            sadhana around the hill, served his guru with his whole body, and then entered{" "}
            <em>mouna</em> — total silence — which he has kept ever since. He sits before his altar
            through the day and the night, covered in vibhuti, his matted jata grown to his knees.
            Devotees say he has not lain down to sleep in all these years.
          </p>
          <p className="text-ink-2">
            For a long time pilgrims knew him at a small peetam on the Girivalam road. He later moved
            to Siva Sri Thiyaneswar Amma Ashram at Vediyappanur, Adi Annamalai, where Maataji — his
            guru — and the ashram family look after his needs. He gives darshan there every day.
          </p>
          <div className="bg-[#FFF8EE] border border-saffron rounded-card p-5 md:p-[22px] flex flex-col gap-2">
            <p className="font-display text-[20px]">Maataji is his guru</p>
            <p className="text-[15px] text-ink-2">
              Mounasamy is a shishya of Sathguru Siva Sri Thiyaneswar Amma. His vow of silence, his
              sitting sadhana and the daily discipline that surrounds him were shaped under her
              guidance, and she continues to care for him at the ashram.{" "}
              <ArrowLink href="/mounasamy/guru-shishya">Read the guru–shishya story</ArrowLink>
            </p>
          </div>
          <p className="text-sm text-ink-2">
            <strong className="text-ink">Names people use:</strong> Mouna Siddhar (the silent siddha)
            · Mouna Swami, Mouna Swamigal, Mounasamy · Vibhuti Siddhar (for the sacred ash) · Mouna
            Guru Siddhar. <strong className="text-ink">Not to be confused with</strong> Mounasamy Mutt
            in Kumbakonam, or the Mouna Siddhars of Dindigul, Madurai and Tirupur.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_400px] min-w-0">
          <div className="grid grid-cols-2 gap-3.5">
            <PhotoFigure
              image={images.mounasamyGarland}
              alt="Mounasamy Siddhar garlanded with jasmine and roses, grey beard and matted hair"
              ratio="2/3"
              position="50% 15%"
              rounded="card"
              sizes="(max-width: 768px) 50vw, 240px"
            />
            <PhotoFigure
              image={images.mounasamyFlowers}
              alt="Mounasamy seated in meditation before a wall of flowers, body covered in vibhuti"
              ratio="2/3"
              position="50% 30%"
              rounded="card"
              sizes="(max-width: 768px) 50vw, 240px"
            />
            <PhotoFigure
              image={images.mounasamyAltar}
              alt="Mounasamy seated before his flower-decked altar, seen from behind, jata down his back"
              ratio="5/3"
              rounded="card"
              className="col-span-2"
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>
          <p className="mt-3.5 text-[13px] text-ink-2">
            Mounasamy at his altar and at Maheswara Poojai. More in the{" "}
            <Link href="/gallery" className="font-semibold">
              gallery
            </Link>
            .
          </p>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="bg-white border-y border-line">
        <div className="container-site section-pad flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="His path, in brief"
              title="From a milk round to the foot of Arunachala."
              lede="Years in brackets are to be filled by the ashram; the order is as devotees and the ashram tell it."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stages.map((s) => (
              <RevealItem
                key={s.title}
                as="article"
                className={
                  s.night
                    ? "card-night card-hover rounded-2xl p-5 md:p-[22px] flex flex-col gap-2.5"
                    : "card-ivory card-hover rounded-2xl p-5 md:p-[22px] flex flex-col gap-2.5"
                }
              >
                <IconCircle icon={s.icon} tone={s.night ? "gold" : "sand"} size={20} className="w-11! h-11!" />
                <p className={s.night ? "eyebrow-gold text-gold-light!" : "eyebrow-gold"}>
                  <Placeholder label={s.year} /> · {s.label}
                </p>
                <p className="font-semibold leading-snug">{s.title}</p>
                <p className={`text-sm ${s.night ? "text-on-night-2" : "text-ink-2"}`}>{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Darshan + what devotees experience */}
      <section className="container-site section-pad-lg flex flex-wrap items-stretch gap-6 md:gap-10">
        <Reveal className="flex-[1_1_440px] card-night rounded-lg p-7 md:p-9 flex flex-col gap-3.5 min-w-0">
          <Eyebrow tone="gold">Darshan</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[34px] leading-[1.15] text-on-night-head">
            Come any day. Sit. Say nothing.
          </h2>
          <p className="text-on-night-2">
            Mounasamy can be seen at the ashram every day. In the evening, from{" "}
            {site.mounasamyStanding}, he stands briefly to give darshan and to attend to his few
            needs; the rest of the day he sits in silence. Devotees sit a little away from him, hold
            their prayer in the mind, and leave quietly. No talking, no touching, no flash.
          </p>
          <div className="flex flex-wrap gap-3 mt-1.5">
            <Button href="/mounasamy/darshan">
              <Clock size={16} aria-hidden /> Location, timings &amp; etiquette
            </Button>
            <Button href="/book-a-visit" variant="outline-gold">
              Tell us you are coming
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_440px] card rounded-lg p-7 md:p-9 flex flex-col gap-3.5 min-w-0">
          <Eyebrow>What devotees say</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[34px] leading-[1.15]">
            “I asked in my mind. I did not need to speak.”
          </h2>
          <p className="text-ink-2">
            Many who come to Mounasamy bring a prayer they never say aloud, and many return to say it
            was answered. The ashram makes no claims and sells nothing in his name. We only keep his
            altar lit, his body fed and his silence undisturbed — and we invite you to sit with him
            and see for yourself.
          </p>
          <p className="text-sm text-ink-2">
            <Placeholder label="Two or three short devotee testimonials, with first name and town, added by the office" />
          </p>
        </Reveal>
      </section>

      {/* Video + related searches */}
      <section className="bg-sand border-y border-line">
        <div className="container-site section-pad flex flex-wrap items-center gap-8 md:gap-10">
          <Reveal className="flex-[1_1_480px] min-w-0">
            <Link
              href="/gallery"
              aria-label="Watch the ashram's video of Mounasamy"
              className="group relative block overflow-hidden rounded-[20px] border border-line bg-night text-on-night aspect-video"
            >
              <Image
                src={images.mounasamyAltar.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,60,0)_40%,rgba(14,26,60,.85))]"
              />
              <span
                aria-hidden
                className="animate-halo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[64px] h-[64px] md:w-[76px] md:h-[76px] rounded-full bg-saffron text-ink flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              >
                <Play size={30} fill="currentColor" strokeWidth={0} className="ml-1" />
              </span>
              <span className="absolute left-5 right-5 bottom-4 flex flex-col gap-1">
                <span className="font-display text-[18px] md:text-[20px] leading-tight text-on-night-head">
                  Mounasamy Siddhar — the ashram's own film <Placeholder label="to record" />
                </span>
                <span className="text-[13px] text-on-night-2">
                  Tamil with English, Telugu and Hindi subtitles · the only video made with the
                  ashram's permission
                </span>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_400px] flex flex-col gap-3.5 min-w-0">
            <Eyebrow>People also search for</Eyebrow>
            <ul className="flex flex-wrap gap-2">
              {searches.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    locale={s.locale}
                    lang={s.tamil ? "ta" : undefined}
                    className={`chip card-hover text-ink hover:text-saffron-text ${s.tamil ? "ta" : ""}`}
                  >
                    <Search size={14} className="text-saffron-text" aria-hidden />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-site section-pad-lg flex flex-wrap gap-8 md:gap-10">
        <Reveal className="flex-[1_1_300px] min-w-0">
          <Eyebrow>Frequently asked</Eyebrow>
          <h2 className="h2 mt-3">About Mounasamy.</h2>
          <p className="mt-3 text-sm text-ink-2">
            Published as FAQ structured data in all four languages.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0">
          <FAQRich items={faqs} />
        </Reveal>
      </section>
    </>
  );
}
