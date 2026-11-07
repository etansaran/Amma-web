import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BedDouble, HandCoins, Utensils } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
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
  GuideByline,
  JumpLinks,
  QuickAnswer,
  Sources,
  VisitAshramBand,
} from "@/components/guide/GuideBits";

type Props = { params: Promise<{ locale: Locale }> };

const PATH = "/ashrams-in-tiruvannamalai";
const CHECKED = "2026-11-07";
const TITLE = "Ashrams in Tiruvannamalai: a list with timings and stays";
const DESCRIPTION =
  "Ashrams in Tiruvannamalai — Ramanasramam, Seshadri Swamigal, Yogi Ramsuratkumar, Nannagaru, Athithi, Skandasramam and more: what each is, where, timings, and which offer rooms or meals.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: PATH, title: TITLE, description: DESCRIPTION, image: images.girivalamWalk });
}

const ramanaSide: Place[] = [
  {
    name: "Sri Ramanasramam (Ramana Ashram)",
    tamil: "ஸ்ரீ ரமணாஸ்ரமம்",
    text: "The ashram that grew around Ramana Maharshi and his samadhi, at the foot of the hill about 2 km from the main temple. Samadhi Hall, the Old Hall where he sat, and the Mother's shrine. Free rooms for devotees of Ramana, booked online only.",
    where: "Foot of Arunachala, back gate on the Girivalam path",
    visit: "5:30 AM – 8:30 PM · shrines closed 11 AM – 2 PM · gururamana.org",
    link: { href: "/ramana-ashram-tiruvannamalai", label: "Full Ramana Ashram guide" },
  },
  {
    name: "Siva Sri Thiyaneswar Amma Ashram — our ashram",
    tamil: "சிவ ஸ்ரீ தியானேஸ்வர் அம்மா ஆசிரமம்",
    text: "Maataji's ashram on the quiet side of the hill. Free annadhanam for every visitor and sadhu, Shiva pooja, Thiruvasagam and satsang — and the darshan of Mounasamy Siddhar, the silent sadhu of Tiruvannamalai. Rooms for devotees, booked in advance.",
    where: `${site.address.street}, Adi Annamalai — on the Girivalam path`,
    visit: `Open daily · annadhanam ${site.daily.programmeShort} · Mounasamy stands ${site.mounasamyStandingShort} · Maataji ${site.maatajiDarshan.daysShort}`,
    ours: true,
    link: { href: "/ashram", label: "About the ashram" },
  },
  {
    name: "Seshadri Swamigal Ashram",
    tamil: "சேஷாத்ரி சுவாமிகள் ஆசிரமம்",
    text: "The samadhi of Seshadri Swamigal (1870–1929), the saint who reached Arunachala before Ramana and looked after the young sage. A Shirdi Sai Baba image stands behind the samadhi.",
    where: "Beside Ramanasramam, Chengam Road",
    visit: "Listed as 6 AM – 12:30 PM and 3:30 – 8:30 PM · free entry · paid rooms",
  },
  {
    name: "Yogi Ramsuratkumar Ashram",
    tamil: "யோகி ராம்சுரத்குமார் ஆசிரமம்",
    text: "The ashram and samadhi of Yogi Ramsuratkumar (1918–2001), the 'Visiri Saamiyaar', who came to Tiruvannamalai in 1959 and lived as a beggar-saint. A large hall for nama japa and satsang.",
    where: "Agraharakollai, Chengam Road",
    visit: "Chanting daily 6 – 7 AM and 6:15 – 7:15 PM, then satsang · yogiramsuratkumarashram.org",
  },
  {
    name: "Virupaksha Cave and Skandasramam",
    tamil: "விருபாக்ஷ குகை · ஸ்கந்தாஸ்ரமம்",
    text: "Ramana's homes on the hill — the Om-shaped Virupaksha Cave (1899–1916) and the tree-shaded Skandasramam above it (1916–1922). Kept by Ramanasramam; a climb of about 1.5 km from its back gate.",
    where: "South-eastern slope of Arunachala",
    visit: "Listed by Ramanasramam as 8:30 AM – 4:30 PM · ask before climbing",
  },
  {
    name: "Sri Nannagaru Ashram",
    tamil: "ஸ்ரீ நன்னகாரு ஆசிரமம்",
    text: "The Tiruvannamalai ashram of Sri Nannagaru (1934–2017), a Telugu devotee of Ramana Maharshi. Retreats are booked in advance through the ashram.",
    where: "Rajiv Gandhi Nagar, off Chengam Road",
    visit: "srinannagaru.com",
  },
  {
    name: "Andhra Ashram",
    tamil: "ஆந்திரா ஆசிரமம்",
    text: "A small ashram linked to Sri Nannagaru, with rooms and a large meditation room — popular with Telugu-speaking pilgrims. Book ahead.",
    where: "Ramana Nagar, opposite Sri Ramanasramam",
  },
  {
    name: "Athithi Ashram",
    tamil: "அதிதி ஆசிரமம்",
    text: "Known for feeding sadhus in the evening and for its monthly Maheshwara Pooja; also runs a Veda school and a goshala. Rooms and simple meals for pilgrims, against a donation.",
    where: "Mannakula Vinayagar Street, near Ramanasramam",
  },
  {
    name: "Siva Sannidhi",
    tamil: "சிவ சந்நிதி",
    text: "A guest house started by Arunachala devotees from Andhra Pradesh, with simple rooms and a dining hall. Not free — a donation is requested.",
    where: "Ramana Nagar, two minutes from Ramanasramam",
  },
];

