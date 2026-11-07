import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  CalendarDays,
  CameraOff,
  Clock,
  Eye,
  Footprints,
  HandHeart,
  MapPin,
  MicOff,
  Newspaper,
  Phone,
  Quote,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema, maatajiPersonSchema, mounasamyPersonSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { VideoCard } from "@/components/ui/VideoCard";
import { FacebookIcon, InstagramIcon, WhatsappIcon, XIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { JumpLinks, QuickAnswer, Sources, VisitAshramBand } from "@/components/guide/GuideBits";
import { SocialEmbed } from "@/components/guide/SocialEmbed";

type Props = { params: Promise<{ locale: Locale }> };

const PATH = "/raghava-lawrence-mouna-siddhar";
const PUBLISHED = "2026-11-07";

/** The actor's own posts (same video and caption on each) and the press that covered it. */
const posts = {
  instagram: "https://www.instagram.com/actorlawrence/reel/DfWELFSSMTq/",
  facebook: "https://www.facebook.com/offllawrence/videos/2127041338179412/",
  x: "https://x.com/offl_Lawrence/status/2118184083889218035",
};
const press = {
  webdunia: "https://www.instagram.com/webdunia.tamil/reel/DfXB4KLqzS8/",
  ssnews: "https://x.com/SSNEWSDigital/status/2118313651862118847",
  ibcId: "dvBruerQH-8",
};

const TITLE = "Raghava Lawrence in Tiruvannamalai: his Mouna Siddhar visit";
const DESCRIPTION =
  "Raghava Lawrence in Tiruvannamalai: on his birthday, 29 October 2026, the actor met Mouna Siddhar (Mounasamy) and asked fans to visit. Watch his video; address, timings, contact.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: PATH,
    title: TITLE,
    description: DESCRIPTION,
    image: images.mounasamyAltar,
  });
}

const timeline: { date: string; title: string; text: string }[] = [
  {
    date: "29 Oct 2026",
    title: "A birthday visit to Arunachala",
    text: "Raghava Lawrence came to Tiruvannamalai with his mother and family on his birthday, and first sought the blessings of Ramana Maharshi and Seshadri Swamigal.",
  },
  {
    date: "The same day",
    title: "A photograph, handed to him twice",
    text: "Someone gave him a picture of Mouna Siddhar — and then it happened a second time. He felt it was happening for a reason, and went to find the ashram.",
  },
  {
    date: "At the ashram",
    title: "Not a samadhi — a living siddhar",
    text: "He expected a jeeva samadhi. Instead he found Mounasamy seated in silence, alive, and says he was spellbound. He, his mother and family took his blessings.",
  },
  {
    date: "4–5 Nov 2026",
    title: "He shared it with everyone",
    text: "He posted the video on Instagram, Facebook and X, and asked anyone visiting Tiruvannamalai to go to Mouna Siddhar's ashram for his blessings.",
  },
];

const visitTips: { icon: typeof Clock; title: string; text: string }[] = [
  {
    icon: Clock,
    title: `Come for the standing darshan, ${site.mounasamyStandingShort}`,
    text: "He sits in silence all day and stands to give darshan every evening. Darshan is free, every day.",
  },
  {
    icon: Footprints,
    title: "Follow the same route",
    text: "Ramanasramam and Seshadri Swamigal's ashram are on the way. Continue along the Girivalam path to Adi Annamalai.",
  },
  {
    icon: MicOff,
    title: "Expect silence, not words",
    text: "Mounasamy does not speak. Sit quietly; many devotees simply offer their prayer in the mind.",
  },
  {
    icon: CameraOff,
    title: "Ask before photos",
    text: "Please ask a volunteer before taking photos or video, and never use flash.",
  },
];

