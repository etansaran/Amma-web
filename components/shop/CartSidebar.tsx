"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

type CheckoutForm = {
  customerName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes: string;
  paymentMethod: "upi-transfer" | "cash-on-delivery";
};

const initialForm: CheckoutForm = {
  customerName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  notes: "",
  paymentMethod: "upi-transfer",
};

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<{ orderNumber: string; totalAmount: number; message: string } | null>(null);
  const [couponCode, setCouponCode] = useState("");

  const discountAmount = useMemo(() => {
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === "AMMA10") return Math.min(Math.round(totalPrice * 0.1), 300);
    if (normalized === "SEVA100" && totalPrice >= 1000) return 100;
    return 0;
  }, [couponCode, totalPrice]);
  const shippingFee = useMemo(() => ((totalPrice - discountAmount) >= 999 ? 0 : 99), [discountAmount, totalPrice]);
  const grandTotal = totalPrice - discountAmount + shippingFee;

  const setField = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    setError("");

    if (!form.customerName || !form.email || !form.phone || !form.addressLine1 || !form.city || !form.state || !form.postalCode) {
      setError("Please complete the shipping details before placing the order.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/shop/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
            selectedVariation: item.selectedVariation,
          })),
          couponCode,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to place order");

      setOrderSuccess({
        orderNumber: data.order.orderNumber,
        totalAmount: data.order.totalAmount,
        message: data.message || "Order placed successfully.",
      });
      clearCart();
      setCouponCode("");
      setShowCheckout(false);
      setForm(initialForm);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-[#1A1A1A] border-l border-[#D4A853]/15 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#D4A853]/15">
              <div>
                <h2 className="font-cinzel text-[#F5F5F5] text-lg font-semibold">
                  {showCheckout ? "Checkout" : "My Cart"}
                </h2>
                <p className="text-[#C17F4A] text-xs mt-0.5">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-[#222222] flex items-center justify-center text-[#F5F5F5]/60 hover:text-[#F5F5F5] hover:bg-[#3A2A1A] transition-all"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
              {orderSuccess ? (
                <div className="rounded-2xl border border-green-500/25 bg-green-500/5 p-5 text-center">
                  <p className="text-5xl mb-3">✅</p>
                  <h3 className="font-cinzel text-xl text-green-400 mb-2">Order placed</h3>
                  <p className="text-[#F5F5F5]/70 text-sm mb-2">Order No: {orderSuccess.orderNumber}</p>
                  <p className="text-[#F5F5F5]/50 text-sm mb-5">
                    Total: ₹{orderSuccess.totalAmount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[#D4A853]/80 text-sm mb-5">
                    {orderSuccess.message}
                  </p>
                  <button
                    onClick={() => {
                      setOrderSuccess(null);
                      closeCart();
                    }}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                    style={{ background: "#2D6A4F" }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <span className="text-6xl mb-4 opacity-40">🛕</span>
                  <p className="font-cinzel text-[#F5F5F5]/50 text-base">Your cart is empty</p>
                  <p className="text-[#F5F5F5]/30 text-sm mt-2">Add sacred items to begin</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                    style={{ background: "#C17F4A" }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {!showCheckout && items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-3 bg-[#222222] rounded-xl p-3 border border-[#D4A853]/10"
                    >
                      <div className="w-16 h-16 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-3xl shrink-0">
                        {item.product.emoji}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-cinzel text-[#F5F5F5] text-xs font-semibold leading-snug line-clamp-2 mb-1">
                          {item.product.title}
                        </p>
                        {(item.selectedSize || item.selectedVariation) && (
                          <p className="text-[#F5F5F5]/40 text-[11px] mb-1">
                            {[item.selectedSize, item.selectedVariation].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        <p className="text-[#D4A853] text-sm font-bold mb-2">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-6 h-6 rounded-full bg-[#1A1A1A] text-[#F5F5F5] text-sm flex items-center justify-center disabled:opacity-30 hover:bg-[#C17F4A]/20 transition-colors"
                          >
                            −
                          </button>
                          <span className="text-[#F5F5F5] text-sm w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-[#1A1A1A] text-[#F5F5F5] text-sm flex items-center justify-center hover:bg-[#C17F4A]/20 transition-colors"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-[#F5F5F5]/30 hover:text-red-400 text-xs transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {showCheckout && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input value={form.customerName} onChange={(e) => setField("customerName", e.target.value)} placeholder="Full name" className="input-spiritual rounded-xl px-4 py-3 text-sm col-span-2" />
                        <input value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="Email" className="input-spiritual rounded-xl px-4 py-3 text-sm col-span-2" />
                        <input value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="Phone" className="input-spiritual rounded-xl px-4 py-3 text-sm col-span-2" />
                        <input value={form.addressLine1} onChange={(e) => setField("addressLine1", e.target.value)} placeholder="Address line 1" className="input-spiritual rounded-xl px-4 py-3 text-sm col-span-2" />
                        <input value={form.addressLine2} onChange={(e) => setField("addressLine2", e.target.value)} placeholder="Address line 2 (optional)" className="input-spiritual rounded-xl px-4 py-3 text-sm col-span-2" />
                        <input value={form.city} onChange={(e) => setField("city", e.target.value)} placeholder="City" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
                        <input value={form.state} onChange={(e) => setField("state", e.target.value)} placeholder="State" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
                        <input value={form.postalCode} onChange={(e) => setField("postalCode", e.target.value)} placeholder="Pincode" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
                        <input value={form.country} onChange={(e) => setField("country", e.target.value)} placeholder="Country" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
                        <select value={form.paymentMethod} onChange={(e) => setField("paymentMethod", e.target.value)} className="input-spiritual rounded-xl px-4 py-3 text-sm col-span-2">
                          <option value="upi-transfer">UPI / manual payment</option>
                          <option value="cash-on-delivery">Cash on delivery</option>
                        </select>
                        <textarea value={form.notes} onChange={(e) => setField("notes", e.target.value)} placeholder="Order notes (optional)" className="input-spiritual rounded-xl px-4 py-3 text-sm col-span-2 min-h-[88px]" />
                      </div>
                      <div className="rounded-xl border border-[#D4A853]/10 bg-[#111] p-4">
                        <p className="text-[#D4A853] text-sm font-medium mb-3">Order summary</p>
                        <input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon code (try AMMA10)"
                          className="input-spiritual rounded-xl px-4 py-3 text-sm w-full mb-3"
                        />
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-[#F5F5F5]/60">
                            <span>Subtotal</span>
                            <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                          </div>
                          {discountAmount > 0 && (
                            <div className="flex justify-between text-green-300/80">
                              <span>Discount</span>
                              <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-[#F5F5F5]/60">
                            <span>Shipping</span>
                            <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
                          </div>
                          <div className="flex justify-between text-[#D4A853] font-semibold">
                            <span>Total</span>
                            <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {items.length > 0 && !orderSuccess && (
              <div className="border-t border-[#D4A853]/15 px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#F5F5F5]/60 text-sm">Subtotal</span>
                  <span className="font-cinzel text-[#D4A853] text-lg font-bold">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#F5F5F5]/40 text-xs">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-green-300/80 text-xs">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {error && <p className="text-red-400 text-xs">{error}</p>}

                {showCheckout ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="flex-1 py-3.5 rounded-full text-sm font-semibold border border-[#D4A853]/20 text-[#F5F5F5]/70"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCheckout}
                      disabled={submitting}
                      className="flex-1 py-3.5 rounded-full font-cinzel font-semibold text-white text-sm tracking-wide transition-all duration-300 disabled:opacity-50"
                      style={{ background: "linear-gradient(135deg, #C17F4A, #D4A853)" }}
                    >
                      {submitting ? "Placing..." : "Place Order"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full py-3.5 rounded-full font-cinzel font-semibold text-white text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(193,127,74,0.4)]"
                    style={{ background: "linear-gradient(135deg, #C17F4A, #D4A853)" }}
                  >
                    Proceed to Checkout →
                  </button>
                )}

                <div className="flex justify-center gap-4 pt-1">
                  {["🔒 Secure", "📦 Ship Ready", "✓ Authentic"].map(t => (
                    <span key={t} className="text-[#F5F5F5]/30 text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
