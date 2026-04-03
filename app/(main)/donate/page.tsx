"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import FormField from "@/components/forms/FormField";
import Button from "@/components/ui/Button";
import { CURRENCY_SYMBOLS } from "@/utils/helpers";

const donationSchema = z.object({
  donorName: z.string().min(2, "Name is required"),
  donorEmail: z.string().email("Valid email required"),
  donorPhone: z.string().optional(),
  country: z.string(),
  amount: z.string().min(1, "Amount is required"),
  currency: z.string(),
  category: z.string(),
  frequency: z.string(),
  message: z.string().optional(),
  panCard: z.string().optional(),
});

type DonationForm = z.infer<typeof donationSchema>;

const categories = [
  { value: "general", label: "General Donation" },
  { value: "annadhanam", label: "Annadhanam (Free Meals)" },
  { value: "pournami", label: "Pournami Annadhanam" },
  { value: "karthigai-deepam", label: "Karthigai Deepam" },
  { value: "construction", label: "Ashram Construction" },
  { value: "virtual-seva", label: "Virtual Seva / Pooja" },
];

const PRESET_AMOUNTS = {
  INR: [500, 1100, 2500, 5000, 11000, 25000],
  USD: [10, 25, 50, 100, 251, 501],
  GBP: [10, 20, 50, 100, 201, 501],
  EUR: [10, 25, 50, 100, 251, 501],
  AUD: [15, 35, 75, 150, 301, 751],
  CAD: [15, 35, 75, 150, 301, 751],
  SGD: [15, 35, 75, 150, 251, 501],
};

const CURRENCIES = ["INR", "USD", "GBP", "EUR", "AUD", "CAD", "SGD"];

