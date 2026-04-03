"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const services = [
  {
    id: "thiyanam",
    icon: "🧘",
    color: "#D4A853",
    title: "Thiyanam",
    subtitle: "Sacred Meditation",
    description: `Thiyanam (meditation) is the heart of all spiritual practice at the Ashram. Rooted in the ancient Shaiva tradition, Amma teaches meditation not as mere relaxation but as the direct path to knowing one's true nature.

Each session begins with the recitation of sacred Shaiva mantras that still the mind and open the heart. Practitioners are guided inward — past thought, past sensation — to the silent luminous awareness that is Lord Shiva himself.

Whether you are a complete beginner or an experienced meditator, Amma's Thiyanam sessions meet you exactly where you are. Thousands have experienced profound peace, healing, and glimpses of the Absolute through this practice.`,
    schedule: [
      { time: "5:30 AM", note: "Morning Thiyanam — 60 minutes" },
      { time: "6:00 PM", note: "Evening Thiyanam — 45 minutes" },
      { time: "Fridays 8:00 PM", note: "Deep Thiyanam — 90 minutes with Amma" },
    ],
    benefits: ["Inner peace & stress relief", "Spiritual awakening", "Mental clarity", "Healing of body & mind", "Connection to Arunachala energy"],
  },
  {
    id: "yogam",
    icon: "🪔",
    color: "#C17F4A",
    title: "Yogam",
    subtitle: "Sacred Prayer & Ritual",
    description: `Yogam at the Ashram encompasses the full spectrum of Shaiva devotional practice — from the recitation of Tevaram hymns to elaborate Agamic puja ceremonies, fire rituals (Homam), and Abhishekam (sacred ablution of the Shiva Lingam).

These rituals are not superstition — they are a precise technology for purifying consciousness and invoking divine grace. Each element — the sacred fire, the mantras, the flowers, the incense — corresponds to a layer of the inner being.

Amma personally presides over all major ceremonies. Her presence transforms even a simple lamp-lighting into a profound spiritual experience. Visitors often report a palpable shift in energy, peace, and clarity after attending Yogam.`,
    schedule: [
      { time: "6:00 AM", note: "Suprabhatham & Abhishekam" },
      { time: "8:00 AM", note: "Morning Pooja" },
      { time: "12:00 PM", note: "Madhyana Arati" },
      { time: "6:30 PM", note: "Evening Deepa Arati" },
    ],
    benefits: ["Divine blessing & protection", "Removal of obstacles", "Inner purification", "Community worship", "Festival celebrations"],
  },
  {
    id: "annadhanam",
    icon: "🍛",
    color: "#D4A853",
    title: "Annadhanam",
    subtitle: "Free Sacred Meals",
    description: `Annadhanam — the donation of food — is considered in the Shaiva tradition as the highest form of service. At Amma Ashram, this practice runs unbroken every single day of the year, without exception.

"Annam Brahman" — food is the divine. To feed a hungry person is to worship God directly. At the Ashram, 300–500 meals are served daily to all who come: pilgrims circumambulating Arunachala, the elderly, children, the poor, travelers, and seekers of all backgrounds.

The food is prepared with love, prayer, and strict hygiene by dedicated volunteers. Every meal is first offered to Lord Shiva and then distributed as prasad — sacred food imbued with divine blessing.`,
    schedule: [
      { time: "12:00 PM – 2:00 PM", note: "Daily Annadhanam" },
      { time: "Full Moon Days", note: "Special Pournami feast — 500+ people" },
      { time: "Festival Days", note: "Grand Annadhanam — 1000+ people" },
    ],
    benefits: ["Direct seva to God", "Spiritual merit", "Community building", "Feeding the hungry", "Prasad distribution"],
  },
  {
    id: "satsang",
    icon: "💫",
    color: "#D4AD58",
    title: "Healing Satsang",
    subtitle: "Spiritual Discourse",
    description: `Every Friday evening, Amma holds Satsang — a sacred gathering where she shares her direct experience of the divine through stories, teachings, question-and-answer sessions, and spontaneous silence.

These are not lectures. Amma speaks from direct experience of the Absolute, and her words carry a living energy that touches the heart in ways that bypass the intellect. Many devotees report that a single word from Amma in Satsang was enough to dissolve a lifetime of spiritual confusion.

The Satsangs are live-streamed globally and have attracted listeners from over 50 countries. Recordings are available on our YouTube channel for those unable to attend in person.`,
    schedule: [
      { time: "Friday 7:00 PM – 9:00 PM", note: "Weekly Satsang with Amma" },
      { time: "Special occasions", note: "Extended Satsang on Ekadasi, festival days" },
    ],
    benefits: ["Direct wisdom from Amma", "Q&A with a realized master", "Community of seekers", "Live-streamed worldwide", "Transformative presence"],
  },
];

export default function ServicesContent() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-20"
        >
          <p className="font-devanagari text-[#D4A853]/60 tracking-[0.4em] text-sm mb-4">
            सेवा • Seva
          </p>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-shimmer">Sacred Services</span>
          </h1>
          <p className="text-[#F5F5F5]/60 font-raleway text-lg max-w-2xl mx-auto leading-relaxed">
            Every service offered here is a portal — an opportunity for the divine to touch
            the human and for the human to remember the divine.
          </p>
        </motion.div>

        {/* Services */}
        <div className="space-y-20">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Info side */}
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border"
                    style={{
                      background: `${service.color}15`,
                      borderColor: `${service.color}30`,
                    }}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <p className="font-raleway text-xs tracking-widest uppercase" style={{ color: service.color }}>
                      {service.subtitle}
                    </p>
                    <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-[#F5F5F5]">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {service.description.split("\n\n").map((para, j) => (
                    <p key={j} className="text-[#F5F5F5]/60 font-raleway text-sm leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.benefits.map((b) => (
                    <span
                      key={b}
                      className="text-xs font-raleway px-3 py-1 rounded-full border"
                      style={{ color: service.color, borderColor: `${service.color}30`, background: `${service.color}10` }}
                    >
                      ✦ {b}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button href="/appointment" variant="primary" size="sm">
                    Book a Session
                  </Button>
                  <Button href="/live-darshan" variant="outline" size="sm">
                    Watch Live
                  </Button>
                </div>
              </div>

              {/* Schedule side */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="rounded-2xl border border-[#D4A853]/15 bg-[#111]/70 p-6">
                  <h3 className="font-cinzel text-[#D4A853] font-semibold text-lg mb-4">
                    Schedule
                  </h3>
                  <div className="space-y-3">
                    {service.schedule.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#D4A853]/5 border border-[#D4A853]/10"
                      >
                        <span className="text-[#C17F4A] mt-0.5">🕐</span>
                        <div>
                          <p className="font-cinzel text-[#D4A853] text-sm font-semibold">{item.time}</p>
                          <p className="text-[#F5F5F5]/50 text-xs font-raleway">{item.note}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 p-4 bg-gradient-to-r from-[#141414]/30 to-[#222222]/30 rounded-xl border border-[#C17F4A]/15">
                    <p className="text-[#C17F4A]/80 text-xs font-raleway font-medium mb-1">🌍 Global Access</p>
                    <p className="text-[#F5F5F5]/50 text-xs font-raleway">
                      All sessions are live-streamed for international devotees. Join from anywhere in the world.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
