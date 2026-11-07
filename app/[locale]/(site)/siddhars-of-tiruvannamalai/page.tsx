import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { MapPin, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GuideByline, JumpLinks, LawrenceVisitCard, QuickAnswer, Sources, VisitAshramBand } from "@/components/guide/GuideBits";

type Props = { params: Promise<{ locale: Locale }> };

const PATH = "/siddhars-of-tiruvannamalai";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: PATH,
    title: "Siddhars of Tiruvannamalai — jeeva samadhis & living siddhar",
    description:
      "Siddhars and saints of Tiruvannamalai (திருவண்ணாமலை சித்தர்கள்): jeeva samadhis of Mookupodi Siddhar, Idaikkadar, Seshadri Swamigal and more, and the living Mouna Siddhar.",
    image: images.mounasamyGarland,
  });
}

type Saint = {
  name: string;
  tamil: string;
  period: string;
  text: string;
  samadhi: string;
};

const saints: Saint[] = [
  {
    name: "Ramana Maharshi",
    tamil: "ரமண மகரிஷி",
    period: "1879 – 1950",
    text: "Came to Tiruvannamalai in 1896 and never left. He lived in Virupaksha Cave (1899–1916) and Skandashram on the hill before Sri Ramanasramam grew around his mother's samadhi.",
    samadhi: "Samadhi shrine at Sri Ramanasramam, Chengam Road — open to visitors",
  },
  {
    name: "Seshadri Swamigal",
    tamil: "சேஷாத்ரி சுவாமிகள்",
    period: "1870 – 1929",
    text: "The 'saint with the golden hand', an elder of Ramana's time; for a period he too was called Mouna Swamigal for his silence.",
    samadhi: "Sri Seshadri Ashram, Chengam Road, beside Ramanasramam — open to visitors",
  },
  {
    name: "Yogi Ramsuratkumar",
    tamil: "யோகி ராம்சுரத்குமார்",
    period: "1918 – 2001",
    text: "The 'Visiri Samiyar' — the saint with a hand fan — who lived on the streets of Tiruvannamalai for decades.",
    samadhi: "Inside the main hall of Yogi Ramsuratkumar Ashram, Agraharakollai, Chengam Road",
  },
  {
    name: "Mookupodi Siddhar",
    tamil: "மூக்குப்பொடி சித்தர்",
    period: "Settled 1982 · samadhi December 2018",
    text: "Named for his love of snuff, he spoke very little and sat on and around the Girivalam path, blessing those who came to him. He left his body at the Seshadri Swamigal Ashram in December 2018.",
    samadhi: "Jeeva samadhi on the Girivalam path near the Vayu Lingam; annual guru pooja",
  },
  {
    name: "Guhai Namasivayar",
    tamil: "குகை நமசிவாயர்",
    period: "16th century (dates vary)",
    text: "A Virasaiva saint from Karnataka who trained at Srisailam and lived in a cave on the lower eastern slope of Arunachala.",
    samadhi: "Guhai Namasivayar cave, below Virupaksha Cave — daily puja",
  },
  {
    name: "Virupaksha Devar",
    tamil: "விருபாட்ச தேவர்",
    period: "Tradition, dates uncertain",
    text: "Tradition says he came from Karnataka with Guhai Namasivayar. Virupaksha Cave, where Ramana later lived, is named after him.",
    samadhi: "Virupaksha Cave, where his remains (as vibhuti) are worshipped",
  },
  {
    name: "Arunagirinathar",
    tamil: "அருணகிரிநாதர்",
    period: "Around the 15th century",
    text: "Composer of the Thiruppugazh. Tradition links him to the Vallala and Kili gopurams of the Annamalaiyar temple and the Kambathu Ilaiyanar shrine.",
    samadhi: "No samadhi site is documented",
  },
  {
    name: "Idaikkadar",
    tamil: "இடைக்காடர்",
    period: "Sangam era",
    text: "One of the eighteen Tamil siddhars and a Sangam poet; legend tells how he sheltered the Navagrahas during a famine.",
    samadhi: "Tradition holds he attained jeeva samadhi in Tiruvannamalai; the exact spot is disputed",
  },
];