const faqs = [
  {
    question: "Why did Raghava Lawrence go to Tiruvannamalai?",
    answer:
      "Raghava Lawrence spent his birthday, 29 October 2026, in Tiruvannamalai with his mother and family. He sought the blessings of Ramana Maharshi and Seshadri Swamigal, and then — after a photograph of Mouna Siddhar was handed to him twice — visited Mouna Siddhar's ashram at Adi Annamalai.",
  },
  {
    question: "Which Mouna Siddhar did Raghava Lawrence visit in Tiruvannamalai?",
    answer: `Mounasamy Siddhar — also called Mouna Siddhar, Mouna Swami or Mouna Swamigal — the silent sadhu who lives at ${site.name}, ${site.address.street}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}, on the Girivalam path, in the care of his guru Maataji.`,
  },
  {
    question: "When did Raghava Lawrence visit Mouna Siddhar?",
    answer:
      "On his birthday, 29 October 2026, during a family visit to Tiruvannamalai. He shared a video of the visit on Instagram, Facebook and X on 4–5 November 2026.",
  },
  {
    question: "What did Raghava Lawrence say about Mouna Siddhar?",
    answer:
      "He said he had expected a jeeva samadhi but found the siddhar seated before him and was spellbound, that there was something powerful and divine about his eyes, and that anyone visiting Tiruvannamalai should take Mouna Siddhar's blessings.",
  },
  {
    question: "Is Mouna Siddhar alive or in jeeva samadhi?",
    answer:
      "He is alive. Many famous siddhars of Tiruvannamalai rest in jeeva samadhi, which is why visitors — including Raghava Lawrence — sometimes expect a shrine. Mounasamy is a living siddhar who sits in silence at the ashram every day.",
  },
  {
    question: "What are Mouna Siddhar's darshan timings?",
    answer: `Darshan is free every day. He sits in silence through the day and stands to give darshan every evening, ${site.mounasamyStanding}. Satsang and annadhanam run ${site.daily.programme}.`,
  },
  {
    question: "What is the Mouna Siddhar ashram contact number?",
    answer: `Mounasamy keeps silence and does not use a phone. The ashram office answers for him: phone ${site.phone}, WhatsApp ${site.whatsapp}. Older videos may show other numbers from when he sat at Sri Mouna Swami Peetam; please use these.`,
  },
  {
    question: "Can I also meet Maataji when I visit?",
    answer: `Maataji, Sathguru Siva Sri Thiyaneswar Amma, is Mounasamy's guru. She gives darshan ${site.maatajiDarshan.daysInline}, ${site.maatajiDarshan.hours}, as her health allows — a meeting cannot be promised. Please call the office before you travel.`,
  },
];

function articleData() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Raghava Lawrence in Tiruvannamalai: his visit to Mouna Siddhar",
    description: DESCRIPTION,
    mainEntityOfPage: absoluteUrl(`/en${PATH}`),
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    inLanguage: "en",
    image: absoluteUrl(images.mounasamyAltar.src),
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    about: [{ "@id": `${site.url}/#mounasamy` }, { "@id": `${site.url}/#place` }],
    mentions: [
      {
        "@type": "Person",
        name: "Raghava Lawrence",
        alternateName: ["Lawrence", "ராகவா லாரன்ஸ்"],
        jobTitle: "Actor, director and choreographer",
        sameAs: [
          "https://en.wikipedia.org/wiki/Raghava_Lawrence",
          "https://x.com/offl_Lawrence",
          "https://www.instagram.com/actorlawrence/",
          "https://www.facebook.com/offllawrence",
        ],
      },
      { "@id": `${site.url}/#maataji` },
    ],
    citation: [posts.instagram, posts.facebook, posts.x, press.ssnews, press.webdunia],
    keywords:
      "Raghava Lawrence Tiruvannamalai, Raghava Lawrence Mouna Siddhar, Lawrence Mouna Swamigal, Mouna Siddhar Tiruvannamalai, Mounasamy, ராகவா லாரன்ஸ் மௌன சித்தர், ராகவா லாரன்ஸ் திருவண்ணாமலை",
  };
}

