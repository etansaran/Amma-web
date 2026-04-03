import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EventRegistration from "@/models/EventRegistration";
import { requireAuth } from "@/lib/auth";
import { LOCAL_MODE, readStore } from "@/lib/local-store";

// GET /api/event-registrations - Admin only
export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (LOCAL_MODE) {
      const store = readStore();
      const registrations: Array<Record<string, any>> = store.eventRegistrations
        .filter((item) => !eventId || item.event === eventId)
        .map((item) => {
          const event = store.events.find((entry) => entry._id === item.event);
          return {
            ...item,
            event: event
              ? {
                  title: event.title,
                  date: event.date,
                  location: event.location,
                }
              : undefined,
          };
        });

      registrations.sort(
        (a: Record<string, any>, b: Record<string, any>) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const totalAttendees = registrations.reduce((sum, r) => sum + (r.numberOfAttendees || 1), 0);
      return NextResponse.json({ registrations, totalAttendees });
    }

    await connectDB();
    const query: Record<string, unknown> = {};
    if (eventId) query.event = eventId;

    const registrations = await EventRegistration.find(query)
      .populate("event", "title date location")
      .sort({ createdAt: -1 })
      .lean();

    const totalAttendees = registrations.reduce((sum, r) => sum + (r.numberOfAttendees || 1), 0);

    return NextResponse.json({ registrations, totalAttendees });
  } catch {
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}
