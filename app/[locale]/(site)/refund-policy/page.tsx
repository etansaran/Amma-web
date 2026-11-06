import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HandHeart } from "lucide-react";
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
    path: "/refund-policy",
    title: "Donation & refund policy",
    description:
      "Donations to Siva Sri Thiyaneswar Amma Ashram are voluntary and non-refundable, except duplicate or failed transactions. Pooja dakshina refund rules and how to ask.",
  });
}

export default async function RefundPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        variant="sand"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Donation & refund policy" }]}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <HandHeart size={13} aria-hidden /> Legal
          </span>
        }
        title="Donation & refund policy"
        lede="Donations are gifts to the ashram's seva and are not refunded, with two clear exceptions. Pooja dakshina can be returned if you cancel before the pooja date."
        extra={<span className="chip">Last updated: {LAST_UPDATED}</span>}
      />

      <section className="container-site section-pad">
        <Reveal className="prose-site">
          <h2>Donations</h2>
          <p>
            Every donation to {site.name} (Reg {site.trust.registration}) is voluntary. It is used
            for annadhanam, poojas, the care of sadhus and the upkeep of the ashram at Adi
            Annamalai. Because the money is put to use as soon as it arrives, donations are{" "}
            <strong>non-refundable</strong>, except in these two cases:
          </p>
          <ul>
            <li>
              <strong>Duplicate transaction:</strong> the same donation was charged twice because
              of a network or payment-gateway error. We refund the duplicate.
            </li>
            <li>
              <strong>Failed transaction:</strong> money left your account but the payment did not
              reach us. Such amounts are normally reversed by the bank or by Razorpay within 5 to 7
              working days; if they are not, write to us with the payment reference and we will
              follow it up and refund any amount that did reach us.
            </li>
          </ul>
          <p>
            A donation made by mistake (for example, a wrong amount) can be reviewed if you write
            to us within 48 hours of the payment. We will do our best to help, but we cannot
            promise a refund once the amount has been spent on the day's seva.
          </p>

          <h2>Pooja dakshina</h2>
          <p>
            Dakshina paid for a special pooja or a Pournami sankalpa is treated differently,
            because it is tied to a date:
          </p>
          <ul>
            <li>
              If you cancel at least <Placeholder label="Cut-off: number of days before the pooja date" />{" "}
              before the pooja date, the full dakshina is refunded.
            </li>
            <li>
              If the ashram cannot perform the pooja on the confirmed date for any reason, you may
              choose a new date or a full refund.
            </li>
            <li>
              Cancellations after the cut-off, or after the pooja has been performed, are not
              refunded. The pooja is offered in your name as booked.
            </li>
          </ul>

          <h2>Annadhanam sponsorship</h2>
          <p>
            Sponsorship of a day of annadhanam follows the same rule as pooja dakshina: it can be
            refunded if you cancel before the cut-off, and it can be moved to another date at no
            charge if the ashram is unable to honour the booked day.
          </p>

          <h2>How to ask for a refund</h2>
          <ul>
            <li>
              Email {site.email} or call {site.phone} with your name, the amount, the date and the
              Razorpay payment ID or the reference on your receipt.
            </li>
            <li>
              We acknowledge the request within 2 working days and complete an approved refund
              within <strong>7 working days</strong>.
            </li>
            <li>
              Refunds go to the <strong>original payment method</strong> only. It may take a
              further 5 to 10 working days for your bank or card issuer to show the credit.
            </li>
            <li>
              If a tax receipt has already been issued for the amount, it is cancelled when the
              refund is made.
            </li>
          </ul>

          <h2>Payments and security</h2>
          <p>
            Online payments are processed by Razorpay. The ashram does not see or store your card,
            UPI or bank details. Payment pages are shown on this site only once Razorpay is
            connected; until then, the office takes donations in person or by bank transfer and
            issues receipts by hand.
          </p>

          <h2>Contact</h2>
          <p>
            {site.name}
            <br />
            {site.address.street}, {site.address.locality}, {site.address.city}{" "}
            {site.address.postalCode}
            <br />
            <a href={site.phoneHref}>{site.phone}</a> ·{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <ArrowLink href="/donate">Donate</ArrowLink>
            <ArrowLink href="/pooja-booking">Book a pooja</ArrowLink>
            <ArrowLink href="/terms">Terms of use</ArrowLink>
          </p>
        </Reveal>
      </section>
    </>
  );
}
