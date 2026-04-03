"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import DonationCard from "@/components/ui/DonationCard";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";

const donationItems = [
  {
    icon: "🍛",
    title: "Daily Annadhanam",
    description:
      "Sponsor one full day of Annadhanam — ensuring 300–500 pilgrims and devotees receive a wholesome, lovingly prepared meal blessed by Amma.",
    impact: "Feeds 300–500 people for one day",
    amount: 2500,
    category: "annadhanam",
  },
  {
    icon: "🌕",
    title: "Pournami Annadhanam",
    description:
      "Full moon days draw thousands to Arunachala's Girivalam. Sponsor the special Pournami feast and earn immeasurable blessings on this auspicious day.",
    impact: "Feeds 500+ devotees on full moon day",
    amount: 10000,
    category: "pournami",
  },
  {
    icon: "🪔",
    title: "Karthigai Deepam Feast",
    description:
      "The grandest festival of Thiruvannamalai. Tens of thousands arrive. Sponsor the great feast during Karthigai Deepam and share in the divine celebration.",
    impact: "Feeds 1000+ devotees during Deepam",
    amount: 25000,
    category: "karthigai-deepam",
  },
  {
    icon: "🌾",
    title: "Monthly Annadhanam",
    description:
      "Become a monthly patron of Annadhanam. Your recurring contribution ensures consistent, unbroken service to all who come to Arunachala.",
    impact: "Continuous daily feeding all month",
    amount: 5000,
    category: "annadhanam",
  },
];

const impactStats = [
  { value: "500+", label: "Meals Served Daily", icon: "🍽️" },
  { value: "365", label: "Days Per Year — No Exceptions", icon: "📅" },
  { value: "25+", label: "Years of Unbroken Service", icon: "🕉" },
  { value: "Free", label: "No One Is Ever Turned Away", icon: "🙏" },
];

export default function AnnadhanamPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-20"
        >
          <p className="font-devanagari text-[#D4A853]/60 tracking-[0.4em] text-sm mb-4">
            अन्नदानम् • Annadānam
          </p>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-shimmer">Sacred Feeding</span>
          </h1>
          <p className="text-[#F5F5F5]/60 font-raleway text-lg max-w-3xl mx-auto leading-relaxed">
            &ldquo;Annam Parabrahma Swaroopam&rdquo; — Food is the very form of the Supreme.
            To feed the hungry is to serve God directly. For over 25 years, not a single day
            has passed without Amma&apos;s Ashram offering free meals to all who come.
          </p>
        </motion.div>

        {/* Impact stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-[#D4A853]/15 bg-[#111]/70"
            >
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="font-cinzel text-[#D4A853] text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-[#F5F5F5]/50 text-xs font-raleway">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-[#D4A853] mb-5">
              The Story Behind Every Meal
            </h2>
            <div className="space-y-4 text-[#F5F5F5]/65 font-raleway text-sm leading-relaxed">
              <p>
                When Amma founded the Ashram in 1998, she made one unshakeable promise: that anyone
                who came to the sacred land of Arunachala would receive a meal. Not sometimes.
                Every day. Without exception. Without condition.
              </p>
              <p>
                The pilgrims who come here are not tourists. Many are elderly devotees on their
                final pilgrimage. Many are poor villagers walking barefoot for Girivalam.
                Many are seekers who have left everything in search of God. For all of them,
                the Ashram&apos;s kitchen is a mother&apos;s home.
              </p>
              <p>
                Every meal begins with prayer. Every grain of rice is handled with awareness
                that this is divine service. The food is simple, wholesome, and lovingly made
                by dedicated volunteers. It is offered first to Lord Shiva on the altar, and
                then given as prasad — sacred, blessed food — to all who come.
              </p>
              <p>
                Your donation keeps this flame alive. ₹2,500 feeds hundreds of souls for
                an entire day. The merit earned through Annadhanam is, in the Shaiva
                tradition, considered one of the highest acts a human being can perform.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Process */}
            {[
              { step: "1", title: "Preparation begins at 9 AM", desc: "Devoted volunteers prepare rice, sambar, vegetables, and chutneys with prayer and love." },
              { step: "2", title: "Offered to the divine at 11 AM", desc: "The full meal is first placed before the Shiva Lingam on the altar and blessed by Amma." },
              { step: "3", title: "Served as prasad from 12 PM", desc: "Everyone receives the same meal — the rich and poor, the learned and the simple, all equal before the divine." },
              { step: "4", title: "No one is turned away", desc: "Even if materials run short, Amma's commitment never wavers. The kitchen somehow always has enough." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 rounded-xl bg-[#111] border border-[#D4A853]/12">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C17F4A] to-[#D4A853] flex items-center justify-center text-white font-cinzel font-bold text-sm shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-cinzel text-[#D4A853] text-sm font-semibold mb-1">{item.title}</h4>
                  <p className="text-[#F5F5F5]/50 text-xs font-raleway">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Donation cards */}
        <SectionHeader
          sanskritLabel="दान • Dāna"
          title="Sponsor Annadhanam"
          subtitle="Choose how you'd like to support this sacred service. Every offering — big or small — is received with equal gratitude."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {donationItems.map((item, i) => (
            <DonationCard key={item.title} {...item} index={i} />
          ))}
        </div>

        <div className="text-center mt-6">
          <Button href="/donate" variant="primary" size="lg">
            Donate & Earn Divine Merit
          </Button>
        </div>
      </div>
    </div>
  );
}
