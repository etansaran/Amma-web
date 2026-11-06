"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, Send } from "lucide-react";

/**
 * Pournami reminders sign-up (front-end only for now, brief rule 6).
 * Local state, HTML validation, then a confirmation line.
 */
export function SubscribeForm() {
  const [contact, setContact] = useState("");
  const [language, setLanguage] = useState("ta");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p
        role="status"
        className="flex items-start gap-3 rounded-card border border-night-line bg-night-2 px-5 py-4 text-on-night"
      >
        <CircleCheck size={22} className="text-gold-light shrink-0 mt-0.5" aria-hidden />
        <span>
          Thank you. Your request is noted; the ashram office will add{" "}
          <strong className="text-on-night-head">{contact}</strong> to the Pournami reminder list
          once messaging is connected. You will get at most two messages a month.
        </span>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap gap-2.5 w-full">
      <label className="flex-[1_1_240px] min-w-0">
        <span className="sr-only">WhatsApp number or email</span>
        <input
          type="text"
          name="contact"
          required
          minLength={6}
          autoComplete="email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="WhatsApp number or email"
          className="input rounded-pill! bg-night-2! border-night-line! text-on-night! placeholder:text-on-night-2"
        />
      </label>
      <label className="flex-[0_1_auto]">
        <span className="sr-only">Language</span>
        <select
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="input rounded-pill! bg-night-2! border-night-line! text-on-night! w-auto! pr-10"
        >
          <option value="ta">தமிழ்</option>
          <option value="en">English</option>
          <option value="te">తెలుగు</option>
          <option value="hi">हिन्दी</option>
        </select>
      </label>
      <button type="submit" className="btn btn-saffron">
        <Send size={16} aria-hidden /> Subscribe
      </button>
    </form>
  );
}
