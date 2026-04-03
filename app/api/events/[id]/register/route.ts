import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventRegistration from "@/models/EventRegistration";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, phone, numberOfAttendees = 1, country, specialRequirements } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

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
