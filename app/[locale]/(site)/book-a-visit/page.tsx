import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Info, Phone } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { Placeholder } from "@/components/ui/Placeholder";
import { StatusChip, type Status } from "@/components/ui/StatusChip";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { VisitRequestForm } from "@/components/book-visit/VisitRequestForm";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/book-a-visit",
    title: "Book a Visit to the Ashram, Tiruvannamalai",
    description:
      "Request a visit date at Siva Sri Thiyaneswar Amma Ashram, Adi Annamalai. The office reviews every request and confirms within two days by WhatsApp and email.",
    image: images.girivalamWalk,
  });
}

const SAMPLE_REFERENCE = "SSTA-V-2026-00001";

const statusExamples: {
  status: Status;
  message: ReactNode;
  footnote: string;
}[] = [
  {
    status: "awaiting_approval",
    message: (
      <>
        Vanakkam <Placeholder label="Name" />. We have received your visit request for 12 Dec 2026
        (ref {SAMPLE_REFERENCE}). The office will confirm within 2 days. 🙏
      </>
    ),
    footnote: "Sent instantly · WhatsApp + email · in your chosen language",
  },
  {
    status: "confirmed",
    message: (
      <>
        Your visit on 12 Dec 2026 is confirmed. Satsang and annadhanam are at{" "}
        {site.daily.programme}. Directions: <Placeholder label="map link" />.
        Maataji's darshan depends on her schedule on the day. 🙏
      </>
    ),
    footnote: "Sent by the office · reminder the day before",
  },
  {
    status: "not_available",
    message: (
      <>
        We are sorry — 12 Dec 2026 is full for groups. 13 or 14 Dec are open; reply 1 or 2 to
        choose, or 3 to pick another date. 🙏
      </>
    ),
    footnote: "One tap to rebook · nothing is lost",
  },
];

export default async function BookVisitPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book a visit" }]}
        eyebrow="Book a visit"
        title="Tell us when you are coming."
        lede="A visit request lets the ashram expect you, keep a place at satsang and a plate at annadhanam, and guide you on arrival. Requests are reviewed by the office and confirmed within two days."
        asideClassName="flex-[0_1_380px] items-stretch"
        aside={
          <div className="card p-5 md:px-[22px] flex gap-3.5 items-start">
            <Info size={24} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
            <p className="text-sm text-ink-2">
              <strong className="text-ink">Please note:</strong> a confirmed visit does not guarantee
              a personal meeting with Maataji. She meets devotees as her schedule and health allow.
              Satsang, pooja and annadhanam are open to all visitors.
            </p>
          </div>
        }
      />

      {/* Booking flow */}
      <section className="container-site section-pad flex flex-wrap items-start gap-8 md:gap-10">
        <Reveal immediate className="flex-[2_1_620px] min-w-0">
          <VisitRequestForm />
        </Reveal>
        <Reveal immediate delay={0.1} className="flex-[1_1_300px] min-w-0 flex flex-col gap-4">
          <div className="card-night rounded-[20px] p-6 flex flex-col gap-2.5">
            <p className="eyebrow-gold text-gold-light!">Before you book</p>
            <p className="text-[15px] text-on-night-2">
              Visits are free. Annadhanam is free. If you wish to give, you can do so on the day or
              on the donations page.
            </p>
            <p className="text-[15px] text-on-night-2">
              {site.accommodation} Mention it in the note on step 1 and the office will confirm a
              room with your visit. Maataji's darshan: {site.maatajiDarshan.daysInline},{" "}
              {site.maatajiDarshan.hoursShort}.
            </p>
          </div>
          <div className="card rounded-[20px] p-6 flex flex-col gap-2.5">
            <p className="eyebrow-gold">Prefer to call?</p>
            <p className="font-semibold text-[18px]">
              <a href={site.phoneHref} className="text-ink hover:text-saffron-text">
                {site.phone}
              </a>
            </p>
            <p className="text-sm text-ink-2">
              WhatsApp {site.whatsapp}. Satsang and annadhanam every day, {site.daily.programme}.
              Tamil and English; Telugu and Hindi on request.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-1">
              <a href={site.phoneHref} className="btn btn-outline-night btn-sm">
                <Phone size={16} aria-hidden /> Call
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-night btn-sm"
              >
                <WhatsappIcon size={16} /> WhatsApp
              </a>
            </div>
          </div>
          <PhotoFigure
            image={images.girivalamWalk}
            alt="Pilgrims on the Girivalam road at dusk"
            ratio="4/3"
            rounded="lg"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </Reveal>
      </section>

      {/* Status examples */}
      <section className="bg-white border-y border-line">
        <div className="container-site section-pad-lg flex flex-col gap-7">
          <Reveal>
            <SectionHeading
              eyebrow="How a request looks on your phone"
              title="Three clear states. No guessing."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {statusExamples.map((ex) => (
              <RevealItem
                key={ex.status}
                as="article"
                className="card-ivory rounded-[20px] p-6 flex flex-col gap-3"
              >
                <StatusChip status={ex.status} className="self-start" />
                <p className="text-[15px]">
                  <strong>{site.name}</strong>
                  <br />
                  {ex.message}
                </p>
                <p className="text-[13px] text-ink-2 mt-auto">{ex.footnote}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
