"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import type { ShopOrder } from "@/lib/shop";

type Stats = {
  totalOrders: number;
  successfulOrders: number;
  paymentPending: number;
  totalRevenue: number;
};

export default function AdminShopOrdersPage() {
  const [orders, setOrders] = useState<ShopOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<ShopOrder | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    successfulOrders: 0,
    paymentPending: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    try {
      const response = await fetch("/api/shop/orders?admin=true&limit=100", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setOrders(data.orders ?? []);
      setStats(data.stats ?? stats);
      setSelectedOrder((current) => {
        if (!current) return data.orders?.[0] ?? null;
        return (data.orders ?? []).find((order: ShopOrder) => order._id === current._id) ?? current;
      });
    } catch {
      toast.error("Failed to load shop orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateOrder = async (id: string, payload: Partial<ShopOrder>) => {
    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(`/api/shop/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Update failed");
      toast.success("Order updated");
      loadOrders();
    } catch {
      toast.error("Failed to update order");
    }
  };

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders.toString(), icon: "📦" },
    { label: "Successful Orders", value: stats.successfulOrders.toString(), icon: "✅" },
    { label: "Payment Pending", value: stats.paymentPending.toString(), icon: "⏳" },
    { label: "Revenue", value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`, icon: "💰" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Shop Orders</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">Track orders, payments, and shipping addresses</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-5">
            <p className="text-2xl mb-3">{card.icon}</p>
            <p className="font-cinzel text-[#D4A853] text-2xl font-bold">{card.value}</p>
            <p className="text-[#F5F5F5]/40 text-xs mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-14 rounded-xl bg-[#D4A853]/5 animate-pulse" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center text-[#F5F5F5]/40">No shop orders yet</div>
          ) : (
            <div className="divide-y divide-[#D4A853]/5">
              {orders.map((order) => (
                <button
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left p-4 transition-colors ${selectedOrder?._id === order._id ? "bg-[#D4A853]/8" : "hover:bg-[#D4A853]/3"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[#F5F5F5]/80 text-sm font-medium">{order.orderNumber}</p>
                      <p className="text-[#F5F5F5]/35 text-xs mt-1">{order.customerName} · {order.city}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#D4A853] text-sm font-semibold">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                      <p className="text-[#F5F5F5]/35 text-xs">{order.paymentStatus} · {order.orderStatus}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-5">
          {!selectedOrder ? (
            <div className="text-center text-[#F5F5F5]/40 py-16">Select an order to view details</div>
          ) : (
            <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-cinzel text-[#D4A853] text-xl">{selectedOrder.orderNumber}</h2>
                    <p className="text-[#F5F5F5]/40 text-sm">{selectedOrder.customerName} · {selectedOrder.phone}</p>
                  </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/shop-orders/${selectedOrder._id}/print`}
                    target="_blank"
                    className="px-4 py-2 rounded-full border border-[#D4A853]/20 text-[#D4A853] text-xs"
                  >
                    Print Address
                  </Link>
                  <Link
                    href={`/admin/shop-orders/${selectedOrder._id}/invoice`}
                    target="_blank"
                    className="px-4 py-2 rounded-full border border-[#D4A853]/20 text-[#D4A853] text-xs"
                  >
                    Print Invoice
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={selectedOrder.paymentStatus}
                  onChange={(e) => updateOrder(selectedOrder._id, { paymentStatus: e.target.value as ShopOrder["paymentStatus"] })}
                  className="input-spiritual rounded-xl px-4 py-3 text-sm"
                >
                  <option value="pending">Payment Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => updateOrder(selectedOrder._id, { orderStatus: e.target.value as ShopOrder["orderStatus"] })}
                  className="input-spiritual rounded-xl px-4 py-3 text-sm"
                >
                  <option value="new">New</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="rounded-xl border border-[#D4A853]/10 bg-[#0D0D0D] p-4">
                <p className="text-[#D4A853] text-sm font-medium mb-2">Shipping address</p>
                <p className="text-[#F5F5F5]/70 text-sm leading-6">
                  {selectedOrder.customerName}<br />
                  {selectedOrder.addressLine1}<br />
                  {selectedOrder.addressLine2 ? <>{selectedOrder.addressLine2}<br /></> : null}
                  {selectedOrder.city}, {selectedOrder.state} {selectedOrder.postalCode}<br />
                  {selectedOrder.country}
                </p>
              </div>

              <div className="rounded-xl border border-[#D4A853]/10 bg-[#0D0D0D] p-4">
                <p className="text-[#D4A853] text-sm font-medium mb-3">Order items</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={`${item.productId}-${index}`} className="flex justify-between gap-3 text-sm">
                      <div>
                        <p className="text-[#F5F5F5]/75">{item.emoji} {item.title}</p>
                        <p className="text-[#F5F5F5]/35 text-xs">
                          Qty {item.quantity}
                          {[item.selectedSize, item.selectedVariation].filter(Boolean).length > 0
                            ? ` · ${[item.selectedSize, item.selectedVariation].filter(Boolean).join(" · ")}`
                            : ""}
                        </p>
                      </div>
                      <p className="text-[#D4A853]">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.customerMessage && (
                <div className="rounded-xl border border-[#D4A853]/10 bg-[#0D0D0D] p-4">
                  <p className="text-[#D4A853] text-sm font-medium mb-2">Customer confirmation</p>
                  <p className="text-[#F5F5F5]/65 text-sm">{selectedOrder.customerMessage}</p>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#F5F5F5]/50">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#F5F5F5]/50">
                  <span>Shipping</span>
                  <span>{selectedOrder.shippingFee === 0 ? "Free" : `₹${selectedOrder.shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-[#D4A853] font-semibold">
                  <span>Total</span>
                  <span>₹{selectedOrder.totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
