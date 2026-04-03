"use client";

import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  location: string;
  country: string;
  flag: string;
  testimonial: string;
  index?: number;
}

export default function TestimonialCard({
  name,
  location,
  country,
  flag,
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl border border-[#D4A853]/15 bg-gradient-to-b from-[#111] to-[#0d0d0d] p-6 card-hover"
    >
      {/* Quote mark */}
      <div className="absolute top-4 right-5 font-cinzel text-6xl text-[#D4A853]/10 leading-none select-none">
        &ldquo;
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-[#D4A853] text-sm">★</span>
        ))}
      </div>

      <p className="text-[#F5F5F5]/70 text-sm font-raleway leading-relaxed mb-5 italic">
        &ldquo;{testimonial}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#D4A853]/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C17F4A]/30 to-[#D4A853]/20 border border-[#D4A853]/20 flex items-center justify-center font-cinzel text-[#D4A853] font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-raleway text-[#F5F5F5] font-semibold text-sm">{name}</p>
          <p className="font-raleway text-[#F5F5F5]/40 text-xs">
            {flag} {location}, {country}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
