"use client";

import { motion } from "framer-motion";
import Button from "./Button";

interface DonationCardProps {
  icon: string;
  title: string;
  description: string;
  impact: string;
  amount: number;
  category: string;
  index?: number;
  onDonate?: (category: string, amount: number) => void;
}

export default function DonationCard({
  icon,
  title,
  description,
  impact,
  amount,
  category,
  index = 0,
  onDonate,
}: DonationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-[#D4A853]/20 bg-gradient-to-b from-[#111] to-[#0d0d0d] overflow-hidden card-hover"
    >
      {/* Gold top accent */}
      <div className="h-1 bg-gradient-to-r from-[#C17F4A] via-[#D4A853] to-[#C17F4A]" />

      <div className="p-6">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C17F4A]/20 to-[#D4A853]/10 border border-[#D4A853]/20 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(212,168,83,0.2)] transition-shadow duration-300">
          <span className="text-2xl">{icon}</span>
        </div>

        <h3 className="font-cinzel text-[#F5F5F5] font-semibold text-lg mb-2 group-hover:text-[#D4A853] transition-colors">
          {title}
        </h3>
        <p className="text-[#F5F5F5]/50 text-sm font-raleway leading-relaxed mb-4">
          {description}
        </p>

        {/* Impact badge */}
        <div className="flex items-center gap-2 bg-[#D4A853]/10 border border-[#D4A853]/20 rounded-lg px-3 py-2 mb-5">
          <span className="text-[#D4A853] text-sm">✦</span>
          <p className="text-[#D4A853] text-xs font-raleway font-medium">{impact}</p>
        </div>

        {/* Amount */}
        <div className="flex items-baseline gap-1 mb-5">
          <span className="text-[#D4A853]/60 text-sm font-raleway">Starting from</span>
          <span className="text-[#D4A853] font-cinzel font-bold text-2xl">₹{amount.toLocaleString("en-IN")}</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={() => onDonate?.(category, amount)}
          href={`/donate?category=${category}&amount=${amount}`}
        >
          Donate Now
        </Button>
      </div>
    </motion.div>
  );
}
