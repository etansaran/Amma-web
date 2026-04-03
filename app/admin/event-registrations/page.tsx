"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/utils/helpers";

interface Event {
  _id: string;
  title: string;
  date: string;
  category: string;
  registeredCount: number;
}

interface Registration {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  numberOfAttendees: number;
  specialRequirements?: string;
  createdAt: string;
  event?: { title: string; date: string; location?: string };
}

export default function AdminEventRegistrationsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setLoadingEvents(true);
    fetch("/api/events?admin=true&limit=100", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setEvents(data.events ?? []))
      .catch(() => setError("Failed to load events"))
      .finally(() => setLoadingEvents(false));
  }, []);

  useEffect(() => {
    if (!selectedEventId) return;
    const token = localStorage.getItem("admin_token");
    setLoadingRegs(true);
    fetch(`/api/event-registrations?eventId=${selectedEventId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        setRegistrations(data.registrations ?? []);
        setTotalAttendees(data.totalAttendees ?? 0);
      })
      .catch(() => setError("Failed to load registrations"))
      .finally(() => setLoadingRegs(false));
  }, [selectedEventId]);

  const selectedEvent = events.find(e => e._id === selectedEventId);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Event Registrations</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">View attendee registrations per event</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 mb-6 text-center">
          <p className="text-red-400 font-raleway text-sm">{error}</p>
        </div>
      )}

      {/* Event selector */}
      <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-5 mb-6">
        <label className="block text-[#F5F5F5]/60 text-sm font-raleway font-medium mb-3">Select Event</label>
        {loadingEvents ? (
          <div className="h-10 rounded-lg bg-[#D4A853]/5 animate-pulse" />
        ) : (
          <select
            value={selectedEventId}
            onChange={e => setSelectedEventId(e.target.value)}
            className="w-full rounded-xl px-4 py-3 bg-[#0D0D0D] border border-[#D4A853]/20 text-[#F5F5F5]/70 text-sm font-raleway focus:border-[#D4A853]/50 outline-none"
          >
            <option value="">— Choose an event —</option>
            {events.map(event => (
              <option key={event._id} value={event._id}>
                {event.title} ({formatDate(event.date)}) · {event.registeredCount ?? 0} registered
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Registrations */}
      {selectedEventId && (
        <>
          {/* Summary */}
          <div className="flex items-center gap-6 mb-5 p-4 rounded-xl bg-[#D4A853]/5 border border-[#D4A853]/15">
            <div>
              <p className="font-cinzel text-[#D4A853] text-xl font-bold">{registrations.length}</p>
              <p className="text-[#F5F5F5]/40 text-xs font-raleway">Registrations</p>
            </div>
            <div className="h-8 w-px bg-[#D4A853]/20" />
            <div>
              <p className="font-cinzel text-[#D4A853] text-xl font-bold">{totalAttendees}</p>
              <p className="text-[#F5F5F5]/40 text-xs font-raleway">Total Attendees</p>
            </div>
            {selectedEvent && (
              <>
                <div className="h-8 w-px bg-[#D4A853]/20" />
                <div>
                  <p className="text-[#F5F5F5]/70 text-sm font-raleway font-medium">{selectedEvent.title}</p>
                  <p className="text-[#F5F5F5]/30 text-xs font-raleway">{formatDate(selectedEvent.date)}</p>
                </div>
              </>
            )}
          </div>

          <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] overflow-hidden">
            {loadingRegs ? (
              <div className="p-6 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 rounded-lg bg-[#D4A853]/5 animate-pulse" />
                ))}
              </div>
            ) : registrations.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-4xl mb-3">📋</p>
                <p className="text-[#F5F5F5]/40 font-raleway text-sm">No registrations for this event yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#D4A853]/10">
                      {["Name", "Email", "Phone", "Country", "Attendees", "Special Requirements", "Registered"].map(h => (
                        <th key={h} className="text-left p-4 font-cinzel text-[#D4A853] text-xs font-semibold uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D4A853]/5">
                    {registrations.map(reg => (
                      <tr key={reg._id} className="hover:bg-[#D4A853]/3 transition-colors">
                        <td className="p-4 text-[#F5F5F5]/80 text-sm font-raleway font-medium">{reg.name}</td>
                        <td className="p-4 text-[#F5F5F5]/50 text-xs font-raleway">{reg.email}</td>
                        <td className="p-4 text-[#F5F5F5]/50 text-xs font-raleway">{reg.phone ?? "—"}</td>
                        <td className="p-4 text-[#F5F5F5]/50 text-sm font-raleway">{reg.country ?? "—"}</td>
                        <td className="p-4">
                          <span className="font-cinzel text-[#D4A853] font-bold text-sm">{reg.numberOfAttendees}</span>
                        </td>
                        <td className="p-4 text-[#F5F5F5]/50 text-xs font-raleway max-w-48 truncate">{reg.specialRequirements || "—"}</td>
                        <td className="p-4 text-[#F5F5F5]/40 text-xs font-raleway">{formatDate(reg.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {!selectedEventId && !loadingEvents && (
        <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-12 text-center">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-[#F5F5F5]/40 font-raleway text-sm">Select an event above to view its registrations</p>
        </div>
      )}
    </div>
  );
}
