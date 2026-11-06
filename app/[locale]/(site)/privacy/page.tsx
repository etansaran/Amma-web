import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: Locale }> };

const LAST_UPDATED = "6 November 2026";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/privacy",
    title: "Privacy policy",
    description:
      "How Siva Sri Thiyaneswar Amma Ashram collects, uses and protects the personal details you share when you book a visit, request a pooja or donate.",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        variant="sand"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={13} aria-hidden /> Legal
          </span>
        }
        title="Privacy policy"
        lede="What we collect, why, and how to ask us to change or delete it. Written plainly, because you should not need a lawyer to read it."
        extra={<span className="chip">Last updated: {LAST_UPDATED}</span>}
      />

      <section className="container-site section-pad">
        <Reveal className="prose-site">
          <h2>Who we are</h2>
          <p>
            {site.name} (“the ashram”, “we”) is a charitable trust registered as{" "}
            {site.trust.registration}, with its ashram at {site.address.street},{" "}
            {site.address.locality}, {site.address.city} {site.address.postalCode}. We run this
            website and are responsible for the personal details collected through it.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Visit requests:</strong> your name, phone number or email, preferred dates,
              group size and the purpose of your visit.
            </li>
            <li>
              <strong>Pooja bookings:</strong> the name, nakshatra and gothram for the sankalpa,
              and your contact details so we can confirm the date.
            </li>
            <li>
              <strong>Donations:</strong> your name, contact details, the amount and, when you ask
              for a tax receipt, your PAN. Card and bank details are entered on our payment
              partner's secure page (Razorpay) and never reach our servers.
            </li>
            <li>
              <strong>Reminders:</strong> the WhatsApp number or email you give us for Pournami
              reminders and ashram news, and your language choice.
            </li>
            <li>
              <strong>Website use:</strong> basic, anonymous visit statistics.{" "}
              <Placeholder label="Analytics tools in use, if any" />
            </li>
          </ul>

          <h2>Why we use it</h2>
          <p>
            Only to do what you asked: confirm a visit, perform a pooja and tell you when it is
            done, issue a donation receipt, or send the reminders you signed up for. We also keep
            donation records because the law on charitable trusts requires it.
          </p>

          <h2>Who sees it</h2>
          <ul>
            <li>The ashram office, which handles bookings and receipts.</li>
            <li>
              Razorpay, which processes online payments under its own privacy policy.
            </li>
            <li>
              The messaging and email services we use to send confirmations and reminders.
            </li>
            <li>Authorities, only where the law requires it.</li>
          </ul>
          <p>We never sell or rent your details, and we never share them for advertising.</p>

          <h2>How long we keep it</h2>
          <p>
            Visit and pooja requests are kept for one year after the date of the visit or pooja.
            Donation records are kept for as long as trust accounting rules require. Reminder
            lists are kept until you ask to leave them, which you can do at any time by replying
            “stop” or writing to us.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask to see, correct or delete the details we hold about you, or to stop
            receiving reminders. Write to {site.email} or call {site.phone}. We answer within 7
            working days.
          </p>

          <h2>Cookies</h2>
          <p>
            The site stores your language choice and your motion preference in your browser so
            the pages behave the way you set them. These are not used to track you across other
            websites.
          </p>

          <h2>Children</h2>
          <p>
            Our forms are meant for adults. If a child's details are needed for a pooja sankalpa,
            a parent or guardian provides them.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            When we change this page we update the date at the top. Significant changes will also
            be mentioned on the Contact page.
          </p>

          <h2>Contact</h2>
          <p>
            Data protection contact: <Placeholder label="Name and role of the office contact" />
            <br />
            <Mail size={14} className="inline mr-1.5 text-saffron-text" aria-hidden />
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            <Phone size={14} className="inline mr-1.5 text-saffron-text" aria-hidden />
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
          <p>
            Governing law: the laws of India. Courts at{" "}
            <Placeholder label="Governing jurisdiction city" /> have jurisdiction.
          </p>
          <p>
            <ArrowLink href="/terms">Terms of use</ArrowLink>
          </p>
        </Reveal>
      </section>
    </>
  );
}
