"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    name: "Priya Krishnamurthy",
    location: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    testimonial:
      "Finding Amma's Ashram was a turning point in my life. I was lost in the corporate world, disconnected from my roots. After my first visit to Thiruvannamalai and receiving Amma's blessings, an indescribable peace settled in my heart. I now sponsor Annadhanam monthly — it is the most meaningful thing I do.",
  },
  {
    name: "Dr. Rajan Venkatesh",
    location: "Houston, Texas",
    country: "United States",
    flag: "🇺🇸",
    testimonial:
      "As an NRI, I worried that distance meant disconnection from my spiritual heritage. The live darshan streams and virtual seva options have kept me profoundly connected. Amma's wisdom transcends all borders. The Thiyanam teachings have transformed my daily meditation practice.",
  },
  {
    name: "Supriya Anand",
    location: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    testimonial:
      "I first heard of Amma through my grandmother in Chennai. Three years ago I made my first pilgrimage to Arunachala. Standing before Amma, I felt seen and held in a way words cannot express. The Annadhanam we sponsor in her name is our family's greatest joy.",
  },
  {
    name: "Marcus & Preethi Williams",
    location: "Melbourne",
    country: "Australia",
    flag: "🇦🇺",
    testimonial:
      "My wife is Tamil and introduced me to Amma's teachings. As someone who came to spirituality through a different path, I was moved by the universal love that radiates from this place. The online satsangs have been a blessing for our family.",
  },
  {
    name: "Kavitha Sundaram",
    location: "Toronto",
    country: "Canada",
    flag: "🇨🇦",
    testimonial:
      "Amma healed my relationship with my mother, my culture, and with God — all through her silent grace during a single darshan session. I now volunteer to spread awareness of the Ashram's work among Tamil communities in Canada.",
  },
  {
    name: "Arjun Balakrishnan",
    location: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    testimonial:
      "I visit the Ashram every year during my India trip. The energy at Arunachala combined with Amma's presence is unlike anything else on Earth. For NRIs who cannot visit often — please use the live darshan. It truly bridges the gap.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#0D0D0D] to-[#0A1208]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          sanskritLabel="भक्त वचन • Devotee Voices"
          title="From Arunachala to the World"
          subtitle="Thousands of hearts across continents have been touched by Amma's grace. Here are their stories."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
