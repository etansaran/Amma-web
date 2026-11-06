import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Armchair,
  Bus,
  CalendarDays,
  CircleCheck,
  CircleX,
  Clock,
  Flower2,
  Footprints,
  Heart,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Ticket,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OverlayFigure } from "@/components/ui/OverlayFigure";
import { InfoCard } from "@/components/ui/InfoCard";
import { IconCircle } from "@/components/ui/IconCircle";
import { Placeholder } from "@/components/ui/Placeholder";
import { FAQRich, type FaqRichItem } from "@/components/ui/FAQRich";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/mounasamy/darshan",
    title: "Mouna Siddhar Tiruvannamalai darshan: location & timings",
    description:
      "Mouna Siddhar Tiruvannamalai location, contact number, ashram address and darshan timings. Mounasamy now lives at Thiyaneswar Amma Ashram, Adi Annamalai. Free, daily.",
    image: images.mounasamyAltar,
  });
}

type Step = {
  icon: LucideIcon;
  title: string;
  text: React.ReactNode;
  night?: boolean;
};

const steps: Step[] = [
  {
    icon: Footprints,
    title: "Arrive and leave footwear outside",
    text: "Switch your phone to silent before you enter the hall.",
  },
  {
    icon: Armchair,
    title: "Sit where the volunteer shows you",
    text: "A few feet from him, on the floor. Chairs for elders.",
  },
  {
    icon: Heart,
    title: "Hold your prayer in the mind",
    text: "No talking, no requests spoken aloud, no touching his feet.",
  },
  {
    icon: Flower2,
    title: "Offer at the altar, not to him",
    text: "Flowers, vibhuti, fruit. A volunteer gives you vibhuti prasadam.",
  },
  {
    icon: Utensils,
    title: "Leave as quietly as you came",
    text: (
      <>
        Annadhanam is served {site.daily.programme}; everyone is welcome to eat.
      </>
    ),
    night: true,
  },
];

const dos = [
  "Dress modestly; traditional clothes are welcome",
  "Sit in silence for as long as you like",
  "Bring children — they are welcome if kept quiet",
  "Ask a volunteer before taking any photograph",
  "Stay for annadhanam",
];

const donts = [
  "Speak to him or expect him to speak",
  "Touch him, his jata or his seat",
  "Use flash, selfie sticks or video calls in the hall",
  "Hand him money — give to the ashram office instead",
  "Bring non-vegetarian food, alcohol or tobacco on the premises",
];

const faqs: FaqRichItem[] = [
  {
    question: "Do I need to book for Mounasamy's darshan?",
    answer:
      `No. Come any day; he stands to give darshan every evening from ${site.mounasamyStanding}. Groups of ten or more should tell the office a day ahead so the hall can be arranged.`,
    open: true,
  },
  {
    question: "Is Mouna Siddhar still at Sri Mouna Swami Peetam on Girivalam Road?",
    answer:
      "No. He moved to Siva Sri Thiyaneswar Amma Ashram at Vediyappanur, Adi Annamalai, where his guru Maataji cares for him. Use the address on this page.",
  },
  {
    question: "Can I take a photo or video?",
    answer:
      "Ask a volunteer first. Quiet photos without flash are usually fine from your seat; videos and live streams in the hall are not.",
  },
  {
    question: "Is the hall accessible for elders and wheelchairs?",
    answer: (
      <>
        <Placeholder label="Confirm: step-free entry, chairs for elders, nearest restroom" /> Tell
        the office when you come and a volunteer will help.
      </>
    ),
    schemaAnswer:
      "Step-free entry, chairs for elders and the nearest restroom are being confirmed by the ashram office. Tell the office when you come and a volunteer will help.",
  },
  {
    question: "Will he bless my child / my new vehicle / my shop?",
    answer:
      "He does not leave his seat or speak. Bring the child to sit with him; for other prayers, book a sankalpa pooja at the ashram and his altar's vibhuti is sent with the prasadam.",
  },
  {
    question: "How can I support his care?",
    answer:
      "Through the ashram only — annadhanam, the altar's lamps and flowers, and his daily needs are met by the trust. Nobody is authorised to collect money in his name elsewhere.",
  },
];