const roundTheHill: Place[] = [
  {
    name: "Suddhananda Ashram",
    tamil: "சுத்தானந்தா ஆசிரமம்",
    text: "The ashram of Swami Suddhananda's Samvit Sagar Trust, used for Vedanta camps; pilgrims may stay when no camp is running, by arrangement.",
    where: "Girivalam path, near Adi Annamalai",
  },
  {
    name: "Isanya Mutt",
    tamil: "ஈசான்ய மடம்",
    text: "The mutt and samadhi of Isanya Jnana Desikar (1750–1829), author of Svanubhava Stotra Pamalai.",
    where: "Opposite the Isanya Lingam, at the end of the Girivalam path",
  },
  {
    name: "Guhai Namasivayar cave",
    tamil: "குகை நமசிவாயர்",
    text: "The cave on Arunachala where the 16th-century Virasaiva saint Guhai Namasivayar spent his later life; a small temple marks it.",
    where: "On the lower slope of the hill",
  },
  {
    name: "Ganga Maa satsang (Hridaya Kshetram)",
    tamil: "கங்கா மா சத்சங்கம்",
    text: "Not an ashram, but often searched as one: Ganga Maa, who does not call herself a guru, holds satsang at Sri Jnana Ganga Mandiram.",
    where: "R.S. Nagar, Tiruvannamalai",
    visit: "Mon – Sat 9:30 – 10:30 AM · Tue & Fri 5:30 – 6:30 PM · hridayakshetram.org",
  },
];

