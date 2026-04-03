"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EventCard from "@/components/ui/EventCard";
import { CardSkeleton } from "@/components/ui/Loader";

const CATEGORIES = ["all", "festival", "pooja", "annadhanam", "meditation", "satsang"];

interface Event {
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
}

export default function EventsContent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    const categoryQuery = activeCategory === "all" ? "" : `?category=${activeCategory}`;
    fetch(`/api/events${categoryQuery}`)
      .then((res) => res.json())
      .then((data) => setEvents(data.events ?? []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-16"
        >
          <p className="font-devanagari text-[#D4A853]/60 tracking-[0.4em] text-sm mb-4">
            उत्सव • Utsava
          </p>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-shimmer">Sacred Events</span>
          </h1>
          <p className="text-[#F5F5F5]/60 font-raleway text-lg max-w-2xl mx-auto leading-relaxed">
            Every gathering here is a divine occasion. Join us in person or through our live stream from anywhere in the world.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-raleway font-medium transition-all duration-300 capitalize ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-white shadow-[0_0_20px_rgba(193,127,74,0.3)]"
                  : "border border-[#D4A853]/25 text-[#F5F5F5]/60 hover:text-[#D4A853] hover:border-[#D4A853]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={event._id} event={event} index={i} />
            ))}
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🕉</p>
            <p className="text-[#F5F5F5]/40 font-raleway">No events in this category currently.</p>
          </div>
        )}
      </div>
    </div>
  );
}
