"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/helpers";

interface SevaBooking {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  sevaType: string;
  sevaTitle: string;
  preferredDate?: string;
  intention?: string;
  amount: number;
  status: string;
  adminNotes?: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10",
  confirmed: "text-green-400 bg-green-400/10",
  completed: "text-blue-400 bg-blue-400/10",
  cancelled: "text-red-400 bg-red-400/10",
};

const STATUS_TABS = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function AdminVirtualSevaPage() {
  const [bookings, setBookings] = useState<SevaBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    const status = activeTab !== "all" ? `&status=${activeTab}` : "";
    fetch(`/api/virtual-seva?limit=100${status}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setBookings(data.bookings ?? []))
      .catch(() => setError("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, [activeTab, refreshKey]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/virtual-seva/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      toast.success(`Status updated to ${status}`);
    } catch { toast.error("Update failed"); }
    finally { setUpdating(null); }
  };

  const saveNotes = async (id: string) => {
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/virtual-seva/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ adminNotes: notesValue }),
      });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, adminNotes: notesValue } : b));
      setEditingNotes(null);
      toast.success("Notes saved");
    } catch { toast.error("Failed to save notes"); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Virtual Seva Bookings</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">Manage seva ceremony bookings</p>
      </div>

      {/* Status tabs */}
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
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-12 text-center">
          <p className="text-4xl mb-3">🪔</p>
          <p className="text-[#F5F5F5]/40 font-raleway text-sm">No seva bookings{activeTab !== "all" ? ` with status "${activeTab}"` : ""}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-raleway text-[#F5F5F5]/80 font-semibold text-base">{booking.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-raleway ${statusColors[booking.status] || ""}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-[#F5F5F5]/40 text-xs font-raleway">
                    {booking.email}{booking.phone ? ` · ${booking.phone}` : ""}{booking.country ? ` · ${booking.country}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-cinzel text-[#D4A853] font-bold text-base">₹{booking.amount.toLocaleString("en-IN")}</p>
                  <p className="text-[#F5F5F5]/30 text-xs font-raleway">{formatDate(booking.createdAt)}</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-xs font-raleway">
                <div className="bg-[#D4A853]/5 border border-[#D4A853]/10 rounded-lg p-2">
                  <span className="text-[#D4A853]/70">Seva: </span>
                  <span className="text-[#F5F5F5]/70">🪔 {booking.sevaTitle}</span>
                </div>
                {booking.preferredDate && (
                  <div className="bg-[#D4A853]/5 border border-[#D4A853]/10 rounded-lg p-2">
                    <span className="text-[#D4A853]/70">Preferred Date: </span>
                    <span className="text-[#F5F5F5]/60">{formatDate(booking.preferredDate)}</span>
                  </div>
                )}
                {booking.intention && (
                  <div className="col-span-2 bg-[#D4A853]/5 border border-[#D4A853]/10 rounded-lg p-2">
                    <span className="text-[#D4A853]/70">Intention: </span>
                    <span className="text-[#F5F5F5]/60 italic">{booking.intention}</span>
                  </div>
                )}
              </div>

              {/* Admin Notes */}
              <div className="mt-3">
                {editingNotes === booking._id ? (
                  <div className="flex gap-2">
                    <textarea
                      value={notesValue}
                      onChange={e => setNotesValue(e.target.value)}
                      onBlur={() => saveNotes(booking._id)}
                      placeholder="Admin notes..."
                      rows={2}
                      className="flex-1 rounded-lg px-3 py-2 text-xs font-raleway bg-[#0D0D0D] border border-[#D4A853]/20 text-[#F5F5F5]/70 resize-none focus:border-[#D4A853]/50 outline-none"
                      autoFocus
                    />
                    <button onClick={() => saveNotes(booking._id)} className="px-3 py-1 text-xs font-raleway bg-[#D4A853]/15 text-[#D4A853] rounded-lg hover:bg-[#D4A853]/25 transition-colors">
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditingNotes(booking._id); setNotesValue(booking.adminNotes ?? ""); }}
                    className="text-[#F5F5F5]/25 hover:text-[#D4A853]/60 text-xs font-raleway transition-colors">
                    {booking.adminNotes ? `📝 ${booking.adminNotes}` : "+ Add admin notes"}
                  </button>
                )}
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                {["pending", "confirmed", "completed", "cancelled"].map(status => (
                  <button key={status}
                    onClick={() => updateStatus(booking._id, status)}
                    disabled={booking.status === status || updating === booking._id}
                    className={`px-3 py-1.5 rounded-full text-xs font-raleway font-medium capitalize transition-all duration-200 ${
                      booking.status === status
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
