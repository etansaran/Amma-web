"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  sanskritLabel?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  sanskritLabel,
  title,
  subtitle,
  center = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`mb-12 ${center ? "text-center" : ""}`}
    >
      {sanskritLabel && (
        <p className="font-devanagari text-[#D4A853]/60 text-sm tracking-[0.3em] uppercase mb-3">
          {sanskritLabel}
        </p>
      )}
      <h2
        className={`font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light
            ? "text-[#F5F5F5]"
            : "bg-gradient-to-r from-[#D4A853] via-[#F5F5F5] to-[#D4A853] bg-clip-text text-transparent"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl leading-relaxed font-raleway ${
            center ? "mx-auto" : ""
          } ${light ? "text-[#F5F5F5]/70" : "text-[#F5F5F5]/60"}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-px bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent ${
          center ? "mx-auto w-32" : "w-24"
        }`}
      />
    </motion.div>
  );
}