const faqs = [
  {
    question: "Is there a living siddhar in Tiruvannamalai?",
    answer: `Devotees call Mounasamy Siddhar — Mouna Siddhar, Mouna Swami or Vibhuti Siddhar — the living siddhar of Tiruvannamalai. He keeps a vow of silence, sits day and night without lying down, and lives at ${site.name}, Adi Annamalai, on the Girivalam path. Darshan is free every day; he stands for darshan ${site.mounasamyStanding}.`,
  },
  {
    question: "Where is Mookupodi Siddhar's jeeva samadhi?",
    answer:
      "Mookupodi Siddhar left his body at the Seshadri Swamigal Ashram in December 2018 and was laid to rest on the Girivalam path near the Vayu Lingam, where an annual guru pooja is held.",
  },
  {
    question: "Where is Idaikkadar siddhar's jeeva samadhi?",
    answer:
      "Tradition holds that Idaikkadar, one of the eighteen Tamil siddhars, attained jeeva samadhi in Tiruvannamalai, but the exact spot is disputed and we have found no reliable source that fixes it.",
  },
  {
    question: "What is a jeeva samadhi?",
    answer:
      "In the Siddha tradition, a jeeva samadhi is the shrine where a saint is believed to have entered final samadhi consciously and to remain spiritually present. Devotees visit to sit in silence and pray.",
  },
  {
    question: "திருவண்ணாமலை சித்தர்கள் யார் யார்?",
    answer:
      "ரமண மகரிஷி, சேஷாத்ரி சுவாமிகள், யோகி ராம்சுரத்குமார், மூக்குப்பொடி சித்தர், குகை நமசிவாயர், விருபாட்ச தேவர், அருணகிரிநாதர், இடைக்காடர் ஆகியோர் திருவண்ணாமலையுடன் தொடர்புடைய சித்தர்களும் மகான்களும். இன்று ஆதி அண்ணாமலை சிவ ஸ்ரீ தியானேஸ்வர் அம்மா ஆசிரமத்தில் மௌனசாமி சித்தர் வசிக்கிறார்.",
  },
  {
    question: "Which siddhar samadhis can I visit on the Girivalam path?",
    answer:
      "On or near the Girivalam path: Sri Ramanasramam and the Seshadri Swamigal and Yogi Ramsuratkumar ashrams on Chengam Road, and Mookupodi Siddhar's samadhi near the Vayu Lingam. Virupaksha Cave and Guhai Namasivayar's cave are on the hill above Ramanasramam. At Adi Annamalai you can have the darshan of Mounasamy Siddhar at our ashram.",
  },
];

