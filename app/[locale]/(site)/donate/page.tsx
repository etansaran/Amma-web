import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Flame, HandHeart, Landmark, Utensils } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCircle } from "@/components/ui/IconCircle";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { DonationForm } from "@/components/donate/DonationForm";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/donate",
    title: "Donate — Support Annadhanam, Poojas and the Ashram",
    description:
      "Donate to Siva Sri Thiyaneswar Amma Ashram, Tiruvannamalai: sponsor annadhanam for sadhus, poojas, sadhu welfare and the Girivalam village. Receipt in your inbox within a minute.",
    image: images.maatajiSeva,
  });
}

const whereItGoes = [
  {
    icon: Utensils,
    title: "Annadhanam",
    text: "Rice, dal, vegetables, oil, gas, cooks — 365 days, plus Pournami and Deepam nights.",
  },
  {
    icon: HandHeart,
    title: "Sadhu welfare",
    text: "Vastram, Maheswara Poojai, medical help and ambulance support for sadhus on the Girivalam road.",
  },
  {
    icon: Flame,
    title: "Poojas & the ashram",
    text: "Daily Siva pooja, festival poojas, upkeep of the hall, kitchen and dining space.",
  },
  {
    icon: Landmark,
    title: "Village & path",
    text: "Girivalam path cleaning, pond desilting, Kailaya Vathiyam and education for village children, skills for women.",
  },
];

export default async function DonatePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-night text-on-night overflow-hidden border-b border-night-line">
        <Image
          src={images.maatajiSeva.src}
          alt=""
          aria-hidden
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[50%_30%] opacity-50 lg:left-auto! lg:w-1/2!"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,60,.7),rgba(14,26,60,.95))] lg:bg-[linear-gradient(90deg,#0E1A3C_45%,rgba(14,26,60,.55)_100%)]"
        />
        <div className="container-site relative py-14 md:py-20">
          <Reveal immediate className="flex flex-col gap-3.5 max-w-[720px]">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Donate" }]} onNight />
            <Eyebrow tone="gold">Donate</Eyebrow>
            <h1 className="h1-page text-on-night-head">Keep the fire lit on the Girivalam road.</h1>
            <p className="lede text-on-night-body max-w-[620px]">
              Every rupee goes to the trust's charter work — feeding sadhus, poojas, the ashram's
              upkeep and the village around it. Secure payment through Razorpay, receipt in your
              inbox within a minute.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-night-2 mt-2">
              <li>Charitable trust · Reg {site.trust.registration}</li>
              <li aria-hidden className="hidden sm:block">
                ·
              </li>
              <li>Razorpay secured · UPI, cards, net banking</li>
              <li aria-hidden className="hidden sm:block">
                ·
              </li>
              <li>
                80G tax exemption · <Placeholder label="80G number — to follow" />
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Donation form + summary */}
      <section className="container-site section-pad">
        <Reveal immediate>
          <DonationForm />
        </Reveal>
      </section>

      {/* Where it goes */}
      <section className="bg-white border-y border-line">
        <div className="container-site section-pad-lg flex flex-col gap-7">
          <Reveal>
            <SectionHeading
              eyebrow="Where your gift goes"
              title="The trust's charter work, nothing else."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whereItGoes.map((w) => (
              <RevealItem key={w.title} className="card-ivory rounded-2xl p-[22px] flex flex-col gap-3">
                <IconCircle icon={w.icon} tone="sand" />
                <p className="font-display text-[20px]">{w.title}</p>
                <p className="text-sm text-ink-2">{w.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <p className="text-sm text-ink-2">
              Annual accounts are published here each year.{" "}
              <Placeholder label="Link to the latest audited statement" /> Refunds: a duplicate or
              mistaken payment is refunded in full within 7 working days — write to{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-saffron-text">
                {site.email}
              </a>{" "}
              with the receipt number.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
