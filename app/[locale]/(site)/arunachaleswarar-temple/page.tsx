import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  BadgeIndianRupee,
  Building2,
  Clock,
  DoorOpen,
  ExternalLink,
  Flame,
  Globe,
  Landmark,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCircle } from "@/components/ui/IconCircle";
import { FAQ } from "@/components/ui/FAQ";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { AbroadVisitors, AshramStopCard, GuideByline, JumpLinks, QuickAnswer, Sources, VisitAshramBand } from "@/components/guide/GuideBits";

type Props = { params: Promise<{ locale: Locale }> };

const PATH = "/arunachaleswarar-temple";
const OFFICIAL = site.temple.officialSite;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: PATH,
    title: "Arunachaleswarar Temple Tiruvannamalai: timings, history, booking",
    description:
      "Tiruvannamalai Arunachaleswarar temple guide: darshan timings, official website, online booking, special darshan and abhishekam, history and who built it.",
    image: images.arunachalaNight,
  });
}

const timings: { label: string; value: string }[] = [
  { label: "Monday – Friday", value: site.temple.timings },
  { label: "Sat, Sun, Pournami, holidays", value: site.temple.weekend },
  { label: "Entrances", value: "East Rajagopuram · North Ammani Amman gopuram" },
];

const poojas = [
  { name: "Ushathkalam", tamil: "உஷத்காலம்", time: "5:30 AM" },
  { name: "Kalasanthi", tamil: "காலசந்தி", time: "8:00 AM" },
  { name: "Uchikalam", tamil: "உச்சிகாலம்", time: "10:00 AM" },
  { name: "Sayarakshai", tamil: "சாயரட்சை", time: "6:00 PM" },
  { name: "Irandamkalam", tamil: "இரண்டாம் காலம்", time: "8:00 PM" },
  { name: "Ardhajamam", tamil: "அர்த்தஜாமம்", time: "10:00 PM" },
];

const booking: { icon: LucideIcon; title: string; text: string; status: string }[] = [
  {
    icon: DoorOpen,
    title: "General darshan",
    status: "Free",
    text: "No ticket is needed. Queues are shortest early in the morning on weekdays.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Special (₹50) darshan",
    status: "Stopped",
    text: "The HR&CE department ordered the ₹50 special darshan ticket stopped in July 2023 so that more devotees could have darshan each day. Some older websites still list it.",
  },
  {
    icon: Building2,
    title: "VIP / break darshan",
    status: "Not confirmed",
    text: "A paid 'break darshan' for Tiruvannamalai was announced in 2025. We could not confirm that it is running or its price — check the official website before you plan around it.",
  },
  {
    icon: Flame,
    title: "Abhishekam",
    status: "At the counter",
    text: "Abhishekam is arranged at the temple counter; prices quoted online vary widely and are not official. Ask at the temple office for the current list.",
  },
  {
    icon: Globe,
    title: "Online services",
    status: "Official site",
    text: "The official HR&CE website takes online donations, annadhanam contributions, postal prasadam and the Karthigai Deepam ghee-pot (gheepot) offering. It does not list online darshan or abhishekam booking.",
  },
];

const facts: { k: string; v: string }[] = [
  { k: "Deity", v: "Arunachaleswarar (Annamalaiyar) with Unnamulai Amman" },
  { k: "Element", v: "Fire (Agni) — one of the five Pancha Bhoota Sthalams" },
  { k: "Built", v: "From the 9th century (early Cholas), enlarged by later Cholas, Hoysalas and Vijayanagara and Nayak kings" },
  { k: "East Rajagopuram", v: "11 tiers, about 66 m (217 ft)" },
  { k: "Size", v: "About 25 acres, 9 gopurams, 5 prakarams" },
  { k: "Inscriptions", v: "About 450 stone inscriptions" },
  { k: "Thevaram", v: "A Paadal Petra Sthalam, sung by Appar and Sambandar" },
  { k: "Hill", v: "Arunachala, about 2,668 ft" },
];

