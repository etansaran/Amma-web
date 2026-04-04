"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/helpers";

interface Donation {
  _id: string;
  donorName: string;
  donorEmail: string;
  country?: string;
  amount: number;
  currency: string;
  amountInINR: number;
  category: string;
  frequency: string;
  status: string;
  paymentGateway?: string;
  receiptNumber?: string;
  receiptUrl?: string;
  message?: string;
  createdAt: string;
}

interface Stats {
  totalAmount: number;
  totalDonors: string[];
  count: number;
}

const statusColors: Record<string, string> = {
  completed: "text-green-400 bg-green-400/10",
  pending: "text-yellow-400 bg-yellow-400/10",
  failed: "text-red-400 bg-red-400/10",
  refunded: "text-blue-400 bg-blue-400/10",
};

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<Stats>({ totalAmount: 0, totalDonors: [], count: 0 });
  const [donorHistory, setDonorHistory] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    fetch("/api/donations?limit=200", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        setDonations(data.donations ?? []);
        if (data.stats) setStats(data.stats);
        setDonorHistory(data.donorHistory ?? []);
        setSelectedDonation((data.donations ?? [])[0] ?? null);
      })
      .catch(() => setError("Failed to load donations"))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const filtered = (filter === "all" ? donations : donations.filter(d => d.status === filter))
    .filter((d) =>
      !search ||
      [d.donorName, d.donorEmail, d.category, d.country]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  const pendingCount = donations.filter(d => d.status === "pending").length;

  const exportCsv = () => {
    const rows = [
      ["Donor Name", "Donor Email", "Amount INR", "Currency", "Category", "Frequency", "Status", "Date"],
      ...filtered.map((d) => [
        d.donorName,
        d.donorEmail,
        d.amountInINR,
        d.currency,
        d.category,
        d.frequency,
        d.status,
        d.createdAt,
      ]),
    ];
    const csv = rows.map((row) => row.map((item) => `"${String(item ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amma-donations.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const selectedDonorHistory = selectedDonation
    ? donorHistory.find((item) => item.donorEmail === selectedDonation.donorEmail)
    : null;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Donations</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">View and track all donations</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search donor, email, category..."
            className="input-spiritual rounded-full px-4 py-2.5 text-sm min-w-[260px]"
          />
          <button
            type="button"
            onClick={exportCsv}
            className="px-4 py-2.5 rounded-full border border-[#D4A853]/20 text-[#D4A853] text-sm font-medium"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#111] border border-[#D4A853]/10 animate-pulse">
              <div className="h-7 w-7 rounded bg-[#D4A853]/10 mb-2" />
              <div className="h-8 w-32 rounded bg-[#D4A853]/10 mb-1" />
              <div className="h-3 w-24 rounded bg-[#F5F5F5]/5" />
            </div>
          ))
        ) : (
          [
            { label: "Total Received (INR)", value: `₹${(stats.totalAmount ?? 0).toLocaleString("en-IN")}`, icon: "💰" },
            { label: "Total Donations", value: stats.count.toString(), icon: "✅" },
            { label: "Pending", value: pendingCount.toString(), icon: "⏳" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl bg-[#111] border border-[#D4A853]/10">
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className="font-cinzel text-[#D4A853] text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-[#F5F5F5]/40 text-xs font-raleway">{stat.label}</p>
            </div>
          ))
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", "completed", "pending", "failed", "refunded"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-raleway font-medium capitalize transition-all duration-200 ${
              filter === f ? "bg-[#D4A853] text-[#0D0D0D]" : "border border-[#D4A853]/20 text-[#F5F5F5]/50 hover:text-[#D4A853]"
            }`}>
            {f}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 mb-6 text-center">
          <p className="text-red-400 font-raleway text-sm mb-3">{error}</p>
          <button onClick={() => { setError(null); setRefreshKey(k => k + 1); }}
            className="text-[#D4A853] text-xs font-raleway hover:underline">Retry</button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
      {/* Table */}
      <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-[#D4A853]/5 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">💰</p>
            <p className="text-[#F5F5F5]/40 font-raleway text-sm">No donations{filter !== "all" ? ` with status "${filter}"` : ""}</p>
          </div>
        ) : (
          <>
            <div className="md:hidden divide-y divide-[#D4A853]/5">
              {filtered.map((d) => (
                <button key={d._id} onClick={() => setSelectedDonation(d)} className="w-full text-left p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[#F5F5F5]/85 text-sm font-medium">{d.donorName}</p>
                      <p className="text-[#F5F5F5]/35 text-xs mt-1">{d.donorEmail}</p>
                    </div>
                    <span className={`text-[11px] px-2 py-1 rounded-full font-raleway ${statusColors[d.status] || "text-gray-400"}`}>
                      {d.status}
                    </span>
                  </div>
                  <div className="rounded-xl border border-[#D4A853]/10 bg-[#0D0D0D] p-3">
                    <p className="font-cinzel text-[#D4A853] text-lg">₹{d.amountInINR.toLocaleString("en-IN")}</p>
                    <p className="text-[#F5F5F5]/35 text-xs">{d.amount} {d.currency} · {d.frequency}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-[#F5F5F5]/45">
                    <span className="px-2 py-1 rounded-full bg-[#C17F4A]/10 text-[#C17F4A] capitalize">{d.category.replace(/-/g, " ")}</span>
                    {d.country ? <span>{d.country}</span> : null}
                    <span>{formatDate(d.createdAt)}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="hidden md:block overflow-x-auto">
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
                  <tr key={d._id} className="hover:bg-[#D4A853]/3 transition-colors cursor-pointer" onClick={() => setSelectedDonation(d)}>
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
                        {d.category.replace(/-/g, " ")}
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
          </>
        )}
      </div>

      <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-5">
        {!selectedDonation ? (
          <div className="py-16 text-center text-[#F5F5F5]/35">Select a donation to view details</div>
        ) : (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="font-cinzel text-xl text-[#D4A853]">{selectedDonation.donorName}</h2>
                <p className="text-[#F5F5F5]/45 text-sm">{selectedDonation.donorEmail}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Link href={`/admin/donations/${selectedDonation._id}/receipt`} target="_blank" className="px-4 py-2 rounded-full border border-[#D4A853]/20 text-[#D4A853] text-xs">
                  Receipt
                </Link>
                <Link href={`/admin/donations/${selectedDonation._id}/certificate`} target="_blank" className="px-4 py-2 rounded-full border border-[#D4A853]/20 text-[#D4A853] text-xs">
                  Certificate
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#D4A853]/10 bg-[#0D0D0D] p-4">
                <p className="text-[#F5F5F5]/30 text-xs uppercase tracking-wide mb-2">Amount</p>
                <p className="font-cinzel text-[#D4A853] text-2xl">₹{selectedDonation.amountInINR.toLocaleString("en-IN")}</p>
                <p className="text-[#F5F5F5]/35 text-xs mt-1">{selectedDonation.amount} {selectedDonation.currency}</p>
              </div>
              <div className="rounded-xl border border-[#D4A853]/10 bg-[#0D0D0D] p-4">
                <p className="text-[#F5F5F5]/30 text-xs uppercase tracking-wide mb-2">Status</p>
                <span className={`text-xs px-2 py-1 rounded-full font-raleway ${statusColors[selectedDonation.status] || "text-gray-400"}`}>
                  {selectedDonation.status}
                </span>
                <p className="text-[#F5F5F5]/35 text-xs mt-3">{formatDate(selectedDonation.createdAt)}</p>
              </div>
            </div>

            <div className="rounded-xl border border-[#D4A853]/10 bg-[#0D0D0D] p-4 text-sm">
              <p className="text-[#D4A853] font-medium mb-3">Donation details</p>
              <div className="grid grid-cols-2 gap-3 text-[#F5F5F5]/60">
                <p>Category: <span className="capitalize">{selectedDonation.category.replace(/-/g, " ")}</span></p>
                <p>Frequency: <span className="capitalize">{selectedDonation.frequency}</span></p>
                <p>Country: {selectedDonation.country || "-"}</p>
                <p>Receipt No: {selectedDonation.receiptNumber || "Will generate on completion"}</p>
              </div>
              {selectedDonation.message ? (
                <p className="mt-3 text-[#F5F5F5]/55">{selectedDonation.message}</p>
              ) : null}
            </div>

            <div className="rounded-xl border border-[#D4A853]/10 bg-[#0D0D0D] p-4">
              <p className="text-[#D4A853] font-medium mb-3">Donor history</p>
              {selectedDonorHistory ? (
                <div className="space-y-2 text-sm text-[#F5F5F5]/60">
                  <p>Total donated: <span className="text-[#D4A853] font-semibold">₹{Number(selectedDonorHistory.totalAmount || 0).toLocaleString("en-IN")}</span></p>
                  <p>Total donations: {selectedDonorHistory.count}</p>
                  <p>Last donated: {formatDate(String(selectedDonorHistory.lastDonatedAt || selectedDonation.createdAt))}</p>
                </div>
              ) : (
                <p className="text-sm text-[#F5F5F5]/35">This is the first recorded donation from this donor.</p>
              )}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
