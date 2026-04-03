"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

// Sample upcoming events (in production these would come from DB)
const upcomingEvents = [
  {
    _id: "1",
    title: "Karthigai Deepam Festival",
    slug: "karthigai-deepam-2025",
    description:
      "The grandest festival of Thiruvannamalai. Witness the sacred flame atop Arunachala hill and participate in the Girivalam with thousands of devotees.",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    time: "5:00 AM – 11:00 PM",
    location: "Arunachala Hill, Thiruvannamalai",
    category: "festival" as const,
    isFeatured: true,
  },
  {
    _id: "2",
    title: "Pournami Annadhanam",
    slug: "pournami-annadhanam",
    description:
      "Full moon day special Annadhanam. Hundreds of devotees gather for free meals and evening prayer at the Ashram.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    time: "10:00 AM – 4:00 PM",
    location: "Amma Ashram, Thiruvannamalai",
    category: "annadhanam" as const,
    isFeatured: false,
  },
  {
    _id: "3",
    title: "Shivaratri Meditation Night",
    slug: "shivaratri-2025",
    description:
      "All-night meditation vigil on the sacred night of Lord Shiva. Deep Thiyanam sessions guided by Amma through the four watches of the night.",
    date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    time: "9:00 PM – 6:00 AM",
    location: "Amma Ashram Temple, Thiruvannamalai",
    category: "meditation" as const,
    isFeatured: true,
  },
];

export default function EventsPreview() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <SectionHeader
            sanskritLabel="उत्सव • Utsava"
            title="Upcoming Sacred Events"
            subtitle="Join us for divine celebrations and spiritual gatherings."
            center={false}
          />
          <Button href="/events" variant="outline" size="sm" className="shrink-0">
            View All Events
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, i) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-[#D4A853]/15 bg-[#111]/80 overflow-hidden card-hover"
            >
              {/* Category top bar */}
              <div className={`h-1 ${event.isFeatured
                ? "bg-gradient-to-r from-[#C17F4A] via-[#D4A853] to-[#C17F4A]"
                : "bg-[#D4A853]/30"
              }`} />

              <div className="p-6">
                {/* Date badge */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-center bg-gradient-to-b from-[#141414] to-[#222222] border border-[#D4A853]/20 rounded-xl p-2.5 min-w-[56px]">
                    <p className="text-[#D4A853] font-cinzel font-bold text-2xl leading-none">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="text-[#D4A853]/70 text-xs uppercase font-raleway mt-0.5">
                      {new Date(event.date).toLocaleString("en", { month: "short" })}
                    </p>
                    <p className="text-[#F5F5F5]/30 text-xs font-raleway">
                      {new Date(event.date).getFullYear()}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-raleway text-[#C17F4A]/80 capitalize bg-[#C17F4A]/10 px-2 py-0.5 rounded-full border border-[#C17F4A]/15">
                      {event.category}
                    </span>
                    <h3 className="font-cinzel text-[#F5F5F5] font-semibold text-base mt-2 group-hover:text-[#D4A853] transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[#F5F5F5]/50 text-sm font-raleway line-clamp-2 mb-4">
                  {event.description}
                </p>

                <div className="space-y-1.5 mb-5">
                  <p className="flex items-center gap-2 text-[#F5F5F5]/40 text-xs font-raleway">
                    <span>🕐</span>{event.time}
                  </p>
                  <p className="flex items-center gap-2 text-[#F5F5F5]/40 text-xs font-raleway">
                    <span>📍</span>{event.location}
                  </p>
                </div>

                <Link
                  href={`/events/${event.slug}`}
                  className="flex items-center gap-1 text-[#D4A853] text-sm font-semibold font-raleway hover:underline"
                >
                  Register Now →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