const faqs = [
  {
    question: "What are the Arunachaleswarar temple timings in Tiruvannamalai?",
    answer: `According to the temple's official website, darshan is from 5:30 AM to 8:00 PM, and is allowed only until 7:30 PM on Saturdays, Sundays, Pournami, holidays and crowded days. The six daily poojas run from about 5:30 AM (Ushathkalam) to 10 PM (Ardhajamam).`,
  },
  {
    question: "What is the official website of Tiruvannamalai temple?",
    answer: `The official website of Arulmigu Arunachaleswarar Temple is ${OFFICIAL}, run by the Tamil Nadu HR&CE department. It offers online donations, annadhanam, postal prasadam and the Karthigai Deepam ghee-pot offering.`,
  },
  {
    question: "Can I book Tiruvannamalai temple darshan or abhishekam online?",
    answer:
      "Not on the official website as of November 2026: it lists donations, annadhanam, postal prasadam and the Deepam ghee-pot offering, but no online darshan or abhishekam booking. General darshan is free; abhishekam is arranged at the temple counter.",
  },
  {
    question: "Is there a special darshan or VIP darshan ticket at Tiruvannamalai?",
    answer:
      "The ₹50 special darshan ticket was ordered stopped by HR&CE in July 2023. A paid break darshan was announced in 2025 but we could not confirm it is running. General darshan is free; check the official website or the temple office before you travel.",
  },
  {
    question: "Who built the Tiruvannamalai Arunachaleswarar temple?",
    answer:
      "Inscriptions date the first construction to the early Chola kings in the 9th century. Later Cholas, the Hoysalas (who made Tiruvannamalai a capital in 1328) and the Vijayanagara and Nayak kings enlarged it. The 11-tier east Rajagopuram was begun under Krishnadevaraya and completed under Sevappa Nayaka in the 16th century.",
  },
  {
    question: "திருவண்ணாமலை அண்ணாமலையார் கோயிலைக் கட்டியவர் யார்?",
    answer:
      "கல்வெட்டுகளின்படி 9ஆம் நூற்றாண்டில் முற்காலச் சோழர்கள் முதலில் கட்டினர். பின்னர் பிற்காலச் சோழர்கள், ஹொய்சாளர்கள், விஜயநகர மற்றும் நாயக்க மன்னர்கள் விரிவுபடுத்தினர். 11 நிலை கிழக்கு ராஜகோபுரம் கிருஷ்ணதேவராயர் காலத்தில் தொடங்கப்பட்டு செவ்வப்ப நாயக்கர் காலத்தில் நிறைவடைந்தது.",
  },
  {
    question: "When is Karthigai Deepam 2026 at Tiruvannamalai?",
    answer:
      "Tuesday 24 November 2026. The Bharani Deepam is lit at about 4 AM in front of the sanctum and the Maha Deepam on the hilltop at about 6 PM. The festival flag is hoisted on 15 November and the Maha Ratham chariot procession is on 21 November.",
  },
];

