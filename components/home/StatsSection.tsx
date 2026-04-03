"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useLanguage } from "@/context/LanguageContext";

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { t } = useLanguage();
  const stats = t.stats;

  return (
    <section ref={ref} className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/30 via-[#222222]/50 to-[#141414]/30" />
      <div className="absolute inset-0 border-y border-[#D4A853]/10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="text-center"
            >
              <p className="text-3xl mb-2">{stat.icon}</p>
              <div className="font-cinzel text-4xl md:text-5xl font-bold text-gold-shimmer mb-1">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={1.5}
                    separator=","
                    suffix={stat.suffix}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <p className="text-[#F5F5F5]/50 text-sm font-raleway">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
