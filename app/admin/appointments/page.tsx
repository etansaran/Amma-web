"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/helpers";

const sampleAppointments = [
  { _id: "1", name: "Priya Krishnamurthy", email: "priya@example.com", phone: "+44 7700 900000", country: "UK", purpose: "meditation-initiation", preferredDate: new Date(Date.now() + 5 * 86400000).toISOString(), preferredTime: "9:00 AM - 11:00 AM", message: "Seeking mantra initiation from Amma.", status: "pending" },
  { _id: "2", name: "Dr. Rajan Venkatesh", email: "rajan@example.com", phone: "+1 713 555 0100", country: "USA", purpose: "personal-guidance", preferredDate: new Date(Date.now() + 10 * 86400000).toISOString(), preferredTime: "3:00 PM - 5:00 PM", message: "Need spiritual guidance on life direction.", status: "confirmed" },
  { _id: "3", name: "Lakshmi Priya", email: "lakshmi@example.com", phone: "+91 98765 43210", country: "India", purpose: "healing", preferredDate: new Date(Date.now() + 2 * 86400000).toISOString(), preferredTime: "6:00 AM - 8:00 AM", message: "Health issues — seeking Amma's blessing.", status: "pending" },
];

const statusColors: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10",
  confirmed: "text-green-400 bg-green-400/10",
  completed: "text-blue-400 bg-blue-400/10",
  cancelled: "text-red-400 bg-red-400/10",
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [updating, setUpdating] = useState<string | null>(null);

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
                <p className="text-[#F5F5F5]/40 text-xs font-raleway">{appt.email} · {appt.phone} · {appt.country}</p>
              </div>
              <div className="text-right">
                <p className="font-cinzel text-[#D4A853] text-sm font-semibold">{formatDate(appt.preferredDate)}</p>
                <p className="text-[#F5F5F5]/40 text-xs font-raleway">{appt.preferredTime}</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs font-raleway">
              <div className="bg-[#D4A853]/5 border border-[#D4A853]/10 rounded-lg p-2">
                <span className="text-[#D4A853]/70">Purpose: </span>
                <span className="text-[#F5F5F5]/60 capitalize">{appt.purpose.replace("-", " ")}</span>
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
                <button
                  key={status}
                  onClick={() => updateStatus(appt._id, status)}
                  disabled={appt.status === status || updating === appt._id}
                  className={`px-3 py-1.5 rounded-full text-xs font-raleway font-medium capitalize transition-all duration-200 ${
                    appt.status === status
                      ? "bg-[#D4A853]/20 text-[#D4A853] cursor-default"
                      : "border border-[#D4A853]/20 text-[#F5F5F5]/50 hover:text-[#D4A853] hover:border-[#D4A853]/40 disabled:opacity-30"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
