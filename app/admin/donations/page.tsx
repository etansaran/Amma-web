"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatDate } from "@/utils/helpers";

const sampleDonations = [
  { _id: "1", donorName: "Priya Krishnamurthy", donorEmail: "priya@example.com", country: "UK", amount: 5000, currency: "INR", amountInINR: 5000, category: "annadhanam", frequency: "one-time", status: "completed", paymentGateway: "razorpay", createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { _id: "2", donorName: "Dr. Rajan Venkatesh", donorEmail: "rajan@example.com", country: "USA", amount: 130, currency: "USD", amountInINR: 10855, category: "construction", frequency: "one-time", status: "completed", paymentGateway: "razorpay", createdAt: new Date(Date.now() - 5 * 3600000).toISOString() },
  { _id: "3", donorName: "Supriya Anand", donorEmail: "supriya@example.com", country: "Singapore", amount: 80, currency: "SGD", amountInINR: 4984, category: "pournami", frequency: "one-time", status: "pending", paymentGateway: "razorpay", createdAt: new Date(Date.now() - 8 * 3600000).toISOString() },
  { _id: "4", donorName: "Kavitha Sundaram", donorEmail: "kavitha@example.com", country: "Canada", amount: 25, currency: "CAD", amountInINR: 1535, category: "general", frequency: "monthly", status: "completed", paymentGateway: "razorpay", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: "5", donorName: "Arjun Balakrishnan", donorEmail: "arjun@example.com", country: "UAE", amount: 11000, currency: "INR", amountInINR: 11000, category: "construction", frequency: "one-time", status: "completed", paymentGateway: "razorpay", createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
];

const statusColors: Record<string, string> = {
  completed: "text-green-400 bg-green-400/10",
  pending: "text-yellow-400 bg-yellow-400/10",
  failed: "text-red-400 bg-red-400/10",
};

export default function AdminDonationsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? sampleDonations : sampleDonations.filter(d => d.status === filter);
  const totalCompleted = sampleDonations.filter(d => d.status === "completed").reduce((s, d) => s + d.amountInINR, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Donations</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">View and track all donations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: "Total Received (INR)", value: `₹${totalCompleted.toLocaleString("en-IN")}`, icon: "💰" },
          { label: "Total Donations", value: sampleDonations.filter(d => d.status === "completed").length.toString(), icon: "✅" },
          { label: "Pending", value: sampleDonations.filter(d => d.status === "pending").length.toString(), icon: "⏳" },
        ].map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl bg-[#111] border border-[#D4A853]/10">
            <p className="text-2xl mb-2">{stat.icon}</p>
            <p className="font-cinzel text-[#D4A853] text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-[#F5F5F5]/40 text-xs font-raleway">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["all", "completed", "pending", "failed"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-raleway font-medium capitalize transition-all duration-200 ${filter === f ? "bg-[#D4A853] text-[#0D0D0D]" : "border border-[#D4A853]/20 text-[#F5F5F5]/50 hover:text-[#D4A853]"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4A853]/10">
                {["Donor", "Amount", "Category", "Frequency", "Country", "Date", "Status"].map(h => (
                  <th key={h} className="text-left p-4 font-cinzel text-[#D4A853] text-xs font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4A853]/5">
              {filtered.map((d) => (
                <tr key={d._id} className="hover:bg-[#D4A853]/3 transition-colors">
                  <td className="p-4">
                    <p className="text-[#F5F5F5]/80 text-sm font-raleway font-medium">{d.donorName}</p>
                    <p className="text-[#F5F5F5]/30 text-xs font-raleway">{d.donorEmail}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-cinzel text-[#D4A853] text-sm font-semibold">₹{d.amountInINR.toLocaleString("en-IN")}</p>
                    <p className="text-[#F5F5F5]/30 text-xs font-raleway">{d.amount} {d.currency}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-xs capitalize bg-[#C17F4A]/10 text-[#C17F4A] px-2 py-0.5 rounded-full font-raleway border border-[#C17F4A]/15">
                      {d.category.replace("-", " ")}
                    </span>
                  </td>
                  <td className="p-4 text-[#F5F5F5]/50 text-xs font-raleway capitalize">{d.frequency}</td>
                  <td className="p-4 text-[#F5F5F5]/50 text-sm font-raleway">{d.country}</td>
                  <td className="p-4 text-[#F5F5F5]/50 text-xs font-raleway">{formatDate(d.createdAt)}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-raleway ${statusColors[d.status] || "text-gray-400"}`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
