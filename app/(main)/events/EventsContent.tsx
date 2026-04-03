"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventCard from "@/components/ui/EventCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { SectionLoader, CardSkeleton } from "@/components/ui/Loader";

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

// Sample data for demonstration
const sampleEvents: Event[] = [
  {
    _id: "1", title: "Karthigai Deepam Festival", slug: "karthigai-deepam-2025",
    description: "The grandest festival of Thiruvannamalai — witness the sacred flame atop Arunachala.",
    date: new Date(Date.now() + 30 * 86400000).toISOString(), time: "5:00 AM – 11:00 PM",
    location: "Arunachala Hill, Thiruvannamalai", category: "festival", isFeatured: true,
  },
  {
    _id: "2", title: "Pournami Annadhanam", slug: "pournami-annadhanam-mar",
    description: "Sacred full moon day feast — 500+ devotees receive free meals and blessings.",
    date: new Date(Date.now() + 7 * 86400000).toISOString(), time: "10:00 AM – 4:00 PM",
    location: "Amma Ashram, Thiruvannamalai", category: "annadhanam",
  },
  {
    _id: "3", title: "Shivaratri All-Night Meditation", slug: "shivaratri-2025",
    description: "All-night vigil with four deep meditation sessions guided by Amma.",
    date: new Date(Date.now() + 60 * 86400000).toISOString(), time: "9:00 PM – 6:00 AM",
    location: "Amma Ashram Temple", category: "meditation", isFeatured: true,
    maxAttendees: 200, registeredCount: 87,
  },
  {
    _id: "4", title: "Weekly Satsang with Amma", slug: "weekly-satsang",
    description: "Friday evening satsang — Q&A, discourse, and silent sitting with Amma.",
    date: new Date(Date.now() + 3 * 86400000).toISOString(), time: "7:00 PM – 9:00 PM",
    location: "Ashram Meditation Hall", category: "satsang",
  },
  {
    _id: "5", title: "Abhishekam & Homam Ceremony", slug: "abhishekam-homam",
    description: "Sacred fire ritual and Shiva Lingam ablution — a deeply purifying spiritual ceremony.",
    date: new Date(Date.now() + 14 * 86400000).toISOString(), time: "6:00 AM – 9:00 AM",
    location: "Amma Ashram Temple", category: "pooja",
  },
  {
    _id: "6", title: "Arunachala Girivalam Walk", slug: "girivalam-walk",
    description: "Sacred 14km circumambulation of Arunachala hill with Ashram devotees.",
    date: new Date(Date.now() + 21 * 86400000).toISOString(), time: "4:00 AM – 8:00 AM",
    location: "Arunachala, Thiruvannamalai", category: "festival",
    maxAttendees: 100, registeredCount: 34,
  },
];

export default function EventsContent() {
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? events
    : events.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
            Every gathering here is a divine occasion — a chance for the soul to come
            home. Join us in person or through our live stream from anywhere in the world.
          </p>
        </motion.div>

        {/* Category filters */}
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

        {/* Events grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <EventCard key={event._id} event={event} index={i} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🕉</p>
            <p className="text-[#F5F5F5]/40 font-raleway">No events in this category currently.</p>
          </div>
        )}
      </div>
    </div>
  );
}
