"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import FormField from "@/components/forms/FormField";

const registrationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  numberOfAttendees: z.string(),
  country: z.string(),
  specialRequirements: z.string().optional(),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

interface EventData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  date: string;
  time: string;
  location: string;
  category: string;
  isFeatured?: boolean;
  maxAttendees?: number;
  registeredCount?: number;
}

export default function EventDetailPage() {
  const params = useParams<{ slug: string }>();
  const [event, setEvent] = useState<EventData | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { numberOfAttendees: "1", country: "India" },
  });

  useEffect(() => {
    fetch(`/api/events/${params.slug}`)
      .then((res) => res.json())
      .then((data) => setEvent(data.event ?? null))
      .catch(() => setEvent(null))
      .finally(() => setPageLoading(false));
  }, [params.slug]);

  const onSubmit = async (data: RegistrationForm) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${params.slug}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, numberOfAttendees: parseInt(data.numberOfAttendees, 10) }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Registration failed");
      }

      setSubmitted(true);
      setEvent((prev) => prev ? {
        ...prev,
        registeredCount: (prev.registeredCount || 0) + parseInt(data.numberOfAttendees, 10),
      } : prev);
      reset();
      toast.success("Registration successful! See you at the event.");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="min-h-screen pt-24 px-4 text-center text-[#F5F5F5]/50">Loading event...</div>;
  }

  if (!event) {
    return <div className="min-h-screen pt-24 px-4 text-center text-[#F5F5F5]/50">Event not found.</div>;
  }

  const spotsLeft = event.maxAttendees ? event.maxAttendees - (event.registeredCount || 0) : null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <span className="inline-block text-xs font-raleway uppercase tracking-widest bg-[#C17F4A]/15 text-[#C17F4A] px-3 py-1 rounded-full border border-[#C17F4A]/20 mb-4 capitalize">
                {event.category}
              </span>
              {event.isFeatured && (
                <span className="ml-2 inline-block text-xs font-raleway bg-[#D4A853]/15 text-[#D4A853] px-3 py-1 rounded-full border border-[#D4A853]/20 mb-4">
                  Featured Event
                </span>
              )}

              <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-[#F5F5F5] mb-6">
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-8 p-5 rounded-2xl bg-[#111] border border-[#D4A853]/15">
                {[
                  { icon: "📅", label: new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
                  { icon: "🕐", label: event.time },
                  { icon: "📍", label: event.location },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2">
                    <span className="text-base mt-0.5">{item.icon}</span>
                    <span className="text-[#F5F5F5]/65 text-sm font-raleway">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="prose-spiritual">
                {(event.longDescription || event.description).split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="sticky top-28"
            >
              <div className="rounded-2xl border border-[#D4A853]/20 bg-[#111]/90 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-[#C17F4A] via-[#D4A853] to-[#C17F4A]" />
                <div className="p-6">
                  {spotsLeft !== null && (
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[#F5F5F5]/50 text-sm font-raleway">Spots available</span>
                      <span className={`font-cinzel font-bold text-sm ${spotsLeft < 50 ? "text-[#C17F4A]" : "text-green-400"}`}>
                        {spotsLeft} left
                      </span>
                    </div>
                  )}

                  <h2 className="font-cinzel text-[#D4A853] text-xl font-semibold mb-5">
                    {submitted ? "You're Registered! 🙏" : "Register for this Event"}
                  </h2>

                  {submitted ? (
                    <div className="text-center py-6">
                      <div className="text-5xl mb-4">🕉</div>
                      <p className="text-[#F5F5F5]/70 font-raleway text-sm leading-relaxed mb-4">
                        Your registration is confirmed. Amma blesses your attendance.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                        Register Another Person
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <FormField label="Full Name" id="name" placeholder="Your name" registration={register("name")} error={errors.name?.message} required />
                      <FormField label="Email" id="email" type="email" placeholder="your@email.com" registration={register("email")} error={errors.email?.message} required />
                      <FormField label="Phone" id="phone" type="tel" placeholder="+91 98765 43210" registration={register("phone")} error={errors.phone?.message} required />
                      <FormField label="Number of Attendees" id="numberOfAttendees" as="select" registration={register("numberOfAttendees")} error={errors.numberOfAttendees?.message}>
                        {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n}</option>)}
                      </FormField>
                      <FormField label="Country" id="country" as="select" registration={register("country")} error={errors.country?.message}>
                        {["India", "United States", "United Kingdom", "Canada", "Australia", "Singapore", "UAE", "Malaysia", "Germany", "France", "Other"].map((c) => <option key={c} value={c}>{c}</option>)}
                      </FormField>
                      <FormField label="Special Requirements" id="specialRequirements" as="textarea" rows={2} placeholder="Any accessibility needs, dietary requirements..." registration={register("specialRequirements")} />
                      <Button type="submit" variant="primary" fullWidth loading={loading}>
                        Register Now - It's Free
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