const faqs = [
  {
    question: "Which are the main ashrams in Tiruvannamalai?",
    answer:
      "Sri Ramanasramam, Seshadri Swamigal Ashram, Yogi Ramsuratkumar Ashram, Virupaksha Cave and Skandasramam, Sri Nannagaru Ashram, Andhra Ashram, Athithi Ashram and Siva Sannidhi are near Ramanasramam on the town side of the hill. Further round the Girivalam path are Suddhananda Ashram, Isanya Mutt and our ashram, Siva Sri Thiyaneswar Amma Ashram at Adi Annamalai.",
  },
  {
    question: "Is there a free ashram stay in Tiruvannamalai?",
    answer:
      "Only Sri Ramanasramam states that its rooms are free of charge, and they are reserved for devotees of Ramana Maharshi, booked online, with about one request in four accepted. Most other ashrams and guest houses ask a donation or charge for rooms. Free meals are easier to find: our ashram serves free annadhanam every day.",
  },
  {
    question: "Which ashram in Tiruvannamalai gives free food?",
    answer: `Our ashram at Adi Annamalai serves free annadhanam to every visitor and sadhu, every day, ${site.daily.programme}. Ramanasramam feeds sadhus (Narayana Seva) at 9:45 AM, but its meals are otherwise for registered guests only.`,
  },
  {
    question: "Is there a Sivananda ashram in Tiruvannamalai?",
    answer:
      "We could not find one. The Divine Life Society of Swami Sivananda has its headquarters near Rishikesh; we know of no Sivananda ashram or centre in Tiruvannamalai.",
  },
  {
    question: "What is the Andhra Ashram in Tiruvannamalai?",
    answer:
      "A small ashram in Ramana Nagar, opposite Sri Ramanasramam, linked to the teacher Sri Nannagaru. It has rooms and a meditation room and is popular with Telugu-speaking pilgrims.",
  },
  {
    question: "Which ashram is best for foreigners in Tiruvannamalai?",
    answer:
      "Sri Ramanasramam accepts foreign devotees for up to 14 days (passport and visa required; OCI holders register as foreigners). Many overseas visitors also stay in guest houses in Ramana Nagar and visit several ashrams in a day. Our office answers WhatsApp messages from abroad in English.",
  },
  {
    question: "Who is Ganga Maa of Tiruvannamalai?",
    answer:
      "Ganga Maa holds satsang at Hridaya Kshetram's Sri Jnana Ganga Mandiram in R.S. Nagar, Monday to Saturday mornings and Tuesday and Friday evenings. She does not describe herself as a guru, and the satsang is not a residential ashram.",
  },
];

