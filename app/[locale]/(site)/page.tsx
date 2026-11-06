import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  BookOpen,
  Clock,
  Drum,
  Flame,
  HandHeart,
  Heart,
  MapPin,
  Moon,
  Sparkles,
  Sun,
  TrainFront,
  Users,
  Utensils,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site, rupees } from "@/lib/site";
import { images } from "@/lib/images";
import { videoSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { StatTile } from "@/components/ui/StatTile";
import { EventCard } from "@/components/ui/EventCard";
import { VideoCard } from "@/components/ui/VideoCard";
import { IconCircle } from "@/components/ui/IconCircle";
import { InfoCard } from "@/components/ui/InfoCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/",
    title: "Siva Sri Thiyaneswar Amma Ashram, Tiruvannamalai",
    description:
      "Ashram of Maataji at Adi Annamalai on the Girivalam path: daily annadhanam, Mounasamy Siddhar darshan, Thiruvasagam, satsang and Pournami pooja. Plan your visit.",
    absoluteTitle: true,
  });
}

const activities = [
  {
    icon: Utensils,
    title: "Annadhanam, 365 days",
    text: "Hot food for sadhus and pilgrims on the Girivalam road, every single day of the year.",
  },
  {
    icon: Heart,
    title: "Spiritual guidance",
    text: "A quiet word for anyone carrying the weight of everyday life and looking for inner peace.",
  },
  {
    icon: Flame,
    title: "Devotion to Lord Shiva",
    text: "Daily Siva pooja, Shiva teachings and a positive, loving way of seeing the world.",
  },
  {
    icon: BookOpen,
    title: "Thiruvasagam classes",
    text: "Learning Manikkavasagar's hymns the way they were meant to be learnt — sung, understood and lived.",
  },
  {
    icon: Drum,
    title: "Kailaya Vathiyam",
    text: "Temple percussion taught to children and devotees, so Sivapuranam can be sung at temples with the right beat.",
  },
  {
    icon: Users,
    title: "Satsang gatherings",
    text: "Sitting together in song, silence and conversation — in Tamil, with help in English, Telugu and Hindi.",
  },
  {
    icon: Moon,
    title: "Monthly full-moon pooja",
    text: "Every Pournami night, pooja at the ashram and annadhanam for the thousands walking Girivalam.",
  },
  {
    icon: Sparkles,
    title: "Special festival poojas",
    text: "Karthigai Deepam, Maha Shivaratri, Thiruvadhirai, Pradosham and Maheswara Poojai for sadhus.",
  },
];

