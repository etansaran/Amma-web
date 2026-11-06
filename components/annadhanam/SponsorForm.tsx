"use client";

import { useState, type ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { site, rupees } from "@/lib/site";

const occasions = ["Birthday", "Wedding anniversary", "In memory of", "Gratitude", "Other"];

type Tier = "day" | "half" | "any";

/** "Offer a day's annadhanam" — front-end only; payment opens when Razorpay is connected. */
export function SponsorForm() {
  const [tier, setTier] = useState<Tier>("day");

  const tiers: { id: Tier; label: ReactNode }[] = [
    {
      id: "day",
      label: (
        <>
          One day · {rupees(site.annadhanam.dailyCost)}
        </>
      ),
    },
    { id: "half", label: `Half day · ${rupees(site.annadhanam.dailyCost / 2)}` },
    { id: "any", label: "Any amount" },
  ];

  return (
    <form
      className="card rounded-[22px] p-6 md:p-8 flex flex-col gap-4"
      aria-labelledby="sponsor-form-title"
      onSubmit={(e) => e.preventDefault()}
    >
      <h3 id="sponsor-form-title" className="text-[24px]">
        Offer a day's annadhanam
      </h3>
      <div>
        <label htmlFor="an-name" className="label">
          Offered in the name of
        </label>
        <input
          id="an-name"
          name="name"
          type="text"
          placeholder="Name of the person"
          autoComplete="off"
          className="input bg-ivory!"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="an-date" className="label">
            Date
          </label>
          <input id="an-date" name="date" type="date" className="input bg-ivory!" />
        </div>
        <div>
          <label htmlFor="an-occ" className="label">
            Occasion
          </label>
          <select id="an-occ" name="occasion" className="input bg-ivory!">
            {occasions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="an-amt" className="label">
          Contribution
        </label>
        <div className="flex flex-wrap gap-2.5 mb-2.5" role="group" aria-label="Contribution size">
          {tiers.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={tier === t.id}
              onClick={() => setTier(t.id)}
              className={cn(
                "h-11 px-[18px] rounded-pill text-[15px] font-semibold transition-colors",
                tier === t.id
                  ? "border-2 border-saffron bg-[#FFF4E6] text-ink"
                  : "border border-line-2 bg-white text-ink hover:border-gold",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <input
          id="an-amt"
          name="amount"
          type="number"
          min={1}
          inputMode="numeric"
          placeholder="₹ amount"
          className="input bg-ivory!"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="an-phone" className="label">
            WhatsApp number
          </label>
          <input
            id="an-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91"
            className="input bg-ivory!"
          />
        </div>
        <div>
          <label htmlFor="an-email" className="label">
            Email for receipt
          </label>
          <input
            id="an-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input bg-ivory!"
          />
        </div>
      </div>
      <Button type="submit" size="lg" block disabled className="disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none">
        Continue to secure payment
      </Button>
      <p className="text-[13px] text-amber-text">Online payment opens when Razorpay is connected.</p>
      <p className="text-[13px] text-ink-2 flex items-center gap-2">
        <Lock size={14} aria-hidden /> Payments by Razorpay · UPI, cards, net banking · nothing is
        stored on this site
      </p>
    </form>
  );
}
