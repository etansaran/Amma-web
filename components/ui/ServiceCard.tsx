"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ServiceCardProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  schedule?: string;
  href: string;
  index?: number;
}

export default function ServiceCard({
  icon,
  title,
  subtitle,
  description,
  schedule,
  href,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="group relative"
    >
      <Link href={href} className="block">
        <div className="relative rounded-2xl border border-[#D4A853]/20 bg-gradient-to-b from-[#222222] to-[#0D0D0D] overflow-hidden p-8 card-hover">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-radial from-[#D4A853]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Sacred geometry corner */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.04]"
            style={{
              background: "conic-gradient(from 45deg, #D4A853, transparent, #C17F4A, transparent, #D4A853)",
              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            }}
          />

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C17F4A]/20 to-[#D4A853]/10 border border-[#D4A853]/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_25px_rgba(212,168,83,0.25)] transition-shadow duration-300"
            >
              <span className="text-3xl">{icon}</span>
            </motion.div>

            <p className="text-[#C17F4A]/80 text-xs font-raleway tracking-widest uppercase mb-1">
              {subtitle}
            </p>
            <h3 className="font-cinzel text-[#F5F5F5] text-xl font-bold mb-3 group-hover:text-[#D4A853] transition-colors">
              {title}
            </h3>
            <p className="text-[#F5F5F5]/50 text-sm font-raleway leading-relaxed mb-4">
              {description}
            </p>

            {schedule && (
              <div className="flex items-center gap-2 text-[#D4A853]/70 text-xs font-raleway border-t border-[#D4A853]/10 pt-4 mt-4">
                <span>🕐</span>
                <span>{schedule}</span>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-[#D4A853] text-sm font-semibold font-raleway group-hover:gap-3 transition-all duration-200">
              Learn More
              <span>→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
