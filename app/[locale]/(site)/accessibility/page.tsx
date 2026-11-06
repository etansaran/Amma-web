import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Accessibility, Eye, Keyboard, Languages, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { IconCircle } from "@/components/ui/IconCircle";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: Locale }> };

const LAST_UPDATED = "6 November 2026";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/accessibility",
    title: "Accessibility statement",
    description:
      "How this site works with keyboards and screen readers, its motion toggle and four languages, and how to tell Siva Sri Thiyaneswar Amma Ashram about a barrier.",
  });
}

const features = [
  {
    icon: Keyboard,
    title: "Keyboard first",
    text: "Every link, button, form field and filter chip can be reached with Tab and used with Enter or Space. A “Skip to content” link is the first thing on each page.",
  },
  {
    icon: Eye,
    title: "Visible focus",
    text: "Focused elements show a clear saffron ring, and colour is never the only signal: states are also written in words or marked with an icon.",
  },
  {
    icon: Sparkles,
    title: "Motion you control",
    text: "Fades, drifting backgrounds and the lamp animation stop when your system asks for reduced motion, and the Motion toggle in the header turns them off at any time.",
  },
  {
    icon: Languages,
    title: "Four languages",
    text: "Pages are offered in Tamil, English, Telugu and Hindi, each marked with the right language code so screen readers pronounce them correctly.",
  },
];

export default async function AccessibilityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        variant="sand"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <Accessibility size={13} aria-hidden /> Accessibility
          </span>
        }
        title="Accessibility statement"
        lede="The ashram's door is open to everyone, and this website should be too. Here is what it does today and how to tell us when something is in your way."
        extra={<span className="chip">Last updated: {LAST_UPDATED}</span>}
      />

      <section className="container-site section-pad flex flex-col gap-10">
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {features.map((f) => (
            <RevealItem key={f.title} as="article" className="card-ivory p-6 md:p-7 flex flex-col gap-3">
              <IconCircle icon={f.icon} tone="sand" />
              <h2 className="text-[20px] md:text-[21px] font-display">{f.title}</h2>
              <p className="text-[15px] text-ink-2">{f.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="prose-site">
          <h2>What else we do</h2>
          <ul>
            <li>Headings are in order, and each page has one main heading.</li>
            <li>
              Every photograph has a text description, and generated illustrations are labelled
              “Illustration” so nobody mistakes them for photographs.
            </li>
            <li>
              Forms have visible labels, large touch targets and plain error messages, and every
              request ends with a written confirmation you can read back.
            </li>
            <li>Text can be enlarged to 200 percent without content being cut off.</li>
            <li>
              Frequently asked questions use native expand/collapse controls that work with any
              assistive technology.
            </li>
            <li>Videos load only when you choose to play them, and never autoplay.</li>
          </ul>

          <h2>Known limitations</h2>
          <ul>
            <li>
              Tamil, Telugu and Hindi versions of some new articles are still being prepared; those
              pages show English in the meantime.
            </li>
            <li>
              Some older photographs supplied to the ashram are low resolution and may look soft
              when enlarged.
            </li>
            <li>
              Payment pages are provided by Razorpay and follow its accessibility practices, not
              ours.
            </li>
          </ul>

          <h2>Tell us about a barrier</h2>
          <p>
            If any part of this site is hard for you to use, please tell us. Say which page it was,
            what you were trying to do and, if you can, which browser or assistive technology you
            use. We reply within 7 working days and fix what we can.
          </p>
          <p>
            Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
            <a href={site.phoneHref}>{site.phone}</a>. If you prefer, WhatsApp the same number.
          </p>
          <p>
            At the ashram itself, volunteers help visitors who need a seat, shade or a hand on the
            steps during darshan and annadhanam. Tell the office when you request a visit so we
            can be ready.
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <ArrowLink href="/contact">Contact the ashram</ArrowLink>
            <ArrowLink href="/book-a-visit">Book a visit</ArrowLink>
          </p>
        </Reveal>
      </section>
    </>
  );
}
