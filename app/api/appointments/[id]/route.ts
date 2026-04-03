import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    await connectDB();
    const body = await request.json();
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
    await connectDB();
    await Appointment.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Appointment deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
  }
}
