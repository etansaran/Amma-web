"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { StatusChip } from "@/components/ui/StatusChip";
import { StepTransition } from "@/components/ui/StepTransition";
import { CheckPill } from "@/components/ui/CheckPill";
import { FormField } from "@/components/ui/FormField";
import { SelectInput } from "@/components/ui/SelectInput";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { Placeholder } from "@/components/ui/Placeholder";
import { site, rupees as formatRupees } from "@/lib/site";
import { useMotionPreference } from "@/components/motion/MotionProvider";
import { poojas, poojaDateOptions, poojaForOptions, type Pooja } from "@/content/poojas";
import { cn } from "@/lib/cn";

const STEPS = ["Choose a pooja", "Date & sankalpa", "Dakshina", "Confirmation"];
const SAMPLE_REFERENCE = "SSTA-P-2026-00001";
const RAZORPAY_NOTE = "Online payment opens when Razorpay is connected.";

const ALL_PAY_METHODS: { id: string; label: ReactNode }[] = [
  { id: "upi", label: "UPI (GPay, PhonePe, Paytm)" },
  { id: "card", label: "Debit / credit card" },
  { id: "netbanking", label: "Net banking" },
  {
    id: "international",
    label: (
      <>
        International card
      </>
    ),
  },
];

/** Foreign cards only once the trust's FCRA registration is confirmed. */
const PAY_METHODS = ALL_PAY_METHODS.filter(
  (m) => m.id !== "international" || site.trust.fcraRegistered,
);

type Sankalpa = {
  date: string;
  forWhom: string;
  names: string;
  nakshatra: string;
  gothram: string;
  intention: string;
  whatsapp: string;
  email: string;
  postPrasadam: boolean;
  photo: boolean;
  attend: boolean;
};

const initialSankalpa: Sankalpa = {
  date: poojaDateOptions[0],
  forWhom: poojaForOptions[0],
  names: "",
  nakshatra: "",
  gothram: "",
  intention: "",
  whatsapp: "",
  email: "",
  postPrasadam: false,
  photo: true,
  attend: false,
};

function rupees(n: number) {
  return formatRupees(n);
}

function DakshinaAmount({ pooja }: { pooja: Pooja }) {
  return pooja.dakshina ? (
    <>{rupees(pooja.dakshina)}</>
  ) : (
    <>
      ₹ <Placeholder label="dakshina" />
    </>
  );
}

