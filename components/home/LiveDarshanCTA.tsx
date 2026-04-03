"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function LiveDarshanCTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl overflow-hidden border border-[#D4A853]/20"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#222222] to-[#0d0d0d]" />

          {/* Sacred geometry overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
              <circle cx="200" cy="100" r="150" fill="none" stroke="#D4A853" strokeWidth="0.5" />
              <circle cx="200" cy="100" r="100" fill="none" stroke="#D4A853" strokeWidth="0.5" />
              <polygon points="200,10 340,160 60,160" fill="none" stroke="#D4A853" strokeWidth="0.5" />
              <polygon points="200,190 60,40 340,40" fill="none" stroke="#D4A853" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-[#C17F4A] to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-[#C17F4A]/10 pointer-events-none" />

          <div className="relative z-10 py-16 px-8 md:px-16 text-center">
            {/* Live indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-red-500"
              />
              <span className="text-red-400 font-raleway text-sm font-semibold uppercase tracking-widest">
                Live Darshan Available
              </span>
            </div>

            <h2 className="font-cinzel text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gold-shimmer">Experience Sacred Presence</span>
            </h2>
            <p className="text-[#F5F5F5]/60 font-raleway text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              No matter where you are in the world, connect with Amma&apos;s divine
              energy through our live stream. Witness the sacred morning rituals,
              receive blessings, and feel the presence of Arunachala.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/live-darshan" variant="primary" size="lg">
                🔴 Watch Live Darshan
              </Button>
              <Button href="/appointment" variant="outline" size="lg">
                Book Personal Darshan
              </Button>
            </div>

            {/* Schedule */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {[
                { time: "6:00 AM", event: "Suprabhatham" },
                { time: "8:00 AM", event: "Morning Pooja" },
                { time: "6:00 PM", event: "Evening Aarti" },
                { time: "8:00 PM", event: "Satsang" },
              ].map((item) => (
                <div
                  key={item.event}
                  className="bg-[#D4A853]/10 border border-[#D4A853]/20 rounded-xl px-4 py-2 text-center"
                >
                  <p className="text-[#D4A853] font-cinzel text-sm font-semibold">{item.time}</p>
                  <p className="text-[#F5F5F5]/50 text-xs font-raleway">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
