import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, phone, country, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject and message are required" },
        { status: 400 }
      );
    }

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
    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