export function PoojaBookingForm() {
  const { enabled: motionEnabled } = useMotionPreference();
  const panelRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [poojaId, setPoojaId] = useState(poojas[0].id);
  const [sankalpa, setSankalpa] = useState<Sankalpa>(initialSankalpa);
  const [payMethod, setPayMethod] = useState("upi");

  const pooja = poojas.find((p) => p.id === poojaId) ?? poojas[0];

  function go(next: number) {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: motionEnabled ? "smooth" : "auto",
        block: "start",
      });
    });
  }

  function reset() {
    setPoojaId(poojas[0].id);
    setSankalpa(initialSankalpa);
    setPayMethod("upi");
    go(0);
  }

  function update<K extends keyof Sankalpa>(key: K, value: Sankalpa[K]) {
    setSankalpa((s) => ({ ...s, [key]: value }));
  }

  const dateShort = sankalpa.date.split(" · ")[0];

  return (
    <div ref={panelRef} className="flex flex-col gap-7 scroll-mt-[110px]">
      <Stepper steps={STEPS} current={step} />

      <StepTransition stepKey={step} direction={direction}>
        {step === 0 ? (
          <form onSubmit={(e) => {
              e.preventDefault();
              go(1);
            }} className="flex flex-col gap-[18px]">
            <h2 className="font-display text-[26px] md:text-[28px] leading-tight">
              Which pooja would you like?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="group" aria-label="Poojas">
              {poojas.map((p) => {
                const selected = p.id === poojaId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setPoojaId(p.id)}
                    className={cn(
                      "text-left bg-white border-2 rounded-card p-5 md:p-[22px] flex flex-col gap-2 transition-[border-color,box-shadow] duration-200 min-h-11",
                      selected
                        ? "border-saffron shadow-[0_0_0_4px_rgba(233,132,28,.2)]"
                        : "border-line hover:border-gold",
                    )}
                  >
                    <span className="flex items-center w-full gap-3">
                      <span className="eyebrow-gold">{p.when}</span>
                      <span
                        aria-hidden
                        className={cn(
                          "ml-auto w-6 h-6 rounded-full border-2 inline-flex items-center justify-center shrink-0",
                          selected ? "bg-saffron border-saffron text-ink" : "border-line-2 text-white",
                        )}
                      >
                        <Check size={13} strokeWidth={3} />
                      </span>
                    </span>
                    <span className="font-display text-[21px] leading-[1.25]">{p.name}</span>
                    <span lang="ta" className="ta text-[15px] text-saffron-text">
                      {p.tamil}
                    </span>
                    <span className="text-sm text-ink-2">{p.description}</span>
                    <span className="mt-auto pt-1 font-bold">
                      <DakshinaAmount pooja={p} />
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Continue with {pooja.name} <ArrowRight size={18} aria-hidden />
              </Button>
            </div>
          </form>
        ) : null}

        {step === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              go(2);
            }}
            className="card rounded-lg p-5 sm:p-7 md:p-9 flex flex-col gap-[18px]"
          >
            <h2 className="font-display text-[26px] md:text-[28px] leading-tight">
              Date and sankalpa for {pooja.name}
            </h2>
            <div className="flex flex-wrap gap-4">
              <FormField id="p-date" label="Pooja date">
                <SelectInput
                  id="p-date"
                  value={sankalpa.date}
                  onChange={(e) => update("date", e.target.value)}
                >
                  {poojaDateOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </SelectInput>
              </FormField>
              <FormField id="p-for" label="Pooja is offered for">
                <SelectInput
                  id="p-for"
                  value={sankalpa.forWhom}
                  onChange={(e) => update("forWhom", e.target.value)}
                >
                  {poojaForOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </SelectInput>
              </FormField>
            </div>
            <div className="flex flex-wrap gap-4">
              <FormField id="p-name" label="Name(s) for the sankalpa">
                <input
                  id="p-name"
                  type="text"
                  className="input"
                  placeholder="As it should be read"
                  required
                  value={sankalpa.names}
                  onChange={(e) => update("names", e.target.value)}
                />
              </FormField>
              <FormField id="p-nak" label="Nakshatra (optional)" className="flex-[1_1_160px]">
                <input
                  id="p-nak"
                  type="text"
                  className="input"
                  value={sankalpa.nakshatra}
                  onChange={(e) => update("nakshatra", e.target.value)}
                />
              </FormField>
              <FormField id="p-got" label="Gothram (optional)" className="flex-[1_1_160px]">
                <input
                  id="p-got"
                  type="text"
                  className="input"
                  value={sankalpa.gothram}
                  onChange={(e) => update("gothram", e.target.value)}
                />
              </FormField>
            </div>
            <FormField id="p-int" label="Intention (optional)" className="flex-auto">
              <textarea
                id="p-int"
                rows={2}
                className="textarea min-h-[80px]"
                placeholder="Health, peace at home, gratitude, a new beginning…"
                value={sankalpa.intention}
                onChange={(e) => update("intention", e.target.value)}
              />
            </FormField>
            <div className="flex flex-wrap gap-4">
              <FormField id="p-phone" label="WhatsApp number">
                <input
                  id="p-phone"
                  type="tel"
                  className="input"
                  placeholder="+91"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  value={sankalpa.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                />
              </FormField>
              <FormField id="p-email" label="Email for receipt">
                <input
                  id="p-email"
                  type="email"
                  className="input"
                  autoComplete="email"
                  required
                  value={sankalpa.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </FormField>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <CheckPill
                checked={sankalpa.postPrasadam}
                onChange={(e) => update("postPrasadam", e.target.checked)}
              >
                Post prasadam to me (India only, +{rupees(site.postage)})
              </CheckPill>
              <CheckPill checked={sankalpa.photo} onChange={(e) => update("photo", e.target.checked)}>
                Send me a photo of the pooja
              </CheckPill>
              <CheckPill checked={sankalpa.attend} onChange={(e) => update("attend", e.target.checked)}>
                I will attend in person
              </CheckPill>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
              <Button type="button" variant="outline-night" size="lg" onClick={() => go(0)}>
                <ArrowLeft size={18} aria-hidden /> Back
              </Button>
              <Button type="submit" size="lg">
                Continue to dakshina <ArrowRight size={18} aria-hidden />
              </Button>
            </div>
          </form>
        ) : null}

        {step === 2 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              go(3);
            }}
            className="card rounded-lg p-5 sm:p-7 md:p-9 flex flex-col gap-[18px]"
          >
            <h2 className="font-display text-[26px] md:text-[28px] leading-tight">Offer dakshina</h2>
            <div className="flex flex-wrap gap-3">
              <SummaryCard eyebrow="Pooja" title={pooja.name} note={dateShort} className="flex-[1_1_220px]" />
              <SummaryCard
                eyebrow="Sankalpa"
                title={
                  sankalpa.nakshatra ? `${sankalpa.names} · ${sankalpa.nakshatra}` : sankalpa.names
                }
                note={`Photo of the pooja: ${sankalpa.photo ? "yes" : "no"}${
                  sankalpa.attend ? " · attending in person" : ""
                }`}
                className="flex-[1_1_220px]"
              />
              <SummaryCard
                tone="night"
                eyebrow="Total"
                title={
                  <>
                    {pooja.dakshina ? (
                      rupees(pooja.dakshina + (sankalpa.postPrasadam ? site.postage : 0))
                    ) : (
                      <DakshinaAmount pooja={pooja} />
                    )}
                    {sankalpa.postPrasadam ? (
                      <span className="block text-[15px] text-on-night-2 font-body">
                        includes {rupees(site.postage)} postage
                      </span>
                    ) : null}
                  </>
                }
                note="Dakshina · no platform fee"
                className="flex-[1_1_220px]"
              />
            </div>
            <fieldset className="flex flex-col gap-2.5 border-0 p-0 m-0 min-w-0">
              <legend className="label">Pay with</legend>
              <div className="flex flex-wrap gap-2.5">
                {PAY_METHODS.map((m) => (
                  <CheckPill
                    key={m.id}
                    type="radio"
                    name="pay"
                    size="lg"
                    value={m.id}
                    checked={payMethod === m.id}
                    onChange={() => setPayMethod(m.id)}
                  >
                    {m.label}
                  </CheckPill>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
              <Button type="button" variant="outline-night" size="lg" onClick={() => go(1)}>
                <ArrowLeft size={18} aria-hidden /> Back
              </Button>
              <div className="flex flex-col items-stretch sm:items-end gap-2">
                <Button
                  type="button"
                  variant="night"
                  size="lg"
                  disabled
                  aria-describedby="p-razorpay-note"
                  className="disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  <Lock size={16} aria-hidden /> Pay <DakshinaAmount pooja={pooja} /> securely with
                  Razorpay
                </Button>
                <p id="p-razorpay-note" className="text-[13px] text-ink-2 sm:text-right">
                  {RAZORPAY_NOTE}
                </p>
              </div>
            </div>
            <p className="text-[13px] text-ink-2">
              You will be taken to Razorpay's secure page. The ashram never sees or stores your card
              or UPI details. Receipts are issued by the trust.
            </p>
            <div className="border-t border-line pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-ink-2 max-w-[460px]">
                Until online payment opens, you can reserve the sankalpa now and offer dakshina at
                the ashram or as the office advises.
              </p>
              <Button type="submit" variant="outline-saffron" size="lg">
                Reserve the sankalpa · pay later <ArrowRight size={18} aria-hidden />
              </Button>
            </div>
          </form>
        ) : null}

        {step === 3 ? (
          <div
            className="card rounded-lg p-5 sm:p-7 md:p-9 flex flex-col items-start gap-4"
            role="status"
          >
            <span className="w-16 h-16 rounded-full bg-amber-bg border-2 border-saffron inline-flex items-center justify-center text-saffron-text">
              <Clock size={30} strokeWidth={2.2} aria-hidden />
            </span>
            <h2 className="font-display text-[26px] md:text-[30px] leading-tight">
              Booking received — pooja awaiting confirmation
            </h2>
            <div className="flex flex-wrap items-center gap-2.5">
              <StatusChip status="awaiting_confirmation" />
              <span className="text-sm text-ink-2">
                Booking <strong className="text-ink">{SAMPLE_REFERENCE}</strong> · dakshina not yet
                paid
              </span>
            </div>
            <p className="text-ink-2 max-w-[640px]">
              Your {pooja.name} for <strong className="text-ink">{dateShort}</strong> is booked. The
              ashram office confirms the sankalpa within one day; you then receive a{" "}
              <strong className="text-ink">Confirmed</strong> message with the pooja time, and a
              photo afterwards. A receipt is emailed once the dakshina is received.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/events">
                <CalendarDays size={18} aria-hidden /> See the event
              </Button>
              <Button
                type="button"
                variant="outline-night"
                disabled
                title="Receipts are issued after the dakshina is received."
                className="disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <Download size={18} aria-hidden /> Download receipt
              </Button>
              <button
                type="button"
                onClick={reset}
                className="min-h-11 px-4 rounded-pill font-semibold text-[15px] text-saffron-text hover:text-saffron-dark"
              >
                Book another pooja
              </button>
            </div>
            <p className="text-[13px] text-ink-2">
              Preview: this sample booking has not reached the office yet — the booking service is
              not connected.
            </p>
          </div>
        ) : null}
      </StepTransition>
    </div>
  );
}
