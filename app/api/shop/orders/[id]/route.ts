import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import { LOCAL_MODE, readStore, touch, updateStore } from "@/lib/local-store";
import ShopOrder from "@/models/ShopOrder";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const { id } = await params;

    if (LOCAL_MODE) {
      const store = readStore();
      const order = store.shopOrders.find((item) => item._id === id || item.orderNumber === id);
      if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
      return NextResponse.json({ order });
    }

    await connectDB();
    const order = await ShopOrder.findOne({ $or: [{ _id: id }, { orderNumber: id }] }).lean();
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();

    if (LOCAL_MODE) {
      let updated: Record<string, any> | null = null;
      updateStore((store) => {
        store.shopOrders = store.shopOrders.map((item) => {
          if (item._id !== id) return item;
          const nextPaymentStatus = body.paymentStatus || item.paymentStatus;
          const nextOrderStatus = body.orderStatus || item.orderStatus;
          const timeline = Array.isArray(item.trackingTimeline) ? [...item.trackingTimeline] : [];
          if (body.paymentStatus && body.paymentStatus !== item.paymentStatus) {
            timeline.unshift({
              label: `Payment ${body.paymentStatus}`,
              detail: `Updated by admin`,
              timestamp: new Date().toISOString(),
            });
          }
          if (body.orderStatus && body.orderStatus !== item.orderStatus) {
            timeline.unshift({
              label: `Order ${body.orderStatus}`,
              detail: body.statusNote || "Updated by admin",
              timestamp: new Date().toISOString(),
            });
          }
          updated = touch({
            ...item,
            paymentStatus: nextPaymentStatus,
            orderStatus: nextOrderStatus,
            notes: body.notes ?? item.notes,
            trackingTimeline: timeline,
          });
          return updated;
        });
      });
      if (!updated) return NextResponse.json({ error: "Order not found" }, { status: 404 });
      return NextResponse.json({ order: updated });
    }

    await connectDB();
    const order = await ShopOrder.findByIdAndUpdate(
      id,
      {
        ...(body.paymentStatus ? { paymentStatus: body.paymentStatus } : {}),
        ...(body.orderStatus ? { orderStatus: body.orderStatus } : {}),
        ...(body.notes !== undefined ? { notes: body.notes } : {}),
        ...(body.paymentStatus || body.orderStatus
          ? {
              $push: {
                trackingTimeline: {
                  $each: [
                    ...(body.paymentStatus
                      ? [{
                          label: `Payment ${body.paymentStatus}`,
                          detail: "Updated by admin",
                          timestamp: new Date().toISOString(),
                        }]
                      : []),
                    ...(body.orderStatus
                      ? [{
                          label: `Order ${body.orderStatus}`,
                          detail: body.statusNote || "Updated by admin",
                          timestamp: new Date().toISOString(),
                        }]
                      : []),
                  ],
                  $position: 0,
                },
              },
            }
          : {}),
      },
      { new: true }
    ).lean();
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
