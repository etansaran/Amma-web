"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Clock, Download, Lock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StepTransition } from "@/components/ui/StepTransition";
import { CheckPill } from "@/components/ui/CheckPill";
import { FormField } from "@/components/ui/FormField";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { useMotionPreference } from "@/components/motion/MotionProvider";
import { site } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const SAMPLE_REFERENCE = "SSTA-D-2026-00001";
const RAZORPAY_NOTE = "Online payment opens when Razorpay is connected.";

/** Donation purposes — will move to the CMS `donationPurpose` collection. */
const PURPOSES = [
  {
    id: "annadhanam",
    name: "Annadhanam",
    description: "One day of hot meals for every sadhu and pilgrim on the Girivalam road.",
  },
  {
    id: "pournami",
    name: "Pournami annadhanam",
    description: "Feeding the thousands who walk Girivalam on a full-moon night.",
  },
  {
    id: "sadhu-welfare",
    name: "Sadhu welfare",
    description: "Vastram, Maheswara Poojai, medical help and ambulance support.",
  },
  {
    id: "poojas",
    name: "Poojas & the ashram",
    description: "Daily Siva pooja, festival poojas and upkeep of the hall and kitchen.",
  },
  {
    id: "village",
    name: "Village & path",
    description: "Girivalam path cleaning, children's classes, skills for women.",
  },
  {
    id: "general",
    name: "Where it is needed most",
    description: "Let the ashram office direct your gift to the day's need.",
  },
];

const AMOUNTS = [501, 1116, 2501, 5001, 10008];

type Frequency = "once" | "monthly";

type Donor = {
  name: string;
  email: string;
  whatsapp: string;
  pan: string;
  anonymous: boolean;
  photo: boolean;
  outsideIndia: boolean;
};

const initialDonor: Donor = {
  name: "",
  email: "",
  whatsapp: "",
  pan: "",
  anonymous: false,
  photo: true,
  outsideIndia: false,
};

