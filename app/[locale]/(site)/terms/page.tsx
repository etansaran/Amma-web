import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ScrollText } from "lucide-react";
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
    path: "/terms",
    title: "Terms of use",
    description:
      "The plain terms for using the Siva Sri Thiyaneswar Amma Ashram website: visit requests, pooja bookings, donations, content and your responsibilities.",
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        variant="sand"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of use" }]}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <ScrollText size={13} aria-hidden /> Legal
          </span>
        }
        title="Terms of use"
        lede="The few rules that apply when you use this website, request a visit, book a pooja or make a donation."
        extra={<span className="chip">Last updated: {LAST_UPDATED}</span>}
      />

      <section className="container-site section-pad">
        <Reveal className="prose-site">
          <h2>About this site</h2>
          <p>
            This website is run by {site.name}, a charitable trust registered as{" "}
            {site.trust.registration}, at {site.address.street}, {site.address.locality},{" "}
            {site.address.city} {site.address.postalCode}. By using the site you agree to these
            terms. If you do not agree, please do not use the site.
          </p>

          <h2>Visit requests</h2>
          <ul>
            <li>
              Sending a visit request does not confirm a visit. Every request is read by the
              ashram office, which replies with a confirmation, an alternative or a refusal.
            </li>
            <li>
              Darshan of Mounasamy Siddhar is open to all and free. The ashram does not promise a
              meeting with Maataji, and no request or payment can secure one.
            </li>
            <li>
              Visitors follow the ashram's rules on site: modest dress, silence in the halls, no
              smoking or alcohol, and photography only where permitted.
            </li>
          </ul>

          <h2>Pooja bookings</h2>
          <ul>
            <li>
              A pooja sankalpa is confirmed only when the office confirms the date. Dakshina for a
              pooja is handled as described in the Donation and refund policy.
            </li>
            <li>
              Poojas are performed on the dates fixed by the ashram's calendar. Festival dates
              follow the panchangam and may differ from dates shown on other websites.
            </li>
          </ul>

          <h2>Donations</h2>
          <p>
            Donations support the ashram's annadhanam, poojas and upkeep, and are voluntary.
            Online payments are processed by Razorpay. Receipts are issued by email. The Donation
            and refund policy explains the limited cases in which a payment is returned.
          </p>

          <h2>Content and images</h2>
          <p>
            Text, photographs, songs and recordings on this site belong to the ashram or are used
            with permission. You may share links to our pages freely. Please do not copy
            photographs of Maataji or Mounasamy Siddhar for commercial use, or present them as
            your own, without written permission from the office.
          </p>

          <h2>Accuracy of information</h2>
          <p>
            We try to keep temple timings, festival dates and travel notes correct, but these are
            set by the temple and by transport operators and can change. Check with them before you
            travel. Facts that the office has not yet confirmed are shown on the site as marked
            placeholders rather than guesses.
          </p>

          <h2>Your responsibilities</h2>
          <ul>
            <li>Give correct contact details so we can reach you about your request.</li>
            <li>Do not use the forms to send spam, abuse or anything unlawful.</li>
            <li>Do not try to interfere with the site or its payment pages.</li>
          </ul>

          <h2>Liability</h2>
          <p>
            The site is offered as it is. The ashram is not liable for loss arising from reliance
            on information that has changed, from travel disruptions, or from third-party services
            such as payment or messaging providers, except where the law does not allow such a
            limitation.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India. Disputes are subject to the courts at{" "}
            <Placeholder label="Governing jurisdiction city" />.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
            <a href={site.phoneHref}>{site.phone}</a>.
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <ArrowLink href="/privacy">Privacy policy</ArrowLink>
            <ArrowLink href="/refund-policy">Donation &amp; refund policy</ArrowLink>
          </p>
        </Reveal>
      </section>
    </>
  );
}
