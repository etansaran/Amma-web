"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguagePopup() {
  const { showPopup, setLang } = useLanguage();

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Popup card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-sm bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] rounded-3xl border border-[#D4A853]/30 shadow-[0_0_60px_rgba(212,168,83,0.15)] overflow-hidden">

              {/* Gold top bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#C17F4A] via-[#D4A853] to-[#C17F4A]" />

              {/* Sacred geometry decoration */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <g stroke="#D4A853" strokeWidth="0.5" fill="none">
                    <circle cx="200" cy="200" r="180" />
                    <circle cx="200" cy="200" r="120" />
                    <polygon points="200,20 350,280 50,280" />
                    <polygon points="200,380 350,120 50,120" />
                  </g>
                </svg>
              </div>

              <div className="relative p-8 text-center">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <Image
                    src="/logo.avif"
                    alt="Siva Sri Thiyaneswar Amma Ashram"
                    width={72}
                    height={72}
                    className="rounded-full shadow-[0_0_24px_rgba(193,127,74,0.5)] object-cover"
                  />
                </div>

                {/* Ashram name */}
                <p className="font-cinzel text-[#D4A853] text-sm font-semibold leading-tight mb-1">
                  Siva Sri Thiyaneswar
                </p>
                <p className="font-cinzel text-[#F5F5F5]/60 text-xs leading-tight mb-6">
                  Amma Ashram
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent mb-6" />

                {/* Heading */}
                <h2 className="font-cinzel text-[#F5F5F5] text-lg font-bold mb-1">
                  மொழியை தேர்ந்தெடுங்கள்
                </h2>
                <p className="font-cinzel text-[#F5F5F5]/50 text-xs mb-2">
                  Choose Your Language
                </p>
                <p className="font-raleway text-[#F5F5F5]/40 text-xs mb-7">
                  தொடர விரும்பும் மொழியை தேர்வு செய்யுங்கள்
                </p>

                {/* Language buttons */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Tamil */}
                  <button
                    onClick={() => setLang("ta")}
                    className="group relative flex flex-col items-center gap-2 p-5 rounded-2xl border border-[#D4A853]/20 bg-[#D4A853]/5 hover:bg-[#D4A853]/15 hover:border-[#D4A853]/60 transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-3xl">🙏</span>
                    <span className="font-cinzel text-[#D4A853] text-xl font-bold">தமிழ்</span>
                    <span className="font-raleway text-[#F5F5F5]/50 text-xs">தமிழில் தொடரவும்</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#D4A853]/0 to-[#D4A853]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>

                  {/* English */}
                  <button
                    onClick={() => setLang("en")}
                    className="group relative flex flex-col items-center gap-2 p-5 rounded-2xl border border-[#C17F4A]/20 bg-[#C17F4A]/5 hover:bg-[#C17F4A]/15 hover:border-[#C17F4A]/60 transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-3xl">🌍</span>
                    <span className="font-cinzel text-[#C17F4A] text-xl font-bold">English</span>
                    <span className="font-raleway text-[#F5F5F5]/50 text-xs">Continue in English</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#C17F4A]/0 to-[#C17F4A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                </div>

                {/* Gold bottom divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent mt-7" />
                <p className="font-cinzel text-[#D4A853]/30 text-[10px] tracking-widest mt-4 uppercase">
                  அன்பே சிவம்
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
