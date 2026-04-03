"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/helpers";

const sampleMessages = [
  { _id: "1", name: "Priya Krishnamurthy", email: "priya@example.com", country: "UK", subject: "Donation receipt", message: "Hello, I made a donation last week but haven't received my 80G receipt yet. Could you please help?", isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: "2", name: "James O'Brien", email: "james@example.com", country: "Ireland", subject: "Virtual Satsang schedule", message: "I am from Ireland and would like to join the weekly satsang online. What time is it in IST and is the link publicly available?", isRead: false, createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { _id: "3", name: "Meena Iyer", email: "meena@example.com", country: "India", subject: "Girivalam accommodation", message: "We are planning to visit Thiruvannamalai for Karthigai Deepam with 5 family members. Does the Ashram have accommodation?", isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(sampleMessages);

  const markRead = (id: string) => {
    setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true } : m));
    toast.success("Marked as read");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Contact Messages</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">
          {messages.filter(m => !m.isRead).length} unread messages
        </p>
      </div>

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
                  {!msg.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#C17F4A] animate-pulse" />
                  )}
                </div>
                <p className="text-[#F5F5F5]/35 text-xs font-raleway">{msg.email} · {msg.country}</p>
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
    </div>
  );
}
