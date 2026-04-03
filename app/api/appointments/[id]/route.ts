import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";
import { LOCAL_MODE, touch, updateStore } from "@/lib/local-store";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const body = await request.json();

    if (LOCAL_MODE) {
      let appointment: Record<string, unknown> | null = null;
      updateStore((store) => {
        const index = store.appointments.findIndex((item) => item._id === params.id);
        if (index === -1) return;
        store.appointments[index] = touch({ ...store.appointments[index], ...body });
        appointment = store.appointments[index];
      });
      if (!appointment) return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
      return NextResponse.json({ appointment });
    }

    await connectDB();
    const appointment = await Appointment.findByIdAndUpdate(params.id, body, { new: true });
    if (!appointment) return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    return NextResponse.json({ appointment });
  } catch {
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    if (LOCAL_MODE) {
      updateStore((store) => {
        store.appointments = store.appointments.filter((item) => item._id !== params.id);
      });
      return NextResponse.json({ message: "Appointment deleted" });
    }

    await connectDB();
    await Appointment.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Appointment deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
  }
}
