"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import FormField from "@/components/forms/FormField";
import Button from "@/components/ui/Button";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  country: z.string().min(1, "Country is required"),
  purpose: z.string().min(1, "Please select a purpose"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

type AppointmentForm = z.infer<typeof appointmentSchema>;

const purposeOptions = [
  { value: "personal-guidance", label: "Personal Spiritual Guidance" },
  { value: "healing", label: "Healing & Blessing" },
  { value: "meditation-initiation", label: "Meditation / Mantra Initiation" },
  { value: "general-darshan", label: "General Darshan (Blessings)" },
  { value: "virtual-seva", label: "Virtual Seva & Pooja" },
  { value: "other", label: "Other" },
];

export default function AppointmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AppointmentForm>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { country: "India" },
  });

  const onSubmit = async (data: AppointmentForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      setSubmitted(true);
      reset();
      toast.success("Appointment request submitted. Amma's team will contact you.");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Submission failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-16"
        >
          <p className="font-devanagari text-[#D4A853]/60 tracking-[0.4em] text-sm mb-4">दर्शन • Darshan</p>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-shimmer">Book a Darshan</span>
          </h1>
          <p className="text-[#F5F5F5]/60 font-raleway text-lg max-w-2xl mx-auto leading-relaxed">
            A personal meeting with Amma is a rare and precious gift. Whether you seek
            guidance, healing, or simply to sit in her presence — fill in the form below
            and Amma&apos;s team will confirm your appointment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: "🕉", title: "General Darshan", desc: "Open to all. No prior experience needed. Simply come with an open heart." },
              { icon: "📿", title: "Initiation (Diksha)", desc: "Sacred mantra initiation by Amma. Requires prior correspondence and preparation." },
              { icon: "🌿", title: "Healing Session", desc: "Amma's healing touch and divine energy work. Limited availability." },
              { icon: "🌍", title: "Virtual Darshan", desc: "For international devotees unable to travel. Video call sessions available." },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 p-4 rounded-xl bg-[#111] border border-[#D4A853]/15"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-cinzel text-[#D4A853] text-sm font-semibold mb-1">{item.title}</h4>
                  <p className="text-[#F5F5F5]/50 text-xs font-raleway leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            <div className="p-5 rounded-xl bg-[#141414]/30 border border-[#C17F4A]/20">
              <p className="text-[#C17F4A]/80 font-cinzel text-sm font-semibold mb-2">Important Note</p>
              <p className="text-[#F5F5F5]/50 text-xs font-raleway leading-relaxed">
                All Darshan appointments are subject to Amma&apos;s availability and health.
                Please be flexible with dates. International devotees are warmly welcome —
                virtual options are available.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="rounded-2xl border border-[#D4A853]/20 bg-[#111]/90 overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-[#C17F4A] via-[#D4A853] to-[#C17F4A]" />
              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-5">🙏</div>
                    <h3 className="font-cinzel text-[#D4A853] text-2xl font-semibold mb-3">
                      Request Received
                    </h3>
                    <p className="text-[#F5F5F5]/65 font-raleway text-sm leading-relaxed mb-6">
                      Amma&apos;s team has received your darshan request. You will receive
                      a confirmation email within 24–48 hours. Please be patient — every
                      request is attended to with care.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <h3 className="font-cinzel text-[#D4A853] text-xl font-semibold mb-1">Your Details</h3>
                      <div className="h-px bg-[#D4A853]/15 mb-5" />
                    </div>

                    <FormField label="Full Name" id="name" placeholder="Your full name" registration={register("name")} error={errors.name?.message} required />
                    <FormField label="Email Address" id="email" type="email" placeholder="your@email.com" registration={register("email")} error={errors.email?.message} required />
                    <FormField label="Phone Number" id="phone" type="tel" placeholder="+91 98765 43210" registration={register("phone")} error={errors.phone?.message} required />
                    <FormField label="Country" id="country" as="select" registration={register("country")} error={errors.country?.message} required>
                      {["India","United States","United Kingdom","Canada","Australia","Singapore","UAE","Malaysia","Germany","France","Other"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </FormField>

                    <div className="sm:col-span-2 mt-2">
                      <h3 className="font-cinzel text-[#D4A853] text-xl font-semibold mb-1">Appointment Details</h3>
                      <div className="h-px bg-[#D4A853]/15 mb-5" />
                    </div>

                    <div className="sm:col-span-2">
                      <FormField label="Purpose of Visit" id="purpose" as="select" registration={register("purpose")} error={errors.purpose?.message} required>
                        <option value="">Select purpose...</option>
                        {purposeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </FormField>
                    </div>

                    <FormField label="Preferred Date" id="preferredDate" type="date" registration={register("preferredDate")} error={errors.preferredDate?.message} required />
                    <FormField label="Preferred Time" id="preferredTime" as="select" registration={register("preferredTime")} error={errors.preferredTime?.message} required>
                      <option value="">Select time...</option>
                      {["6:00 AM - 8:00 AM","9:00 AM - 11:00 AM","11:00 AM - 1:00 PM","3:00 PM - 5:00 PM","5:00 PM - 7:00 PM"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </FormField>

                    <div className="sm:col-span-2">
                      <FormField label="Message / Intention" id="message" as="textarea" rows={4} placeholder="Share what you are seeking, any specific questions, or context that will help Amma prepare for your meeting..." registration={register("message")} />
                    </div>

                    <div className="sm:col-span-2">
                      <Button type="submit" variant="primary" fullWidth loading={loading} size="lg">
                        Request Darshan Appointment
                      </Button>
                      <p className="text-[#F5F5F5]/30 text-xs text-center mt-3 font-raleway">
                        No payment required. Darshan is always offered freely.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
