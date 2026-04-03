"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/helpers";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    slug: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    image?: string;
    isFeatured?: boolean;
    registeredCount?: number;
    maxAttendees?: number;
  };
  index?: number;
}

const categoryColors: Record<string, string> = {
  festival: "text-[#C17F4A] bg-[#C17F4A]/10",
  pooja: "text-[#D4A853] bg-[#D4A853]/10",
  annadhanam: "text-green-400 bg-green-400/10",
  meditation: "text-blue-400 bg-blue-400/10",
  satsang: "text-purple-400 bg-purple-400/10",
  other: "text-[#F5F5F5]/50 bg-white/5",
};

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const isUpcoming = new Date(event.date) >= new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-[#D4A853]/15 bg-[#111]/80 overflow-hidden card-hover"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#141414] to-[#222222] flex items-center justify-center">
            <span className="text-5xl opacity-30">🕉</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full font-raleway capitalize ${
              categoryColors[event.category] || categoryColors.other
            }`}
          >
            {event.category}
          </span>
        </div>

        {event.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#D4A853]/20 text-[#D4A853] border border-[#D4A853]/30">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Date bar */}
        <div className="flex items-center gap-3 mb-3">
          <div className="text-center bg-[#D4A853]/10 border border-[#D4A853]/20 rounded-lg px-3 py-1.5 min-w-[52px]">
            <p className="text-[#D4A853] font-cinzel font-bold text-lg leading-tight">
              {new Date(event.date).getDate()}
            </p>
            <p className="text-[#D4A853]/70 text-xs uppercase font-raleway">
              {new Date(event.date).toLocaleString("en", { month: "short" })}
            </p>
          </div>
          <div>
            <p className="text-[#F5F5F5]/60 text-xs font-raleway">{event.time}</p>
            <p className="text-[#F5F5F5]/40 text-xs font-raleway truncate max-w-[160px]">
              {event.location}
            </p>
          </div>
          <div className="ml-auto">
            {isUpcoming ? (
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                Upcoming
              </span>
            ) : (
              <span className="text-xs text-[#F5F5F5]/30 bg-white/5 px-2 py-0.5 rounded-full">
                Past
              </span>
            )}
          </div>
        </div>

        <h3 className="font-cinzel text-[#F5F5F5] font-semibold text-base mb-2 group-hover:text-[#D4A853] transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="text-[#F5F5F5]/50 text-sm font-raleway line-clamp-2 mb-4">
          {event.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {event.maxAttendees && (
            <p className="text-xs text-[#F5F5F5]/40 font-raleway">
              {event.registeredCount || 0} / {event.maxAttendees} registered
            </p>
          )}
          <Link
            href={`/events/${event.slug}`}
            className="ml-auto text-[#D4A853] text-sm font-semibold font-raleway hover:underline"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
