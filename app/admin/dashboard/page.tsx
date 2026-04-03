"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { label: "Total Donations", value: "₹4,82,500", icon: "💰", change: "+12% this month", color: "#D4A853" },
  { label: "Events", value: "6", icon: "🎉", change: "3 upcoming", color: "#C17F4A" },
  { label: "Appointments", value: "24", icon: "📅", change: "8 pending", color: "#8B6914" },
  { label: "Blog Posts", value: "12", icon: "📝", change: "3 drafts", color: "#D4A853" },
];

const quickActions = [
  { label: "New Event", href: "/admin/events?new=1", icon: "🎉" },
  { label: "New Blog Post", href: "/admin/blogs?new=1", icon: "📝" },
  { label: "View Donations", href: "/admin/donations", icon: "💰" },
  { label: "Appointments", href: "/admin/appointments", icon: "📅" },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853] mb-1">Dashboard</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">
          Welcome back. Here&apos;s what&apos;s happening at the Ashram.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-[#111] border border-[#D4A853]/10"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs font-raleway text-[#F5F5F5]/30 bg-[#F5F5F5]/5 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="font-cinzel text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[#F5F5F5]/50 text-xs font-raleway">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="font-cinzel text-[#D4A853] text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#111] border border-[#D4A853]/12 hover:border-[#D4A853]/40 hover:bg-[#D4A853]/5 transition-all duration-200"
            >
              <span className="text-xl">{action.icon}</span>
              <span className="text-[#F5F5F5]/70 text-sm font-raleway font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent donations */}
      <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] overflow-hidden">
        <div className="p-5 border-b border-[#D4A853]/10 flex items-center justify-between">
          <h2 className="font-cinzel text-[#D4A853] font-semibold">Recent Donations</h2>
          <Link href="/admin/donations" className="text-[#D4A853]/60 hover:text-[#D4A853] text-xs font-raleway transition-colors">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-[#D4A853]/5">
          {[
            { name: "Priya Krishnamurthy", amount: "₹5,000", category: "Annadhanam", country: "UK", status: "completed", time: "2h ago" },
            { name: "Rajan Venkatesh", amount: "₹11,000", category: "Construction", country: "USA", status: "completed", time: "5h ago" },
            { name: "Supriya Anand", amount: "₹2,500", category: "Pournami", country: "Singapore", status: "pending", time: "8h ago" },
            { name: "Kavitha Sundaram", amount: "₹1,100", category: "General", country: "Canada", status: "completed", time: "1d ago" },
          ].map((d, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <div className="w-8 h-8 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/20 flex items-center justify-center font-cinzel text-[#D4A853] font-bold text-sm">
                {d.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#F5F5F5]/80 text-sm font-raleway font-medium truncate">{d.name}</p>
                <p className="text-[#F5F5F5]/35 text-xs font-raleway">{d.category} · {d.country} · {d.time}</p>
              </div>
              <div className="text-right">
                <p className="font-cinzel text-[#D4A853] font-semibold text-sm">{d.amount}</p>
                <span className={`text-xs font-raleway px-2 py-0.5 rounded-full ${
                  d.status === "completed"
                    ? "text-green-400 bg-green-400/10"
                    : "text-yellow-400 bg-yellow-400/10"
                }`}>
                  {d.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
