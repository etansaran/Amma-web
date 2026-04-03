import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventRegistration from "@/models/EventRegistration";
import { createLocalRecord, LOCAL_MODE, updateStore, readStore, touch } from "@/lib/local-store";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rateLimit = checkRateLimit(request, "event-register", 8, 60_000);
    if (!rateLimit.ok) {
      return NextResponse.json(
        { error: "Too many registrations submitted. Please wait and try again." },
        { status: 429, headers: { "Retry-After": rateLimit.retryAfter.toString() } }
      );
    }

    const body = await request.json();
    const { name, email, phone, numberOfAttendees = 1, country, specialRequirements } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    if (LOCAL_MODE) {
      const store = readStore();
      const event = store.events.find((item) => item._id === params.id || item.slug === params.id);
      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      if (event.maxAttendees && event.registeredCount >= event.maxAttendees) {
        return NextResponse.json(
          { error: "Event is fully booked" },
          { status: 400 }
        );
      }

      const registration = createLocalRecord({
        event: event._id,
        name,
        email,
        phone,
        numberOfAttendees,
        country: country || "India",
        specialRequirements,
      });

      updateStore((draft) => {
        draft.eventRegistrations.unshift(registration);
        const index = draft.events.findIndex((item) => item._id === event._id);
        if (index !== -1) {
          draft.events[index] = touch({
            ...draft.events[index],
            registeredCount: (draft.events[index].registeredCount || 0) + numberOfAttendees,
          });
        }
      });

      return NextResponse.json({ registration }, { status: 201 });
    }

    await connectDB();
    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.maxAttendees && event.registeredCount >= event.maxAttendees) {
      return NextResponse.json(
        { error: "Event is fully booked" },
        { status: 400 }
      );
    }

    const registration = await EventRegistration.create({
      event: params.id,
      name,
      email,
      phone,
      numberOfAttendees,
      country: country || "India",
      specialRequirements,
    });

    await Event.findByIdAndUpdate(params.id, {
      $inc: { registeredCount: numberOfAttendees },
    });

    return NextResponse.json({ registration }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
