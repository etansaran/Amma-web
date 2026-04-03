"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) router.replace("/admin/dashboard");
      })
      .catch(() => {});
  }, [router]);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Login failed");
      }

      // Store token in localStorage for client-side use
      localStorage.setItem("admin_token", json.token);
      toast.success("Welcome back, Admin 🙏");
      router.push("/admin/dashboard");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C17F4A] to-[#D4A853] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(193,127,74,0.4)]">
            <span className="text-white text-2xl font-bold font-cinzel">ஓம்</span>
          </div>
          <h1 className="font-cinzel text-2xl font-bold text-[#D4A853] mb-1">Admin Portal</h1>
          <p className="text-[#F5F5F5]/40 text-sm font-raleway">Siva Sri Thiyaneswar Amma Ashram</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-[#D4A853]/20 bg-[#111]/90 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#C17F4A] via-[#D4A853] to-[#C17F4A]" />
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@ammaashram.org"
                  className={`w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway ${errors.email ? "border-red-500/50" : ""}`}
                  {...register("email")}
                />
                {errors.email && <p className="mt-1 text-red-400 text-xs">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway ${errors.password ? "border-red-500/50" : ""}`}
                  {...register("password")}
                />
                {errors.password && <p className="mt-1 text-red-400 text-xs">{errors.password.message}</p>}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-white font-raleway font-semibold rounded-full hover:shadow-[0_0_25px_rgba(193,127,74,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : "Sign In"}
              </motion.button>
            </form>
          </div>
        </div>

        <p className="text-center text-[#F5F5F5]/25 text-xs mt-6 font-raleway">
          Authorized personnel only. All access is logged.
        </p>
      </motion.div>
    </div>
  );
}
