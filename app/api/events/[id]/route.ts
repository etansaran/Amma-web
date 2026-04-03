import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { requireAuth } from "@/lib/auth";
import mongoose from "mongoose";
import { LOCAL_MODE, touch, readStore, updateStore } from "@/lib/local-store";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    if (LOCAL_MODE) {
      const store = readStore();
      const event = store.events.find((item) => item._id === id || item.slug === id);
      if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
      return NextResponse.json({ event });
    }

    await connectDB();
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
    const body = await request.json();

    if (LOCAL_MODE) {
      let event: Record<string, unknown> | null = null;
      updateStore((store) => {
        const index = store.events.findIndex((item) => item._id === params.id);
        if (index === -1) return;
        store.events[index] = touch({ ...store.events[index], ...body });
        event = store.events[index];
      });
      if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
      return NextResponse.json({ event });
    }

    await connectDB();
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
    if (LOCAL_MODE) {
      updateStore((store) => {
        store.events = store.events.filter((item) => item._id !== params.id);
      });
      return NextResponse.json({ message: "Event deleted" });
    }

    await connectDB();
    await Event.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Event deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
