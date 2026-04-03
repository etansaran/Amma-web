import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/utils/helpers";
import { createLocalRecord, LOCAL_MODE, paginate, readStore, updateStore } from "@/lib/local-store";

// GET /api/events - Public: list published events; add ?admin=true with auth for all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const upcoming = searchParams.get("upcoming");
    const isAdmin = searchParams.get("admin") === "true";

    if (LOCAL_MODE) {
      const store = readStore();
      let events = store.events.filter((event) => (isAdmin ? true : event.isPublished));
      if (category) events = events.filter((event) => event.category === category);
      if (featured === "true") events = events.filter((event) => event.isFeatured);
      if (upcoming === "true") events = events.filter((event) => new Date(event.date) >= new Date());
      events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const result = paginate(events, page, limit);

      return NextResponse.json({
        events: result.items,
        pagination: result.pagination,
      });
    }

    await connectDB();
    const query: Record<string, unknown> = isAdmin ? {} : { isPublished: true };
    if (category) query.category = category;
    if (featured === "true") query.isFeatured = true;
    if (upcoming === "true") query.date = { $gte: new Date() };

    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      events,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Events GET error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// POST /api/events - Admin: create event
export async function POST(request: NextRequest) {
  const { user, error } = await requireAuth(request);
  if (error) return error;
  void user;

  try {
    const body = await request.json();

    const slug = body.slug || slugify(body.title);
    if (LOCAL_MODE) {
      const store = readStore();
      const existing = store.events.find((event) => event.slug === slug);
      const finalSlug = existing ? `${slug}-${Date.now()}` : slug;
      const event = createLocalRecord({
        ...body,
        slug: finalSlug,
        registeredCount: 0,
        isRecurring: Boolean(body.isRecurring),
        isFeatured: Boolean(body.isFeatured),
        isPublished: body.isPublished ?? false,
      });
      updateStore((draft) => {
        draft.events.unshift(event);
      });
      return NextResponse.json({ event }, { status: 201 });
    }

    await connectDB();
    const existing = await Event.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const event = await Event.create({ ...body, slug: finalSlug });
    return NextResponse.json({ event }, { status: 201 });
  } catch (err) {
    console.error("Event create error:", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