export default function DonatePage() {
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [loading, setLoading] = useState(false);

  const amounts = PRESET_AMOUNTS[selectedCurrency as keyof typeof PRESET_AMOUNTS];

  const handleDonate = async () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount < 1) {
      toast.error("Please select or enter an amount");
      return;
    }

    setLoading(true);
    try {
      const formData = {
        donorName: (document.getElementById("donorName") as HTMLInputElement)?.value,
        donorEmail: (document.getElementById("donorEmail") as HTMLInputElement)?.value,
        donorPhone: (document.getElementById("donorPhone") as HTMLInputElement)?.value,
        country: (document.getElementById("country") as HTMLSelectElement)?.value,
        category: (document.getElementById("category") as HTMLSelectElement)?.value,
        message: (document.getElementById("message") as HTMLTextAreaElement)?.value,
        amount,
        currency: selectedCurrency,
        frequency,
      };

      const res = await fetch("/api/donations/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const { orderId, amount: orderAmount, currency, donationId, keyId, mode } = await res.json();

      if (mode === "local") {
        toast.success("🙏 Donation recorded successfully in local mode.");
        return;
      }

      // Load Razorpay
      const options = {
        key: keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency,
        name: "Siva Sri Thiyaneswar Amma Ashram",
        description: `${formData.category} donation`,
        order_id: orderId,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          const verifyRes = await fetch("/api/donations/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, donationId }),
          });

          if (verifyRes.ok) {
            toast.success("🙏 Donation received! Amma blesses you abundantly.");
          } else {
            toast.error("Payment verification failed. Please contact us.");
          }
        },
        prefill: { name: formData.donorName, email: formData.donorEmail, contact: formData.donorPhone },
        theme: { color: "#D4A853" },
      };

      // @ts-expect-error Razorpay is loaded via script
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const symbol = CURRENCY_SYMBOLS[selectedCurrency] || "₹";

  return (
    <>
      {/* Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center mb-16"
          >
            <p className="font-devanagari text-[#D4A853]/60 tracking-[0.4em] text-sm mb-4">
              दान • Dāna
            </p>
            <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gold-shimmer">Make an Offering</span>
            </h1>
            <p className="text-[#F5F5F5]/60 font-raleway text-lg max-w-2xl mx-auto leading-relaxed">
              Every offering, however small, is received by the divine with infinite
              gratitude. Your gift directly transforms lives at the sacred foot of Arunachala.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Impact info */}
            <div className="space-y-5">
              <h3 className="font-cinzel text-[#D4A853] text-lg font-semibold">Your Gift Creates</h3>

              {[
                { amount: "₹500", impact: "Feeds 20 pilgrims a meal" },
                { amount: "₹1,100", impact: "Sponsors 1 day of prasad" },
                { amount: "₹2,500", impact: "Full day Annadhanam for 100 people" },
                { amount: "₹5,000", impact: "Weekly Annadhanam sponsorship" },
                { amount: "₹11,000", impact: "Monthly contribution to Ashram" },
                { amount: "₹25,000", impact: "Pournami feast for 500 devotees" },
              ].map((item) => (
                <div key={item.amount} className="flex items-center gap-3 p-3 rounded-xl bg-[#111] border border-[#D4A853]/10">
                  <span className="font-cinzel text-[#D4A853] font-bold text-sm min-w-[70px]">{item.amount}</span>
                  <span className="text-[#F5F5F5]/50 text-xs font-raleway">{item.impact}</span>
                </div>
              ))}

              <div className="p-4 rounded-xl bg-[#D4A853]/10 border border-[#D4A853]/20">
                <p className="text-[#D4A853] font-cinzel text-sm font-semibold mb-1">80G Tax Exemption</p>
                <p className="text-[#F5F5F5]/50 text-xs font-raleway">
                  Indian donors are eligible for 80G tax deduction. Receipt will be emailed to you.
                </p>
              </div>
            </div>

            {/* Donation form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="rounded-2xl border border-[#D4A853]/20 bg-[#111]/90 overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-[#C17F4A] via-[#D4A853] to-[#C17F4A]" />
                <div className="p-8 space-y-6">
                  {/* Frequency */}
                  <div>
                    <label className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-3">
                      Donation Frequency
                    </label>
                    <div className="flex gap-3">
                      {(["one-time", "monthly"] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFrequency(f)}
                          className={`flex-1 py-3 rounded-xl text-sm font-raleway font-medium capitalize transition-all duration-300 ${
                            frequency === f
                              ? "bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-white"
                              : "border border-[#D4A853]/25 text-[#F5F5F5]/60 hover:border-[#D4A853]/50"
                          }`}
                        >
                          {f.replace("-", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Currency */}
                  <div>
                    <label className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-3">
                      Currency
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CURRENCIES.map((c) => (
                        <button
                          key={c}
                          onClick={() => { setSelectedCurrency(c); setSelectedAmount(null); setCustomAmount(""); }}
                          className={`px-4 py-2 rounded-lg text-sm font-raleway font-medium transition-all duration-200 ${
                            selectedCurrency === c
                              ? "bg-[#D4A853] text-[#0D0D0D]"
                              : "border border-[#D4A853]/25 text-[#F5F5F5]/60 hover:border-[#D4A853]/50"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-3">
                      Amount ({symbol})
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {amounts.map((a) => (
                        <button
                          key={a}
                          onClick={() => { setSelectedAmount(a); setCustomAmount(""); }}
                          className={`py-3 rounded-xl text-sm font-raleway font-semibold transition-all duration-200 ${
                            selectedAmount === a
                              ? "bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-white shadow-[0_0_20px_rgba(193,127,74,0.3)]"
                              : "border border-[#D4A853]/20 text-[#D4A853]/70 hover:border-[#D4A853]/50 hover:text-[#D4A853]"
                          }`}
                        >
                          {symbol}{a.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder={`Or enter custom amount in ${selectedCurrency}`}
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5">
                      Donation Category
                    </label>
                    <select id="category" className="w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway">
                      {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>

                  {/* Donor info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="donorName" className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5">
                        Full Name <span className="text-[#C17F4A]">*</span>
                      </label>
                      <input id="donorName" type="text" placeholder="Your name" className="w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway" />
                    </div>
                    <div>
                      <label htmlFor="donorEmail" className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5">
                        Email <span className="text-[#C17F4A]">*</span>
                      </label>
                      <input id="donorEmail" type="email" placeholder="your@email.com" className="w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway" />
                    </div>
                    <div>
                      <label htmlFor="donorPhone" className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5">Phone</label>
                      <input id="donorPhone" type="tel" placeholder="+91 98765 43210" className="w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway" />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5">Country</label>
                      <select id="country" className="w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway">
                        {["India","United States","United Kingdom","Canada","Australia","Singapore","UAE","Malaysia","Germany","Other"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5">Message / Intention (optional)</label>
                      <textarea id="message" rows={2} placeholder="Dedicate this donation to a loved one, or share your intention..." className="w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway resize-none" />
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    loading={loading}
                    onClick={handleDonate}
                  >
                    🙏 Proceed to Donate {selectedAmount || customAmount ? `${symbol}${(selectedAmount || parseInt(customAmount) || 0).toLocaleString()}` : ""}
                  </Button>

                  <p className="text-[#F5F5F5]/30 text-xs text-center font-raleway">
                    Secured by Razorpay (India) | International donors: Contact us for wire transfer details.
                    All transactions are encrypted and secure.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
