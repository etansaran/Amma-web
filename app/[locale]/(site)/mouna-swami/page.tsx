import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, MapPin, Phone, Signpost } from "lucide-react";
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
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { JumpLinks, QuickAnswer, Sources, VisitAshramBand } from "@/components/guide/GuideBits";

type Props = { params: Promise<{ locale: Locale }> };

const PATH = "/mouna-swami";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: PATH,
    title: "Mouna Swami Tiruvannamalai — Sri Mouna Swami Peetam has moved",
    description:
      "Mouna Swami of Tiruvannamalai (Mouna Siddhar) moved from Sri Mouna Swami Peetam to Thiyaneswar Amma Ashram, Adi Annamalai. Address, contact number, darshan.",
    image: images.mounasamyFlame,
  });
}

const others: { name: string; place: string; text: string }[] = [
  {
    name: "Sri Velpur Mouna Swamiji",
    place: "Velpur, near Tanuku, West Godavari, Andhra Pradesh",
    text: "A devotee of Ramana Maharshi, silent since 1985, at Ramana Nilaya Ashram in Velpur. Not the Mouna Swami of Tiruvannamalai.",
  },
  {
    name: "Mouna Swami of Kutralam (Courtallam)",
    place: "Sri Siddheswari Peetham, Courtallam, Tamil Nadu",
    text: "Sivachidananda Saraswathi (1868–1943), who founded the Kurtalam Peetham in 1916; the Peetham continues today.",
  },
  {
    name: "Mounasamy Mutt, Kumbakonam",
    place: "Kumbakonam–Thanjavur road, near Adi Kumbeswarar temple",
    text: "The samadhi of a Mouna Swami who attained samadhi in 1899; a lingam is installed over it.",
  },
  {
    name: "Other silent swamis near Tiruvannamalai",
    place: "Girivalam road and Villupuram district",
    text: "Several sadhus have been called 'Mouna Swamigal' over the years — including Seshadri Swamigal during a period of silence, and Sri Siva Jothi Mona Siddhar, whose ashram is off Vettavalam Road in Villupuram district.",
  },
];

const faqs = [
  {
    question: "Where is Mouna Swami in Tiruvannamalai now?",
    answer: `The Mouna Swami of Tiruvannamalai — Mounasamy Siddhar, also called Mouna Siddhar or Vibhuti Siddhar — now lives at ${site.name}, ${site.address.street}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}, on the Girivalam path. He earlier sat at Sri Mouna Swami Peetam on Girivalam Road.`,
  },
  {
    question: "Is Mouna Swami still at Sri Mouna Swami Peetam?",
    answer:
      "No. For some years he sat at Sri Mouna Swami Peetam on the Girivalam road, after the Niruthi Lingam. He has since moved to Siva Sri Thiyaneswar Amma Ashram at Vediyappanur, Adi Annamalai, where he lives in the care of his guru, Maataji. Older maps, reviews and videos still point to the Peetam.",
  },
  {
    question: "What is the Mouna Siddhar Tiruvannamalai contact number?",
    answer: `Mounasamy does not speak or use a phone. The ashram office answers for him: phone ${site.phone}, WhatsApp ${site.whatsapp}, email ${site.email}.`,
  },
  {
    question: "What are Mouna Swami's darshan timings?",
    answer: `Darshan is every day and free. He sits in silence through the day and stands to give darshan every evening, ${site.mounasamyStanding}.`,
  },
  {
    question: "Is the Velpur Mouna Swami the same as the Tiruvannamalai Mouna Swami?",
    answer:
      "No. Sri Velpur Mouna Swamiji lives at Ramana Nilaya Ashram in Velpur, near Tanuku in West Godavari district, Andhra Pradesh. The Mouna Swami of Tiruvannamalai is Mounasamy Siddhar at Adi Annamalai.",
  },
  {
    question: "Is the Mouna Swami of Kutralam the same?",
    answer:
      "No. The Mouna Swami of Kutralam (Courtallam) was Sivachidananda Saraswathi (1868–1943), founder of Sri Siddheswari Peetham in Courtallam. He is not connected to Mounasamy Siddhar of Tiruvannamalai.",
  },
  {
    question: "Where can I see photos of Mouna Swami of Tiruvannamalai?",
    answer:
      "The ashram publishes real photographs of Mounasamy Siddhar on its Mounasamy pages and gallery. Please ask a volunteer before taking photos at the ashram, and never use flash.",
  },
];

