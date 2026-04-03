"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const usageData = [
  { label: "Annadhanam (Free Meals)", percentage: 45, color: "#C17F4A" },
  { label: "Temple Maintenance", percentage: 20, color: "#D4A853" },
  { label: "Ashram Construction", percentage: 20, color: "#8B6914" },
  { label: "Community Programs", percentage: 10, color: "#D4AD58" },
  { label: "Operations", percentage: 5, color: "#6B5010" },
];

export default function TransparencySection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          sanskritLabel="पारदर्शिता • Transparency"
          title="Where Your Donations Go"
          subtitle="We believe complete transparency is a sacred duty. Every rupee entrusted to us is used with highest integrity."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Progress bars */}
          <div className="space-y-5">
            {usageData.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between mb-1.5">
                  <span className="text-[#F5F5F5]/70 text-sm font-raleway">{item.label}</span>
                  <span className="font-cinzel font-semibold text-sm" style={{ color: item.color }}>
                    {item.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info cards */}
          <div className="space-y-4">
            {[
              {
                icon: "📊",
                title: "Annual Reports",
                desc: "Full financial statements published yearly with third-party audit.",
              },
              {
                icon: "🏛️",
                title: "Registered Trust",
                desc: "Legally registered charitable trust under Indian trust laws. 80G tax exemption available.",
              },
              {
                icon: "🙏",
                title: "Volunteer-Driven",
                desc: "95% of Ashram work is done by devoted volunteers — minimizing overhead costs.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 bg-[#111] border border-[#D4A853]/15 rounded-xl p-4"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-cinzel text-[#D4A853] text-sm font-semibold mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[#F5F5F5]/50 text-xs font-raleway leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
