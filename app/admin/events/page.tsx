"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import FormField from "@/components/forms/FormField";
import Button from "@/components/ui/Button";
import { formatDate } from "@/utils/helpers";

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  category: z.string(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  maxAttendees: z.string().optional(),
});

type EventForm = z.infer<typeof eventSchema>;

interface Event {
  _id: string;
  title: string;
  date: string;
  category: string;
  isPublished: boolean;
  isFeatured: boolean;
  registeredCount: number;
  description?: string;
  time?: string;
  location?: string;
  maxAttendees?: number;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: { category: "festival", location: "Amma Ashram, Thiruvannamalai" },
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    fetch("/api/events?admin=true&limit=100", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setEvents(data.events ?? []))
      .catch(() => setError("Failed to load events"))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const handleEdit = (event: Event) => {
    setEditingId(event._id);
    setValue("title", event.title);
    setValue("description", event.description ?? "");
    setValue("date", event.date ? event.date.slice(0, 10) : "");
    setValue("time", event.time ?? "");
    setValue("location", event.location ?? "Amma Ashram, Thiruvannamalai");
    setValue("category", event.category);
    setValue("isFeatured", event.isFeatured);
    setValue("isPublished", event.isPublished);
    setValue("maxAttendees", event.maxAttendees?.toString() ?? "");
    setShowForm(true);
  };

  const onSubmit = async (data: EventForm) => {
    setSubmitting(true);
    const token = localStorage.getItem("admin_token");
    try {
      const url = editingId ? `/api/events/${editingId}` : "/api/events";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...data, maxAttendees: data.maxAttendees ? parseInt(data.maxAttendees) : undefined }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(editingId ? "Event updated" : "Event created");
      setShowForm(false); setEditingId(null); reset();
      setRefreshKey(k => k + 1);
    } catch { toast.error("Operation failed"); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    setDeleting(id);
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/events/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      setRefreshKey(k => k + 1);
      toast.success("Event deleted");
    } catch { toast.error("Delete failed"); }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Events</h1>
          <p className="text-[#F5F5F5]/40 font-raleway text-sm">Manage ashram events</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); reset(); }} variant="primary">
          {showForm ? "Cancel" : "+ New Event"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl border border-[#D4A853]/20 bg-[#111] p-6 mb-8">
          <h2 className="font-cinzel text-[#D4A853] text-lg font-semibold mb-5">
            {editingId ? "Edit Event" : "Create New Event"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormField label="Event Title" id="title" placeholder="Event name" registration={register("title")} error={errors.title?.message} required />
            </div>
            <div className="sm:col-span-2">
              <FormField label="Description" id="description" as="textarea" rows={3} placeholder="Event description" registration={register("description")} error={errors.description?.message} required />
            </div>
            <FormField label="Date" id="date" type="date" registration={register("date")} error={errors.date?.message} required />
            <FormField label="Time" id="time" placeholder="6:00 AM – 8:00 PM" registration={register("time")} error={errors.time?.message} required />
            <div className="sm:col-span-2">
              <FormField label="Location" id="location" placeholder="Location" registration={register("location")} error={errors.location?.message} required />
            </div>
            <FormField label="Category" id="category" as="select" registration={register("category")}>
              {["festival","pooja","annadhanam","meditation","satsang","other"].map(c => <option key={c} value={c}>{c}</option>)}
            </FormField>
            <FormField label="Max Attendees (optional)" id="maxAttendees" type="number" placeholder="Leave blank for unlimited" registration={register("maxAttendees")} />
            <div className="sm:col-span-2 flex gap-6">
              <label className="flex items-center gap-2 text-[#F5F5F5]/60 text-sm font-raleway cursor-pointer">
                <input type="checkbox" {...register("isPublished")} className="accent-[#D4A853]" /> Published
              </label>
              <label className="flex items-center gap-2 text-[#F5F5F5]/60 text-sm font-raleway cursor-pointer">
                <input type="checkbox" {...register("isFeatured")} className="accent-[#D4A853]" /> Featured
              </label>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" variant="primary" loading={submitting}>
                {editingId ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 mb-6 text-center">
          <p className="text-red-400 font-raleway text-sm mb-3">{error}</p>
          <button onClick={() => { setError(null); setRefreshKey(k => k + 1); }}
            className="text-[#D4A853] text-xs font-raleway hover:underline">Retry</button>
        </div>
      )}

      {/* Events table */}
      <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-[#D4A853]/5 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">🎉</p>
            <p className="text-[#F5F5F5]/40 font-raleway text-sm">No events yet. Create your first event!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D4A853]/10">
                  {["Event", "Date", "Category", "Registered", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left p-4 font-cinzel text-[#D4A853] text-xs font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4A853]/5">
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-[#D4A853]/3 transition-colors">
                    <td className="p-4">
                      <p className="text-[#F5F5F5]/80 text-sm font-raleway font-medium">{event.title}</p>
                      {event.isFeatured && <span className="text-[#D4A853] text-xs">★ Featured</span>}
                    </td>
                    <td className="p-4 text-[#F5F5F5]/50 text-sm font-raleway">{formatDate(event.date)}</td>
                    <td className="p-4">
                      <span className="capitalize text-xs bg-[#C17F4A]/10 text-[#C17F4A] px-2 py-1 rounded-full font-raleway border border-[#C17F4A]/15">
                        {event.category}
                      </span>
                    </td>
                    <td className="p-4 text-[#F5F5F5]/50 text-sm font-raleway">{event.registeredCount ?? 0}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-raleway ${event.isPublished ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"}`}>
                        {event.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-3">
                        <button onClick={() => handleEdit(event)} className="text-[#D4A853]/60 hover:text-[#D4A853] text-xs font-raleway transition-colors">Edit</button>
                        <button onClick={() => handleDelete(event._id)} disabled={deleting === event._id} className="text-red-400/60 hover:text-red-400 text-xs font-raleway transition-colors disabled:opacity-30">
                          {deleting === event._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
