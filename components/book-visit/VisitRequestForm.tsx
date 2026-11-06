"use client";

import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowLeft, ArrowRight, CalendarPlus, Clock, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { StatusChip } from "@/components/ui/StatusChip";
import { StepTransition } from "@/components/ui/StepTransition";
import { CheckPill } from "@/components/ui/CheckPill";
import { FormField } from "@/components/ui/FormField";
import { SelectInput } from "@/components/ui/SelectInput";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { Placeholder } from "@/components/ui/Placeholder";
import { useMotionPreference } from "@/components/motion/MotionProvider";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const STEPS = ["Your details", "Choose dates", "Review & send", "Confirmation"];
const SAMPLE_REFERENCE = "SSTA-V-2026-00001";

const VISITOR_OPTIONS = ["1", "2", "3–5", "6–10", "Group (10+)"];
const LANGUAGES = ["தமிழ்", "English", "తెలుగు", "हिन्दी"];
const INTERESTS = ["Satsang", "Pooja", "Annadhanam seva", "Girivalam", "Classes", "Seeking guidance"];
const DURATIONS = ["Day visit", "2 days", "3 days", "A week", "Longer — I will explain"];
const ARRIVAL_TIMES = ["Morning (before 10)", "Midday", "Afternoon", "Evening (satsang)"];

/** Pournami and festival days offered as quick picks (from the Guide calendar). */
const SPECIAL_DAYS = [
  { date: "2026-11-24", label: "Karthigai Deepam" },
  { date: "2026-12-23", label: "Margazhi Pournami" },
  { date: "2026-12-24", label: "Thiruvadhirai" },
  { date: "2027-01-22", label: "Thai Pournami" },
  { date: "2027-02-20", label: "Maasi Pournami" },
  { date: "2027-03-06", label: "Maha Shivaratri" },
];

type Details = {
  name: string;
  visitors: string;
  whatsapp: string;
  email: string;
  from: string;
  language: string;
  interests: string[];
  note: string;
};

type Dates = {
  arrival: string;
  duration: string;
  arrivingAround: string;
  audience: boolean;
};

const initialDetails: Details = {
  name: "",
  visitors: "1",
  whatsapp: "",
  email: "",
  from: "",
  language: "English",
  interests: ["Satsang", "Pooja"],
  note: "",
};

const initialDates: Dates = {
  arrival: "",
  duration: "Day visit",
  arrivingAround: "Morning (before 10)",
  audience: false,
};

