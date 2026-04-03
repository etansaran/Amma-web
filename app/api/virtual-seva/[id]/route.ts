import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import VirtualSevaBooking from "@/models/VirtualSevaBooking";
import { requireAuth } from "@/lib/auth";
import { LOCAL_MODE, touch, updateStore } from "@/lib/local-store";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const body = await request.json();
    const update: Record<string, unknown> = {};
    if (body.status) update.status = body.status;
    if (body.adminNotes !== undefined) update.adminNotes = body.adminNotes;

    if (LOCAL_MODE) {
      let booking: Record<string, unknown> | null = null;
      updateStore((store) => {
        const index = store.virtualSevaBookings.findIndex((item) => item._id === params.id);
        if (index === -1) return;
        store.virtualSevaBookings[index] = touch({ ...store.virtualSevaBookings[index], ...update });
        booking = store.virtualSevaBookings[index];
      });
      if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
      return NextResponse.json({ booking });
    }

    await connectDB();
    const booking = await VirtualSevaBooking.findByIdAndUpdate(params.id, update, { new: true });
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    return NextResponse.json({ booking });
  } catch {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