export default async function TemplePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const templeSchema = {
    "@context": "https://schema.org",
    "@type": ["HinduTemple", "TouristAttraction"],
    name: "Arunachaleswarar Temple (Annamalaiyar Temple), Tiruvannamalai",
    alternateName: ["Annamalaiyar Temple", "அருணாசலேஸ்வரர் கோயில்", "அண்ணாமலையார் கோயில்"],
    url: OFFICIAL,
    sameAs: ["https://en.wikipedia.org/wiki/Annamalaiyar_Temple"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tiruvannamalai",
      addressRegion: "Tamil Nadu",
      postalCode: "606601",
      addressCountry: "IN",
    },
    isAccessibleForFree: true,
    publicAccess: true,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => `https://schema.org/${d}`), opens: "05:30", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"].map((d) => `https://schema.org/${d}`), opens: "05:30", closes: "19:30" },
    ],
    subjectOf: { "@type": "WebPage", url: absoluteUrl(`/${locale}${PATH}`) },
  };

  return (
    <>
      <JsonLd
        data={[
          templeSchema,
          breadcrumbSchema([
            { name: "Home", path: `/${locale}` },
            { name: "Tiruvannamalai guide", path: `/${locale}/tiruvannamalai-guide` },
            { name: "Arunachaleswarar Temple", path: `/${locale}${PATH}` },
          ]),
        ]}
      />
      <PageHero
        variant="night"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tiruvannamalai guide", href: "/tiruvannamalai-guide" },
          { label: "Arunachaleswarar Temple" },
        ]}
        eyebrow="Tiruvannamalai temple guide · checked 6 November 2026"
        title="Arunachaleswarar Temple, Tiruvannamalai: timings, booking and history"
        tamil="அருணாசலேஸ்வரர் (அண்ணாமலையார்) கோயில் · நேரம் · வரலாறு"
        lede="Everything pilgrims ask before visiting the great temple of Arunachala — darshan hours from the official website, what can and cannot be booked online, tickets, abhishekam and the temple's history — from the ashram at Adi Annamalai on the Girivalam path."
        extra={
          <JumpLinks
            onNight
            items={[
              { href: "#timings", label: "Timings" },
              { href: "#booking", label: "Tickets & booking" },
              { href: "#history", label: "History" },
              { href: "#tamil", label: "தமிழில்" },
              { href: "#faq", label: "FAQ" },
            ]}
          />
        }
      />

      <section className="container-site pt-10 md:pt-14 flex flex-col gap-4">
        <Reveal>
          <QuickAnswer question="Tiruvannamalai temple timings">
            <strong>{site.temple.timings}</strong> every day; it closes at 7:30 PM on Saturdays, Sundays,
            Pournami, holidays and crowded days. General darshan is free. The official website is{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
              annamalaiyar.hrce.tn.gov.in
            </a>
            .
          </QuickAnswer>
        </Reveal>
        <GuideByline checked="2026-11-06" className="mt-4" />
      </section>

      {/* Timings */}
      <section id="timings" className="container-site section-pad flex flex-wrap gap-8 md:gap-12 scroll-mt-24">
        <Reveal className="flex-[1_1_380px] flex flex-col gap-4 min-w-0">
          <SectionHeading eyebrow="Darshan timings" title="When the temple is open." tamil="தரிசன நேரம்" />
          <ul className="card rounded-2xl divide-y divide-line">
            {timings.map((t) => (
              <li key={t.label} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
                <span className="text-ink-2 text-[15px]">{t.label}</span>
                <strong className="text-[16px]">{t.value}</strong>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink-2">
            Festival days such as Karthigai Deepam follow a special schedule. For the Girivalam calendar
            see the{" "}
            <Link href="/tiruvannamalai-guide#calendar" className="font-semibold">
              Pournami dates 2026–27
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_420px] flex flex-col gap-4 min-w-0">
          <Eyebrow>Six daily poojas · ஆறு கால பூஜை</Eyebrow>
          <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {poojas.map((p) => (
              <RevealItem key={p.name} className="card-ivory rounded-xl p-4">
                <p className="font-display text-[22px] text-saffron-text leading-none">{p.time}</p>
                <p className="mt-2 font-semibold text-[15px]">{p.name}</p>
                <p lang="ta" className="ta text-[13px] text-ink-2">{p.tamil}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="text-[13px] text-ink-2">
            Approximate pooja times as generally published; the temple may change them on festival days.
          </p>
        </Reveal>
      </section>

      {/* Tickets & booking */}
      <section id="booking" className="bg-white border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Tickets, special darshan & online booking"
              title="What you can — and cannot — book."
              lede="Many websites still repeat old ticket prices. This is what we could confirm on 6 November 2026."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {booking.map((b) => (
              <RevealItem key={b.title} className="card-ivory card-hover rounded-2xl p-5 md:p-6 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-3">
                  <IconCircle icon={b.icon} tone="sand" size={18} className="w-10! h-10!" />
                  <span className="chip text-[12px]! py-1! px-3!">{b.status}</span>
                </div>
                <h3 className="text-[20px]">{b.title}</h3>
                <p className="text-[15px] text-ink-2">{b.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="flex flex-wrap items-center gap-3">
            <a href={OFFICIAL} target="_blank" rel="noopener noreferrer" className="btn btn-night">
              <ExternalLink size={18} aria-hidden /> Official temple website
            </a>
            <span className="text-sm text-ink-2">Run by the Tamil Nadu HR&amp;CE department.</span>
          </Reveal>
        </div>
      </section>

      {/* History */}
      <section id="history" className="container-site section-pad-lg flex flex-wrap gap-8 md:gap-12 scroll-mt-24">
        <Reveal className="flex-[1_1_480px] flex flex-col gap-4 min-w-0">
          <SectionHeading eyebrow="History" title="Who built the temple, and why it is the temple of fire." />
          <p className="text-ink-2">
            Inscriptions date the first construction to the early Chola kings in the 9th century. The
            temple grew for 700 years after that: later Cholas, the Hoysalas — who made Tiruvannamalai
            their capital in 1328 — and the Vijayanagara and Nayak kings all added halls, walls and
            towers. The 11-tier east Rajagopuram, about 66 m tall, was begun under Krishnadevaraya and
            completed under Sevappa Nayaka in the 16th century.
          </p>
          <p className="text-ink-2">
            Arunachaleswarar is worshipped as the lingam of fire, one of the five Pancha Bhoota Sthalams.
            The Shiva Purana tells how Shiva appeared as an endless column of fire: Vishnu, as a boar,
            dug for its base and Brahma, as a swan, flew for its top. Neither found the end, and Arunachala
            is that column of light made hill — which is why its summit is lit each year at Karthigai Deepam.
          </p>
          <AshramStopCard context="After the temple, walk the Girivalam path" />
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_380px] min-w-0">
          <dl className="card rounded-2xl divide-y divide-line">
            {facts.map((f) => (
              <div key={f.k} className="px-5 py-3.5 grid grid-cols-[120px_1fr] gap-3">
                <dt className="text-[13px] font-semibold uppercase tracking-[.08em] text-gold-text pt-0.5">{f.k}</dt>
                <dd className="m-0 text-[15px]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Tamil */}
      <section id="tamil" lang="ta" className="bg-sand border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-col gap-4 max-w-[900px]">
          <p className="eyebrow">தமிழில்</p>
          <h2 className="ta text-[26px] md:text-[34px] leading-snug">திருவண்ணாமலை அண்ணாமலையார் கோயில் வரலாறு</h2>
          <p className="ta text-[17px] leading-[1.9] text-ink-2">
            பஞ்சபூதத் தலங்களில் அக்னித் தலமான அருணாசலேஸ்வரர் கோயில், 9ஆம் நூற்றாண்டில் முற்காலச் சோழர்களால்
            முதலில் கட்டப்பட்டது. பின்னர் பிற்காலச் சோழர்கள், ஹொய்சாளர்கள், விஜயநகர மற்றும் நாயக்க மன்னர்கள்
            விரிவுபடுத்தினர். சுமார் 25 ஏக்கர் பரப்பில் 9 கோபுரங்களும் 5 பிரகாரங்களும் கொண்டது. 11 நிலை கிழக்கு
            ராஜகோபுரம் சுமார் 66 மீட்டர் உயரம். அப்பர், சம்பந்தர் பாடிய தேவாரப் பாடல் பெற்ற தலம்.
          </p>
          <p className="ta text-[17px] leading-[1.9] text-ink-2">
            தரிசன நேரம்: காலை 5:30 முதல் இரவு 8:00 வரை; சனி, ஞாயிறு, பௌர்ணமி, விடுமுறை நாட்களில் இரவு 7:30
            வரை. பொது தரிசனம் இலவசம். அதிகாரப்பூர்வ இணையதளம்: annamalaiyar.hrce.tn.gov.in.
          </p>
          <p className="ta text-[17px] leading-[1.9] text-ink-2">
            கோயில் தரிசனத்திற்குப் பின் கிரிவலப் பாதையில் ஆதி அண்ணாமலையில் உள்ள எங்கள் சிவ ஸ்ரீ தியானேஸ்வர் அம்மா
            ஆசிரமத்திற்கு வாருங்கள் — தினமும் இலவச அன்னதானம், மௌனசாமி சித்தர் தரிசனம்.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <AbroadVisitors />

      <section id="faq" className="container-site section-pad flex flex-wrap gap-8 md:gap-10 scroll-mt-24">
        <Reveal className="flex-[1_1_300px] min-w-0 flex flex-col gap-3">
          <Eyebrow>Questions people ask</Eyebrow>
          <h2 className="h2">Visiting Arunachaleswarar Temple.</h2>
          <IconCircle icon={Landmark} tone="sand" />
          <Link href="/blog/karthigai-deepam-2026-tiruvannamalai" className="link-arrow mt-2">
            <ScrollText size={16} aria-hidden /> Karthigai Deepam 2026 guide
          </Link>
          <Link href="/places-to-visit-tiruvannamalai" className="link-arrow">
            <Clock size={16} aria-hidden /> Places to visit in Tiruvannamalai
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0 flex flex-col gap-5">
          <FAQ items={faqs} />
          <Sources
            items={[
              { label: "Official temple website (HR&CE)", href: OFFICIAL },
              { label: "Tiruvannamalai district", href: "https://tiruvannamalai.nic.in/?p=2809" },
              { label: "Wikipedia: Annamalaiyar Temple", href: "https://en.wikipedia.org/wiki/Annamalaiyar_Temple" },
              { label: "DT Next, July 2023", href: "https://www.dtnext.in/news/tamilnadu/collector-stops-darshan-fee-collection-at-tmalai-temple-722058" },
              { label: "ETV Bharat, Deepam 2026", href: "https://www.etvbharat.com/ta/spiritual/pandhakal-muhurtham-marks-beginning-of-preparations-for-thirukarthigai-deepam-festival-tns26091706935" },
            ]}
          />
        </Reveal>
      </section>

      <VisitAshramBand heading="After darshan at the temple, walk the Girivalam path — and rest with us." />
    </>
  );
}
