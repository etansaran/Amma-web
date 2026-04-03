"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

const sevaOptions = [
  { icon: "🪔", title: "Abhishekam Seva", desc: "Sacred ablution of the Shiva Lingam performed in your name. Includes sacred ash (vibhuti) sent by post.", price: 1100, duration: "30 min" },
  { icon: "🔥", title: "Homam (Fire Ritual)", desc: "Sacred fire ceremony with Vedic mantras performed by trained priests for your wellbeing and intention.", price: 5100, duration: "90 min" },
  { icon: "🌸", title: "Archana (108 Names)", desc: "Flower offering with 108 divine names of Shiva chanted in your name for blessings and protection.", price: 501, duration: "20 min" },
  { icon: "🍛", title: "Sponsor Annadhanam", desc: "Feed 100 pilgrims and devotees in your name or in memory of a loved one.", price: 2500, duration: "One day" },
  { icon: "💫", title: "Special Pooja", desc: "Full puja ceremony on auspicious days — Pradosham, Pournami, Ekadasi — with personalized prayer.", price: 2100, duration: "45 min" },
  { icon: "📿", title: "Virtual Satsang", desc: "30-minute private video call with Amma or senior disciple for personal guidance and blessing.", price: 3100, duration: "30 min video call" },
];

export default function VirtualSevaPage() {
  const [selectedSeva, setSelectedSeva] = useState<typeof sevaOptions[0] | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", country: "India", intention: "", date: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSeva) { toast.error("Please select a seva"); return; }
    if (!formData.name || !formData.email) { toast.error("Please fill in required fields"); return; }
    toast.success(`Your ${selectedSeva.title} seva booking has been received! Team will confirm within 24 hours.`);
  };

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
            वर्चुअल सेवा • Virtual Seva
          </p>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-shimmer">Virtual Seva</span>
          </h1>
          <p className="text-[#F5F5F5]/60 font-raleway text-lg max-w-2xl mx-auto leading-relaxed">
            Cannot travel to Thiruvannamalai? The divine doesn&apos;t require your physical presence.
            Book a sacred ceremony performed in your name at the Ashram — grace delivered wherever you are.
          </p>
        </motion.div>

        {/* Seva options */}
        <SectionHeader sanskritLabel="" title="Choose Your Seva" subtitle="All sevas are performed by trained priests and dedicated volunteers under Amma's guidance." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sevaOptions.map((seva, i) => (
            <motion.button
              key={seva.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedSeva(selectedSeva?.title === seva.title ? null : seva)}
              className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                selectedSeva?.title === seva.title
                  ? "border-[#D4A853] bg-[#D4A853]/10 shadow-[0_0_30px_rgba(212,168,83,0.2)]"
                  : "border-[#D4A853]/15 bg-[#111]/70 hover:border-[#D4A853]/40"
              }`}
            >
              <span className="text-3xl mb-3 block">{seva.icon}</span>
              <h3 className="font-cinzel text-[#F5F5F5] font-semibold text-base mb-2">{seva.title}</h3>
              <p className="text-[#F5F5F5]/50 text-sm font-raleway leading-relaxed mb-3">{seva.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-[#D4A853] font-bold">₹{seva.price.toLocaleString("en-IN")}</span>
                <span className="text-[#F5F5F5]/30 text-xs font-raleway">{seva.duration}</span>
              </div>
              {selectedSeva?.title === seva.title && (
                <div className="mt-3 text-[#D4A853] text-xs font-raleway font-semibold">✦ Selected</div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Booking form */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-[#D4A853]/20 bg-[#111]/90 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#C17F4A] via-[#D4A853] to-[#C17F4A]" />
            <div className="p-8">
              <h2 className="font-cinzel text-[#D4A853] text-xl font-semibold mb-5">
                {selectedSeva ? `Book: ${selectedSeva.title}` : "Select a Seva Above to Book"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
                  { id: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
                  { id: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+1 555 123 4567" },
                  { id: "date", label: "Preferred Date", type: "date" },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5">
                      {field.label} {field.required && <span className="text-[#C17F4A]">*</span>}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(formData as Record<string, string>)[field.id]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5">
                    Intention / Dedication
                  </label>
                  <textarea
                    rows={3}
                    placeholder="E.g., 'For the health of my father', 'In memory of my mother', 'For peace and prosperity'..."
                    value={formData.intention}
                    onChange={(e) => setFormData(prev => ({ ...prev, intention: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway resize-none"
                  />
                </div>
                <Button type="submit" variant="primary" fullWidth size="lg" disabled={!selectedSeva}>
                  Book Seva {selectedSeva ? `— ₹${selectedSeva.price.toLocaleString("en-IN")}` : ""}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
