"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const schedule = [
  { time: "5:30 AM", event: "Suprabhatham — Morning wake-up hymns", icon: "🌅" },
  { time: "6:00 AM", event: "Abhishekam — Sacred ablution of Shiva Lingam", icon: "🏺" },
  { time: "8:00 AM", event: "Morning Pooja & Arati", icon: "🪔" },
  { time: "12:00 PM", event: "Annadhanam begins — Witness the sacred feeding", icon: "🍛" },
  { time: "5:30 PM", event: "Evening Thiyanam session", icon: "🧘" },
  { time: "6:30 PM", event: "Deepa Arati — Lamp offering ceremony", icon: "✨" },
  { time: "7:00 PM", event: "Bhajan & Devotional singing", icon: "🎶" },
  { time: "Every Friday 7 PM", event: "Satsang with Amma — Live Q&A", icon: "💫" },
];

export default function LiveDarshanPage() {
  const youtubeId = process.env.NEXT_PUBLIC_YOUTUBE_LIVE_ID || "dQw4w9WgXcQ";

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-red-500"
            />
            <span className="text-red-400 font-raleway text-sm font-semibold uppercase tracking-widest">
              Live 24/7
            </span>
          </div>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-shimmer">Live Darshan</span>
          </h1>
          <p className="text-[#F5F5F5]/60 font-raleway text-lg max-w-2xl mx-auto leading-relaxed">
            The grace of Arunachala knows no geographical boundary. No matter where you are
            in the world, this sacred stream brings the divine directly to you.
          </p>
        </motion.div>

        {/* Live stream embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-[#D4A853]/20 mb-16 shadow-[0_0_60px_rgba(212,168,83,0.1)]"
        >
          <div className="aspect-video bg-gradient-to-br from-[#222222] to-[#0D0D0D] relative">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Amma Ashram Live Darshan"
            />
            {/* Overlay for when no stream is active */}
          </div>
          <div className="bg-gradient-to-r from-[#0A1208] to-[#111] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-cinzel text-[#D4A853] font-semibold">Siva Sri Thiyaneswar Amma Ashram</p>
              <p className="text-[#F5F5F5]/40 text-sm font-raleway">Thiruvannamalai, Tamil Nadu • IST (UTC+5:30)</p>
            </div>
            <div className="flex gap-3">
              <Button href="/donate" variant="primary" size="sm">Offer Seva</Button>
              <Button href="/appointment" variant="outline" size="sm">Book Darshan</Button>
            </div>
          </div>
        </motion.div>

        {/* Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-cinzel text-2xl font-bold text-[#D4A853] mb-6">
              Daily Sacred Schedule
            </h2>
            <div className="space-y-3">
              {schedule.map((item, i) => (
                <motion.div
                  key={item.event}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#111] border border-[#D4A853]/12 hover:border-[#D4A853]/30 transition-colors duration-200"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="font-cinzel text-[#D4A853] text-sm font-semibold">{item.time}</p>
                    <p className="text-[#F5F5F5]/60 text-xs font-raleway">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-cinzel text-2xl font-bold text-[#D4A853]">
              Connect Spiritually
            </h2>
            <p className="text-[#F5F5F5]/60 font-raleway text-sm leading-relaxed">
              Distance is no barrier to divine grace. Through our live stream, thousands
              of devotees across 50+ countries begin and end their day with Amma&apos;s
              presence. Many report profound experiences of peace and connection even
              through the screen.
            </p>
            <p className="text-[#F5F5F5]/60 font-raleway text-sm leading-relaxed">
              We recommend: Set aside a clean, quiet space. Light a lamp or incense if you
              have them. Sit comfortably. Let your presence be your offering.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "🌍", title: "50+ Countries", desc: "Devotees watching from across the globe daily" },
                { icon: "📱", title: "Mobile Friendly", desc: "Watch from any device, anywhere, anytime" },
                { icon: "🔔", title: "Subscribe for Alerts", desc: "Get notified before special live events" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-[#111] border border-[#D4A853]/12">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-cinzel text-[#D4A853] text-sm font-semibold">{item.title}</h4>
                    <p className="text-[#F5F5F5]/50 text-xs font-raleway">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button href="/virtual-seva" variant="primary" fullWidth>
              Book Virtual Pooja / Seva
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
