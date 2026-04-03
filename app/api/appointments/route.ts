import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, phone, country, purpose, preferredDate, preferredTime, message } = body;

    if (!name || !email || !phone || !purpose || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const appointment = await Appointment.create({
      name,
      email,
      phone,
      country: country || "India",
      purpose,
      preferredDate: new Date(preferredDate),
      preferredTime,
      message,
    });

    return NextResponse.json({ appointment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
  }
}

// Admin: list appointments
export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const status = searchParams.get("status");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const total = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query)
      .sort({ preferredDate: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      appointments,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
