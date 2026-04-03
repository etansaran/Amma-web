"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import DonationCard from "@/components/ui/DonationCard";

const donationCategories = [
  {
    icon: "🍛",
    title: "Daily Annadhanam",
    description:
      "Sponsor a day of free meals for 100+ pilgrims, devotees, and the underprivileged at the Ashram. Every meal is prepared with love and offered as prasad.",
    impact: "Feeds 100+ people for one full day",
    amount: 2500,
    category: "annadhanam",
  },
  {
    icon: "🌕",
    title: "Pournami Annadhanam",
    description:
      "On sacred full moon days (Pournami), hundreds more devotees gather. Sponsor this special feast and earn manifold blessings on this auspicious occasion.",
    impact: "Feeds 500+ devotees on full moon day",
    amount: 10000,
    category: "pournami",
  },
  {
    icon: "🪔",
    title: "Karthigai Deepam",
    description:
      "The grandest festival at Thiruvannamalai. Sponsor the sacred lamp lighting ceremony and be part of the divine illumination that represents Lord Shiva's grace.",
    impact: "Lights the sacred Girivalam lamps",
    amount: 5000,
    category: "karthigai-deepam",
  },
  {
    icon: "🏛️",
    title: "Ashram Construction",
    description:
      "Help us build a larger meditation hall, pilgrim accommodation, and Annadhanam kitchen to serve more souls. Your contribution creates a lasting sacred space.",
    impact: "Builds permanent spiritual infrastructure",
    amount: 11000,
    category: "construction",
  },
];

export default function DonationSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#0A1208] to-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          sanskritLabel="दान • Dāna"
          title="Offer Your Seva"
          subtitle="Dana (giving) is one of the highest spiritual practices. Your generous offering directly transforms lives and creates divine merit."
        />

        {/* Emotional trigger */}
        <div className="max-w-3xl mx-auto mb-12 bg-gradient-to-r from-[#141414]/30 via-[#222222]/50 to-[#141414]/30 border border-[#D4A853]/15 rounded-2xl p-6 text-center">
          <p className="font-cinzel text-[#D4A853] text-sm tracking-widest uppercase mb-2">
            Every Contribution Matters
          </p>
          <p className="text-[#F5F5F5]/60 font-raleway text-base leading-relaxed">
            A single meal donated here feeds not just the body, but the soul.
            Many pilgrims travel barefoot for days to reach Arunachala — your
            donation ensures they are received with love, warmth, and nourishment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {donationCategories.map((item, i) => (
            <DonationCard key={item.title} {...item} index={i} />
          ))}
        </div>

        {/* Custom donation CTA */}
        <div className="text-center">
          <p className="text-[#F5F5F5]/50 font-raleway text-sm mb-4">
            Want to donate a custom amount or in a different currency?
          </p>
          <a
            href="/donate"
            className="inline-flex items-center gap-2 text-[#D4A853] font-semibold font-raleway hover:underline text-sm"
          >
            Explore all donation options →
          </a>
        </div>
      </div>
    </section>
  );
}
