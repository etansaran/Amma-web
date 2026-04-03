"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const navItems = [
  { href: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/admin/events", icon: "🎉", label: "Events" },
  { href: "/admin/blogs", icon: "📝", label: "Blogs" },
  { href: "/admin/donations", icon: "💰", label: "Donations" },
  { href: "/admin/appointments", icon: "📅", label: "Appointments" },
  { href: "/admin/messages", icon: "✉️", label: "Messages" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Skip auth check on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("admin_token");
    toast.success("Logged out");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d0d0d] border-r border-[#D4A853]/10 flex flex-col fixed top-0 left-0 h-screen z-40">
        {/* Logo */}
        <div className="p-6 border-b border-[#D4A853]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C17F4A] to-[#D4A853] flex items-center justify-center">
              <span className="text-white text-sm font-bold">ஓம்</span>
            </div>
            <div>
              <p className="font-cinzel text-[#D4A853] text-xs font-semibold leading-tight">Amma Ashram</p>
              <p className="text-[#F5F5F5]/30 text-xs font-raleway">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-raleway font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#D4A853]/15 text-[#D4A853] border border-[#D4A853]/20"
                    : "text-[#F5F5F5]/50 hover:text-[#F5F5F5] hover:bg-[#D4A853]/5"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#D4A853]/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-2 text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70 text-xs font-raleway mb-2 transition-colors">
            ← View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-[#C17F4A]/70 hover:text-[#C17F4A] text-sm font-raleway transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
