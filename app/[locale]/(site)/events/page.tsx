import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BookOpen, Drum, Flame, Flower, Moon, Users } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { eventSchema } from "@/lib/schema";
import { events, dateParts } from "@/content/events";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { EventFilters } from "@/components/events/EventFilters";
import { EventList } from "@/components/events/EventList";
import { CalendarMonth } from "@/components/events/CalendarMonth";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/events",
    title: "Pooja & Events Calendar — Pournami, Deepam, Shivaratri",
    description:
      "Monthly Pournami pooja and Girivalam annadhanam, Karthigai Deepam 24 Nov 2026, Thiruvadhirai, Maha Shivaratri 2027, weekly satsang and classes at the ashram, Tiruvannamalai.",
    image: images.arunachalaNight,
  });
}

const alsoEveryMonth = events
  .filter((e) => e.listed === false)
  .map((e) => {
    const p = dateParts(e.startDate);
    const end = e.endDate ? dateParts(e.endDate) : null;
    return end ? `${p.day}–${end.day} ${p.monthShort}` : `${p.day} ${p.monthShort}`;
  });

const weekly = [
  { eyebrow: "Daily", title: "Siva pooja · Annadhanam", icon: Flame, pending: false },
  { eyebrow: "DAY", title: "Thiruvasagam class", icon: BookOpen, pending: true },
  { eyebrow: "DAY", title: "Kailaya Vathiyam", icon: Drum, pending: true },
  { eyebrow: "DAY", title: "Sivayogam", icon: Flower, pending: true },
];

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schema = events.map((e) =>
    eventSchema({
      name: e.title,
      startDate: e.startDate,
      endDate: e.endDate,
      description: e.description,
      url: `/${locale}/events#${e.slug}`,
      image: images.arunachalaNight.src,
    }),
  );

  return (
    <>
      <JsonLd data={schema} />

      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pooja & events" }]}
        eyebrow="Pooja & events calendar"
        title="Every full moon. Every festival of Shiva."
        lede="Monthly Pournami pooja and Girivalam annadhanam, special poojas for Karthigai Deepam, Thiruvadhirai and Maha Shivaratri, weekly satsang and classes. All times are Indian Standard Time."
        extra={<EventFilters />}
      />

      {/* Featured + month grid */}
      <section className="container-site pt-12 md:pt-20 pb-6 md:pb-6 flex flex-wrap gap-6 items-stretch">
        <Reveal
          as="article"
          className="flex-[2_1_560px] relative bg-night text-on-night rounded-lg overflow-hidden flex flex-col justify-end min-h-[400px] md:min-h-[460px]"
        >
          <Image
            src={images.arunachalaNight.src}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover opacity-50 animate-drift"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,60,.1),rgba(14,26,60,.95))]"
          />
          <div className="relative p-6 md:p-9 flex flex-col gap-3">
            <Eyebrow tone="gold">Next big day · Tuesday 24 November 2026</Eyebrow>
            <h2 className="font-display text-[30px] md:text-[40px] leading-[1.1] text-on-night-head">
              Karthigai Maha Deepam &amp; Karthigai Pournami
            </h2>
            <p className="text-on-night-body max-w-[620px]">
              Bharani Deepam inside Arunachaleswarar temple around 4 AM, the Maha Deepam lit on
              the summit around 6 PM, Pournami Girivalam all night. At the ashram: special Deepam
              pooja, and annadhanam on the Girivalam road from dusk to dawn.
            </p>
            <div className="flex flex-wrap gap-3 mt-1.5">
              <Button href="/pooja-booking">Book a Deepam sankalpa</Button>
              <Button href="/annadhanam" variant="outline-gold">
                Volunteer / sponsor
              </Button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_340px] flex">
          <CalendarMonth
            events={events}
            initialMonth="2026-11"
            minMonth="2026-11"
            maxMonth="2027-12"
            className="w-full"
          />
        </Reveal>
      </section>

      {/* List */}
      <section id="list" className="container-site pt-10 md:pt-14 pb-14 md:pb-24 flex flex-col gap-3.5 scroll-mt-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-3">
          <h2 className="font-display text-[30px] md:text-[36px]">Upcoming</h2>
          <p className="text-sm text-ink-2">
            Pournami dates follow the Pournami tithi; ashram pooja times in brackets to be
            confirmed.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <EventList events={events} />
        </Reveal>
        <Reveal className="flex flex-wrap gap-3 mt-2">
          <span className="inline-flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl bg-sand text-sm">
            <Moon size={14} className="text-saffron-text" aria-hidden />
            <span>
              Also every month: <strong>Pournami</strong> {alsoEveryMonth.join(" · ")} 2027
            </span>
          </span>
          <Link
            href="/tiruvannamalai-guide#calendar"
            className="link-arrow px-4 py-2.5 rounded-xl border border-line-2 text-sm"
          >
            Full Girivalam calendar with tithi times →
          </Link>
        </Reveal>
      </section>

      {/* Weekly rhythm */}
      <section id="weekly" className="bg-white border-y border-line scroll-mt-20">
        <div className="container-site section-pad flex flex-wrap items-center gap-10">
          <Reveal className="flex-[1_1_360px] flex flex-col gap-3">
            <Eyebrow>Every week</Eyebrow>
            <h2 className="h2">The ashram's weekly rhythm.</h2>
            <p className="text-ink-2">
              Days to be confirmed by the office; shown here so visitors can plan a few days
              around classes and satsang.
            </p>
          </Reveal>
          <RevealGroup className="flex-[2_1_560px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {weekly.map((w) => (
              <RevealItem key={w.title} className="card-ivory p-4 flex gap-3 items-start">
                <span className="icon-circle w-10! h-10! bg-sand! text-saffron-text! shrink-0" aria-hidden>
                  <w.icon size={18} />
                </span>
                <span className="flex flex-col gap-1 min-w-0">
                  <span className="eyebrow-gold text-[12px]">
                    {w.pending ? <Placeholder label={w.eyebrow} /> : w.eyebrow}
                  </span>
                  <span className="font-semibold">{w.title}</span>
                </span>
              </RevealItem>
            ))}
            <RevealItem className="card-night p-4 flex gap-3 items-start">
              <span className="icon-circle w-10! h-10! bg-night-2! text-gold-light! shrink-0" aria-hidden>
                <Users size={18} />
              </span>
              <span className="flex flex-col gap-1 min-w-0">
                <span className="text-[12px] tracking-[.14em] uppercase font-semibold text-gold-light">
                  Every day · {site.daily.programmeShort}
                </span>
                <span className="font-semibold">Satsang</span>
              </span>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
