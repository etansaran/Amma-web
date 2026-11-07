import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CircleAlert } from "lucide-react";
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
import { FAQ } from "@/components/ui/FAQ";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PlaceCard, type Place } from "@/components/guide/PlaceCard";
import {
  AbroadVisitors,
  AshramStopCard,
  GuideByline,
  JumpLinks,
  QuickAnswer,
  Sources,
  VisitAshramBand,
} from "@/components/guide/GuideBits";
import { cn } from "@/lib/cn";

type Props = { params: Promise<{ locale: Locale }> };

const PATH = "/temples-in-tiruvannamalai";
const CHECKED = "2026-11-07";
const TITLE = "Temples in Tiruvannamalai: Annamalaiyar, Adi Annamalai & more";
const DESCRIPTION =
  "Temples in Tiruvannamalai: Arunachaleswarar timings, Adi Annamalai temple, the eight Girivalam lingams in order, Durgai Amman, Pavala Kundru, Idukku Pillaiyar, and Padavedu and Devikapuram nearby.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: PATH, title: TITLE, description: DESCRIPTION, image: images.arunachalaNight });
}

const inTown: Place[] = [
  {
    name: "Arunachaleswarar (Annamalaiyar) Temple",
    tamil: "அருணாசலேஸ்வரர் கோயில்",
    text: "The great Shiva temple of fire (Agni), one of the Pancha Bhoota Sthalams, at the foot of Arunachala. Enter by the East Rajagopuram or the North Ammani Amman Gopuram.",
    where: "Centre of town",
    visit: `Darshan ${site.temple.timings} · until 7:30 PM on weekends, Pournami, holidays and crowded days`,
    link: { href: "/arunachaleswarar-temple", label: "Timings, poojas & history" },
  },
  {
    name: "Durgai Amman Temple",
    tamil: "துர்க்கை அம்மன் கோயில்",
    text: "Durga's temple, with the Khadga Tirtham — the spring said to have formed when the goddess struck the rock with her sword. The lane beside it leads up to Pavala Kundru.",
    where: "North of the main temple, about 1 km beyond the bus stand",
  },
  {
    name: "Pavala Kundru (Coral Hill)",
    tamil: "பவழக்குன்று",
    text: "A rocky spur where, by tradition, Parvati did tapas. Ramana Maharshi stayed here in 1898 and taught his mother here; he said the present shrine was built only about 150 years before his time.",
    where: "North of the Arunachaleswarar temple",
  },
  {
    name: "Guhai Namasivayar Temple",
    tamil: "குகை நமசிவாயர் கோயில்",
    text: "Marks the cave of the 16th-century saint Guhai Namasivayar, who made garlands for the lingam at the temple gate and spent his last years on the hill.",
    where: "On the lower slope of Arunachala, above the town",
  },
];

type Stop = { n: string; ta: string; dir?: string; note: string; planet?: string; ours?: boolean; feature?: boolean };

