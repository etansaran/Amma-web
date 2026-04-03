"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatDate } from "@/utils/helpers";

interface Stats {
  totalDonations: number;
  totalDonationAmount: number;
  pendingAppointments: number;
  unreadMessages: number;
  upcomingEvents: number;
  totalBlogs: number;
  pendingSeva: number;
  shopOrders: number;
  shopPaymentPending: number;
  lowStockProducts: number;
}

interface ActivityItem {
  type: "donation" | "message" | "appointment" | "seva";
  name: string;
  detail: string;
  time: string;
  icon: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalDonations: 0,
    totalDonationAmount: 0,
    pendingAppointments: 0,
    unreadMessages: 0,
    upcomingEvents: 0,
    totalBlogs: 0,
    pendingSeva: 0,
    shopOrders: 0,
    shopPaymentPending: 0,
    lowStockProducts: 0,
  });
  const [recentDonations, setRecentDonations] = useState<Array<Record<string, unknown>>>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch("/api/donations?limit=5", { headers }).then(r => r.json()),
      fetch("/api/appointments?status=pending&limit=1", { headers }).then(r => r.json()),
      fetch("/api/contact", { headers }).then(r => r.json()),
      fetch("/api/events?admin=true&upcoming=true&limit=1", { headers }).then(r => r.json()),
      fetch("/api/blogs?admin=true&limit=1", { headers }).then(r => r.json()),
      fetch("/api/virtual-seva?status=pending&limit=5", { headers }).then(r => r.json()),
      fetch("/api/shop/orders?admin=true&limit=5", { headers }).then(r => r.json()),
      fetch("/api/shop/products?admin=true&limit=100", { headers }).then(r => r.json()),
    ])
      .then(([donData, apptData, msgData, evtData, blogData, sevaData, shopData, productData]) => {
        const msgs: Array<Record<string, unknown>> = msgData.messages ?? [];
        const products: Array<Record<string, unknown>> = productData.products ?? [];
        setStats({
          totalDonations: donData.stats?.count ?? 0,
          totalDonationAmount: donData.stats?.totalAmount ?? 0,
          pendingAppointments: apptData.pagination?.total ?? 0,
          unreadMessages: msgs.filter(m => !m.isRead).length,
          upcomingEvents: evtData.pagination?.total ?? 0,
          totalBlogs: blogData.pagination?.total ?? 0,
          pendingSeva: sevaData.pagination?.total ?? 0,
          shopOrders: shopData.stats?.totalOrders ?? 0,
          shopPaymentPending: shopData.stats?.paymentPending ?? 0,
          lowStockProducts: products.filter((product) => Number(product.stockQuantity ?? 0) <= 3).length,
        });
        setRecentDonations(donData.donations ?? []);

        // Build activity feed
        const items: ActivityItem[] = [];
        (donData.donations ?? []).slice(0, 3).forEach((d: Record<string, unknown>) => {
          items.push({ type: "donation", name: d.donorName as string, detail: `₹${((d.amountInINR as number) ?? 0).toLocaleString("en-IN")} · ${d.category as string}`, time: d.createdAt as string, icon: "💰" });
        });
        msgs.slice(0, 2).forEach((m: Record<string, unknown>) => {
          items.push({ type: "message", name: m.name as string, detail: m.subject as string, time: m.createdAt as string, icon: "✉️" });
        });
        (sevaData.bookings ?? []).slice(0, 2).forEach((s: Record<string, unknown>) => {
          items.push({ type: "seva", name: s.name as string, detail: s.sevaTitle as string, time: s.createdAt as string, icon: "🪔" });
        });
        (shopData.orders ?? []).slice(0, 2).forEach((order: Record<string, unknown>) => {
          items.push({
            type: "message",
            name: order.customerName as string,
            detail: `${order.orderNumber as string} · ₹${((order.totalAmount as number) ?? 0).toLocaleString("en-IN")}`,
            time: order.createdAt as string,
            icon: "📦",
          });
        });
        items.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setActivity(items.slice(0, 6));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Total Donations", value: `₹${stats.totalDonationAmount.toLocaleString("en-IN")}`, icon: "💰", sub: `${stats.totalDonations} completed`, color: "#D4A853", href: "/admin/donations" },
    { label: "Pending Appointments", value: stats.pendingAppointments.toString(), icon: "📅", sub: "awaiting confirmation", color: "#C17F4A", href: "/admin/appointments" },
    { label: "Unread Messages", value: stats.unreadMessages.toString(), icon: "✉️", sub: "contact enquiries", color: "#8B6914", href: "/admin/messages" },
    { label: "Shop Orders", value: stats.shopOrders.toString(), icon: "📦", sub: `${stats.shopPaymentPending} payment pending`, color: "#D4A853", href: "/admin/shop-orders" },
  ];

  const quickActions = [
    { label: "New Event", href: "/admin/events", icon: "🎉" },
    { label: "New Blog Post", href: "/admin/blogs", icon: "📝" },
    { label: "Add Product", href: "/admin/shop-products", icon: "🛍️" },
    { label: "View Donations", href: "/admin/donations", icon: "💰" },
    { label: "Shop Orders", href: "/admin/shop-orders", icon: "📦" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853] mb-1">Dashboard</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">
          Welcome back. Here&apos;s what&apos;s happening at the Ashram.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Link href={stat.href} className="block p-5 rounded-2xl bg-[#111] border border-[#D4A853]/10 hover:border-[#D4A853]/30 transition-all duration-200">
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-7 w-7 rounded bg-[#D4A853]/10" />
                  <div className="h-8 w-24 rounded bg-[#D4A853]/10" />
                  <div className="h-3 w-32 rounded bg-[#F5F5F5]/5" />
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <p className="font-cinzel text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-[#F5F5F5]/50 text-xs font-raleway">{stat.label}</p>
                  <p className="text-[#F5F5F5]/30 text-xs font-raleway mt-0.5">{stat.sub}</p>
                </>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pending seva alert */}
      {!loading && stats.pendingSeva > 0 && (
        <Link href="/admin/virtual-seva" className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-[#D4A853]/8 border border-[#D4A853]/25 hover:border-[#D4A853]/40 transition-colors">
          <span className="text-lg">🪔</span>
          <p className="text-[#D4A853] text-sm font-raleway font-medium">
            {stats.pendingSeva} Virtual Seva booking{stats.pendingSeva > 1 ? "s" : ""} pending confirmation →
          </p>
        </Link>
      )}

      {!loading && stats.lowStockProducts > 0 && (
        <Link href="/admin/shop-products" className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-yellow-400/10 border border-yellow-400/25 hover:border-yellow-400/40 transition-colors">
          <span className="text-lg">⚠️</span>
          <p className="text-yellow-300 text-sm font-raleway font-medium">
            {stats.lowStockProducts} shop product{stats.lowStockProducts > 1 ? "s are" : " is"} low on stock →
          </p>
        </Link>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quick actions */}
        <div>
          <h2 className="font-cinzel text-[#D4A853] text-base font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#111] border border-[#D4A853]/12 hover:border-[#D4A853]/40 hover:bg-[#D4A853]/5 transition-all duration-200">
                <span className="text-xl">{action.icon}</span>
                <span className="text-[#F5F5F5]/70 text-sm font-raleway font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="font-cinzel text-[#D4A853] text-base font-semibold mb-4">Recent Activity</h2>
          <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] divide-y divide-[#D4A853]/5">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-[#D4A853]/10" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-32 rounded bg-[#D4A853]/10" />
                    <div className="h-2 w-48 rounded bg-[#F5F5F5]/5" />
                  </div>
                </div>
              ))
            ) : activity.length === 0 ? (
              <div className="p-6 text-center text-[#F5F5F5]/30 text-sm font-raleway">No recent activity</div>
            ) : (
              activity.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/15 flex items-center justify-center text-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F5F5F5]/80 text-xs font-raleway font-medium truncate">{item.name}</p>
                    <p className="text-[#F5F5F5]/35 text-xs font-raleway truncate">{item.detail}</p>
                  </div>
                  <p className="text-[#F5F5F5]/25 text-xs font-raleway flex-shrink-0">{formatDate(item.time)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent donations table */}
      <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] overflow-hidden">
        <div className="p-5 border-b border-[#D4A853]/10 flex items-center justify-between">
          <h2 className="font-cinzel text-[#D4A853] font-semibold">Recent Donations</h2>
          <Link href="/admin/donations" className="text-[#D4A853]/60 hover:text-[#D4A853] text-xs font-raleway transition-colors">View all →</Link>
        </div>
        <div className="divide-y divide-[#D4A853]/5">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-[#D4A853]/10" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-36 rounded bg-[#D4A853]/10" />
                  <div className="h-2 w-48 rounded bg-[#F5F5F5]/5" />
                </div>
                <div className="h-5 w-20 rounded bg-[#D4A853]/10" />
              </div>
            ))
          ) : recentDonations.length === 0 ? (
            <div className="p-8 text-center text-[#F5F5F5]/30 text-sm font-raleway">No donations yet</div>
          ) : (
            recentDonations.map((d, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="w-8 h-8 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/20 flex items-center justify-center font-cinzel text-[#D4A853] font-bold text-sm flex-shrink-0">
                  {(d.donorName as string)?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F5F5]/80 text-sm font-raleway font-medium truncate">{d.donorName as string}</p>
                  <p className="text-[#F5F5F5]/35 text-xs font-raleway">{d.category as string} · {d.country as string}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-cinzel text-[#D4A853] font-semibold text-sm">₹{((d.amountInINR as number) ?? 0).toLocaleString("en-IN")}</p>
                  <span className={`text-xs font-raleway px-2 py-0.5 rounded-full ${d.status === "completed" ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"}`}>
                    {d.status as string}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
