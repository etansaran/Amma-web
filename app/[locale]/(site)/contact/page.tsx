import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import {
  BedDouble,
  Building,
  Bus,
  Footprints,
  Globe,
  Languages,
  Mail,
  MapPin,
  Phone,
  Plane,
  Shirt,
  Sun,
  TrainFront,
  Wallet,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Placeholder } from "@/components/ui/Placeholder";
import { FacebookIcon, InstagramIcon, WhatsappIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/contact",
    title: "Contact & Directions — Ashram at Adi Annamalai",
    description:
      "Phone, WhatsApp, email and directions to Siva Sri Thiyaneswar Amma Ashram on the Girivalam path at Adi Annamalai, Tiruvannamalai. By air, train, bus or on foot.",
    image: images.girivalamMap,
  });
}

const addressLine = `${site.address.street}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}`;
const shareOnWhatsappHref = `https://wa.me/?text=${encodeURIComponent(
  `${site.name} — ${addressLine}, ${site.address.region}. ${site.mapsHref}`,
)}`;

const gettingHere: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  text: ReactNode;
  night?: boolean;
}[] = [
  {
    icon: Plane,
    eyebrow: "By air",
    title: "Chennai (MAA) · about 175 km",
    text: (
      <>
        Pre-paid taxi 4–5 hours via Tindivanam or Vellore. Bengaluru (BLR) is the other option,{" "}
        <Placeholder label="~ km" />, about 5 hours.
      </>
    ),
  },
  {
    icon: TrainFront,
    eyebrow: "By train",
    title: "Tiruvannamalai station (TNM)",
    text: (
      <>
        Trains from Chennai, Tirupati, Vellore, Puducherry and Madurai. The ashram is about{" "}
        <Placeholder label="X km" /> from the station by auto.
      </>
    ),
  },
  {
    icon: Bus,
    eyebrow: "By bus",
    title: "Frequent buses from Chennai, Bengaluru, Puducherry, Vellore",
    text: "Tiruvannamalai bus stand is about 2 km from the temple; take an auto and ask for “Adi Annamalai”.",
  },
  {
    icon: Footprints,
    eyebrow: "On Girivalam",
    title: "Walking the 14 km path clockwise",
    text: "The ashram is on the Adi Annamalai stretch on the far side of the hill — a natural resting and annadhanam point before you complete the circle.",
    night: true,
  },
];

const abroad: { icon: LucideIcon; title: string; text: ReactNode }[] = [
  {
    icon: Globe,
    title: "Visa",
    text: "Most nationalities can use India's e-Visa (tourist). Apply only on the official government portal.",
  },
  {
    icon: Sun,
    title: "Best season",
    text: "November to February is cool; Karthigai Deepam (24 Nov 2026) is the peak. April to June is very hot — walk Girivalam at night.",
  },
  {
    icon: Wallet,
    title: "Money & phone",
    text: "ATMs in town; UPI works for almost everything if you have an Indian SIM. SIM cards need passport and visa at the shop.",
  },
  {
    icon: Shirt,
    title: "Dress & conduct",
    text: "Cover shoulders and knees; a dhoti or saree is welcome but not required. Shoes off indoors. Vegetarian only on the premises.",
  },
  {
    icon: Languages,
    title: "Language help",
    text: "Tamil is spoken at the ashram. English, Telugu and Hindi help is available at the office and on this site.",
  },
  {
    icon: BedDouble,
    title: "Where to stay",
    text: (
      <>
        {site.accommodation} Otherwise guesthouses near Ramana Nagar and the Girivalam road; book
        early for Pournami and Deepam.
      </>
    ),
  },
];

function ContactIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="icon-circle w-11! h-11!" aria-hidden>
      <Icon size={20} strokeWidth={2} />
    </span>
  );
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact & directions" }]}
        eyebrow="Contact & directions"
        title="On the Girivalam path at Adi Annamalai. Call, write, or just come."
      />

      {/* Contact cards + map */}
      <section className="container-site section-pad flex flex-wrap items-stretch gap-6">
        <Reveal immediate className="flex-[1_1_340px] min-w-0 flex flex-col gap-3.5">
          <div className="card p-5 md:p-[22px] flex gap-4 items-start">
            <ContactIcon icon={Phone} />
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="eyebrow-gold">Phone · WhatsApp</p>
              <a
                href={site.phoneHref}
                className="font-display text-[22px] md:text-[24px] text-ink hover:text-saffron-text break-words"
              >
                {site.phone}
              </a>
              <p className="text-sm text-ink-2">
                WhatsApp {site.whatsapp} · open daily, satsang & annadhanam {site.daily.programme} ·
                Tamil, English; Telugu and Hindi on request
              </p>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 min-h-11 text-[15px] font-semibold text-saffron-text hover:text-saffron-dark self-start"
              >
                <WhatsappIcon size={18} /> Message on WhatsApp
              </a>
            </div>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="card card-hover p-5 md:p-[22px] flex gap-4 items-start text-ink"
          >
            <ContactIcon icon={Mail} />
            <span className="flex flex-col gap-0.5 min-w-0">
              <span className="eyebrow-gold">Email</span>
              <span className="font-display text-[20px] md:text-[22px] break-all">{site.email}</span>
              <span className="text-sm text-ink-2">Replies within two working days</span>
            </span>
          </a>
          <div className="card p-5 md:p-[22px] flex gap-4 items-start">
            <ContactIcon icon={MapPin} />
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="eyebrow-gold">Ashram address</p>
              <p className="font-semibold">
                {site.name}
                <br />
                {site.address.street},
                <br />
                {site.address.locality}, {site.address.city} {site.address.postalCode},{" "}
                {site.address.region}
              </p>
              <p lang="ta" className="ta text-sm text-ink-2">
                ஆதி அண்ணாமலை, திருவண்ணாமலை – 606604
              </p>
            </div>
          </div>
          <div className="card p-5 md:p-[22px] flex gap-4 items-start">
            <ContactIcon icon={Building} />
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="eyebrow-gold">Chennai office</p>
              <p className="font-semibold">No {site.registeredOffice}</p>
              <p className="text-sm text-ink-2">Registered office of the trust · by appointment</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="card card-hover h-12 rounded-xl inline-flex items-center justify-center gap-2 text-ink text-sm font-semibold"
            >
              <YoutubeIcon size={18} /> YouTube
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram thiyaneswaramma"
              className="card card-hover h-12 rounded-xl inline-flex items-center justify-center gap-2 text-ink text-sm font-semibold"
            >
              <InstagramIcon size={18} /> thiyaneswaramma
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Srithiyanesamma"
              className="card card-hover h-12 rounded-xl inline-flex items-center justify-center gap-2 text-ink text-sm font-semibold"
            >
              <FacebookIcon size={18} /> Srithiyanesamma
            </a>
          </div>
        </Reveal>

        <Reveal
          immediate
          delay={0.1}
          className="flex-[2_1_520px] min-w-0 relative rounded-lg overflow-hidden border border-line bg-sand min-h-[420px] md:min-h-[520px]"
        >
          <Image
            src={images.girivalamMap.src}
            alt="Illustrated map of the Girivalam route around Arunachala; the ashram is on the north-western stretch near Adi Annamalai"
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
          <div aria-hidden className="absolute left-[31%] top-[36%] w-[18px] h-[18px] -ml-[9px] -mt-[9px]">
            <span className="absolute inset-0 rounded-full bg-saffron motion-safe:animate-ping opacity-60" />
            <span className="absolute inset-0 rounded-full bg-saffron border-[3px] border-white shadow-[0_4px_12px_rgba(0,0,0,.3)]" />
          </div>
          <div className="absolute left-4 top-4 md:left-5 md:top-5 bg-white border border-line rounded-[14px] px-4 py-3 text-sm max-w-[calc(100%-32px)] md:max-w-[320px] shadow-card">
            <strong>Ashram · Adi Annamalai</strong>
            <br />
            <span className="text-ink-2">
              On the far side of the hill from Arunachaleswarar temple. Pin position is
              illustrative — the live map uses the exact GPS point.{" "}
              <Placeholder label="Google Maps pin" />
            </span>
          </div>
          <div className="absolute left-4 bottom-4 right-4 md:left-5 md:bottom-5 flex flex-wrap gap-2.5">
            <Button href={site.mapsHref} variant="night" size="sm" className="h-[46px]!">
              <MapPin size={16} aria-hidden /> Open in Google Maps
            </Button>
            <Button href={shareOnWhatsappHref} variant="white" size="sm" className="h-[46px]!">
              <WhatsappIcon size={16} /> Share location on WhatsApp
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Getting here */}
      <section className="bg-white border-y border-line">
        <div className="container-site section-pad-lg flex flex-col gap-8">
          <Reveal>
            <SectionHeading eyebrow="Getting here" title="From the airport to the Girivalam road." />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gettingHere.map((g) => (
              <RevealItem
                key={g.eyebrow}
                as="article"
                className={
                  g.night
                    ? "card-night p-6 flex flex-col gap-2"
                    : "card-ivory p-6 flex flex-col gap-2"
                }
              >
                <span
                  className={
                    g.night
                      ? "icon-circle w-10! h-10! bg-night-2! text-gold-light!"
                      : "icon-circle w-10! h-10! bg-sand! text-saffron-text!"
                  }
                  aria-hidden
                >
                  <g.icon size={18} />
                </span>
                <p className={g.night ? "eyebrow-gold text-gold-light!" : "eyebrow-gold"}>
                  {g.eyebrow}
                </p>
                <p className="font-semibold">{g.title}</p>
                <p className={g.night ? "text-sm text-on-night-2" : "text-sm text-ink-2"}>{g.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* International visitors */}
      <section className="container-site section-pad-lg flex flex-wrap gap-8 md:gap-10">
        <Reveal className="flex-[1_1_300px] min-w-0 flex flex-col gap-3">
          <SectionHeading
            eyebrow="For visitors from abroad"
            title="Practical things, answered before you ask."
            lede="Devotees come from Malaysia, Singapore, Sri Lanka, the Gulf, Europe and North America. These notes are kept current by the office."
          />
        </Reveal>
        <RevealGroup className="flex-[2_1_520px] min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {abroad.map((a) => (
            <RevealItem key={a.title} className="card px-5 py-[18px] flex gap-3.5">
              <span className="icon-circle w-10! h-10! bg-sand! text-saffron-text! mt-0.5" aria-hidden>
                <a.icon size={18} />
              </span>
              <div className="min-w-0">
                <p className="font-semibold">{a.title}</p>
                <p className="mt-1 text-sm text-ink-2">{a.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Contact form */}
      <section className="bg-sand border-t border-line">
        <div className="container-site section-pad-lg flex flex-wrap items-start gap-8 md:gap-10">
          <Reveal className="flex-[1_1_300px] min-w-0 flex flex-col gap-3">
            <h2 className="h2">Write to the office.</h2>
            <p className="text-ink-2">
              For visits and poojas, the booking pages are faster. For everything else —
              volunteering, media, groceries, questions about classes — use this form or WhatsApp.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <ArrowLink href="/book-a-visit">Book a visit</ArrowLink>
              <ArrowLink href="/pooja-booking">Book a pooja</ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex-[2_1_520px] min-w-0">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