const pathStops: Stop[] = [
  { n: "Indra Lingam", ta: "இந்திர லிங்கம்", dir: "East", planet: "Sun, Venus", note: "On Car Street, near the temple's east tower — where Girivalam begins." },
  { n: "Agni Lingam", ta: "அக்னி லிங்கம்", dir: "South-east", planet: "Moon", note: "Near Seshadri Ashram — the only lingam on the right-hand side of the path." },
  { n: "Yama Lingam", ta: "எம லிங்கம்", dir: "South", planet: "Mars", note: "With Yama Tirtham behind it; a large Nandi facing the hill stands just beyond." },
  { n: "Niruthi Lingam", ta: "நிருதி லிங்கம்", dir: "South-west", planet: "Rahu", note: "Near the viewpoint where the hill is said to look like Nandi's face." },
  { n: "Surya Lingam", ta: "சூரிய லிங்கம்", note: "With Surya Tirtham, where by legend the Sun regained his brightness." },
  { n: "Varuna Lingam", ta: "வருண லிங்கம்", dir: "West", planet: "Saturn", note: "With Varuna Tirtham, about 1 km before Adi Annamalai village." },
  {
    n: "Adi Annamalaiyar Temple",
    ta: "ஆதி அண்ணாமலையார் கோயில்",
    feature: true,
    note: "About halfway round, on the far side of the hill. Tradition holds it older than the main temple; the lingam is swayambhu, the goddess is Abithakujalambal, and Appar sang of it.",
  },
  {
    n: "Siva Sri Thiyaneswar Amma Ashram",
    ta: "சிவ ஸ்ரீ தியானேஸ்வர் அம்மா ஆசிரமம்",
    ours: true,
    note: `Our ashram, on Vediyappanur Road at Adi Annamalai: free annadhanam ${site.daily.programmeShort}, and Mounasamy Siddhar's darshan, standing ${site.mounasamyStandingShort}.`,
  },
  { n: "Vayu Lingam", ta: "வாயு லிங்கம்", dir: "North-west", planet: "Ketu", note: "Near Gosalai village, about 1 km after Adi Annamalai." },
  { n: "Kubera Lingam", ta: "குபேர லிங்கம்", dir: "North", planet: "Jupiter", note: "Towards the end of the path, before the Pancha Mukha viewpoint." },
  { n: "Idukku Pillaiyar", ta: "இடுக்குப் பிள்ளையார்", note: "The squeeze-through shrine near Kubera Lingam. Entry is now restricted — see the safety note." },
  { n: "Esanya Lingam", ta: "ஈசான்ய லிங்கம்", dir: "North-east", planet: "Mercury", note: "Near the new bus stand, opposite the samadhi of Isanya Jnana Desikar — the last lingam before town." },
];

const beyond: Place[] = [
  {
    name: "Padavedu Renugambal Temple",
    tamil: "படவேடு ரேணுகாம்பாள் கோயில்",
    text: "A Sakthi sthalam of Renukambal, whose self-manifested image is a head. Sand is given as prasad instead of kumkum, and vibhuti prasadam is distributed in the month of Aani.",
    where: "About 55 km from Tiruvannamalai",
    visit: "Reported 6:40 AM – 1 PM and 3 – 8:30 PM",
  },
  {
    name: "Devikapuram Periyanayagi Amman Temple",
    tamil: "தேவிகாபுரம் பெரியநாயகி அம்மன் கோயில்",
    text: "Called by the district the biggest temple after Annamalaiyar: Periyanayagi Amman at the foot of the hill and Ponmalainathar on top, in Vijayanagar style.",
    where: "About 50 km north-east, beyond Polur",
  },
  {
    name: "Vettavalam Manonmani Amman Temple",
    tamil: "வேட்டவலம் மனோன்மணி அம்மன் கோயில்",
    text: "The goddess temple at Vettavalam, on the Tiruvannamalai–Villupuram route.",
    where: "Vettavalam, towards Villupuram",
  },
];

const faqs = [
  {
    question: "What are the famous temples in Tiruvannamalai?",
    answer:
      "Arunachaleswarar (Annamalaiyar) Temple, Adi Annamalaiyar Temple on the Girivalam path, the eight Ashta Lingam shrines around the hill, Durgai Amman Temple, Pavala Kundru and Guhai Namasivayar Temple. Nearby are Padavedu Renugambal and Devikapuram Periyanayagi Amman temples.",
  },
  {
    question: "What are Arunachaleswarar temple timings?",
    answer: `Darshan is from ${site.temple.timings}, according to the temple's official website. On Saturdays, Sundays, Pournami, holidays and crowded days, darshan is allowed only until 7:30 PM.`,
  },
  {
    question: "Where is Adi Annamalai temple and why is it special?",
    answer:
      "Adi Annamalaiyar Temple is on the Girivalam path at Adi Annamalai, about halfway round the hill between the Varuna and Vayu lingams. Tradition holds it to be older than the main temple; its lingam is swayambhu and Appar sang of it. Our ashram is in the same village.",
  },
  {
    question: "What is the order of the eight lingams on the Girivalam path?",
    answer:
      "Walking clockwise from the temple: Indra (east), Agni (south-east), Yama (south), Niruthi (south-west), Varuna (west), Vayu (north-west), Kubera (north) and Esanya (north-east).",
  },
  {
    question: "Is Idukku Pillaiyar open?",
    answer:
      "After a devotee died inside the narrow passage in July 2026, the temple administration fixed the entrance width and does not allow overweight, elderly or unwell devotees to enter. Follow the staff's instructions there.",
  },
];

