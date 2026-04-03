import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { requireAuth } from "@/lib/auth";
import { LOCAL_MODE, touch, updateStore } from "@/lib/local-store";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const body = await request.json();
    const update: Record<string, unknown> = {};
    if (typeof body.isRead === "boolean") update.isRead = body.isRead;
    if (body.repliedAt) update.repliedAt = new Date(body.repliedAt);

    if (LOCAL_MODE) {
      let message: Record<string, unknown> | null = null;

      updateStore((store) => {
        const index = store.contactMessages.findIndex((item) => item._id === params.id);
        if (index === -1) return;
        store.contactMessages[index] = touch({ ...store.contactMessages[index], ...update });
        message = store.contactMessages[index];
      });

      if (!message) return NextResponse.json({ error: "Message not found" }, { status: 404 });
      return NextResponse.json({ message });
    }

    await connectDB();
    const message = await ContactMessage.findByIdAndUpdate(params.id, update, { new: true });
    if (!message) return NextResponse.json({ error: "Message not found" }, { status: 404 });
    return NextResponse.json({ message });
  } catch {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}
