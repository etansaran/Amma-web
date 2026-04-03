"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#222222] via-[#0D0D0D] to-[#0D0D0D]" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="#D4A853" strokeWidth="0.5" fill="none">
            <circle cx="400" cy="400" r="350" />
            <circle cx="400" cy="400" r="280" />
            <circle cx="400" cy="400" r="200" />
            <circle cx="400" cy="400" r="120" />
            <polygon points="400,50 700,600 100,600" />
            <polygon points="400,750 700,200 100,200" />
            <ellipse cx="560" cy="240" rx="50" ry="25" />
            <ellipse cx="617" cy="400" rx="50" ry="25" transform="rotate(45,617,400)" />
            <ellipse cx="560" cy="560" rx="50" ry="25" transform="rotate(90,560,560)" />
            <ellipse cx="400" cy="617" rx="50" ry="25" transform="rotate(135,400,617)" />
            <ellipse cx="240" cy="560" rx="50" ry="25" />
            <ellipse cx="183" cy="400" rx="50" ry="25" transform="rotate(45,183,400)" />
            <ellipse cx="240" cy="240" rx="50" ry="25" />
            <ellipse cx="400" cy="183" rx="50" ry="25" transform="rotate(135,400,183)" />
          </g>
        </svg>
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(193,127,74,0.12) 0%, rgba(212,168,83,0.08) 30%, transparent 70%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24">

        {/* Tamil caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="mb-4"
        >
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#C17F4A] via-[#F5E6C8] to-[#D4A853] text-xl sm:text-2xl font-semibold tracking-[0.12em]">
            {h.caption}
          </span>
        </motion.div>

        {/* Flame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="flex justify-center mb-5"
        >
          <span className="text-7xl flame-flicker select-none">🔥</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
        >
          <span className="bg-gradient-to-r from-[#D4A853] via-[#F5F5F5] to-[#D4A853] bg-clip-text text-transparent">
            {h.title1}
          </span>
          <br />
          <span className="text-[#F5F5F5]/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {h.title2}
          </span>
        </motion.h1>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="text-[#D4A853]/70 font-cinzel text-lg sm:text-xl tracking-[0.2em] uppercase mb-5"
        >
          {h.location}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="font-raleway text-[#F5F5F5]/70 text-base sm:text-lg max-w-2xl mx-auto mb-3 leading-relaxed"
        >
          {h.tagline}
        </motion.p>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.22 }}
          className="font-cinzel text-[#C17F4A]/80 text-base tracking-[0.2em] uppercase mb-10"
        >
          {h.quote}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/about" variant="primary" size="lg">
            {h.cta1}
          </Button>
          <Button href="/live-darshan" variant="outline" size="lg">
            {h.cta2}
          </Button>
          <Button href="/donate" variant="secondary" size="lg">
            {h.cta3}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