function ibcVideoData() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Tiruvannamalai Mouna Siddhar — IBC Tamil",
    description:
      "IBC Tamil's 2022 feature on Mouna Siddhar of Tiruvannamalai, filmed when he sat at Sri Mouna Swami Peetam on the Girivalam road.",
    thumbnailUrl: [`https://i.ytimg.com/vi/${press.ibcId}/hqdefault.jpg`],
    uploadDate: "2022-12-06T05:52:19-08:00",
    duration: "PT9M30S",
    embedUrl: `https://www.youtube-nocookie.com/embed/${press.ibcId}`,
    contentUrl: `https://www.youtube.com/watch?v=${press.ibcId}`,
    publisher: { "@type": "Organization", name: "IBC Tamil" },
    about: { "@id": `${site.url}/#mounasamy` },
  };
}

export default async function LawrenceMounaSiddharPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: `/${locale}` },
          { name: "Mounasamy", path: `/${locale}/mounasamy` },
          { name: "Raghava Lawrence's visit", path: `/${locale}${PATH}` },
        ])}
      />
      <JsonLd data={articleData()} />
      <JsonLd data={mounasamyPersonSchema()} />
      <JsonLd data={maatajiPersonSchema()} />
      <JsonLd data={ibcVideoData()} />

      <PageHero
        variant="night"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Mounasamy", href: "/mounasamy" },
          { label: "Raghava Lawrence's visit" },
        ]}
        eyebrow="Raghava Lawrence · Mouna Siddhar · Tiruvannamalai"
        title="Raghava Lawrence in Tiruvannamalai: his visit to Mouna Siddhar"
        tamil="திருவண்ணாமலையில் ராகவா லாரன்ஸ் · மௌன சித்தர் தரிசனம்"
        lede="On his birthday, actor Raghava Lawrence came to Arunachala with his family and found the silent siddhar he had not planned to meet. Here is what he shared, where Mouna Siddhar lives, and how you can take his darshan too."
        extra={
          <JumpLinks
            onNight
            items={[
              { href: "#story", label: "What happened" },
              { href: "#video", label: "Watch the video" },
              { href: "#maataji", label: "His guru, Maataji" },
              { href: "#visit", label: "Visit Mouna Siddhar" },
              { href: "#tamil", label: "தமிழில்" },
              { href: "#faq", label: "FAQ" },
            ]}
          />
        }
      />

      <section className="container-site pt-10 md:pt-14">
        <Reveal>
          <QuickAnswer question="Who is the Mouna Siddhar Raghava Lawrence visited?">
            <strong>Mounasamy Siddhar</strong> — Mouna Siddhar, Mouna Swamigal — the silent sadhu of
            Tiruvannamalai. He lives at <strong>{site.name}</strong>, {site.address.street}, Adi Annamalai,
            Tiruvannamalai {site.address.postalCode}, on the Girivalam path, in the care of his guru Maataji.
            Darshan is free every day; he stands for darshan {site.mounasamyStanding}. Office: {site.phone}.
          </QuickAnswer>
        </Reveal>
      </section>

      <section id="story" className="container-site section-pad flex flex-wrap items-start gap-8 md:gap-12 scroll-mt-24">
        <div className="flex-[1_1_480px] flex flex-col gap-6 min-w-0">
          <Reveal>
            <SectionHeading
              eyebrow="29 October 2026 · Tiruvannamalai"
              title="A birthday, a photograph handed over twice, and a silent siddhar."
            />
          </Reveal>
          <RevealGroup as="ol" className="relative grid gap-4 border-l-2 border-gold/40 pl-6 ml-2">
            {timeline.map((t) => (
              <RevealItem key={t.title} as="li" className="relative">
                <span aria-hidden className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-saffron ring-4 ring-ivory" />
                <p className="text-[13px] font-semibold text-gold-text inline-flex items-center gap-1.5">
                  <CalendarDays size={14} aria-hidden /> {t.date}
                </p>
                <h3 className="text-[20px] mt-1">{t.title}</h3>
                <p className="text-ink-2 mt-1">{t.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <blockquote className="rounded-2xl bg-sand border border-line p-5 md:p-6 flex gap-4">
              <Quote size={28} className="text-saffron-text shrink-0" aria-hidden />
              <div>
                <p className="font-display text-[22px] md:text-[24px] leading-snug text-ink">
                  &ldquo;There was something so powerful and divine about his eyes.&rdquo;
                </p>
                <footer className="mt-2 text-sm text-ink-2">
                  — Raghava Lawrence, on{" "}
                  <a href={posts.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    Instagram
                  </a>
                  , 4 November 2026
                </footer>
              </div>
            </blockquote>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="flex-[0_1_360px] w-full max-w-[360px] mx-auto md:mx-0 md:sticky md:top-28">
          <PhotoFigure
            image={images.mounasamyGarland}
            ratio="3/4"
            position="50% 20%"
            frame="gold"
            caption="Mounasamy Siddhar at the ashram, Adi Annamalai — the siddhar Raghava Lawrence met."
            sizes="(max-width: 768px) 100vw, 360px"
          />
        </Reveal>
      </section>

      <section id="video" className="bg-sand border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Raghava Lawrence's own video"
              title="Watch him tell it."
              lede="He posted the same video and words on his official Instagram, Facebook and X accounts. The video loads from each platform only when you press play."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 max-w-[780px] w-full mx-auto">
            <RevealItem>
              <SocialEmbed
                platform="Instagram"
                icon={<InstagramIcon size={15} />}
                embedSrc="https://www.instagram.com/reel/DfWELFSSMTq/embed/"
                href={posts.instagram}
                title="Raghava Lawrence on Mouna Siddhar"
                meta="@actorlawrence · 4 Nov 2026"
                poster={images.mounasamyFlame}
              />
            </RevealItem>
            <RevealItem>
              <SocialEmbed
                platform="Facebook"
                icon={<FacebookIcon size={15} />}
                embedSrc={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(posts.facebook)}&show_text=false`}
                href={posts.facebook}
                title="Raghava Lawrence on Mouna Siddhar"
                meta="Raghava Lawrence · Facebook reel"
                poster={images.mounasamyFlowers}
              />
            </RevealItem>
          </RevealGroup>
          <Reveal className="max-w-[780px] w-full mx-auto">
            <a
              href={posts.x}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover rounded-2xl p-5 flex items-center gap-4"
            >
              <span className="icon-circle bg-ink! text-white!" aria-hidden>
                <XIcon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink">Read his post on X</span>
                <span className="block text-sm text-ink-2">@offl_Lawrence · 5 Nov 2026</span>
              </span>
              <ArrowRight size={18} className="text-saffron-text shrink-0" aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="container-site section-pad flex flex-wrap items-center gap-8 md:gap-12">
        <Reveal className="flex-[1_1_440px] flex flex-col gap-4 min-w-0">
          <SectionHeading
            eyebrow="Why he expected a samadhi"
            title="Most siddhars of Arunachala rest in samadhi. Mounasamy is living."
          />
          <p className="text-ink-2">
            Tiruvannamalai is known for its jeeva samadhis — the shrines where siddhars such as Seshadri
            Swamigal and Guhai Namasivayar rest. So when a photograph of a siddhar reaches a pilgrim, it is
            natural to think of a shrine. Mounasamy is different: he is alive, keeps a vow of silence, and
            sits before his altar day and night at our ashram. Devotees come simply to sit with him.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/mounasamy" variant="outline-saffron">
              About Mounasamy Siddhar <ArrowRight size={16} aria-hidden />
            </Button>
            <Button href="/siddhars-of-tiruvannamalai" variant="outline-night">
              Siddhars of Tiruvannamalai <ArrowRight size={16} aria-hidden />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_420px] min-w-0">
          <PhotoFigure
            image={images.mounasamyAltar}
            ratio="16/9"
            frame="gold"
            caption="Mounasamy seated before his altar at the ashram."
            sizes="(max-width: 768px) 100vw, 560px"
          />
        </Reveal>
      </section>

      <section id="maataji" className="bg-night text-on-night scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap items-center gap-8 md:gap-12">
          <Reveal className="flex-[0_1_340px] w-full max-w-[340px] mx-auto md:mx-0">
            <PhotoFigure
              image={images.maatajiThrone}
              ratio="3/4"
              position="50% 20%"
              frame="gold"
              caption="Maataji, Sathguru Siva Sri Thiyaneswar Amma."
              sizes="(max-width: 768px) 100vw, 340px"
            />
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_480px] flex flex-col gap-4 min-w-0">
            <p className="eyebrow text-gold-light!">The guru behind the silent siddhar</p>
            <h2 className="h2 text-on-night-head">Mouna Siddhar lives in the care of his guru, Maataji.</h2>
            <p className="text-on-night-body">
              The ashram Raghava Lawrence visited is the home of Sathguru Siva Sri Thiyaneswar Amma —
              Maataji — whom Mounasamy accepts as his guru. She founded the ashram&apos;s charitable trust on{" "}
              {site.trust.foundedText}, and under her the ashram serves free annadhanam every day of the year,
              about {site.annadhanam.dailyPlates} plates a day and some {site.annadhanam.pournamiPlates} on
              Pournami nights.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="flex items-center gap-2.5 rounded-xl bg-night-2/80 border border-night-line px-3.5 py-3">
                <HandHeart size={18} className="text-gold-light shrink-0" aria-hidden />
                Maataji&apos;s darshan: {site.maatajiDarshan.daysShort}, {site.maatajiDarshan.hoursShort}
              </li>
              <li className="flex items-center gap-2.5 rounded-xl bg-night-2/80 border border-night-line px-3.5 py-3">
                <Eye size={18} className="text-gold-light shrink-0" aria-hidden />
                As her health allows; please call first
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button href="/maataji">
                Meet Maataji <ArrowRight size={16} aria-hidden />
              </Button>
              <Button href="/mounasamy/guru-shishya" variant="outline-gold">
                Guru and shishya
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="visit" className="container-site section-pad flex flex-col gap-8 scroll-mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Visit as he did"
            title="Taking Mouna Siddhar's darshan at Adi Annamalai."
            lede={`${site.name}, ${site.address.street}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}. Free, every day, no booking needed for darshan.`}
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visitTips.map((t) => (
            <RevealItem key={t.title} as="article" className="card rounded-2xl p-5 flex flex-col gap-3">
              <span className="icon-circle" aria-hidden>
                <t.icon size={20} />
              </span>
              <h3 className="text-[18px] leading-snug">{t.title}</h3>
              <p className="text-[15px] text-ink-2">{t.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="flex flex-wrap gap-3">
          <Button href={site.mapsHref}>
            <MapPin size={18} aria-hidden /> Directions
          </Button>
          <Button href={site.phoneHref} variant="night">
            <Phone size={18} aria-hidden /> {site.phone}
          </Button>
          <Button href={site.whatsappHref} variant="outline-saffron">
            <WhatsappIcon size={18} /> WhatsApp
          </Button>
          <Button href="/mounasamy/darshan" variant="outline-night">
            Full darshan details <ArrowRight size={16} aria-hidden />
          </Button>
        </Reveal>
      </section>

      <section className="bg-white border-y border-line">
        <div className="container-site section-pad flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="In the news"
              title="Mouna Siddhar in the Tamil media."
            />
          </Reveal>
          <div className="flex flex-wrap gap-8 md:gap-10 items-start">
            <Reveal className="flex-[1_1_420px] min-w-0 flex flex-col gap-3">
              <VideoCard
                youtubeId={press.ibcId}
                poster={images.mounasamyAltar}
                title="Tiruvannamalai Mouna Siddhar — IBC Tamil"
                label="Play IBC Tamil's video on Mouna Siddhar"
                caption={
                  <>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-light">
                      <YoutubeIcon size={15} /> IBC Tamil · December 2022
                    </span>
                    <span className="font-display text-[19px] text-on-night-head">Tiruvannamalai Mouna Siddhar</span>
                  </>
                }
              />
              <p className="text-[13px] text-ink-2">
                Filmed in 2022, when Mounasamy sat at Sri Mouna Swami Peetam on the Girivalam road. He has
                since moved to our ashram at Adi Annamalai; the phone number in that video&apos;s description is
                not the ashram&apos;s. Please call {site.phone}.
              </p>
            </Reveal>
            <RevealGroup as="ul" className="flex-[1_1_320px] min-w-0 grid gap-3">
              {[
                { label: "SS News Digital", note: "“Go and see the Mouna Swamigal” — Lawrence's advice to fans (Tamil), 5 Nov 2026", href: press.ssnews },
                { label: "Webdunia Tamil", note: "Mouna Siddhar — the wonder Lawrence shared (Tamil reel), 5 Nov 2026", href: press.webdunia },
              ].map((p) => (
                <RevealItem key={p.href} as="li">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="card card-hover rounded-2xl p-4 flex gap-3.5 items-start">
                    <Newspaper size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">{p.label}</span>
                      <span className="block text-sm text-ink-2">{p.note}</span>
                    </span>
                  </a>
                </RevealItem>
              ))}
              <RevealItem as="li">
                <Link href="/mouna-swami" className="link-arrow">
                  Where Mouna Swami is now
                </Link>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      <section id="tamil" lang="ta" className="container-site section-pad scroll-mt-24">
        <Reveal className="max-w-[760px] flex flex-col gap-4">
          <Eyebrow>தமிழில்</Eyebrow>
          <h2 className="h2 ta text-[28px]! md:text-[38px]! leading-snug [overflow-wrap:anywhere]">ராகவா லாரன்ஸ் சந்தித்த திருவண்ணாமலை மௌன சித்தர்</h2>
          <p className="text-ink-2 ta leading-loose">
            நடிகர் ராகவா லாரன்ஸ் தனது பிறந்தநாளான அக்டோபர் 29 அன்று குடும்பத்துடன் திருவண்ணாமலைக்கு வந்தார்.
            ரமண மகரிஷி, சேஷாத்ரி சுவாமிகளின் ஆசி பெற்ற பின், மௌன சித்தரின் படம் இரண்டு முறை அவர் கையில்
            கொடுக்கப்பட்டது. அதை ஒரு அழைப்பாக உணர்ந்து அவர் சித்தரைத் தரிசிக்க வந்தார். ஜீவ சமாதி என்று நினைத்து
            வந்தவர், உயிருடன் அமர்ந்திருக்கும் சித்தரைக் கண்டு மெய்மறந்தார்; தாயாருடனும் குடும்பத்துடனும் ஆசி
            பெற்றார். திருவண்ணாமலை வருபவர்கள் அனைவரும் மௌன சித்தரைத் தரிசிக்குமாறு அவர் கேட்டுக்கொண்டார்.
          </p>
          <p className="text-ink-2 ta leading-loose">
            மௌன சித்தர் (மௌனசாமி, மௌன சுவாமிகள்) இப்போது ஆதி அண்ணாமலை, வேடியப்பனூர் சாலையில் உள்ள{" "}
            {site.nameTamil}த்தில், தன் குருவான மாதாஜியின் பராமரிப்பில் இருக்கிறார். தரிசனம் தினமும் இலவசம்;
            தினமும் மாலை 7 முதல் 8 மணி வரை நின்று தரிசனம் தருகிறார். மாதாஜி தரிசனம்: ஒவ்வொரு வெள்ளிக்கிழமையும்
            பௌர்ணமியும், காலை 9 முதல் மாலை 7 வரை (உடல்நிலையைப் பொறுத்து). தொடர்புக்கு: {site.phone} · வாட்ஸ்அப்{" "}
            {site.whatsapp}.
          </p>
        </Reveal>
      </section>

      <section id="faq" className="bg-white border-t border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-10">
          <Reveal className="flex-[1_1_300px] min-w-0">
            <Eyebrow>Questions people ask</Eyebrow>
            <h2 className="h2 mt-3">Raghava Lawrence and Mouna Siddhar.</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0 flex flex-col gap-5">
            <FAQ items={faqs} />
            <Sources
              items={[
                { label: "Raghava Lawrence on Instagram", href: posts.instagram },
                { label: "on Facebook", href: posts.facebook },
                { label: "on X", href: posts.x },
                { label: "SS News Digital", href: press.ssnews },
                { label: "Webdunia Tamil", href: press.webdunia },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <VisitAshramBand heading="Take Mouna Siddhar's blessings, as Raghava Lawrence did." />
    </>
  );
}