export default async function AshramsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const all = [...ramanaSide, ...roundTheHill];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ashrams in Tiruvannamalai",
    numberOfItems: all.length,
    itemListElement: all.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Place",
        name: p.name.replace(" — our ashram", ""),
        alternateName: p.tamil,
        description: p.text,
        address: { "@type": "PostalAddress", addressLocality: "Tiruvannamalai", addressRegion: "Tamil Nadu", addressCountry: "IN" },
        ...(p.ours ? { url: absoluteUrl(`/${locale}/ashram`) } : {}),
      },
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
            { name: "Ashrams in Tiruvannamalai", path: `/${locale}${PATH}` },
          ]),
        ]}
      />
      <PageHero
        variant="night"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tiruvannamalai guide", href: "/tiruvannamalai-guide" },
          { label: "Ashrams" },
        ]}
        eyebrow="Tiruvannamalai ashram list · checked November 2026"
        title="Ashrams in Tiruvannamalai"
        tamil="திருவண்ணாமலை ஆசிரமங்கள்"
        lede="Thirteen places seekers come for — what each one is, where it stands on the Girivalam path, when it is open, and whether it offers rooms or meals. Written by one of them: our ashram at Adi Annamalai."
        extra={
          <JumpLinks
            onNight
            items={[
              { href: "#near-ramana", label: "Near Ramanasramam" },
              { href: "#round-the-hill", label: "Round the hill" },
              { href: "#stay", label: "Rooms & free food" },
              { href: "#from-abroad", label: "From abroad" },
              { href: "#faq", label: "FAQ" },
            ]}
          />
        }
      />

      <section className="container-site pt-10 md:pt-14 flex flex-col gap-4">
        <Reveal>
          <QuickAnswer question="Ashrams in Tiruvannamalai">
            Most ashrams cluster near <strong>Sri Ramanasramam</strong>, at the foot of the hill about 2 km from the
            temple: Seshadri Swamigal, Yogi Ramsuratkumar, Nannagaru, Andhra and Athithi ashrams, and Siva Sannidhi.
            Virupaksha Cave and Skandasramam are on the hill above. On the far side of the Girivalam path, at Adi
            Annamalai, is <strong>{site.name}</strong> — free annadhanam daily and the darshan of Mounasamy Siddhar.
          </QuickAnswer>
        </Reveal>
        <GuideByline checked={CHECKED} />
      </section>

      <section id="near-ramana" className="container-site section-pad flex flex-col gap-8 scroll-mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Near Ramanasramam and on the hill"
            title="The ashrams of Ramana Nagar and Chengam Road."
            tamil="ரமண நகர் · செங்கம் சாலை"
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {ramanaSide.map((p, i) => (
            <RevealItem key={p.name} className="h-full">
              <PlaceCard p={p} i={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="round-the-hill" className="bg-white border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Round the hill and in town"
              title="Further along the Girivalam path."
              tamil="கிரிவலப் பாதையில்"
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {roundTheHill.map((p, i) => (
              <RevealItem key={p.name} className="h-full">
                <PlaceCard p={p} i={ramanaSide.length + i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="stay" className="container-site section-pad flex flex-col gap-8 scroll-mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Rooms and free food"
            title="What 'free ashram stay' really means in Tiruvannamalai."
            lede="Many websites promise free ashram rooms. Here is what the ashrams themselves say."
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RevealItem as="article" className="card rounded-2xl p-5 flex flex-col gap-2.5">
            <span className="icon-circle" aria-hidden><BedDouble size={20} /></span>
            <h3 className="text-[18px]">Free rooms: Ramanasramam only</h3>
            <p className="text-[15px] text-ink-2">
              Free, but only for devotees of Ramana Maharshi, booked online, 3–5 days for Indians and up to 14 for
              foreigners. About one request in four is accepted.
            </p>
            <Link href="/ramana-ashram-tiruvannamalai#stay" className="link-arrow mt-auto">How to apply</Link>
          </RevealItem>
          <RevealItem as="article" className="card rounded-2xl p-5 flex flex-col gap-2.5">
            <span className="icon-circle" aria-hidden><HandCoins size={20} /></span>
            <h3 className="text-[18px]">Donation or paid: most others</h3>
            <p className="text-[15px] text-ink-2">
              Athithi Ashram and Siva Sannidhi ask a donation; Seshadri Ashram&apos;s rooms are paid; Andhra and
              Nannagaru ashrams need booking ahead. Ask each one directly before you travel.
            </p>
          </RevealItem>
          <RevealItem as="article" className="rounded-2xl p-5 flex flex-col gap-2.5 bg-night text-on-night border border-gold/50">
            <span className="icon-circle bg-gold! text-ink!" aria-hidden><Utensils size={20} /></span>
            <h3 className="text-[18px] text-on-night-head">Free food: every day at Adi Annamalai</h3>
            <p className="text-[15px] text-on-night-body">
              Our ashram serves free annadhanam to every visitor and sadhu, {site.daily.programme}. Rooms for
              devotees are booked in advance.
            </p>
            <Link href="/book-a-visit" className="link-arrow-gold mt-auto">Plan a visit</Link>
          </RevealItem>
        </RevealGroup>
      </section>

      <AbroadVisitors />

      <section id="faq" className="bg-white border-b border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-10">
          <Reveal className="flex-[1_1_300px] min-w-0">
            <Eyebrow>Questions people ask</Eyebrow>
            <h2 className="h2 mt-3">Ashrams in Tiruvannamalai.</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0 flex flex-col gap-5">
            <FAQ items={faqs} />
            <Sources
              items={[
                { label: "gururamana.org", href: "https://www.gururamana.org/Ashram/accommodation" },
                { label: "Yogi Ramsuratkumar Ashram", href: "https://yogiramsuratkumarashram.org" },
                { label: "Sri Nannagaru ashrams", href: "https://www.srinannagaru.com/sn/ashrams.php" },
                { label: "Hridaya Kshetram", href: "https://hridayakshetram.org" },
                { label: "Wikipedia: Seshadri Swamigal", href: "https://en.wikipedia.org/wiki/Seshadri_Swamigal" },
                { label: "Arunachala Grace (local blog)", href: "https://arunachalagrace.blogspot.com/2006/12/arunachala-ashrams.html" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <VisitAshramBand heading="Visiting the ashrams of Arunachala? Rest and eat with us at Adi Annamalai." />
    </>
  );
}
