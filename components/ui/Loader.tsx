"use client";

import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#0D0D0D] z-[100] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border border-[#D4A853]/20 animate-spin-slow absolute inset-0" />
          {/* Inner flame */}
          <div className="w-20 h-20 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 0.95, 1.05, 1],
                opacity: [0.8, 1, 0.9, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl flame-flicker"
            >
              🕉
            </motion.div>
          </div>
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-[#D4A853]/10 blur-xl animate-glow-pulse" />
        </div>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-cinzel text-[#D4A853]/80 text-sm tracking-widest uppercase"
        >
          Om Namah Shivaya
        </motion.p>
      </motion.div>
    </div>
  );
}

export function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-[#D4A853]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#D4A853]/10 overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
      </div>
    </div>
  );
}
