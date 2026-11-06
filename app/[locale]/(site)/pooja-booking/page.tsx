import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { StatusChip } from "@/components/ui/StatusChip";
import { Reveal } from "@/components/motion/Reveal";
import { PoojaBookingForm } from "@/components/pooja-booking/PoojaBookingForm";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/pooja-booking",
    title: "Special Pooja Booking — Sankalpa, Dakshina, Confirmation",
    description:
      "Book a special pooja in your name at Siva Sri Thiyaneswar Amma Ashram, Tiruvannamalai: Pournami, Pradosham, Rudrabhishekam, Deepam, Shivaratri and more. Prasadam by post.",
    image: images.maatajiFlowers,
  });
}

export default async function PoojaBookingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Special pooja booking" }]}
        eyebrow="Special pooja booking"
        title="A pooja in your name, at the foot of Arunachala."
        lede="Choose a pooja, give the sankalpa details, offer dakshina securely, and receive a clear confirmation. Prasadam can be posted to you anywhere in India."
      />

      {/* Flow */}
      <section className="container-site section-pad flex flex-wrap items-start gap-8 md:gap-10">
        <Reveal immediate className="flex-[2_1_640px] min-w-0">
          <PoojaBookingForm />
        </Reveal>
        <Reveal immediate delay={0.1} className="flex-[1_1_300px] min-w-0 flex flex-col gap-4">
          <div className="card-night rounded-[20px] p-6 flex flex-col gap-2.5">
            <p className="eyebrow-gold text-gold-light!">How the sankalpa is done</p>
            <p className="text-[15px] text-on-night-2">
              Your name, nakshatra and gothram are read before the pooja by the ashram's pujari. If
              you are present you may sit in the hall; if not, a photo and, if chosen, prasadam are
              sent to you.
            </p>
          </div>
          <div className="card rounded-[20px] p-6 flex flex-col gap-2">
            <p className="eyebrow-gold">Two clear states</p>
            <StatusChip status="awaiting_confirmation" className="self-start" />
            <p className="text-sm text-ink-2">
              Paid; the office is checking the date and pujari availability.
            </p>
            <StatusChip status="confirmed" className="self-start mt-1.5" />
            <p className="text-sm text-ink-2">
              Date and time fixed; reminder the day before. If a date cannot be kept, the office
              offers another or a full refund.
            </p>
          </div>
          <PhotoFigure
            image={images.maatajiFlowers}
            alt="Maataji during a pooja, covered in flower petals"
            ratio="3/4"
            position="50% 20%"
            rounded="lg"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </Reveal>
      </section>
    </>
  );
}