export default async function SiddharsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Siddhars and saints of Tiruvannamalai",
    itemListElement: saints.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Person", name: s.name, alternateName: s.tamil, description: s.text },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          list,
          breadcrumbSchema([
            { name: "Home", path: `/${locale}` },
            { name: "Tiruvannamalai guide", path: `/${locale}/tiruvannamalai-guide` },
            { name: "Siddhars of Tiruvannamalai", path: `/${locale}${PATH}` },
          ]),
        ]}
      />
      <PageHero
        variant="night"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tiruvannamalai guide", href: "/tiruvannamalai-guide" },
          { label: "Siddhars of Tiruvannamalai" },
        ]}
        eyebrow="Saints of Arunachala"
        title="Siddhars of Tiruvannamalai — their jeeva samadhis, and the living siddhar"
        tamil="திருவண்ணாமலை சித்தர்கள் · ஜீவசமாதிகள்"
        lede="Arunachala has drawn siddhars and saints for centuries. Here are those whose samadhis you can visit today — and Mounasamy Siddhar, the silent sadhu who still sits in sadhana at Adi Annamalai."
        extra={
          <JumpLinks
            onNight
            items={[
              { href: "#living", label: "The living siddhar" },
              { href: "#saints", label: "Saints & samadhis" },
              { href: "#faq", label: "FAQ" },
            ]}
          />
        }
      />

      <section className="container-site pt-10 md:pt-14">
        <Reveal>
          <QuickAnswer question="Famous siddhars of Tiruvannamalai">
            Ramana Maharshi, Seshadri Swamigal, Yogi Ramsuratkumar, Mookupodi Siddhar (jeeva samadhi near
            the Vayu Lingam on the Girivalam path), Guhai Namasivayar, Virupaksha Devar, Arunagirinathar and
            Idaikkadar — and today, Mounasamy Siddhar (Mouna Siddhar) at Adi Annamalai.
          </QuickAnswer>
        </Reveal>
        <GuideByline checked="2026-11-06" className="mt-4" />
      </section>

      <section id="living" className="container-site section-pad flex flex-wrap items-center gap-8 md:gap-12 scroll-mt-24">
        <Reveal className="flex-[0_1_340px] w-full max-w-[340px] mx-auto md:mx-0">
          <PhotoFigure
            image={images.mounasamyGarland}
            ratio="3/4"
            position="50% 15%"
            frame="gold"
            sizes="(max-width: 768px) 100vw, 340px"
          />
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_440px] flex flex-col gap-4 min-w-0">
          <Eyebrow>The living siddhar of Tiruvannamalai</Eyebrow>
          <h2 className="h2">Mounasamy Siddhar — the silent sadhu at Adi Annamalai.</h2>
          <p lang="ta" className="ta text-[20px] text-saffron-text">மௌன சித்தர் · மௌனசாமி</p>
          <p className="text-ink-2">
            Known as Mouna Siddhar, Mouna Swami and Vibhuti Siddhar, Mounasamy has kept a vow of silence
            for many years and sits before his altar day and night without lying down, his body covered
            in vibhuti. He earlier sat at Sri Mouna Swami Peetam on the Girivalam road; he now lives at{" "}
            {site.name} in Adi Annamalai, in the care of his guru, Maataji. Devotees say silent prayers
            made before him are answered; the ashram makes no claims and asks nothing in his name.
          </p>
          <ul className="flex flex-wrap gap-2.5 text-sm">
            <li className="chip"><Sparkles size={14} className="text-saffron-text" aria-hidden /> Darshan every day · free</li>
            <li className="chip"><Sparkles size={14} className="text-saffron-text" aria-hidden /> Stands {site.mounasamyStandingShort}</li>
            <li className="chip"><MapPin size={14} className="text-saffron-text" aria-hidden /> Vediyappanur Road, Adi Annamalai</li>
          </ul>
          <div className="flex flex-wrap gap-3 mt-1">
            <Button href="/mounasamy" variant="night">About Mounasamy</Button>
            <Button href="/mounasamy/darshan" variant="outline-saffron">Darshan location &amp; timings</Button>
          </div>
          <LawrenceVisitCard className="mt-2" />
        </Reveal>
      </section>

      <section id="saints" className="bg-white border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Saints and samadhis"
              title="Siddhars and saints whose samadhis you can visit."
              tamil="ஜீவசமாதிகள் · மகான்கள்"
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {saints.map((s) => (
              <RevealItem key={s.name} as="article" className="card-ivory card-hover rounded-2xl p-5 md:p-6 flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-[21px]">{s.name}</h3>
                  <span className="text-[13px] text-gold-text font-semibold">{s.period}</span>
                </div>
                <p lang="ta" className="ta text-[15px] text-saffron-text">{s.tamil}</p>
                <p className="text-[15px] text-ink-2">{s.text}</p>
                <p className="text-[13px] font-semibold flex gap-1.5 mt-auto pt-1">
                  <MapPin size={14} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
                  {s.samadhi}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <p className="text-sm text-ink-2">
              Visiting the samadhis on Chengam Road? They are on the Girivalam path — continue round the hill
              to Adi Annamalai for annadhanam and Mounasamy&apos;s darshan.{" "}
              <Link href="/places-to-visit-tiruvannamalai" className="font-semibold">
                Places to visit in Tiruvannamalai →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="container-site section-pad flex flex-wrap gap-8 md:gap-10 scroll-mt-24">
        <Reveal className="flex-[1_1_300px] min-w-0">
          <Eyebrow>Questions people ask</Eyebrow>
          <h2 className="h2 mt-3">Siddhars and jeeva samadhis.</h2>
        </Reveal>
        <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0 flex flex-col gap-5">
          <FAQ items={faqs} />
          <Sources
            items={[
              { label: "Wikipedia: Ramana Maharshi", href: "https://en.wikipedia.org/wiki/Ramana_Maharshi" },
              { label: "Wikipedia: Seshadri Swamigal", href: "https://en.wikipedia.org/wiki/Seshadri_Swamigal" },
              { label: "Wikipedia: Yogi Ramsuratkumar", href: "https://en.wikipedia.org/wiki/Yogi_Ramsuratkumar" },
              { label: "Daily Thanthi (Mookupodi Siddhar)", href: "https://www.dailythanthi.com/News/State/4th-annual-guru-pooja-festival-of-mooku-podi-siddha-at-tiruvannamalai-845301" },
              { label: "Ramanasramam: Guhai Namasivaya", href: "https://archive.arunachala.org/sri-ramanasramam/mountain-path/guhai-namasivaya" },
              { label: "Wikipedia: Idaikaadar", href: "https://en.wikipedia.org/wiki/Idaikaadar" },
            ]}
          />
        </Reveal>
      </section>

      <VisitAshramBand heading="Sit with the living siddhar of Tiruvannamalai at Adi Annamalai." />
    </>
  );
}
