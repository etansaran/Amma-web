"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ShopOrder } from "@/lib/shop";

export default function PrintOrderPage() {
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
    return <div className="min-h-screen bg-[#f5f1e8] text-black p-8">Loading order...</div>;
  }

  return (
    <div className="print-page-wrap min-h-screen bg-[#f5f1e8] text-black p-4 sm:p-8">
      <div className="print-toolbar no-print max-w-3xl mx-auto flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-[#6c4b2a]">Shipping Label</p>
          <p className="text-xs text-black/60">Clean print view for packing and dispatch</p>
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

      <div className="print-sheet shipping-sheet mx-auto max-w-3xl bg-white text-black rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 sm:p-10">
        <div className="flex items-start justify-between border-b border-black/10 pb-5 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c6a3d] mb-2">Amma Ashram Shop</p>
            <h1 className="text-3xl font-semibold leading-tight">Shipping Label</h1>
            <p className="text-sm text-black/55 mt-2">Dispatch copy for order handling</p>
          </div>
          <div className="text-right text-sm leading-6">
            <p><span className="text-black/50">Order</span> <span className="font-semibold">{order.orderNumber}</span></p>
            <p><span className="text-black/50">Date</span> <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString("en-IN")}</span></p>
            <p><span className="text-black/50">Phone</span> <span className="font-semibold">{order.phone}</span></p>
          </div>
        </div>

        <div className="rounded-[20px] border-2 border-dashed border-black/20 p-8 max-w-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-black/45 mb-4">Ship To</p>
          <div className="text-[1.05rem] leading-8">
            <p className="font-semibold text-[1.2rem] mb-2">{order.customerName}</p>
            <p>{order.addressLine1}</p>
            {order.addressLine2 ? <p>{order.addressLine2}</p> : null}
            <p>{order.city}, {order.state} {order.postalCode}</p>
            <p>{order.country}</p>
            <p className="mt-3"><span className="text-black/55">Phone:</span> {order.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8 text-sm">
          <div className="rounded-2xl bg-[#f7f3ec] p-4 border border-black/8">
            <p className="text-black/50 uppercase tracking-[0.18em] text-[11px] mb-2">Payment</p>
            <p className="font-semibold capitalize">{order.paymentStatus}</p>
          </div>
          <div className="rounded-2xl bg-[#f7f3ec] p-4 border border-black/8">
            <p className="text-black/50 uppercase tracking-[0.18em] text-[11px] mb-2">Order Status</p>
            <p className="font-semibold capitalize">{order.orderStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