function rupees(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function DonationForm() {
  const { enabled: motionEnabled } = useMotionPreference();
  const panelRef = useRef<HTMLDivElement>(null);
  const customRef = useRef<HTMLInputElement>(null);

  const [done, setDone] = useState(false);
  const [purposeId, setPurposeId] = useState(PURPOSES[0].id);
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [chip, setChip] = useState<number | null>(1116);
  const [custom, setCustom] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [donor, setDonor] = useState<Donor>(initialDonor);

  const purpose = PURPOSES.find((p) => p.id === purposeId) ?? PURPOSES[0];
  const customValue = Math.floor(Number(custom));
  const amount = custom !== "" ? (customValue > 0 ? customValue : null) : chip;
  const frequencyLabel = frequency === "once" ? "one-time" : "monthly";
  const summary = amount ? `${rupees(amount)} · ${frequencyLabel}` : "Choose an amount";
  const payLabel = amount
    ? frequency === "once"
      ? `Give ${rupees(amount)} once`
      : `Give ${rupees(amount)} every month`
    : "Choose an amount to give";
  const hint = amount
    ? frequency === "once"
      ? `A one-time gift of ${rupees(amount)} to ${purpose.name.toLowerCase()}. Receipt by email within a minute of payment.`
      : `${rupees(amount)} every month to ${purpose.name.toLowerCase()} through a Razorpay subscription — pause or stop any time by writing to the office.`
    : "Pick an amount, or type your own.";

  function update<K extends keyof Donor>(key: K, value: Donor[K]) {
    setDonor((d) => ({ ...d, [key]: value }));
  }

  function pickChip(value: number) {
    setChip(value);
    setCustom("");
    setAmountError(false);
  }

  function scrollToPanel() {
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: motionEnabled ? "smooth" : "auto",
        block: "start",
      });
    });
  }

  function submitPledge(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!amount) {
      setAmountError(true);
      customRef.current?.focus();
      return;
    }
    setDone(true);
    scrollToPanel();
  }

  function reset() {
    setDone(false);
    setPurposeId(PURPOSES[0].id);
    setFrequency("once");
    setChip(1116);
    setCustom("");
    setAmountError(false);
    setDonor(initialDonor);
    scrollToPanel();
  }

  return (
    <div ref={panelRef} className="flex flex-wrap items-start gap-8 md:gap-10 scroll-mt-[110px]">
      <div className="flex-[2_1_640px] min-w-0 card rounded-lg p-5 sm:p-7 md:p-9">
        <StepTransition stepKey={done ? "thanks" : "form"} direction={done ? 1 : -1}>
          {!done ? (
            <form onSubmit={submitPledge} className="flex flex-col gap-[26px]">
              {/* 1 · Purpose */}
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-[24px] md:text-[26px] leading-tight">
                  1 · Where should your gift go?
                </h2>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  role="group"
                  aria-label="Purpose of the gift"
                >
                  {PURPOSES.map((p) => {
                    const selected = p.id === purposeId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setPurposeId(p.id)}
                        className={cn(
                          "text-left bg-white border-2 rounded-2xl p-4 flex flex-col gap-1.5 min-h-11 transition-[border-color,box-shadow,background-color] duration-200",
                          selected
                            ? "border-saffron bg-[#FFF8EE] shadow-[0_0_0_4px_rgba(233,132,28,.18)]"
                            : "border-line hover:border-gold",
                        )}
                      >
                        <span className="font-display text-[18px] leading-[1.2]">{p.name}</span>
                        <span className="text-[13px] text-ink-2">{p.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2 · Amount & frequency */}
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-[24px] md:text-[26px] leading-tight">
                  2 · How much, and how often?
                </h2>
                <div className="flex gap-2" role="group" aria-label="How often">
                  {(
                    [
                      ["once", "One-time"],
                      ["monthly", "Monthly"],
                    ] as const
                  ).map(([value, label]) => {
                    const on = frequency === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setFrequency(value)}
                        className={cn(
                          "h-11 px-[18px] rounded-pill border text-[15px] font-semibold transition-colors",
                          on
                            ? "bg-night border-night text-on-night"
                            : "bg-white border-line-2 text-ink hover:border-gold",
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Amount">
                  {AMOUNTS.map((value) => {
                    const on = chip === value && custom === "";
                    return (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={on}
                        onClick={() => pickChip(value)}
                        className={cn(
                          "h-[50px] px-5 rounded-pill font-bold text-[16px] transition-colors",
                          on
                            ? "border-2 border-saffron bg-[#FFF4E6] text-ink"
                            : "border border-line-2 bg-white text-ink hover:border-gold",
                        )}
                      >
                        {rupees(value)}
                      </button>
                    );
                  })}
                  <label
                    className={cn(
                      "inline-flex items-center gap-2 h-[50px] px-3.5 rounded-pill border bg-ivory transition-colors focus-within:border-saffron focus-within:ring-4 focus-within:ring-saffron/20",
                      custom !== "" ? "border-saffron" : "border-line-2",
                      amountError && "border-red-600",
                    )}
                  >
                    <span className="font-bold">₹</span>
                    <span className="sr-only">Other amount</span>
                    <input
                      ref={customRef}
                      type="number"
                      inputMode="numeric"
                      min={1}
                      step={1}
                      placeholder="Other amount"
                      aria-label="Other amount"
                      aria-invalid={amountError || undefined}
                      aria-describedby={amountError ? "d-amount-error" : undefined}
                      value={custom}
                      onChange={(e) => {
                        setCustom(e.target.value);
                        setAmountError(false);
                      }}
                      className="w-[130px] bg-transparent border-0 outline-none text-[16px] text-ink placeholder:text-[#9a8f80]"
                    />
                  </label>
                </div>
                {amountError ? (
                  <p id="d-amount-error" role="alert" className="text-sm font-semibold text-red-700">
                    Please choose an amount or type one in rupees.
                  </p>
                ) : null}
                <p className="text-sm text-ink-2">{hint}</p>
              </div>

              {/* 3 · Details */}
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-[24px] md:text-[26px] leading-tight">
                  3 · Your details
                </h2>
                <div className="flex flex-wrap gap-4">
                  <FormField id="d-name" label="Name on the receipt">
                    <input
                      id="d-name"
                      type="text"
                      className="input"
                      autoComplete="name"
                      required
                      value={donor.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </FormField>
                  <FormField id="d-email" label="Email">
                    <input
                      id="d-email"
                      type="email"
                      className="input"
                      autoComplete="email"
                      required
                      value={donor.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </FormField>
                </div>
                <div className="flex flex-wrap gap-4">
                  <FormField id="d-phone" label="WhatsApp number">
                    <input
                      id="d-phone"
                      type="tel"
                      className="input"
                      placeholder="+91"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      value={donor.whatsapp}
                      onChange={(e) => update("whatsapp", e.target.value)}
                    />
                  </FormField>
                  <FormField
                    id="d-pan"
                    label={
                      <>
                        PAN (optional, needed for your 80G receipt)
                      </>
                    }
                  >
                    <input
                      id="d-pan"
                      type="text"
                      className="input uppercase"
                      autoComplete="off"
                      pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]"
                      title="10-character PAN, e.g. ABCDE1234F"
                      value={donor.pan}
                      onChange={(e) => update("pan", e.target.value)}
                    />
                  </FormField>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <CheckPill
                    checked={donor.anonymous}
                    onChange={(e) => update("anonymous", e.target.checked)}
                  >
                    Keep my gift anonymous
                  </CheckPill>
                  <CheckPill checked={donor.photo} onChange={(e) => update("photo", e.target.checked)}>
                    Send me a photo of the seva
                  </CheckPill>
                  <CheckPill
                    checked={donor.outsideIndia}
                    onChange={(e) => update("outsideIndia", e.target.checked)}
                  >
                    I am donating from outside India
                  </CheckPill>
                </div>
                {donor.outsideIndia ? (
                  <div
                    role="note"
                    className="bg-amber-bg border border-saffron rounded-[20px] p-5 text-sm text-ink-2"
                  >
                    <strong className="text-ink">Devotees outside India:</strong>{" "}
                    the trust is a registered charitable trust in India. Gifts from outside India
                    need FCRA approval, so please{" "}
                    <Link href="/contact" className="font-semibold">
                      write to the office
                    </Link>{" "}
                    before giving from abroad and we will tell you how.
                  </div>
                ) : null}
              </div>

              {/* Pay */}
              <div className="flex flex-col gap-4 pt-4 border-t border-line">
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
                  <p className="text-sm text-ink-2 flex items-center gap-2">
                    <Lock size={16} aria-hidden className="shrink-0" />
                    Razorpay secure checkout · the ashram never sees card or UPI details
                  </p>
                  <div className="flex flex-col items-stretch sm:items-end gap-2">
                    <Button
                      type="button"
                      size="lg"
                      disabled
                      aria-describedby="d-razorpay-note"
                      className="text-[17px] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      <Lock size={16} aria-hidden /> {payLabel}
                    </Button>
                    <p id="d-razorpay-note" className="text-[13px] text-ink-2 sm:text-right">
                      {RAZORPAY_NOTE}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-sm text-ink-2 max-w-[460px]">
                    Until online payment opens, you can record a pledge and the office will write to
                    you with the ways to give.
                  </p>
                  <Button type="submit" variant="outline-saffron" size="lg">
                    Record a pledge · pay later <ArrowRight size={18} aria-hidden />
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-start gap-4" role="status">
              <span className="w-16 h-16 rounded-full bg-amber-bg border-2 border-saffron inline-flex items-center justify-center text-saffron-text">
                <Clock size={30} strokeWidth={2.2} aria-hidden />
              </span>
              <h2 className="font-display text-[26px] md:text-[30px] leading-tight">
                Thank you. Your pledge has been recorded.
              </h2>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-pill text-[13px] font-bold bg-amber-bg text-amber-text">
                  <Clock size={14} strokeWidth={2.5} aria-hidden /> Payment pending
                </span>
                <span className="text-sm text-ink-2">
                  Reference <strong className="text-ink">{SAMPLE_REFERENCE}</strong> · {summary} ·{" "}
                  {purpose.name}
                </span>
              </div>
              <p lang="ta" className="ta text-[22px] md:text-[24px] text-saffron-text">
                அன்பே சிவம் · உங்கள் அன்புக்கு நன்றி
              </p>
              <p className="text-ink-2 max-w-[620px]">
                Once your gift is received, a receipt from Siva Sri Thiyaneswar Amma Asramam (Reg{" "}
                {site.trust.registration}) is emailed to you, and a thank-you sent on WhatsApp. Your
                name will be read at the next morning sankalpa before annadhanam.{" "}
                Your 80G receipt is attached when you give your PAN.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="night"
                  disabled
                  title="Receipts are issued after payment."
                  className="disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  <Download size={18} aria-hidden /> Download receipt
                </Button>
                <Button href="/book-a-visit" variant="outline-night">
                  <MapPin size={18} aria-hidden /> Plan a visit
                </Button>
                <button
                  type="button"
                  onClick={reset}
                  className="min-h-11 px-4 rounded-pill font-semibold text-[15px] text-saffron-text hover:text-saffron-dark"
                >
                  Give again
                </button>
              </div>
              <p className="text-[13px] text-ink-2">
                Preview: this sample pledge has not reached the office yet — the donation service is
                not connected.
              </p>
            </div>
          )}
        </StepTransition>
      </div>

      <aside className="flex-[1_1_300px] min-w-0 flex flex-col gap-4">
        <div className="card-night rounded-[20px] p-6 flex flex-col gap-2.5" aria-live="polite">
          <p className="eyebrow-gold text-gold-light!">Your gift summary</p>
          <p className="font-display text-[26px] leading-tight text-on-night-head">{summary}</p>
          <p className="text-sm text-on-night-2">{purpose.name}</p>
        </div>
        <div className="card rounded-[20px] p-6 flex flex-col gap-2.5">
          <p className="eyebrow-gold">You will receive</p>
          <ul className="flex flex-col gap-2.5 text-[15px] text-ink-2">
            {[
              "Receipt by email within a minute",
              "Thank-you on WhatsApp in your language",
              "Name read at the morning sankalpa",
              "A photo of the seva your gift supported",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check size={18} className="text-saffron-text shrink-0 mt-0.5" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="card rounded-[20px] p-6 flex flex-col gap-2">
          <p className="eyebrow-gold">Bank transfer</p>
          <p className="text-sm text-ink-2">
            Prefer NEFT or a cheque? Account details are shared by the office on request so they are
            never scraped from the web.
          </p>
          <ArrowLink href="/contact">Ask the office</ArrowLink>
        </div>
      </aside>
    </div>
  );
}