export default async function MounaSwamiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: `/${locale}` },
          { name: "Mounasamy", path: `/${locale}/mounasamy` },
          { name: "Mouna Swami", path: `/${locale}${PATH}` },
        ])}
      />
      <PageHero
        variant="night"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Mounasamy", href: "/mounasamy" },
          { label: "Mouna Swami" },
        ]}
        eyebrow="Mouna Swami · Mouna Siddhar · Sri Mouna Swami Peetam"
        title="Mouna Swami of Tiruvannamalai: Sri Mouna Swami Peetam has moved"
        tamil="திருவண்ணாமலை மௌன சுவாமி · மௌன சித்தர்"
        lede="Looking for the Mouna Swami of Tiruvannamalai, his ashram or his contact number? He no longer sits at Sri Mouna Swami Peetam on the Girivalam road. He lives at our ashram at Adi Annamalai, where anyone may come for his darshan."
        extra={
          <JumpLinks
            onNight
            items={[
              { href: "#moved", label: "Where he is now" },
              { href: "#contact", label: "Contact number" },
              { href: "#others", label: "Other Mouna Swamis" },
              { href: "#faq", label: "FAQ" },
            ]}
          />
        }
      />

      <section className="container-site pt-10 md:pt-14">
        <Reveal>
          <QuickAnswer question="Where is Mouna Swami now?">
            Mounasamy Siddhar, the Mouna Swami of Tiruvannamalai, has moved from Sri Mouna Swami Peetam
            (Girivalam Road) to <strong>{site.name}</strong>, {site.address.street}, Adi Annamalai,
            Tiruvannamalai {site.address.postalCode}. Darshan is free every day; he stands for darshan{" "}
            {site.mounasamyStanding}. Office: {site.phone}.
          </QuickAnswer>
        </Reveal>
      </section>

      <section id="moved" className="container-site section-pad flex flex-wrap items-center gap-8 md:gap-12 scroll-mt-24">
        <Reveal className="flex-[1_1_480px] flex flex-col gap-4 min-w-0">
          <SectionHeading eyebrow="From the Peetam to Adi Annamalai" title="The same Mouna Swami — at a new place." />
          <p className="text-ink-2">
            For several years pilgrims found Mouna Swami at Sri Mouna Swami Peetam on the Girivalam road,
            after the Niruthi Lingam. He has since moved to {site.name} at Vediyappanur, Adi Annamalai, on the
            same Girivalam path, where Maataji — his guru — and the ashram family look after him. Many maps,
            reviews and videos online still show the Peetam; please come to the ashram instead.
          </p>
          <ol className="grid gap-3">
            <li className="card rounded-xl p-4 flex gap-3">
              <Signpost size={20} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
              <span><strong>Before:</strong> Sri Mouna Swami Peetam, Girivalam Road (after the Niruthi Lingam)</span>
            </li>
            <li className="rounded-xl p-4 flex gap-3 bg-night text-on-night">
              <MapPin size={20} className="text-gold-light shrink-0 mt-0.5" aria-hidden />
              <span>
                <strong className="text-on-night-head">Now:</strong> {site.name}, {site.address.street},{" "}
                {site.address.locality}, {site.address.city} {site.address.postalCode}
              </span>
            </li>
          </ol>
          <div className="flex flex-wrap gap-3">
            <Button href={site.mapsHref}>
              <MapPin size={18} aria-hidden /> Open in Google Maps
            </Button>
            <Button href="/mounasamy/darshan" variant="outline-saffron">
              Darshan details <ArrowRight size={16} aria-hidden />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[0_1_340px] w-full max-w-[340px] mx-auto md:mx-0">
          <PhotoFigure
            image={images.mounasamyFlame}
            ratio="3/4"
            position="50% 20%"
            frame="gold"
            caption="Mounasamy Siddhar, the Mouna Swami of Tiruvannamalai, at the ashram."
            sizes="(max-width: 768px) 100vw, 340px"
          />
        </Reveal>
      </section>

      <section id="contact" className="bg-sand border-y border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap items-center justify-between gap-6">
          <Reveal className="flex flex-col gap-2 max-w-[620px]">
            <Eyebrow>Mouna Siddhar Tiruvannamalai contact number</Eyebrow>
            <h2 className="h2">He keeps silence — the ashram office answers for him.</h2>
            <p className="text-ink-2">
              Call {site.phone} or WhatsApp {site.whatsapp}. Tamil and English; Telugu and Hindi on request.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <Button href={site.phoneHref} variant="night">
              <Phone size={18} aria-hidden /> Call the ashram
            </Button>
            <Button href={site.whatsappHref} variant="outline-saffron">
              <WhatsappIcon size={18} /> WhatsApp
            </Button>
          </Reveal>
        </div>
      </section>

      <section id="others" className="container-site section-pad flex flex-col gap-8 scroll-mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Not the same Mouna Swami"
            title="Other Mouna Swamis people search for."
            lede="'Mouna Swami' simply means 'the silent swami', and several saints have been known by the name. These are not connected to Mounasamy Siddhar of Tiruvannamalai."
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {others.map((o) => (
            <RevealItem key={o.name} as="article" className="card card-hover rounded-2xl p-5 md:p-6 flex flex-col gap-2">
              <h3 className="text-[20px]">{o.name}</h3>
              <p className="text-[13px] font-semibold text-gold-text">{o.place}</p>
              <p className="text-[15px] text-ink-2">{o.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="faq" className="bg-white border-t border-line scroll-mt-24">
        <div className="container-site section-pad flex flex-wrap gap-8 md:gap-10">
          <Reveal className="flex-[1_1_300px] min-w-0">
            <Eyebrow>Questions people ask</Eyebrow>
            <h2 className="h2 mt-3">Mouna Swami of Tiruvannamalai.</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex-[2_1_560px] min-w-0 flex flex-col gap-5">
            <FAQ items={faqs} />
            <Sources
              items={[
                { label: "jubinsblog (2022 update)", href: "https://jubinsblog.com/mouna-swami-tiruvannamalai-arunachala/" },
                { label: "Velpur Mouna Swamiji", href: "https://awakeningtimes.com/at-the-abode-of-silence-in-the-holy-presence-of-sri-velpur-mouna-swamiji/" },
                { label: "Wikipedia: Mounasamy Mutt", href: "https://en.wikipedia.org/wiki/Mounasamy_Mutt,_Kumbakonam" },
                { label: "Wikipedia: Seshadri Swamigal", href: "https://en.wikipedia.org/wiki/Seshadri_Swamigal" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <VisitAshramBand heading="Come for Mouna Swami's darshan at Adi Annamalai." />
    </>
  );
}
