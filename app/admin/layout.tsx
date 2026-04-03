"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const navItems = [
  { href: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/admin/events", icon: "🎉", label: "Events" },
  { href: "/admin/event-registrations", icon: "📋", label: "Registrations" },
  { href: "/admin/blogs", icon: "📝", label: "Blogs" },
  { href: "/admin/shop-products", icon: "🛍️", label: "Shop Products" },
  { href: "/admin/shop-orders", icon: "📦", label: "Shop Orders" },
  { href: "/admin/gallery", icon: "🖼️", label: "Gallery" },
  { href: "/admin/donations", icon: "💰", label: "Donations" },
  { href: "/admin/appointments", icon: "📅", label: "Appointments" },
  { href: "/admin/messages", icon: "✉️", label: "Messages" },
  { href: "/admin/virtual-seva", icon: "🪔", label: "Virtual Seva" },
  { href: "/admin/settings", icon: "⚙️", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string; role?: string } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const isPrintRoute =
    pathname?.startsWith("/admin/shop-orders/") &&
    (pathname.endsWith("/print") || pathname.endsWith("/invoice"));

  useEffect(() => {
    if (pathname === "/admin/login") {
      setCheckingAuth(false);
      return;
    }

    const token = localStorage.getItem("admin_token");

    if (!token) {
      setCheckingAuth(false);
      router.replace("/admin/login");
      return;
    }

    const verifyUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setUser(data.user ?? null);
      } catch {
        localStorage.removeItem("admin_token");
        toast.error("Please sign in to continue");
        router.replace("/admin/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyUser();
  }, [pathname, router]);

  // Skip auth wrapper on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });
    } catch {
      // Even if the request fails, we still clear client auth state below.
    } finally {
      localStorage.removeItem("admin_token");
      setUser(null);
      toast.success("Logged out");
      router.replace("/admin/login");
      router.refresh();
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = "/admin/login";
        }
      }, 100);
      setLoggingOut(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full border-2 border-[#D4A853]/20 border-t-[#D4A853] animate-spin mx-auto mb-4" />
          <p className="font-raleway text-sm text-[#F5F5F5]/50">Loading admin portal...</p>
        </div>
      </div>
    );
  }

  if (isPrintRoute) {
    return <div className="min-h-screen bg-[#f5f1e8]">{children}</div>;
  }

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
          {user && (
            <div className="px-4 py-3 mb-3 rounded-xl bg-[#D4A853]/5 border border-[#D4A853]/10">
              <p className="text-[#F5F5F5]/70 text-sm font-raleway font-medium truncate">{user.name}</p>
              <p className="text-[#F5F5F5]/35 text-xs font-raleway truncate">{user.email}</p>
            </div>
          )}
          <Link href="/" className="flex items-center gap-3 px-4 py-2 text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70 text-xs font-raleway mb-2 transition-colors">
            ← View Public Site
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-2 text-[#C17F4A]/70 hover:text-[#C17F4A] text-sm font-raleway transition-colors disabled:opacity-50"
          >
            🚪 {loggingOut ? "Logging out..." : "Logout"}
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
