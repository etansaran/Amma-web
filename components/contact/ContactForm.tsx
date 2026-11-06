"use client";

import { useRef, useState, type FormEvent } from "react";
import { CircleCheck, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StepTransition } from "@/components/ui/StepTransition";
import { FormField } from "@/components/ui/FormField";
import { SelectInput } from "@/components/ui/SelectInput";
import { useMotionPreference } from "@/components/motion/MotionProvider";

const TOPICS = [
  "Volunteering",
  "Annadhanam groceries",
  "Classes & satsang",
  "Donation receipt",
  "Media & press",
  "Something else",
];
const LANGUAGES = ["தமிழ்", "English", "తెలుగు", "हिन्दी"];

type Message = {
  name: string;
  contact: string;
  topic: string;
  language: string;
  message: string;
  consent: boolean;
};

const initial: Message = {
  name: "",
  contact: "",
  topic: TOPICS[0],
  language: LANGUAGES[1],
  message: "",
  consent: false,
};

export function ContactForm() {
  const { enabled: motionEnabled } = useMotionPreference();
  const panelRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [data, setData] = useState<Message>(initial);

  function update<K extends keyof Message>(key: K, value: Message[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function scrollToPanel() {
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: motionEnabled ? "smooth" : "auto",
        block: "start",
      });
    });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    scrollToPanel();
  }

  function reset() {
    setData(initial);
    setSent(false);
    scrollToPanel();
  }

  return (
    <div ref={panelRef} className="card rounded-[22px] p-5 sm:p-7 md:p-8 scroll-mt-[110px]">
      <StepTransition stepKey={sent ? "sent" : "form"} direction={sent ? 1 : -1}>
        {!sent ? (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <FormField id="c-name" label="Name" className="flex-[1_1_220px]">
                <input
                  id="c-name"
                  type="text"
                  className="input"
                  autoComplete="name"
                  required
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </FormField>
              <FormField id="c-contact" label="WhatsApp or email" className="flex-[1_1_220px]">
                <input
                  id="c-contact"
                  type="text"
                  className="input"
                  autoComplete="on"
                  required
                  value={data.contact}
                  onChange={(e) => update("contact", e.target.value)}
                />
              </FormField>
            </div>
            <div className="flex flex-wrap gap-4">
              <FormField id="c-topic" label="Topic" className="flex-[1_1_220px]">
                <SelectInput
                  id="c-topic"
                  value={data.topic}
                  onChange={(e) => update("topic", e.target.value)}
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </SelectInput>
              </FormField>
              <FormField id="c-lang" label="Reply in" className="flex-[1_1_220px]">
                <SelectInput
                  id="c-lang"
                  value={data.language}
                  onChange={(e) => update("language", e.target.value)}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </SelectInput>
              </FormField>
            </div>
            <FormField id="c-msg" label="Message" className="flex-auto">
              <textarea
                id="c-msg"
                rows={4}
                className="textarea"
                required
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </FormField>
            <label className="inline-flex items-start gap-2.5 text-sm text-ink-2 cursor-pointer min-h-11">
              <input
                type="checkbox"
                className="accent-saffron w-4 h-4 mt-1 shrink-0"
                required
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
              />
              <span>
                I agree that the ashram office may store this message and reply to me on the
                WhatsApp number or email I gave.
              </span>
            </label>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
              <p className="text-[13px] text-ink-2 flex items-start gap-2">
                <ShieldCheck size={16} aria-hidden className="shrink-0 mt-0.5" />
                Protected by a privacy-friendly captcha. We never share your details.
              </p>
              <Button type="submit" variant="night" size="lg">
                <Send size={18} aria-hidden /> Send message
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-start gap-4" role="status">
            <span className="w-16 h-16 rounded-full bg-green-bg border-2 border-green-text inline-flex items-center justify-center text-green-text">
              <CircleCheck size={30} strokeWidth={2.2} aria-hidden />
            </span>
            <h3 className="font-display text-[26px] md:text-[28px] leading-tight">
              Message sent. Thank you, {data.name}.
            </h3>
            <p className="text-ink-2 max-w-[560px]">
              The office replies within two working days, in {data.language}, on the WhatsApp number
              or email you gave. For visits and poojas, the booking pages are faster.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/book-a-visit">Book a visit</Button>
              <Button href="/pooja-booking" variant="outline-night">
                Book a pooja
              </Button>
              <button
                type="button"
                onClick={reset}
                className="min-h-11 px-4 rounded-pill font-semibold text-[15px] text-saffron-text hover:text-saffron-dark"
              >
                Send another message
              </button>
            </div>
            <p className="text-[13px] text-ink-2">
              Preview: this sample message has not reached the office yet — the contact service is
              not connected.
            </p>
          </div>
        )}
      </StepTransition>
    </div>
  );
}