export default async function MounasamyDarshanPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-night text-on-night overflow-hidden border-b border-night-line">
        <Image
          src={images.mounasamyAltar.src}
          alt=""
          aria-hidden
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-35 animate-drift"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,60,.9),rgba(14,26,60,.97))] lg:bg-[linear-gradient(90deg,rgba(14,26,60,.97)_0%,rgba(14,26,60,.85)_55%,rgba(14,26,60,.5)_100%)]"
        />
        <div className="container-site relative pt-14 pb-10 md:pt-20 md:pb-14">
          <Reveal immediate className="flex flex-col gap-4">
            <Breadcrumbs
              onNight
              items={[
                { label: "Home", href: "/" },
                { label: "Mounasamy", href: "/mounasamy" },
                { label: "Darshan" },
              ]}
            />
            <Eyebrow tone="gold">Mouna Siddhar Tiruvannamalai — location · timings · contact</Eyebrow>
            <h1 className="h1-page text-on-night-head max-w-[860px]">
              Mounasamy Siddhar darshan: where he is, when to come, and how to sit with him.
            </h1>
            <p lang="ta" className="ta text-[20px] md:text-[22px] leading-snug text-gold-light">
              மௌன சித்தர் தரிசனம் · இடம், நேரம், தொடர்பு
            </p>
            <p className="lede text-on-night-body max-w-[720px]">
              Official darshan information from Siva Sri Thiyaneswar Amma Ashram, where Mounasamy
              lives under the care of his guru, Maataji. Free, every day, in silence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick answers */}
      <section className="container-site pt-10 md:pt-12">
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <RevealItem className="card card-hover rounded-2xl border-l-4 border-l-saffron p-5 md:px-[22px] flex gap-3.5">
            <IconCircle icon={MapPin} tone="sand" size={18} className="w-10! h-10! mt-0.5" />
            <div className="min-w-0">
              <p className="eyebrow-gold">Location</p>
              <p className="mt-1.5 font-semibold leading-snug">
                {site.name}, {site.address.street}, {site.address.locality}, {site.address.city}{" "}
                {site.address.postalCode}
              </p>
              <p className="mt-1 text-sm text-ink-2">
                On the Girivalam path, far side of the hill from the main temple
              </p>
            </div>
          </RevealItem>
          <RevealItem className="card card-hover rounded-2xl border-l-4 border-l-saffron p-5 md:px-[22px] flex gap-3.5">
            <IconCircle icon={Phone} tone="sand" size={18} className="w-10! h-10! mt-0.5" />
            <div className="min-w-0">
              <p className="eyebrow-gold">Contact number</p>
              <a
                href={site.phoneHref}
                className="mt-1.5 block font-display text-[22px] md:text-[24px] text-ink hover:text-saffron-text"
              >
                {site.phone}
              </a>
              <p className="mt-1 text-sm text-ink-2">
                Ashram office (
                <a href={site.phoneHref} className="font-semibold">
                  call
                </a>{" "}
                /{" "}
                <a href={site.whatsappHref} className="font-semibold" target="_blank" rel="noopener noreferrer">
                  WhatsApp {site.whatsapp}
                </a>
                ) — Mounasamy himself does not speak or use a phone
              </p>
            </div>
          </RevealItem>
          <RevealItem className="card card-hover rounded-2xl border-l-4 border-l-saffron p-5 md:px-[22px] flex gap-3.5">
            <IconCircle icon={Clock} tone="sand" size={18} className="w-10! h-10! mt-0.5" />
            <div className="min-w-0">
              <p className="eyebrow-gold">Darshan timings</p>
              <p className="mt-1.5 font-semibold leading-snug">
                Every day · stands for darshan {site.mounasamyStanding}
              </p>
              <p className="mt-1 text-sm text-ink-2">
                Satsang and annadhanam {site.daily.programme}
              </p>
            </div>
          </RevealItem>
          <RevealItem className="card-night card-hover rounded-2xl p-5 md:px-[22px] flex gap-3.5">
            <IconCircle icon={Ticket} tone="gold" size={18} className="w-10! h-10! mt-0.5" />
            <div className="min-w-0">
              <p className="eyebrow-gold text-gold-light!">Cost</p>
              <p className="mt-1.5 font-display text-[22px] md:text-[24px] text-on-night-head">Free</p>
              <p className="mt-1 text-sm text-on-night-2">
                No ticket, no booking needed for darshan; nothing is sold in his name
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Map + directions */}
      <section className="container-site py-14 md:py-[72px] flex flex-wrap items-stretch gap-6">
        <Reveal className="flex-[2_1_560px] relative rounded-lg overflow-hidden border border-line min-h-[380px] md:min-h-[440px] bg-sand">
          <Image
            src={images.girivalamMap.src}
            alt="Illustrated map of the Girivalam route around Arunachala; the ashram where Mounasamy lives is on the Adi Annamalai stretch"
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
          <div aria-hidden className="absolute left-[31%] top-[36%] w-[18px] h-[18px] -ml-[9px] -mt-[9px]">
            <span className="absolute inset-0 rounded-full bg-saffron animate-ping opacity-60" />
            <span className="absolute inset-0 rounded-full bg-saffron border-[3px] border-white shadow-[0_4px_12px_rgba(0,0,0,.3)]" />
          </div>
          <div className="absolute left-4 top-4 md:left-5 md:top-5 bg-white border border-line rounded-[14px] px-4 py-3 text-sm max-w-[calc(100%-32px)] sm:max-w-[320px] shadow-card">
            <strong className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-saffron-text" aria-hidden /> Mounasamy is here
            </strong>
            <br />
            <span className="text-ink-2">
              Thiyaneswar Amma Ashram, Adi Annamalai. Pin is illustrative; the live map uses the
              exact GPS point.
            </span>
          </div>
          <div className="absolute left-4 bottom-4 right-4 md:left-5 md:bottom-5 flex flex-wrap gap-2.5">
            <Button href={site.mapsHref} variant="night" size="sm" className="h-[46px]! text-sm!">
              <MapPin size={16} aria-hidden /> Open in Google Maps
            </Button>
            <Button href={site.whatsappHref} variant="white" size="sm" className="h-[46px]! text-sm!">
              <WhatsappIcon size={16} /> Send location on WhatsApp
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_320px] flex flex-col gap-3 min-w-0">
          <InfoCard
            icon={Landmark}
            eyebrow="From Arunachaleswarar Temple"
            title={
              <>
                Auto, about <Placeholder label="X minutes" />
              </>
            }
            note="Say “Adi Annamalai, Thiyaneswar Amma Ashram, Vediyappanur Road”."
          />
          <InfoCard
            icon={Footprints}
            eyebrow="On Girivalam"
            title="The Adi Annamalai stretch"
            note="Walking clockwise, you reach the far side of the hill; the ashram is on the Vediyappanur Road turn."
          />
          <InfoCard
            icon={Bus}
            eyebrow="From bus stand / railway station"
            title={
              <>
                Auto, about <Placeholder label="X minutes" />
              </>
            }
            note="Share-autos run along the Girivalam road on Pournami days."
          />
          <ArrowLink href="/tiruvannamalai-guide" className="mt-1">
            Reaching Tiruvannamalai from Chennai or Bengaluru
          </ArrowLink>
        </Reveal>
      </section>

      {/* Step by step */}
      <section className="bg-white border-y border-line">
        <div className="container-site section-pad flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="A darshan, step by step"
              title="Ten quiet minutes that many carry for years."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <RevealItem
                key={s.title}
                className={
                  s.night
                    ? "card-night card-hover rounded-2xl p-5 md:p-[22px] flex flex-col gap-2"
                    : "card-ivory card-hover rounded-2xl p-5 md:p-[22px] flex flex-col gap-2"
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={`font-display text-[32px] md:text-[34px] leading-none ${s.night ? "text-gold-light" : "text-gold"}`}
                  >
                    {i + 1}
                  </p>
                  <IconCircle icon={s.icon} tone={s.night ? "gold" : "sand"} size={18} className="w-10! h-10!" />
                </div>
                <p className="mt-1 font-semibold leading-snug">{s.title}</p>
                <p className={`text-sm ${s.night ? "text-on-night-2" : "text-ink-2"}`}>{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Etiquette + best time */}
      <section className="container-site section-pad flex flex-wrap items-stretch gap-6">
        <Reveal className="flex-[1_1_300px] bg-green-bg border border-[#BBDCC2] rounded-[20px] p-6 md:p-[26px] flex flex-col gap-3 min-w-0">
          <p className="font-display text-[22px] text-green-text">Please do</p>
          <ul className="m-0 p-0 list-none flex flex-col gap-2 text-[15px] text-ink">
            {dos.map((d) => (
              <li key={d} className="flex gap-2.5">
                <CircleCheck size={18} className="text-green-text shrink-0 mt-[3px]" aria-hidden />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="flex-[1_1_300px] bg-[#FDE8E6] border border-[#F0C2BE] rounded-[20px] p-6 md:p-[26px] flex flex-col gap-3 min-w-0">
          <p className="font-display text-[22px] text-[#8A2A24]">Please don't</p>
          <ul className="m-0 p-0 list-none flex flex-col gap-2 text-[15px] text-ink">
            {donts.map((d) => (
              <li key={d} className="flex gap-2.5">
                <CircleX size={18} className="text-[#8A2A24] shrink-0 mt-[3px]" aria-hidden />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.16} className="flex-[1_1_300px] card rounded-[20px] p-6 md:p-[26px] flex flex-col gap-3 min-w-0">
          <p className="font-display text-[22px] inline-flex items-center gap-2.5">
            <CalendarDays size={20} className="text-saffron-text" aria-hidden /> Best time to come
          </p>
          <p className="text-[15px] text-ink-2">
            <strong className="text-ink">Quietest:</strong> weekday mornings.
          </p>
          <p className="text-[15px] text-ink-2">
            <strong className="text-ink">Busiest:</strong> Pournami nights and Karthigai Deepam (24
            Nov 2026) — thousands pass on Girivalam.
          </p>
          <p className="text-[15px] text-ink-2">
            <strong className="text-ink">Special:</strong> Guru Pournami (18 Jul 2027) and Maheswara
            Poojai, when sadhus are honoured.
          </p>
          <ArrowLink href="/events" className="mt-auto">
            Events calendar
          </ArrowLink>
        </Reveal>
      </section>

      {/* Photos */}
      <section className="container-site pb-14 md:pb-20">
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <RevealItem>
            <OverlayFigure
              image={images.mounasamyFlame}
              alt="Mounasamy holding up a lit lamp during deepa aradhana"
              title="Deepa aradhana at his altar"
              ratio="6/5"
              position="50% 20%"
              className="rounded-[20px]"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </RevealItem>
          <RevealItem>
            <OverlayFigure
              image={images.mounasamyFlowers}
              alt="Mounasamy in meditation before a wall of flowers"
              title="In silence, Guru Pournami"
              ratio="6/5"
              position="50% 35%"
              className="rounded-[20px]"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </RevealItem>
          <RevealItem className="sm:col-span-2 lg:col-span-1">
            <OverlayFigure
              image={images.maatajiStudio}
              alt="Maataji, his guru, seated in a wooden chair"
              title="Maataji, his guru — at the same ashram"
              ratio="6/5"
              position="60% 30%"
              className="rounded-[20px]"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </RevealItem>
        </RevealGroup>
      </section>

      {/* FAQ */}
      <section className="bg-sand border-t border-line">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-10">
          <Reveal className="flex-[1_1_300px] min-w-0">
            <Eyebrow>Darshan questions</Eyebrow>
            <h2 className="h2 mt-3">Before you come.</h2>
            <p className="mt-4 text-sm text-ink-2 flex flex-col gap-2">
              <a href={site.phoneHref} className="inline-flex items-center gap-2 font-semibold">
                <Phone size={15} aria-hidden /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 font-semibold">
                <Mail size={15} aria-hidden /> {site.email}
              </a>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0">
            <FAQRich items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-night text-on-night">
        <div className="container-site py-14 md:py-[72px] flex flex-wrap items-center justify-between gap-6">
          <Reveal className="flex flex-col gap-2 max-w-[640px]">
            <h2 className="font-display text-[28px] md:text-[34px] leading-tight text-on-night-head">
              Coming for darshan? Tell us the day.
            </h2>
            <p className="text-on-night-2">
              Not required — but it lets the office keep a quiet seat and a plate for you, and warn
              you if a festival will make the hall crowded.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <Button href="/book-a-visit" size="lg">
              <CalendarDays size={18} aria-hidden /> Request a visit date
            </Button>
            <Button href="/mounasamy" variant="outline-gold" size="lg">
              About Mounasamy
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
