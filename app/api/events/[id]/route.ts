import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { requireAuth } from "@/lib/auth";
import mongoose from "mongoose";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = params;
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const event = await Event.findOne(query).lean();
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    await connectDB();
    const body = await request.json();
    const event = await Event.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    await connectDB();
    await Event.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Event deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
