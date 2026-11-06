"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusChip } from "@/components/ui/StatusChip";

const sevaOptions = [
  "Kitchen",
  "Serving on the Girivalam road",
  "Cleaning the path",
  "Deepam night",
  "Translation & media",
];

type Submitted = {
  name: string;
  phone: string;
  from: string;
  to: string;
  seva: string;
};

const SAMPLE_REFERENCE = "SSTA-V-2026-00001";

/** Volunteer sign-up — front-end only; shows a thank-you state on submit. */
export function VolunteerForm() {
  const [submitted, setSubmitted] = useState<Submitted | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted({
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      from: String(data.get("from") ?? ""),
      to: String(data.get("to") ?? ""),
      seva: String(data.get("seva") ?? ""),
    });
  }

  if (submitted) {
    return (
      <div
        className="card rounded-[22px] p-6 md:p-8 flex flex-col gap-4"
        role="status"
        aria-live="polite"
      >
        <span className="icon-circle bg-green-bg! text-green-text!" aria-hidden>
          <CircleCheck size={22} />
        </span>
        <h3 className="text-[24px]">Thank you, {submitted.name}.</h3>
        <p className="text-ink-2">
          Your sign-up for <strong>{submitted.seva}</strong>
          {submitted.from ? (
            <>
              {" "}
              from <strong>{submitted.from}</strong>
            </>
          ) : null}
          {submitted.to ? (
            <>
              {" "}
              to <strong>{submitted.to}</strong>
            </>
          ) : null}{" "}
          has reached the office. We will reply on WhatsApp at {submitted.phone} within two days
          with what to bring and where to report.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <StatusChip status="awaiting_confirmation" />
          <span className="text-sm text-ink-2">
            Reference <strong className="text-ink">{SAMPLE_REFERENCE}</strong>
          </span>
        </div>
        <Button variant="outline-saffron" onClick={() => setSubmitted(null)} className="self-start">
          Sign up another volunteer
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card rounded-[22px] p-6 md:p-8 flex flex-col gap-4"
      aria-labelledby="volunteer-form-title"
    >
      <h3 id="volunteer-form-title" className="text-[24px]">
        Volunteer sign-up
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="v-name" className="label">
            Your name
          </label>
          <input
            id="v-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            minLength={2}
            className="input bg-ivory!"
          />
        </div>
        <div>
          <label htmlFor="v-phone" className="label">
            WhatsApp number
          </label>
          <input
            id="v-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91"
            pattern="^\+?[0-9 \-]{8,16}$"
            title="Enter a phone number with country code, e.g. +91 98765 43210"
            className="input bg-ivory!"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="v-from" className="label">
            From
          </label>
          <input id="v-from" name="from" type="date" required className="input bg-ivory!" />
        </div>
        <div>
          <label htmlFor="v-to" className="label">
            To
          </label>
          <input id="v-to" name="to" type="date" required className="input bg-ivory!" />
        </div>
      </div>
      <div>
        <label htmlFor="v-seva" className="label">
          Seva you would like
        </label>
        <select id="v-seva" name="seva" required className="input bg-ivory!">
          {sevaOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" variant="night" size="lg" block>
        <Send size={18} aria-hidden /> Send sign-up
      </Button>
      <p className="text-[13px] text-ink-2">
        The office replies on WhatsApp within two days with what to bring and where to report.
      </p>
    </form>
  );
}
