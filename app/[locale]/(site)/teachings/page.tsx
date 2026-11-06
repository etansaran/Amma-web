import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  BookOpen,
  Calendar,
  Drum,
  Flower,
  Globe,
  Headphones,
  Languages,
  Moon,
  Play,
  ScrollText,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { videoSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { VideoCard } from "@/components/ui/VideoCard";
import { IconCircle } from "@/components/ui/IconCircle";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/teachings",
    title: "Teachings & Satsang — Thiruvasagam, Sivayogam, Classes",
    description:
      "Free classes in Thiruvasagam, Kailaya Vathiyam, Sivayogam and the 63 Nayanmars; Amma's songs, talks, audio and articles; weekly satsang at the ashram, Tiruvannamalai.",
    image: images.maatajiFlowers,
  });
}

const formats = [
  { href: "#classes", label: "Classes", icon: BookOpen },
  { href: "#video", label: "Video", icon: Video },
  { href: "#audio", label: "Audio", icon: Headphones },
  { href: "#articles", label: "Articles", icon: ScrollText },
  { href: "#satsang", label: "Satsang", icon: Users },
];

type ClassItem = {
  tamil: string;
  title: string;
  text: string;
  note: string;
  icon: LucideIcon;
};

const classes: ClassItem[] = [
  {
    tamil: "திருவாசகம்",
    title: "Thiruvasagam",
    text: "Manikkavasagar's hymns learnt verse by verse — pronunciation, meaning and melody — so you can sing them at the temple and at home. Beginners welcome; Tamil script taught alongside for non-Tamil devotees.",
    note: "ashram hall and online",
    icon: BookOpen,
  },
  {
    tamil: "கைலாய வாத்தியம்",
    title: "Kailaya Vathiyam",
    text: "The sacred temple percussion of Shiva. Village children and devotees learn the instruments and the beats, with the aim of forming a troupe that sings Sivapuranam at temples around the hill.",
    note: "children's and adults' batches",
    icon: Drum,
  },
  {
    tamil: "சிவயோகம்",
    title: "Sivayogam",
    text: "Yoga and meditation on the Ministry of AYUSH model, taught free. Asana, pranayama and a simple Siva meditation that fits into a working day. Initiations on Chitra Pournami.",
    note: "all levels",
    icon: Flower,
  },
  {
    tamil: "63 நாயன்மார்கள்",
    title: "Lives of the 63 Nayanmars",
    text: "Storytelling sessions on the Saiva saints of the Periya Puranam, told for children and adults alike — without discrimination, as the trust's charter says.",
    note: "Tamil, with English summary",
    icon: Users,
  },
  {
    tamil: "பன்னிரு திருமுறை",
    title: "Panniru Thirumurai",
    text: "The twelve Tamil Saiva canons — Thevaram, Thiruvasagam, Thirumandiram and the rest — read and explained as living texts, not museum pieces.",
    note: "reading circle",
    icon: ScrollText,
  },
];

const moreVideos = [
  { title: "Sath Guru Thiyaneswar Amma Ashram — an introduction", note: "Tamil with subtitles" },
  { title: "Sivayogam — a guided session", note: "follow along at home" },
  { title: "Maheswara Poojai for sadhus", note: "event film" },
  { title: "Pournami satsang — latest recording", note: "updated every month" },
];

const audio = [
  { title: "Sri Balambigai", kind: "Devotional song", length: true },
  { title: "Arunachaleswar", kind: "Devotional song", length: true },
  { title: "Thiruvasagam — Sivapuranam, lesson 1", kind: "Class recording", length: true },
  {
    title: "Sivayogam — 12-minute guided meditation",
    kind: "Tamil · English · Telugu · Hindi versions",
    length: false,
  },
];

const topics = ["Annamalayar", "Anmegam", "Thiruvannamalai", "Tamil stories", "Yogam"];

const articles = [
  {
    tag: "Anmegam",
    title: "Are Siva worship and compassion for living beings connected?",
    text: "Amma answers a question she is asked more than any other.",
    read: "Read · 4 min",
  },
  {
    tag: "Ponmozhi",
    title: "On renunciation — what to give up, and what to keep",
    text: "A golden saying from Amma, with a short explanation.",
    read: "Read · 2 min",
  },
  {
    tag: "Yogam",
    title: "Daily Siva pooja at home — the simple practice",
    text: "What you need, what to chant, and how long it takes.",
    read: "Read · 6 min",
  },
  {
    tag: "Thiruvannamalai",
    title: "Why this hill is Thirukailayam",
    text: "An extract from Amma's book of the same name.",
    read: "Read · 5 min",
  },
];

