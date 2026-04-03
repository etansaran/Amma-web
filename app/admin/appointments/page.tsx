"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/helpers";

interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  purpose: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: string;
  adminNotes?: string;
}

const statusColors: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10",
  confirmed: "text-green-400 bg-green-400/10",
  completed: "text-blue-400 bg-blue-400/10",
  cancelled: "text-red-400 bg-red-400/10",
};

const STATUS_TABS = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    const status = activeTab !== "all" ? `&status=${activeTab}` : "";
    fetch(`/api/appointments?limit=100${status}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setAppointments(data.appointments ?? []))
      .catch(() => setError("Failed to load appointments"))
      .finally(() => setLoading(false));
  }, [activeTab, refreshKey]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
      toast.success(`Status updated to ${status}`);
    } catch { toast.error("Update failed"); }
    finally { setUpdating(null); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Appointments</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">Manage darshan appointment requests</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUS_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-raleway font-medium capitalize transition-all duration-200 ${
              activeTab === tab ? "bg-[#D4A853] text-[#0D0D0D]" : "border border-[#D4A853]/20 text-[#F5F5F5]/50 hover:text-[#D4A853]"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 mb-6 text-center">
          <p className="text-red-400 font-raleway text-sm mb-3">{error}</p>
          <button onClick={() => { setError(null); setRefreshKey(k => k + 1); }}
            className="text-[#D4A853] text-xs font-raleway hover:underline">Retry</button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-5 animate-pulse">
              <div className="flex justify-between mb-3">
                <div className="space-y-1.5">
                  <div className="h-5 w-40 rounded bg-[#D4A853]/10" />
                  <div className="h-3 w-56 rounded bg-[#F5F5F5]/5" />
                </div>
                <div className="h-5 w-24 rounded bg-[#D4A853]/10" />
              </div>
              <div className="h-8 w-full rounded bg-[#F5F5F5]/5" />
            </div>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-12 text-center">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-[#F5F5F5]/40 font-raleway text-sm">No appointments{activeTab !== "all" ? ` with status "${activeTab}"` : ""}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt._id} className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-raleway text-[#F5F5F5]/80 font-semibold text-base">{appt.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-raleway ${statusColors[appt.status] || ""}`}>
                      {appt.status}
                    </span>
                  </div>
                  <p className="text-[#F5F5F5]/40 text-xs font-raleway">{appt.email} · {appt.phone}{appt.country ? ` · ${appt.country}` : ""}</p>
                </div>
                <div className="text-right">
                  <p className="font-cinzel text-[#D4A853] text-sm font-semibold">{formatDate(appt.preferredDate)}</p>
                  <p className="text-[#F5F5F5]/40 text-xs font-raleway">{appt.preferredTime}</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-xs font-raleway">
                <div className="bg-[#D4A853]/5 border border-[#D4A853]/10 rounded-lg p-2">
                  <span className="text-[#D4A853]/70">Purpose: </span>
                  <span className="text-[#F5F5F5]/60 capitalize">{appt.purpose.replace(/-/g, " ")}</span>
                </div>
                {appt.message && (
                  <div className="bg-[#D4A853]/5 border border-[#D4A853]/10 rounded-lg p-2">
                    <span className="text-[#D4A853]/70">Message: </span>
                    <span className="text-[#F5F5F5]/60">{appt.message}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                {["pending", "confirmed", "completed", "cancelled"].map(status => (
                  <button key={status}
                    onClick={() => updateStatus(appt._id, status)}
                    disabled={appt.status === status || updating === appt._id}
                    className={`px-3 py-1.5 rounded-full text-xs font-raleway font-medium capitalize transition-all duration-200 ${
                      appt.status === status
                        ? "bg-[#D4A853]/20 text-[#D4A853] cursor-default"
                        : "border border-[#D4A853]/20 text-[#F5F5F5]/50 hover:text-[#D4A853] hover:border-[#D4A853]/40 disabled:opacity-30"
                    }`}>
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
