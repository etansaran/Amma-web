"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ShopOrder } from "@/lib/shop";

export default function InvoicePage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<ShopOrder | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch(`/api/shop/orders/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setOrder(data.order ?? null));
  }, [params.id]);

  useEffect(() => {
    if (order) {
      const timer = setTimeout(() => window.print(), 250);
      return () => clearTimeout(timer);
    }
  }, [order]);

  if (!order) {
    return <div className="min-h-screen bg-[#f5f1e8] text-black p-8">Loading invoice...</div>;
  }

  return (
    <div className="print-page-wrap min-h-screen bg-[#f5f1e8] text-black p-4 sm:p-8">
      <div className="print-toolbar no-print max-w-4xl mx-auto flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-[#6c4b2a]">Invoice / Packing Slip</p>
          <p className="text-xs text-black/60">Optimized for a clean single-page print</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-full bg-[#1f1f1f] text-white text-sm"
          >
            Print
          </button>
          <button
            onClick={() => window.close()}
            className="px-4 py-2 rounded-full border border-black/15 text-sm"
          >
            Close
          </button>
        </div>
      </div>

      <div className="print-sheet invoice-sheet mx-auto max-w-4xl bg-white text-black rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 sm:p-10">
        <div className="flex items-start justify-between gap-8 border-b border-black/10 pb-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c6a3d] mb-2">Amma Ashram Shop</p>
            <h1 className="text-4xl font-semibold leading-tight">Invoice</h1>
            <p className="text-sm mt-2 text-black/55">Order summary and packing copy</p>
          </div>
          <div className="text-right text-sm leading-7 min-w-[180px]">
            <p><span className="text-black/45">Order</span> <span className="font-semibold">{order.orderNumber}</span></p>
            <p><span className="text-black/45">Date</span> <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString("en-IN")}</span></p>
            <p><span className="text-black/45">Payment</span> <span className="font-semibold capitalize">{order.paymentStatus}</span></p>
            <p><span className="text-black/45">Status</span> <span className="font-semibold capitalize">{order.orderStatus}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8 text-sm print-grid-2">
          <div className="rounded-2xl bg-[#f7f3ec] border border-black/8 p-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-black/45 mb-3">Bill To</p>
            <div className="leading-7">
              <p className="font-semibold">{order.customerName}</p>
              <p>{order.email}</p>
              <p>{order.phone}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#f7f3ec] border border-black/8 p-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-black/45 mb-3">Ship To</p>
            <div className="leading-7">
              <p className="font-semibold">{order.customerName}</p>
              <p>{order.addressLine1}</p>
              {order.addressLine2 ? <p>{order.addressLine2}</p> : null}
              <p>{order.city}, {order.state} {order.postalCode}</p>
              <p>{order.country}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-black/10 mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#f7f3ec]">
                <th className="p-4 text-left font-semibold">Item</th>
                <th className="p-4 text-left font-semibold">Options</th>
                <th className="p-4 text-right font-semibold">Qty</th>
                <th className="p-4 text-right font-semibold">Price</th>
                <th className="p-4 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={`${item.productId}-${index}`} className="border-t border-black/8">
                  <td className="p-4 align-top">
                    <p className="font-medium">{item.title}</p>
                    {item.sku ? <p className="text-xs text-black/45 mt-1">{item.sku}</p> : null}
                  </td>
                  <td className="p-4 align-top text-black/70">
                    {[item.selectedSize, item.selectedVariation].filter(Boolean).join(" / ") || "-"}
                  </td>
                  <td className="p-4 text-right align-top">{item.quantity}</td>
                  <td className="p-4 text-right align-top">₹{item.price.toLocaleString("en-IN")}</td>
                  <td className="p-4 text-right align-top font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between gap-8 items-start print-summary-stack">
          <div className="flex-1">
            {order.notes ? (
              <div className="rounded-2xl bg-[#f7f3ec] border border-black/8 p-5 text-sm">
                <p className="text-[11px] uppercase tracking-[0.24em] text-black/45 mb-3">Notes</p>
                <p className="leading-7 text-black/75">{order.notes}</p>
              </div>
            ) : (
              <div className="text-sm text-black/45 pt-2">Thank you for supporting Amma Ashram.</div>
            )}
          </div>

          <div className="w-full max-w-[280px] rounded-2xl bg-[#1f1f1f] text-white p-5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-white/65">Subtotal</span><span>₹{order.subtotal.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span className="text-white/65">Shipping</span><span>{order.shippingFee === 0 ? "Free" : `₹${order.shippingFee}`}</span></div>
              <div className="h-px bg-white/15" />
              <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>₹{order.totalAmount.toLocaleString("en-IN")}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
