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
          updated = touch({
            ...item,
            paymentStatus: body.paymentStatus || item.paymentStatus,
            orderStatus: body.orderStatus || item.orderStatus,
            notes: body.notes ?? item.notes,
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
      },
      { new: true }
    ).lean();
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
