import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { requireAuth } from "@/lib/auth";
import { createLocalRecord, LOCAL_MODE, readStore, updateStore } from "@/lib/local-store";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request, "contact-post", 8, 60_000);
    if (!rateLimit.ok) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a minute and try again." },
        { status: 429, headers: { "Retry-After": rateLimit.retryAfter.toString() } }
      );
    }

    const body = await request.json();
    const { name, email, phone, country, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject and message are required" },
        { status: 400 }
      );
    }

    if (LOCAL_MODE) {
      const contactMsg = createLocalRecord({
        name,
        email,
        phone,
        country: country || "India",
        subject,
        message,
        isRead: false,
        repliedAt: null,
      });

      updateStore((store) => {
        store.contactMessages.unshift(contactMsg);
      });

      return NextResponse.json(
        { message: "Message sent successfully", id: contactMsg._id },
        { status: 201 }
      );
    }

    await connectDB();
    const contactMsg = await ContactMessage.create({
      name,
      email,
      phone,
      country: country || "India",
      subject,
      message,
    });

    return NextResponse.json(
      { message: "Message sent successfully", id: contactMsg._id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

// Admin: list messages
export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    if (LOCAL_MODE) {
      const store = readStore();
      return NextResponse.json({ messages: store.contactMessages.slice(0, 50) });
    }

    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
