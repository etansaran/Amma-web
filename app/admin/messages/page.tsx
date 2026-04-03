"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/helpers";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    fetch("/api/contact", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setMessages(data.messages ?? []))
      .catch(() => setError("Failed to load messages"))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const markRead = async (id: string) => {
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isRead: true }),
      });
      setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true } : m));
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to update");
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Contact Messages</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">
          {loading ? "Loading..." : `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`}
        </p>
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
            <div key={i} className="rounded-2xl border border-[#D4A853]/8 bg-[#111] p-5 animate-pulse">
              <div className="flex justify-between mb-3">
                <div className="space-y-1.5">
                  <div className="h-4 w-36 rounded bg-[#D4A853]/10" />
                  <div className="h-3 w-48 rounded bg-[#F5F5F5]/5" />
                </div>
                <div className="h-3 w-16 rounded bg-[#F5F5F5]/5" />
              </div>
              <div className="h-4 w-48 rounded bg-[#D4A853]/10 mb-2" />
              <div className="h-10 w-full rounded bg-[#F5F5F5]/5" />
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-12 text-center">
          <p className="text-4xl mb-3">✉️</p>
          <p className="text-[#F5F5F5]/40 font-raleway text-sm">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id}
              className={`rounded-2xl border bg-[#111] p-5 transition-all duration-200 ${
                msg.isRead ? "border-[#D4A853]/8" : "border-[#D4A853]/25 shadow-[0_0_15px_rgba(212,168,83,0.08)]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-raleway text-[#F5F5F5]/80 font-semibold text-sm">{msg.name}</p>
                    {!msg.isRead && <span className="w-2 h-2 rounded-full bg-[#C17F4A] animate-pulse" />}
                  </div>
                  <p className="text-[#F5F5F5]/35 text-xs font-raleway">
                    {msg.email}{msg.phone ? ` · ${msg.phone}` : ""}{msg.country ? ` · ${msg.country}` : ""}
                  </p>
                </div>
                <span className="text-[#F5F5F5]/30 text-xs font-raleway">{formatDate(msg.createdAt)}</span>
              </div>

              <p className="font-cinzel text-[#D4A853] text-sm font-medium mb-2">{msg.subject}</p>
              <p className="text-[#F5F5F5]/55 text-sm font-raleway leading-relaxed">{msg.message}</p>

              {!msg.isRead && (
                <button onClick={() => markRead(msg._id)}
                  className="mt-3 text-xs font-raleway text-[#D4A853]/60 hover:text-[#D4A853] transition-colors">
                  Mark as read →
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
