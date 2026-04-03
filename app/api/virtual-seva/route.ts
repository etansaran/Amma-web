import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import VirtualSevaBooking from "@/models/VirtualSevaBooking";
import { requireAuth } from "@/lib/auth";
import { createLocalRecord, LOCAL_MODE, paginate, readStore, updateStore } from "@/lib/local-store";
import { checkRateLimit } from "@/lib/rate-limit";

// POST /api/virtual-seva - Public: submit seva booking
export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request, "virtual-seva-post", 6, 60_000);
    if (!rateLimit.ok) {
      return NextResponse.json(
        { error: "Too many seva requests. Please wait and try again." },
        { status: 429, headers: { "Retry-After": rateLimit.retryAfter.toString() } }
      );
    }

    const body = await request.json();
    const { name, email, sevaType, sevaTitle, amount } = body;

    if (!name || !email || !sevaType || !sevaTitle || amount == null) {
      return NextResponse.json({ error: "name, email, sevaType, sevaTitle and amount are required" }, { status: 400 });
    }

    if (LOCAL_MODE) {
      const booking = createLocalRecord({
        name,
        email,
        phone: body.phone,
        country: body.country || "India",
        sevaType,
        sevaTitle,
        preferredDate: body.preferredDate ? new Date(body.preferredDate).toISOString() : undefined,
        intention: body.intention,
        amount,
        status: "pending",
        adminNotes: "",
      });

      updateStore((store) => {
        store.virtualSevaBookings.unshift(booking);
      });

      return NextResponse.json({ booking }, { status: 201 });
    }

    await connectDB();
    const booking = await VirtualSevaBooking.create({
      name,
      email,
      phone: body.phone,
      country: body.country || "India",
      sevaType,
      sevaTitle,
      preferredDate: body.preferredDate ? new Date(body.preferredDate) : undefined,
      intention: body.intention,
      amount,
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

// GET /api/virtual-seva - Admin only: list bookings
export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");
    const status = searchParams.get("status");

    if (LOCAL_MODE) {
      const store = readStore();
      const filtered = store.virtualSevaBookings
        .filter((item) => !status || item.status === status)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const result = paginate(filtered, page, limit);

      return NextResponse.json({
        bookings: result.items,
        pagination: result.pagination,
      });
    }

    await connectDB();
    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const total = await VirtualSevaBooking.countDocuments(query);
    const bookings = await VirtualSevaBooking.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      bookings,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
