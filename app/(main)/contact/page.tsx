"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import FormField from "@/components/forms/FormField";
import Button from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  country: z.string(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { country: "India" },
  });

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSubmitted(true);
      reset();
      toast.success("Message sent! Amma's team will respond shortly.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            संपर्क • Contact
          </p>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-shimmer">Reach Out to Us</span>
          </h1>
          <p className="text-[#F5F5F5]/60 font-raleway text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you have questions, need directions, or simply want to connect —
            Amma&apos;s team is here to welcome you with love.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              { icon: "📍", title: "Address", lines: ["Siva Sri Thiyaneswar Amma Ashram", "Near Arunachaleswarar Temple", "Thiruvannamalai — 606 601", "Tamil Nadu, India"] },
              { icon: "📞", title: "Phone", lines: ["+91 XXXXX XXXXX", "+91 XXXXX XXXXX (WhatsApp)"] },
              { icon: "✉", title: "Email", lines: ["ammaashram@example.org", "donations@ammaashram.org"] },
              { icon: "🕐", title: "Office Hours", lines: ["Mon–Sat: 8:00 AM – 6:00 PM IST", "Sun: 9:00 AM – 2:00 PM IST"] },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 p-5 rounded-xl bg-[#111] border border-[#D4A853]/15"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-cinzel text-[#D4A853] text-sm font-semibold mb-2">{item.title}</h4>
                  {item.lines.map((line) => (
                    <p key={line} className="text-[#F5F5F5]/55 text-xs font-raleway leading-relaxed">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Map embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-[#D4A853]/15 h-64 bg-[#111] relative"
            >
              {/* Google Maps embed placeholder */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0!2d79.0666!3d12.2253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52c4b3b0b0b0b0%3A0x0!2sThiruvannamalai!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8)" }}
                allowFullScreen
                loading="lazy"
                title="Ashram Location"
              />
              <div className="absolute top-3 left-3 bg-[#0D0D0D]/90 border border-[#D4A853]/30 rounded-xl px-3 py-2">
                <p className="text-[#D4A853] font-cinzel text-xs font-semibold">Amma Ashram</p>
                <p className="text-[#F5F5F5]/50 text-xs font-raleway">Thiruvannamalai, TN</p>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#D4A853]/20 bg-[#111]/90 overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-[#C17F4A] via-[#D4A853] to-[#C17F4A]" />
              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">🙏</div>
                    <h3 className="font-cinzel text-[#D4A853] text-xl font-semibold mb-2">Message Received</h3>
                    <p className="text-[#F5F5F5]/60 font-raleway text-sm mb-5">
                      Thank you for reaching out. Amma&apos;s team will respond within 24–48 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Full Name" id="name" placeholder="Your name" registration={register("name")} error={errors.name?.message} required />
                    <FormField label="Email" id="email" type="email" placeholder="your@email.com" registration={register("email")} error={errors.email?.message} required />
                    <FormField label="Phone" id="phone" type="tel" placeholder="+91 98765 43210" registration={register("phone")} />
                    <FormField label="Country" id="country" as="select" registration={register("country")}>
                      {["India","United States","United Kingdom","Canada","Australia","Singapore","UAE","Malaysia","Germany","Other"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </FormField>
                    <div className="sm:col-span-2">
                      <FormField label="Subject" id="subject" placeholder="How can we help?" registration={register("subject")} error={errors.subject?.message} required />
                    </div>
                    <div className="sm:col-span-2">
                      <FormField label="Message" id="message" as="textarea" rows={5} placeholder="Share your question, message, or intention..." registration={register("message")} error={errors.message?.message} required />
                    </div>
                    <div className="sm:col-span-2">
                      <Button type="submit" variant="primary" fullWidth loading={loading} size="lg">
                        Send Message
                      </Button>
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