export default async function TeachingsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={videoSchema()} />

      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Teachings & satsang" }]}
        eyebrow="Teachings & satsang"
        title="Learn to sing, to sit still, and to serve."
        lede="Thiruvasagam and the Panniru Thirumurai, Kailaya Vathiyam, Sivayogam, the lives of the 63 Nayanmars, Amma's songs and writings — and satsang every week where it all comes together."
        extra={
          <nav aria-label="Teaching formats" className="flex flex-wrap gap-2.5">
            {formats.map((f, i) => (
              <a
                key={f.href}
                href={f.href}
                className={cn(
                  "inline-flex items-center gap-2 h-11 px-5 rounded-pill text-[15px] font-semibold transition-colors",
                  i === 0
                    ? "bg-night text-on-night"
                    : "bg-white text-ink border border-line-2 hover:border-gold",
                )}
              >
                <f.icon size={15} aria-hidden className={i === 0 ? "text-gold-light" : "text-saffron-text"} />
                {f.label}
              </a>
            ))}
          </nav>
        }
      />

      {/* Classes */}
      <section id="classes" className="container-site section-pad-lg flex flex-col gap-8 md:gap-9 scroll-mt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Classes at the ashram"
            title="Taught free of cost, in person and online."
            action={
              <p className="text-sm text-ink-2">
                Days and times in brackets to be confirmed by the office.
              </p>
            }
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((c) => (
            <RevealItem
              key={c.title}
              as="article"
              className="card card-hover rounded-[20px] p-6 md:p-[30px] flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <p lang="ta" className="ta text-[22px] text-saffron-text">
                  {c.tamil}
                </p>
                <IconCircle icon={c.icon} tone="sand" size={20} className="w-10! h-10!" />
              </div>
              <h3 className="text-[24px] md:text-[26px]">{c.title}</h3>
              <p className="text-ink-2">{c.text}</p>
              <p className="text-sm text-gold-text font-semibold flex flex-wrap items-center gap-1.5">
                <Calendar size={14} aria-hidden />
                Every day · {site.daily.programmeShort} · {c.note}
              </p>
              <ArrowLink href="/contact" className="mt-auto">
                Join the class
              </ArrowLink>
            </RevealItem>
          ))}
          <RevealItem as="article" className="card-night card-hover rounded-[20px] p-6 md:p-[30px] flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <Eyebrow tone="gold" className="text-[13px] tracking-[.14em]">
                Online
              </Eyebrow>
              <IconCircle icon={Globe} tone="night" size={20} className="w-10! h-10! bg-night-2!" />
            </div>
            <h3 className="text-[24px] md:text-[26px] text-on-night-head">Learning from abroad</h3>
            <p className="text-on-night-2">
              Thiruvasagam and Sivayogam sessions are streamed for devotees overseas, with
              recordings and notes in all four languages. Ask the office for the link and timings
              in your time zone.
            </p>
            <ArrowLink href="/contact" tone="gold" className="mt-auto">
              Ask for the online link
            </ArrowLink>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Video */}
      <section id="video" className="bg-night text-on-night scroll-mt-20">
        <div className="container-site section-pad-lg flex flex-col gap-8 md:gap-9">
          <Reveal>
            <SectionHeading
              onNight
              eyebrow="Video"
              title="Songs, satsangs and sessions."
              action={
                <ArrowLink href={site.song.youtubeUrl} tone="gold">
                  Ashram YouTube channel
                </ArrowLink>
              }
            />
          </Reveal>
          <div className="flex flex-wrap gap-5">
            <Reveal className="flex-[2_1_560px] min-w-0">
              <VideoCard
                youtubeId={site.song.youtubeId}
                poster={images.maatajiPortrait}
                title="Thiyaneshwara song — Jothi TV"
                label="Watch Thiyaneshwara song on YouTube"
                caption={
                  <>
                    <span lang="ta" className="ta text-[20px] md:text-[24px] font-bold">
                      {site.song.title}
                    </span>
                    <span className="text-sm text-on-night-2">
                      Lyrics by Maataji · Singer {site.song.singer} · {site.song.channel} ·{" "}
                      {site.song.views} views
                    </span>
                  </>
                }
              />
            </Reveal>
            <RevealGroup className="flex-[1_1_320px] flex flex-col gap-3.5">
              {moreVideos.map((v) => (
                <RevealItem
                  key={v.title}
                  className="flex gap-3.5 items-center border border-night-line rounded-[14px] p-3 bg-night-2/40"
                >
                  <span
                    className="w-[96px] h-16 rounded-[10px] bg-night-2 shrink-0 flex items-center justify-center text-gold-light"
                    aria-hidden
                  >
                    <Play size={22} fill="currentColor" strokeWidth={0} />
                  </span>
                  <span className="flex flex-col gap-1 min-w-0">
                    <span className="font-semibold leading-snug">{v.title}</span>
                    <span className="text-[13px] text-on-night-2 flex flex-wrap items-center gap-1.5">
                      <Placeholder label="LENGTH" /> · {v.note} · <Placeholder label="YouTube id" />
                    </span>
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Audio */}
      <section id="audio" className="container-site section-pad-lg flex flex-col gap-8 md:gap-9 scroll-mt-20">
        <Reveal>
          <SectionHeading eyebrow="Audio" title="Listen on the road, or on Girivalam." />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {audio.map((a) => (
            <RevealItem
              key={a.title}
              className="card rounded-2xl px-5 py-[18px] flex items-center gap-4"
            >
              <span
                className="w-[52px] h-[52px] rounded-full bg-saffron text-ink inline-flex items-center justify-center shrink-0"
                aria-hidden
              >
                <Play size={22} fill="currentColor" strokeWidth={0} className="ml-0.5" />
              </span>
              <span className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="font-semibold leading-snug">{a.title}</span>
                <span className="text-[13px] text-ink-2 flex flex-wrap items-center gap-1.5">
                  {a.kind === "Tamil · English · Telugu · Hindi versions" ? (
                    <Languages size={13} className="text-saffron-text" aria-hidden />
                  ) : (
                    <Headphones size={13} className="text-saffron-text" aria-hidden />
                  )}
                  {a.kind}
                  {a.length ? (
                    <>
                      {" "}
                      · <Placeholder label="LENGTH" />
                    </>
                  ) : null}
                  {" "}
                  · <Placeholder label="audio file" />
                </span>
                <span aria-hidden className="h-1 rounded-sm bg-sand mt-1.5" />
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Articles */}
      <section id="articles" className="bg-white border-y border-line scroll-mt-20">
        <div className="container-site section-pad-lg flex flex-col gap-8 md:gap-9">
          <Reveal>
            <SectionHeading
              eyebrow="Articles & Ponmozhigal"
              title="Short readings for a long road."
              action={
                <ul className="flex flex-wrap gap-2" aria-label="Topics">
                  {topics.map((t) => (
                    <li
                      key={t}
                      className="px-3 py-1.5 rounded-pill bg-sand text-[13px] font-semibold"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              }
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {articles.map((a) => (
              <RevealItem key={a.title}>
                <Link
                  href="/blog"
                  className="card-ivory card-hover p-6 md:p-[26px] flex flex-col gap-2.5 text-ink h-full"
                >
                  <span className="eyebrow-gold text-[12px]">{a.tag}</span>
                  <span className="font-display text-[22px] leading-[1.3]">{a.title}</span>
                  <span className="text-sm text-ink-2">{a.text}</span>
                  <span className="link-arrow mt-auto">
                    {a.read}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Satsang */}
      <section id="satsang" className="container-site section-pad-lg flex flex-wrap items-center gap-10 md:gap-12 scroll-mt-20">
        <Reveal className="flex-[1_1_440px] flex flex-col gap-3.5">
          <Eyebrow>Satsang</Eyebrow>
          <h2 className="h2">Sit with us.</h2>
          <p className="text-ink-2">
            Satsang at the ashram is simple: bhajans, a reading from the Thirumurai or from
            Amma's books, silence, and conversation. Maataji joins when her schedule and health
            allow. Every Pournami the satsang grows into an all-night gathering with pooja and
            annadhanam.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="card rounded-[14px] p-4 flex gap-3">
              <Calendar size={18} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="eyebrow-gold text-[12px]">Every day</p>
                <p className="mt-1 font-semibold flex flex-wrap items-center gap-1.5">
                  {site.daily.programmeShort}
                </p>
              </div>
            </div>
            <div className="card rounded-[14px] p-4 flex gap-3">
              <Moon size={18} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="eyebrow-gold text-[12px]">Pournami</p>
                <p className="mt-1 font-semibold">Next: 24 Nov 2026</p>
              </div>
            </div>
            <div className="card rounded-[14px] p-4 flex gap-3">
              <Video size={18} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="eyebrow-gold text-[12px]">Online</p>
                <p className="mt-1 font-semibold">
                  <Placeholder label="YouTube live — confirm" />
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3.5 mt-1.5">
            <Button href="/events">Satsang dates</Button>
            <Button href="/book-a-visit" variant="outline-saffron">
              Plan a visit around satsang
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[0_1_440px] w-full max-w-[400px] mx-auto lg:mx-0">
          <PhotoFigure
            image={images.maatajiFlowers}
            alt="Maataji in meditation during a pooja, covered in flower petals"
            ratio="3/4"
            position="50% 20%"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </Reveal>
      </section>
    </>
  );
}