const participate = [
  {
    title: "Visit",
    text: "Request a date, receive a clear confirmation, and plan your Girivalam around it.",
    cta: "Book a visit",
    href: "/book-a-visit",
  },
  {
    title: "Serve",
    text: "Cook, serve or clean the Girivalam path with us — a morning or a month.",
    cta: "Volunteer",
    href: "/annadhanam#volunteer",
  },
  {
    title: "Give",
    text: "Sponsor annadhanam, a pooja or the ashram's upkeep. Secure payment, instant receipt.",
    cta: "Donate",
    href: "/donate",
  },
  {
    title: "Learn",
    text: "Thiruvasagam, Kailaya Vathiyam, Sivayogam and satsang — in person or online.",
    cta: "Teachings",
    href: "/teachings",
  },
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={videoSchema()} />

      {/* Hero */}
      <section className="relative bg-night text-on-night overflow-hidden md:min-h-[640px] lg:min-h-[780px] flex items-center">
        <Image
          src={images.arunachalaNight.src}
          alt=""
          aria-hidden
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-60 animate-drift"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,60,.55),rgba(14,26,60,.95))] md:bg-[linear-gradient(90deg,rgba(14,26,60,.96)_0%,rgba(14,26,60,.8)_45%,rgba(14,26,60,.3)_100%)]"
        />
        <div className="container-site relative py-8 md:py-16 lg:py-[88px] flex flex-col-reverse md:flex-row items-center gap-7 md:gap-10 lg:gap-12 w-full">
          <Reveal immediate className="flex-1 min-w-0 flex flex-col gap-4 md:gap-5 lg:gap-[22px] max-w-[640px] text-center md:text-left items-center md:items-start">
            <Eyebrow tone="gold" className="text-[11px] md:text-[13px]">
              Adi Annamalai · Girivalam path · Tiruvannamalai
            </Eyebrow>
            <h1 className="h1 text-on-night-head">Come home to Arunachala.</h1>
            <p className="text-[16px] md:text-[20px] leading-[1.55] text-on-night-body max-w-[560px]">
              A living ashram on the sacred Girivalam path — a hot meal for every sadhu, every day;
              Shiva bhakti, Thiruvasagam and satsang; and quiet guidance under the loving care of
              Maataji.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-3.5 mt-1.5 w-full sm:w-auto">
              <Button href="/book-a-visit" size="lg">
                Plan your visit
              </Button>
              <Button href="/annadhanam" variant="outline-gold" size="lg">
                Support Annadhanam
              </Button>
            </div>
            <ul className="hidden sm:flex flex-wrap justify-center md:justify-start gap-x-7 gap-y-2.5 mt-3.5 text-sm text-on-night-2">
              {[
                "Annadhanam 365 days a year",
                `Charitable trust since ${site.trust.foundedText} · Reg ${site.trust.registration}`,
                "Open to devotees from every land",
              ].map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal immediate delay={0.15} className="shrink-0 flex flex-col items-center gap-3 md:gap-4">
            <div className="animate-halo border-2 md:border-[3px] border-gold rounded-t-[200px] rounded-b-[28px] p-2 md:p-2.5 bg-night/35">
              <Image
                src={images.maatajiThrone.src}
                alt={images.maatajiThrone.alt}
                width={340}
                height={440}
                priority
                sizes="(max-width: 640px) 168px, (max-width: 1024px) 260px, 340px"
                className="w-[168px] h-[214px] sm:w-[200px] sm:h-[260px] md:w-[260px] md:h-[336px] lg:w-[340px] lg:h-[440px] object-cover object-[50%_20%] rounded-t-[188px] rounded-b-[20px]"
              />
            </div>
            <p className="text-center text-[13px] md:text-sm text-on-night-2 leading-normal">
              <span className="block font-display text-[17px] md:text-[18px] text-on-night-head">Maataji</span>
              Sathguru Siva Sri Thiyaneswar Amma
            </p>
          </Reveal>
        </div>
      </section>

      {/* Motto band */}
      <section className="bg-sand border-y border-line">
        <div className="container-site py-6 md:py-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-1 md:gap-y-3 text-center">
          <p lang="ta" className="ta text-[22px] md:text-[30px] text-saffron-text font-bold">
            {site.motto}
          </p>
          <p className="font-display text-[16px] md:text-[22px]">{site.mottoEnglish}</p>
          <p className="hidden md:block basis-full text-sm text-ink-2">
            The words on the ashram's seal, and the measure of everything that happens here.
          </p>
        </div>
      </section>

      {/* Maataji's message */}
      <section className="container-site section-pad-lg flex flex-wrap items-center gap-10 md:gap-14">
        <Reveal className="flex-[0_1_440px] relative w-full max-w-[440px] mx-auto lg:mx-0">
          <Image
            src={images.maatajiStudio.src}
            alt={images.maatajiStudio.alt}
            width={880}
            height={880}
            sizes="(max-width: 768px) 100vw, 440px"
            className="w-full aspect-square object-cover object-[62%_30%] rounded-lg border border-line"
          />
          <div className="absolute left-4 md:left-6 -bottom-5 bg-night text-on-night px-4 py-3 rounded-[14px] text-[13px] md:text-sm flex items-center gap-2.5 shadow-night">
            <span className="lamp-dot w-2.5 h-2.5" aria-hidden />
            <span>
              Maataji's darshan: {site.maatajiDarshan.daysShort} · {site.maatajiDarshan.hoursShort}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_480px] flex flex-col gap-5 pt-4 lg:pt-0">
          <Eyebrow>A message from Maataji</Eyebrow>
          {/* DRAFT words — drawn from Maataji's motto and books; confirm with Maataji before launch. */}
          <blockquote className="m-0 border-l-[3px] border-gold pl-5 md:pl-6 flex flex-col gap-3">
            <p lang="ta" className="ta text-[19px] md:text-[23px] leading-[1.6] text-saffron-text">
              “திருவண்ணாமலையே திருக்கயிலாயம். இங்கு வரும் எவரும் பசியோடு திரும்பக் கூடாது. ஒவ்வொரு
              முகத்திலும் சிவனைக் காணுங்கள் — அதுவே தவம்.”
            </p>
            <p className="font-display text-[22px] md:text-[30px] leading-[1.35]">
              “Thiruvannamalai itself is Thirukailayam. No one who comes here should leave hungry. See
              Shiva in every face you meet — that itself is tapas.”
            </p>
          </blockquote>
          <p className="text-ink-2">
            Maataji — Sathguru Siva Sri Thiyaneswar Amma — built this ashram beside the hill she
            calls Thirukailayam itself, so that no sadhu walking around Arunachala goes hungry and
            no seeker leaves without a moment of stillness. Her books, her songs and her daily seva
            all say one thing: see Shiva in everyone, and serve.
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <ArrowLink href="/maataji">Maataji's journey</ArrowLink>
            <ArrowLink href="/teachings">Her teachings and books</ArrowLink>
          </div>
        </Reveal>
      </section>

      {/* Mounasamy */}
      <section className="bg-sand border-t border-line">
        <div className="container-site section-pad flex flex-wrap items-center gap-10 md:gap-14">
          <Reveal className="flex-[0_1_400px] w-full max-w-[400px] mx-auto lg:mx-0">
            <PhotoFigure
              image={images.mounasamyGarland}
              ratio="3/4"
              position="50% 15%"
              frame="gold"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_480px] flex flex-col gap-5">
            <Eyebrow>Maataji's shishya</Eyebrow>
            <h2 className="h2">
              Mounasamy Siddhar — the silent sadhu of Tiruvannamalai — lives here.
            </h2>
            <p lang="ta" className="ta text-[20px] md:text-[22px] text-saffron-text">
              திருவண்ணாமலை மௌன சித்தர் · மௌனசாமி
            </p>
            <p className="text-ink-2">
              Known across Tamil Nadu as Mouna Siddhar, Mouna Swami or Vibhuti Siddhar, Mounasamy
              has kept a vow of silence for more than fifteen years and sits before his altar day and
              night without lying down. He is Maataji's shishya: his sadhana was shaped under her
              guidance, and today he lives at this ashram in her care, giving darshan every day and standing for darshan each evening from 7 to 8 PM.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <span className="chip">
                <Clock size={14} className="text-saffron-text" aria-hidden /> 15+ years of mouna
              </span>
              <span className="chip">
                <Sun size={14} className="text-saffron-text" aria-hidden /> Darshan every day · free
              </span>
              <span className="chip">
                <MapPin size={14} className="text-saffron-text" aria-hidden /> At Adi Annamalai, Vediyappanur Road
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3.5 mt-1.5">
              <Button href="/mounasamy" variant="night">
                About Mounasamy
              </Button>
              <Button href="/mounasamy/darshan" variant="outline-saffron">
                Darshan: location &amp; timings
              </Button>
              <ArrowLink href="/mounasamy/guru-shishya">The guru–shishya story</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Activities */}
      <section className="bg-white border-y border-line">
        <div className="container-site section-pad flex flex-col gap-8 md:gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="What happens here"
              title="Every day, and every full moon."
              action={<ArrowLink href="/ashram">About the ashram</ArrowLink>}
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {activities.map((a) => (
              <RevealItem
                key={a.title}
                as="article"
                className="card-ivory card-hover p-6 md:p-7 flex flex-col gap-3"
              >
                <IconCircle icon={a.icon} />
                <h3 className="text-[20px] md:text-[21px]">{a.title}</h3>
                <p className="text-[15px] text-ink-2">{a.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Annadhanam highlight */}
      <section className="container-site section-pad-lg flex flex-wrap items-center gap-10 md:gap-14">
        <Reveal className="flex-[1_1_480px] flex flex-col gap-5">
          <Eyebrow>Annadhanam · 365 days</Eyebrow>
          <h2 className="h2">
            A hot meal for every sadhu on the Girivalam road. Every single day.
          </h2>
          <p className="text-ink-2">
            Rain or shine, festival or ordinary Tuesday, the ashram kitchen cooks before dawn.
            Sadhus, pilgrims and the poor who walk the 14 km path around Arunachala are fed with
            love — and on Pournami nights and Karthigai Deepam the line stretches down the road.
          </p>
          <div className="flex flex-wrap gap-4">
            <StatTile value="365" label="days a year, without a break" />
            <StatTile value="25+" label="years of Amma's annadhanam tradition" />
            <StatTile
              value="1 lakh"
              label="meals served on one Karthigai Deepam, as the ashram reports"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3.5">
            <Button href="/donate" variant="night">
              <HandHeart size={18} aria-hidden /> Sponsor one day of Annadhanam
            </Button>
            <span className="text-sm text-ink-2">
              {rupees(site.annadhanam.dailyCost)} feeds about {site.annadhanam.dailyPlates} sadhus for
              a day · receipt sent instantly
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[0_1_480px] w-full max-w-[480px] mx-auto lg:mx-0">
          <PhotoFigure
            image={images.maatajiSeva}
            ratio="1/1"
            caption="Maataji offering vastram and food to sadhus on the Girivalam road."
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </Reveal>
      </section>

      {/* Upcoming events */}
      <section className="bg-sand border-y border-line">
        <div className="container-site section-pad flex flex-col gap-8 md:gap-9">
          <Reveal>
            <SectionHeading
              eyebrow="Upcoming poojas & gatherings"
              title="Come for a full moon. Stay for Deepam."
              action={<ArrowLink href="/events">Full calendar</ArrowLink>}
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <RevealItem>
              <EventCard
                featured
                day="24"
                meta="Nov 2026 · Tuesday"
                title="Karthigai Maha Deepam"
                description="Bharani Deepam before dawn, Maha Deepam on the hill at dusk, Pournami Girivalam through the night. The ashram's largest annadhanam of the year."
                cta={{ label: "Volunteer or sponsor", href: "/annadhanam" }}
                className="h-full"
              />
            </RevealItem>
            <RevealItem>
              <EventCard
                day="23"
                meta="Dec 2026 · Wednesday"
                title="Pournami pooja & Girivalam"
                description="Monthly full-moon pooja at the ashram, followed by annadhanam for Girivalam walkers."
                cta={{ label: "Book a sankalpa", href: "/pooja-booking" }}
                className="h-full"
              />
            </RevealItem>
            <RevealItem>
              <EventCard
                day="24"
                meta="Dec 2026 · Thursday"
                title="Thiruvadhirai · Arudra Darshan"
                description="Special pooja for Nataraja's cosmic dance, with Thiruvasagam recital and kali prasadam."
                cta={{ label: "Book a sankalpa", href: "/pooja-booking" }}
                className="h-full"
              />
            </RevealItem>
            <RevealItem>
              <EventCard
                day="6"
                meta="Mar 2027 · Saturday"
                title="Maha Shivaratri"
                description="Four-kala pooja through the night, bhajans and satsang with Maataji's disciples."
                cta={{ label: "Details", href: "/events" }}
                className="h-full"
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Song & video */}
      <section className="relative bg-night text-on-night overflow-hidden">
        <Image
          src={images.girivalamWalk.src}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-[.28]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,60,.7),rgba(14,26,60,.95))]"
        />
        <div className="container-site relative section-pad-lg flex flex-wrap items-center gap-10 md:gap-14">
          <Reveal className="flex-[1_1_520px] w-full">
            <VideoCard
              youtubeId={site.song.youtubeId}
              poster={images.maatajiPortrait}
              title="Thiyaneshwara song — Jothi TV"
              label="Watch the Thiyaneshwara song"
              caption={
                <>
                  <span lang="ta" className="ta text-[18px] md:text-[22px] font-bold">
                    {site.song.title}
                  </span>
                  <span className="text-[13px] md:text-sm text-on-night-2">
                    Thiyaneshwara Song · {site.song.channel} · {site.song.views} views · 7 min
                  </span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_400px] flex flex-col gap-5">
            <Eyebrow tone="gold">Maataji's words, sung for the world</Eyebrow>
            <h2 className="h2 text-on-night-head">
              A song written by Amma that millions now carry in their hearts.
            </h2>
            <p className="text-on-night-body">
              The lyrics of “Thiyaneshwara! Thiyaneshwara!!” were written by Maataji and sung by
              Solar Sai for Jothi TV in January 2024. Listen while you read, and let it set the
              mood for your visit.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Button href={site.song.youtubeUrl}>Watch on YouTube</Button>
              <Button href="/teachings" variant="outline-gold">
                More songs &amp; talks
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Plan your visit */}
      <section className="container-site section-pad-lg flex flex-col gap-8 md:gap-9">
        <Reveal>
          <SectionHeading
            eyebrow="Plan your visit"
            title="On the Girivalam path, at Adi Annamalai — the quiet side of the hill."
            action={<ArrowLink href="/tiruvannamalai-guide">Tiruvannamalai travel guide</ArrowLink>}
          />
        </Reveal>
        <div className="flex flex-wrap gap-6 items-stretch">
          <Reveal className="flex-[2_1_560px] relative rounded-lg overflow-hidden border border-line min-h-[260px] md:min-h-[360px]">
            <Image
              src={images.girivalamMap.src}
              alt={images.girivalamMap.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
            <div className="absolute left-4 bottom-4 md:left-5 md:bottom-5 bg-white border border-line rounded-[14px] px-4 py-3 text-[13px] md:text-sm flex items-center gap-2.5 shadow-card max-w-[calc(100%-32px)]">
              <span className="lamp-dot w-3 h-3" aria-hidden />
              <span>
                <strong>Ashram</strong> · Thiyaneswar Veedhi, Vediyappanur Road, Adi Annamalai
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_320px] flex flex-col gap-3.5">
            <InfoCard
              icon={Clock}
              eyebrow="Arunachaleswarar temple timings"
              title={site.temple.timings}
              note="Extended on Pournami and festival days"
            />
            <InfoCard
              icon={TrainFront}
              eyebrow="Getting here"
              title="About 175 km from Chennai airport"
              note="Tiruvannamalai railway station · buses from Chennai, Bengaluru, Puducherry"
            />
            <InfoCard
              icon={Moon}
              eyebrow="Best times"
              title="Pournami nights · Karthigai Deepam · Maha Shivaratri"
              note={`Satsang & annadhanam daily, ${site.daily.programme} · Maataji's darshan ${site.maatajiDarshan.daysShort}`}
            />
            <Button href="/book-a-visit" size="lg" block>
              Request a visit date
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Banner */}
      <section className="container-site pb-14 md:pb-[104px]">
        <Reveal>
          <Link
            href="/book-a-visit"
            aria-label="Find peace within — begin your spiritual journey with Siva Sri Thiyaneswar Amma, Tiruvannamalai. Plan your visit."
            className="block rounded-lg overflow-hidden border border-line shadow-banner card-hover"
          >
            <Image
              src={images.maatajiBanner.src}
              alt=""
              width={images.maatajiBanner.width}
              height={images.maatajiBanner.height}
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="w-full aspect-[3/1] object-cover"
            />
          </Link>
        </Reveal>
      </section>

      {/* Participate */}
      <section className="bg-white border-t border-line">
        <div className="container-site section-pad flex flex-col gap-8 md:gap-9">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Walk with us"
              title="Four ways to be part of the ashram."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {participate.map((p) => (
              <RevealItem key={p.title}>
                <Link
                  href={p.href}
                  className="card-ivory card-hover p-6 md:p-7 flex flex-col gap-2.5 text-ink h-full"
                >
                  <span className="font-display text-[24px]">{p.title}</span>
                  <span className="text-[15px] text-ink-2">{p.text}</span>
                  <span className="link-arrow mt-auto">
                    {p.cta}
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
    </>
  );
}
