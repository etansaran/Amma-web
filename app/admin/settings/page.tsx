"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import FormField from "@/components/forms/FormField";
import Button from "@/components/ui/Button";

const settingsSchema = z.object({
  youtubeLiveId: z.string().optional(),
  siteAnnouncement: z.string().max(300, "Announcement must be 300 characters or less").optional(),
  announcementActive: z.boolean().optional(),
  maintenanceMode: z.boolean().optional(),
  contactEmail: z.string().email("Enter a valid email"),
  contactPhone: z.string().optional(),
  donationUpiId: z.string().optional(),
  ashramAddress: z.string().optional(),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("admin@amma.org");
  const [resetCode, setResetCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [securityLoading, setSecurityLoading] = useState(false);
  const [history, setHistory] = useState<Array<Record<string, any>>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      youtubeLiveId: "",
      siteAnnouncement: "",
      announcementActive: false,
      maintenanceMode: false,
      contactEmail: "info@ammaashram.org",
      contactPhone: "",
      donationUpiId: "",
      ashramAddress: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    const loadSettings = async () => {
      try {
        const res = await fetch("/api/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to load settings");
        }

        const data = await res.json();
        reset(data.settings);
        const historyRes = await fetch("/api/auth/login-history?limit=8", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const historyJson = await historyRes.json();
        setHistory(historyJson.history ?? []);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load settings";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [reset]);

  const announcement = watch("siteAnnouncement") || "";

  const onSubmit = async (data: SettingsForm) => {
    setSaving(true);
    setError(null);
    const token = localStorage.getItem("admin_token");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to save settings");
      }

      const json = await res.json();
      reset(json.settings);
      toast.success("Settings updated");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save settings";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateResetCode = async () => {
    setSecurityLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to generate reset code");
      setGeneratedCode(json.resetCode || "");
      toast.success("Reset code generated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to generate reset code");
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setSecurityLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          resetCode,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to change password");
      setCurrentPassword("");
      setNewPassword("");
      setResetCode("");
      setGeneratedCode("");
      toast.success("Password updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setSecurityLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Settings</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">
          Manage live stream, contact information, announcements, and maintenance settings
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 mb-6 text-center">
          <p className="text-red-400 font-raleway text-sm mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-[#D4A853] text-xs font-raleway hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-6 animate-pulse">
              <div className="h-5 w-40 rounded bg-[#D4A853]/10 mb-4" />
              <div className="space-y-3">
                <div className="h-12 rounded bg-[#F5F5F5]/5" />
                <div className="h-12 rounded bg-[#F5F5F5]/5" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-6"
          >
            <h2 className="font-cinzel text-[#D4A853] text-lg font-semibold mb-5">Public Site Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="YouTube Live ID"
                id="youtubeLiveId"
                placeholder="e.g. dQw4w9WgXcQ"
                registration={register("youtubeLiveId")}
                error={errors.youtubeLiveId?.message}
              />
              <FormField
                label="Donation UPI ID"
                id="donationUpiId"
                placeholder="donate@upi"
                registration={register("donationUpiId")}
                error={errors.donationUpiId?.message}
              />
              <div className="sm:col-span-2">
                <FormField
                  label="Announcement Banner"
                  id="siteAnnouncement"
                  as="textarea"
                  rows={3}
                  placeholder="Add a short banner message for devotees"
                  registration={register("siteAnnouncement")}
                  error={errors.siteAnnouncement?.message}
                />
                <p className="mt-1 text-[#F5F5F5]/25 text-xs font-raleway">{announcement.length}/300</p>
              </div>
              <div className="sm:col-span-2 flex gap-6 flex-wrap">
                <label className="flex items-center gap-2 text-[#F5F5F5]/60 text-sm font-raleway cursor-pointer">
                  <input type="checkbox" {...register("announcementActive")} className="accent-[#D4A853]" />
                  Announcement active
                </label>
                <label className="flex items-center gap-2 text-[#F5F5F5]/60 text-sm font-raleway cursor-pointer">
                  <input type="checkbox" {...register("maintenanceMode")} className="accent-[#D4A853]" />
                  Maintenance mode
                </label>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-6"
          >
            <h2 className="font-cinzel text-[#D4A853] text-lg font-semibold mb-5">Contact Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Contact Email"
                id="contactEmail"
                type="email"
                placeholder="info@ammaashram.org"
                registration={register("contactEmail")}
                error={errors.contactEmail?.message}
                required
              />
              <FormField
                label="Contact Phone"
                id="contactPhone"
                placeholder="+91 98765 43210"
                registration={register("contactPhone")}
                error={errors.contactPhone?.message}
              />
              <div className="sm:col-span-2">
                <FormField
                  label="Ashram Address"
                  id="ashramAddress"
                  as="textarea"
                  rows={3}
                  placeholder="Full ashram address"
                  registration={register("ashramAddress")}
                  error={errors.ashramAddress?.message}
                />
              </div>
            </div>
          </motion.div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" loading={saving}>
              Save Settings
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-6"
          >
            <h2 className="font-cinzel text-[#D4A853] text-lg font-semibold mb-5">Admin Security</h2>
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-6">
              <div className="rounded-2xl border border-[#D4A853]/10 bg-[#0D0D0D] p-5 space-y-4">
                <p className="text-[#F5F5F5]/75 text-sm font-medium">Change Password</p>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  className="input-spiritual rounded-xl px-4 py-3 text-sm w-full"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="input-spiritual rounded-xl px-4 py-3 text-sm w-full"
                />
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="Optional reset code instead of current password"
                  className="input-spiritual rounded-xl px-4 py-3 text-sm w-full"
                />
                <button type="button" onClick={handleChangePassword} className="px-4 py-3 rounded-full bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-white text-sm font-semibold" disabled={securityLoading}>
                  Update Password
                </button>
              </div>

              <div className="rounded-2xl border border-[#D4A853]/10 bg-[#0D0D0D] p-5 space-y-4">
                <p className="text-[#F5F5F5]/75 text-sm font-medium">Forgot Password Recovery</p>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Admin email"
                  className="input-spiritual rounded-xl px-4 py-3 text-sm w-full"
                />
                <button type="button" onClick={handleGenerateResetCode} className="px-4 py-3 rounded-full border border-[#D4A853]/20 text-[#D4A853] text-sm font-semibold" disabled={securityLoading}>
                  Generate Reset Code
                </button>
                {generatedCode ? (
                  <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                    <p className="text-green-300 text-xs uppercase tracking-wide mb-1">Reset code</p>
                    <p className="font-cinzel text-lg text-white">{generatedCode}</p>
                    <p className="text-[#F5F5F5]/40 text-xs mt-2">Use this once in the change password box above.</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#D4A853]/10 bg-[#0D0D0D] p-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="text-[#F5F5F5]/75 text-sm font-medium">Recent login history</p>
                <span className="text-[#D4A853]/60 text-xs">Superadmin only</span>
              </div>
              <div className="space-y-3">
                {history.length === 0 ? (
                  <p className="text-sm text-[#F5F5F5]/35">No login activity recorded yet.</p>
                ) : history.map((entry) => (
                  <div key={String(entry._id || entry.timestamp)} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-[#D4A853]/10 bg-[#111] p-3">
                    <div>
                      <p className="text-sm text-[#F5F5F5]/75">{entry.email}</p>
                      <p className="text-xs text-[#F5F5F5]/35">{entry.ipAddress || "unknown IP"} · {entry.mode || "local"}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs ${entry.status === "success" ? "text-green-300" : "text-red-300"}`}>{entry.status}</p>
                      <p className="text-xs text-[#D4A853]/60">{new Date(String(entry.timestamp || entry.createdAt)).toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </form>
      )}
    </div>
  );
}
