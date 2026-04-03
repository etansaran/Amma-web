"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPreview() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 sacred-pattern" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto">
              <div className="w-full h-full bg-gradient-to-b from-[#141414] via-[#222222] to-[#0D0D0D] flex items-center justify-center">
                <div className="text-center p-10">
                  <div className="text-8xl mb-4">🕉</div>
                  <p className="font-cinzel text-[#D4A853]/60 text-sm">
                    {a.title1} {a.title2}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl border border-[#D4A853]/20" />
              <div className="absolute inset-0 rounded-3xl"
                style={{ boxShadow: "inset 0 0 60px rgba(212,168,83,0.1)" }} />
            </div>

            {/* Quote card */}
            <div className="absolute -right-4 top-1/4 bg-gradient-to-br from-[#222222] to-[#111] border border-[#D4A853]/25 rounded-2xl p-5 max-w-[220px] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <p className="font-cinzel text-[#D4A853] text-2xl mb-1">&ldquo;</p>
              <p className="font-raleway text-[#F5F5F5]/80 text-xs italic leading-relaxed">
                Divine grace flows through every act of love and service.
              </p>
              <p className="font-cinzel text-[#D4A853]/60 text-xs mt-2">— Amma</p>
            </div>

            {/* Years badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="absolute -left-4 bottom-12 bg-gradient-to-br from-[#C17F4A] to-[#D4A853] rounded-2xl p-4 shadow-[0_0_30px_rgba(193,127,74,0.4)]"
            >
              <p className="font-cinzel text-white font-bold text-2xl text-center">{a.badge}</p>
              <p className="font-raleway text-white/80 text-xs text-center">{a.badgeLabel1}</p>
              <p className="font-raleway text-white/80 text-xs text-center">{a.badgeLabel2}</p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="text-[#D4A853]/60 text-sm tracking-[0.3em] uppercase mb-3 font-raleway">
              {a.label}
            </p>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#D4A853] to-[#F5F5F5] bg-clip-text text-transparent">
                {a.title1}
              </span>
              <br />
              <span className="text-[#F5F5F5]/90 text-3xl md:text-4xl">{a.title2}</span>
            </h2>

            <p className="text-[#F5F5F5]/60 font-raleway leading-relaxed mb-5 text-base">
              {a.desc1}
            </p>
            <p className="text-[#F5F5F5]/60 font-raleway leading-relaxed mb-8 text-base">
              {a.desc2}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {a.highlights.map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-[#D4A853]/5 border border-[#D4A853]/15 rounded-xl p-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-[#D4A853] font-cinzel text-sm font-semibold">{item.value}</p>
                    <p className="text-[#F5F5F5]/50 text-xs font-raleway">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button href="/about" variant="primary" size="lg">
              {a.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