export default async function TemplesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Temples in Tiruvannamalai",
    itemListElement: [
      ...inTown.map((p) => ({ name: p.name, alt: p.tamil, d: p.text })),
      ...pathStops.filter((s) => !s.ours).map((s) => ({ name: s.n, alt: s.ta, d: s.note })),
      ...beyond.map((p) => ({ name: p.name, alt: p.tamil, d: p.text })),
    ].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "HinduTemple", name: t.name, alternateName: t.alt, description: t.d },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          itemList,
          breadcrumbSchema([
            { name: "Home", path: `/${locale}` },
            { name: "Tiruvannamalai guide", path: `/${locale}/tiruvannamalai-guide` },
            { name: "Temples in Tiruvannamalai", path: `/${locale}${PATH}` },
          ]),
        ]}
      />
      <PageHero
        variant="night"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tiruvannamalai guide", href: "/tiruvannamalai-guide" },
          { label: "Temples" },
        ]}
        eyebrow="Tiruvannamalai temple guide · checked November 2026"
        title="Temples in Tiruvannamalai"
        tamil="திருவண்ணாமலை கோயில்கள்"
        lede="The great temple, the shrines you pass on the Girivalam path in walking order, the hill temples in town, and the goddess temples a short drive away — from the ashram that sits beside Adi Annamalai temple."
        extra={
          <JumpLinks
            onNight
            items={[
              { href: "#in-town", label: "In town" },
              { href: "#girivalam", label: "On the Girivalam path" },
              { href: "#beyond", label: "Nearby" },
              { href: "#from-abroad", label: "From abroad" },
              { href: "#faq", label: "FAQ" },
            ]}
          />
        }
      />

      <section className="container-site pt-10 md:pt-14 flex flex-col gap-4">
        <Reveal>
          <QuickAnswer question="Temples in Tiruvannamalai">
            Start at <strong>Arunachaleswarar Temple</strong> (darshan {site.temple.timings}). Walking Girivalam
            clockwise, you pass the eight <strong>Ashta Lingams</strong> and, halfway round,{" "}
            <strong>Adi Annamalaiyar Temple</strong> — by tradition older than the main temple. In town, visit Durgai
            Amman and Pavala Kundru; further out, Padavedu Renugambal and Devikapuram.
          </QuickAnswer>
        </Reveal>
        <GuideByline checked={CHECKED} />
      </section>

      <section id="in-town" className="container-site section-pad flex flex-col gap-8 scroll-mt-24">
        <Reveal>
          <SectionHeading eyebrow="In town" title="The great temple and the shrines around it." tamil="நகரில் உள்ள கோயில்கள்" />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {inTown.map((p, i) => (
            <RevealItem key={p.name} className="h-full">
              <PlaceCard p={p} i={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="girivalam" className="bg-white border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-12">
          <Reveal className="flex-[1_1_340px] min-w-0 flex flex-col gap-4 md:sticky md:top-28 self-start">
            <Eyebrow>On the 14 km Girivalam path</Eyebrow>
            <h2 className="h2">Every shrine, in walking order.</h2>
            <p className="text-ink-2">
              Walk clockwise with the hill on your right. The eight lingams mark the eight directions; the planets
              beside them are the traditional associations pilgrims follow, not temple rules.
            </p>
            <div className="rounded-2xl border border-saffron/60 bg-amber-bg/50 p-4 flex gap-3 text-[15px]">
              <CircleAlert size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
              <p className="text-ink-2">
                <strong className="text-ink">Idukku Pillaiyar safety:</strong> after a devotee died in the narrow
                passage in July 2026, entry is limited by a fixed-width gate. Overweight, elderly and unwell devotees are
                not allowed in.
              </p>
            </div>
            <AshramStopCard context="Beside Adi Annamalaiyar Temple" />
          </Reveal>
          <Reveal delay={0.1} className="flex-[2_1_480px] min-w-0">
            <ol className="relative grid gap-3 border-l-2 border-gold/40 pl-6 ml-3">
              {pathStops.map((s, i) => (
                <li
                  key={s.n}
                  className={cn(
                    "relative rounded-xl px-4 py-3",
                    s.ours
                      ? "bg-night text-on-night border border-gold/50"
                      : s.feature
                        ? "bg-amber-bg/60 border border-saffron/50"
                        : "card-ivory",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-[42px] top-3 w-7 h-7 rounded-full inline-flex items-center justify-center text-[13px] font-bold ring-4 ring-white",
                      s.ours ? "bg-gold text-ink" : "bg-saffron text-ink",
                    )}
                  >
                    {i + 1}
                  </span>
                  <p className={cn("font-semibold", s.ours && "text-on-night-head")}>
                    {s.n}
                    {s.ours ? <span className="ml-2 text-[12px] uppercase tracking-wide text-gold-light">our ashram</span> : null}
                  </p>
                  <p className={cn("text-[13px]", s.ours ? "text-gold-light" : "text-saffron-text")}>
                    <span lang="ta" className="ta">{s.ta}</span>
                    {s.dir ? ` · ${s.dir}` : ""}
                    {s.planet ? ` · ${s.planet}` : ""}
                  </p>
                  <p className={cn("text-[14px] mt-1", s.ours ? "text-on-night-body" : "text-ink-2")}>{s.note}</p>
                  {s.ours ? (
                    <Link href="/mounasamy/darshan" className="link-arrow-gold mt-1.5 text-sm">
                      Darshan details
                    </Link>
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section id="beyond" className="container-site section-pad flex flex-col gap-8 scroll-mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Temples near Tiruvannamalai"
            title="Goddess temples within an hour or two."
            tamil="அருகிலுள்ள கோயில்கள்"
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {beyond.map((p, i) => (
            <RevealItem key={p.name} className="h-full">
              <PlaceCard p={p} i={inTown.length + i} />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal>
          <p className="text-[14px] text-ink-2">
            Timings for smaller shrines are not officially published and change with festivals — ask locally, or
            message our office before you travel.{" "}
            <Link href="/places-to-visit-tiruvannamalai" className="link-arrow">More places to visit</Link>
          </p>
        </Reveal>
      </section>

      <AbroadVisitors />

      <section id="faq" className="bg-white border-b border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-10">
          <Reveal className="flex-[1_1_300px] min-w-0">
            <Eyebrow>Questions people ask</Eyebrow>
            <h2 className="h2 mt-3">Temples in Tiruvannamalai.</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0 flex flex-col gap-5">
            <FAQ items={faqs} />
            <Sources
              items={[
                { label: "Arunachaleswarar temple (HR&CE)", href: "https://annamalaiyar.hrce.tn.gov.in/" },
                { label: "Tiruvannamalai district: places of interest", href: "https://tiruvannamalai.nic.in/places-of-interest/" },
                { label: "Wikipedia: Adi Annamalaiyar Temple", href: "https://en.wikipedia.org/wiki/Adi_Annamalaiyar_Temple,_Adi_Annamalai" },
                { label: "Wikipedia: Girivalam", href: "https://en.wikipedia.org/wiki/Girivalam" },
                { label: "Deccan Chronicle (Idukku Pillaiyar)", href: "https://www.deccanchronicle.com/southern-states/tamil-nadu/andhra-pradesh-devotees-death-prompts-safety-curbs-at-tiruvannamalai-moksha-margam-1974552" },
                { label: "Dinamalar (Padavedu)", href: "https://temple.dinamalar.com/en/new_en.php?id=594" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <VisitAshramBand heading="Halfway round the hill, beside Adi Annamalai temple — rest and eat with us." />
    </>
  );
}
