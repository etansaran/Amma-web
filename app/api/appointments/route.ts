import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";
import { createLocalRecord, LOCAL_MODE, paginate, readStore, updateStore } from "@/lib/local-store";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request, "appointments-post", 6, 60_000);
    if (!rateLimit.ok) {
      return NextResponse.json(
        { error: "Too many appointment requests. Please wait and try again." },
        { status: 429, headers: { "Retry-After": rateLimit.retryAfter.toString() } }
      );
    }

    const body = await request.json();
    const { name, email, phone, country, purpose, preferredDate, preferredTime, message } = body;

    if (!name || !email || !phone || !purpose || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (LOCAL_MODE) {
      const appointment = createLocalRecord({
        name,
        email,
        phone,
        country: country || "India",
        purpose,
        preferredDate: new Date(preferredDate).toISOString(),
        preferredTime,
        message,
        status: "pending",
        adminNotes: "",
      });

      updateStore((store) => {
        store.appointments.unshift(appointment);
      });

      return NextResponse.json({ appointment }, { status: 201 });
    }

    await connectDB();
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
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const status = searchParams.get("status");

    if (LOCAL_MODE) {
      const store = readStore();
      const filtered = store.appointments
        .filter((item) => !status || item.status === status)
        .sort((a, b) => new Date(a.preferredDate).getTime() - new Date(b.preferredDate).getTime());
      const result = paginate(filtered, page, limit);

      return NextResponse.json({
        appointments: result.items,
        pagination: result.pagination,
      });
    }

    await connectDB();
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