function formatDate(iso: string, locale: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/** A data: URL for an all-day calendar entry on the arrival date. */
function calendarHref(arrival: string) {
  const day = arrival.replace(/-/g, "");
  const address = `${site.address.street}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Siva Sri Thiyaneswar Amma Ashram//Visit//EN",
    "BEGIN:VEVENT",
    `UID:${SAMPLE_REFERENCE}@thiyaneswaramma.org`,
    `DTSTART;VALUE=DATE:${day}`,
    `SUMMARY:Visit to ${site.name}`,
    `LOCATION:${address}`,
    `DESCRIPTION:Visit request ${SAMPLE_REFERENCE} — awaiting approval by the ashram office.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export function VisitRequestForm() {
  const locale = useLocale();
  const { enabled: motionEnabled } = useMotionPreference();
  const panelRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [details, setDetails] = useState<Details>(initialDetails);
  const [dates, setDates] = useState<Dates>(initialDates);
  const [consent, setConsent] = useState(true);
  const [today] = useState(() => new Date().toISOString().slice(0, 10));

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
    setDetails(initialDetails);
    setDates(initialDates);
    setConsent(true);
    go(0);
  }

  function updateDetails<K extends keyof Details>(key: K, value: Details[K]) {
    setDetails((d) => ({ ...d, [key]: value }));
  }
  function updateDates<K extends keyof Dates>(key: K, value: Dates[K]) {
    setDates((d) => ({ ...d, [key]: value }));
  }
  function toggleInterest(name: string, on: boolean) {
    setDetails((d) => ({
      ...d,
      interests: on
        ? INTERESTS.filter((i) => i === name || d.interests.includes(i))
        : d.interests.filter((i) => i !== name),
    }));
  }

  const arrivalLabel = dates.arrival ? formatDate(dates.arrival, locale) : "—";
  const visitorsLabel = details.visitors === "1" ? "1 visitor" : `${details.visitors} visitors`;

  return (
    <div
      ref={panelRef}
      className="card rounded-lg p-5 sm:p-7 md:p-9 flex flex-col gap-7 scroll-mt-[110px]"
    >
      <Stepper steps={STEPS} current={step} />

      <StepTransition stepKey={step} direction={direction}>
        {step === 0 ? (
          <form onSubmit={(e) => {
              e.preventDefault();
              go(1);
            }} className="flex flex-col gap-[18px]" noValidate={false}>
            <h2 className="font-display text-[26px] md:text-[28px] leading-tight">Who is coming?</h2>
            <div className="flex flex-wrap gap-4">
              <FormField id="b-name" label="Full name">
                <input
                  id="b-name"
                  type="text"
                  className="input"
                  autoComplete="name"
                  required
                  value={details.name}
                  onChange={(e) => updateDetails("name", e.target.value)}
                />
              </FormField>
              <FormField id="b-count" label="Number of visitors">
                <SelectInput
                  id="b-count"
                  value={details.visitors}
                  onChange={(e) => updateDetails("visitors", e.target.value)}
                >
                  {VISITOR_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </SelectInput>
              </FormField>
            </div>
            <div className="flex flex-wrap gap-4">
              <FormField id="b-phone" label="WhatsApp number">
                <input
                  id="b-phone"
                  type="tel"
                  className="input"
                  placeholder="+91"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  value={details.whatsapp}
                  onChange={(e) => updateDetails("whatsapp", e.target.value)}
                />
              </FormField>
              <FormField id="b-email" label="Email">
                <input
                  id="b-email"
                  type="email"
                  className="input"
                  autoComplete="email"
                  required
                  value={details.email}
                  onChange={(e) => updateDetails("email", e.target.value)}
                />
              </FormField>
            </div>
            <div className="flex flex-wrap gap-4">
              <FormField id="b-from" label="Coming from (city, country)">
                <input
                  id="b-from"
                  type="text"
                  className="input"
                  required
                  value={details.from}
                  onChange={(e) => updateDetails("from", e.target.value)}
                />
              </FormField>
              <FormField id="b-lang" label="Preferred language">
                <SelectInput
                  id="b-lang"
                  value={details.language}
                  onChange={(e) => updateDetails("language", e.target.value)}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </SelectInput>
              </FormField>
            </div>
            <fieldset className="flex flex-col gap-2.5 min-w-0 border-0 p-0 m-0">
              <legend className="label">What would you like to take part in?</legend>
              <div className="flex flex-wrap gap-2.5">
                {INTERESTS.map((name) => (
                  <CheckPill
                    key={name}
                    name="interests"
                    value={name}
                    checked={details.interests.includes(name)}
                    onChange={(e) => toggleInterest(name, e.target.checked)}
                  >
                    {name}
                  </CheckPill>
                ))}
              </div>
            </fieldset>
            <FormField id="b-purpose" label="Anything the office should know (optional)" className="flex-auto">
              <textarea
                id="b-purpose"
                rows={3}
                className="textarea min-h-[96px]"
                placeholder="Anything the office should know (optional)"
                value={details.note}
                onChange={(e) => updateDetails("note", e.target.value)}
              />
            </FormField>
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Continue to dates <ArrowRight size={18} aria-hidden />
              </Button>
            </div>
          </form>
        ) : null}

        {step === 1 ? (
          <form onSubmit={(e) => {
              e.preventDefault();
              go(2);
            }} className="flex flex-col gap-[18px]">
            <h2 className="font-display text-[26px] md:text-[28px] leading-tight">Choose your dates</h2>
            <p className="text-[15px] text-ink-2">
              Pournami and festival dates are shown in saffron — the ashram is busiest and most
              beautiful. Days with a gold dot have limited capacity for groups.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex-[1_1_360px] min-w-0 flex flex-col gap-3">
                <FormField id="b-arrival" label="Arrival date" className="flex-auto">
                  <input
                    id="b-arrival"
                    type="date"
                    className="input"
                    min={today}
                    required
                    value={dates.arrival}
                    onChange={(e) => updateDates("arrival", e.target.value)}
                  />
                </FormField>
                <div className="flex flex-col gap-2">
                  <p className="text-[13px] font-semibold text-gold-text uppercase tracking-[.14em]">
                    Pournami &amp; festival days
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SPECIAL_DAYS.map((d) => {
                      const selected = dates.arrival === d.date;
                      return (
                        <button
                          key={d.date}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => updateDates("arrival", d.date)}
                          className={cn(
                            "min-h-11 px-3 py-2 rounded-[10px] border text-left text-sm leading-snug transition-colors",
                            selected
                              ? "bg-night text-on-night border-night font-bold"
                              : "bg-amber-bg border-saffron text-ink font-semibold hover:border-gold",
                          )}
                        >
                          <span className="block">{formatDate(d.date, locale)}</span>
                          <span className={cn("block text-[12px] font-medium", selected ? "text-on-night-2" : "text-ink-2")}>
                            {d.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <ul className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-[13px] text-ink-2">
                  <li className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-[3px] bg-amber-bg border border-saffron inline-block" aria-hidden />
                    Pournami / festival
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gold inline-block" aria-hidden />
                    Limited for groups
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-[3px] bg-grey-bg inline-block" aria-hidden />
                    Closed
                  </li>
                  <li>
                    <Placeholder label="limited and closed days — set by the office" />
                  </li>
                </ul>
              </div>
              <div className="flex-[1_1_240px] min-w-0 flex flex-col gap-3">
                <div className="bg-ivory border border-line rounded-[14px] p-4">
                  <p className="eyebrow-gold">Arrival</p>
                  <p className="mt-1 font-display text-[22px] leading-tight">{arrivalLabel}</p>
                </div>
                <FormField id="b-nights" label="How many days?" className="flex-auto">
                  <SelectInput
                    id="b-nights"
                    value={dates.duration}
                    onChange={(e) => updateDates("duration", e.target.value)}
                  >
                    {DURATIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </SelectInput>
                </FormField>
                <FormField id="b-time" label="Arriving around" className="flex-auto">
                  <SelectInput
                    id="b-time"
                    value={dates.arrivingAround}
                    onChange={(e) => updateDates("arrivingAround", e.target.value)}
                  >
                    {ARRIVAL_TIMES.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </SelectInput>
                </FormField>
                <label className="inline-flex items-start gap-2.5 text-sm text-ink-2 cursor-pointer min-h-11">
                  <input
                    type="checkbox"
                    className="accent-saffron w-4 h-4 mt-1 shrink-0"
                    checked={dates.audience}
                    onChange={(e) => updateDates("audience", e.target.checked)}
                  />
                  <span>
                    I would like to request an audience with Maataji, understanding it depends on
                    her schedule and health.
                  </span>
                </label>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
              <Button type="button" variant="outline-night" size="lg" onClick={() => go(0)}>
                <ArrowLeft size={18} aria-hidden /> Back
              </Button>
              <Button type="submit" size="lg">
                Review request <ArrowRight size={18} aria-hidden />
              </Button>
            </div>
          </form>
        ) : null}

        {step === 2 ? (
          <form onSubmit={(e) => {
              e.preventDefault();
              go(3);
            }} className="flex flex-col gap-[18px]">
            <h2 className="font-display text-[26px] md:text-[28px] leading-tight">Review and send</h2>
            <div className="flex flex-wrap gap-3">
              <SummaryCard
                eyebrow="Visitor"
                title={`${details.name} · ${visitorsLabel}`}
                note={`${details.from} · ${details.language}`}
              />
              <SummaryCard
                eyebrow="Dates"
                title={`${arrivalLabel} · ${dates.duration}`}
                note={`Arriving ${dates.arrivingAround.toLowerCase()}`}
              />
              <SummaryCard
                eyebrow="Taking part in"
                title={details.interests.length ? details.interests.join(" · ") : "—"}
                note={
                  dates.audience
                    ? "Audience with Maataji requested"
                    : "No audience with Maataji requested"
                }
              />
            </div>
            {details.note ? (
              <div className="bg-ivory border border-line rounded-[14px] p-4">
                <p className="eyebrow-gold">Note for the office</p>
                <p className="mt-1 text-[15px] text-ink-2 whitespace-pre-line">{details.note}</p>
              </div>
            ) : null}
            <div className="bg-amber-bg border border-saffron rounded-[14px] px-[18px] py-4 text-[15px] text-ink-2">
              <strong className="text-ink">What happens next.</strong> Your request goes to the
              ashram office. You receive a WhatsApp and email now marked <em>Awaiting approval</em>,
              and a second message within two days marked <em>Confirmed</em> or{" "}
              <em>Not available</em> with alternative dates. A meeting with Maataji is never
              guaranteed.
            </div>
            <label className="inline-flex items-start gap-2.5 text-sm text-ink-2 cursor-pointer min-h-11">
              <input
                type="checkbox"
                className="accent-saffron w-4 h-4 mt-1 shrink-0"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                I agree to the ashram's visitor guidelines — modest dress, vegetarian food only, no
                alcohol or smoking, and asking before photographing Maataji or sadhus.
              </span>
            </label>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
              <Button type="button" variant="outline-night" size="lg" onClick={() => go(1)}>
                <ArrowLeft size={18} aria-hidden /> Back
              </Button>
              <Button type="submit" variant="night" size="lg">
                <Send size={18} aria-hidden /> Send visit request
              </Button>
            </div>
          </form>
        ) : null}

        {step === 3 ? (
          <div className="flex flex-col items-start gap-[18px]" role="status">
            <span className="w-16 h-16 rounded-full bg-amber-bg border-2 border-saffron inline-flex items-center justify-center text-saffron-text">
              <Clock size={30} strokeWidth={2.2} aria-hidden />
            </span>
            <h2 className="font-display text-[26px] md:text-[30px] leading-tight">
              Request received — awaiting approval
            </h2>
            <div className="flex flex-wrap items-center gap-2.5">
              <StatusChip status="awaiting_approval" />
              <span className="text-sm text-ink-2">
                Reference <strong className="text-ink">{SAMPLE_REFERENCE}</strong>
              </span>
            </div>
            <p className="text-ink-2 max-w-[620px]">
              Thank you. The ashram office has your request for{" "}
              <strong className="text-ink">{arrivalLabel}</strong>. We have sent this reference to
              your WhatsApp and email. You will hear from us within two days.
            </p>
            <ol className="list-decimal pl-5 text-ink-2 flex flex-col gap-1.5">
              <li>
                <strong className="text-ink">Now</strong> — Awaiting approval. The office checks the
                dates and capacity.
              </li>
              <li>
                <strong className="text-ink">Within 2 days</strong> — Confirmed, or Not available
                with alternative dates.
              </li>
              <li>
                <strong className="text-ink">Day before</strong> — A WhatsApp reminder with
                directions and what to bring.
              </li>
            </ol>
            <div className="flex flex-wrap gap-3">
              <Button href="/tiruvannamalai-guide">
                <MapPin size={18} aria-hidden /> Plan the journey
              </Button>
              {dates.arrival ? (
                <a
                  href={calendarHref(dates.arrival)}
                  download="ashram-visit.ics"
                  className="btn btn-outline-night"
                >
                  <CalendarPlus size={18} aria-hidden /> Add to calendar
                </a>
              ) : null}
              <button
                type="button"
                onClick={reset}
                className="min-h-11 px-4 rounded-pill font-semibold text-[15px] text-saffron-text hover:text-saffron-dark"
              >
                Start another request
              </button>
            </div>
            <p className="text-[13px] text-ink-2">
              Preview: this sample request has not reached the office yet — the booking service is
              not connected.
            </p>
          </div>
        ) : null}
      </StepTransition>
    </div>
  );
}
