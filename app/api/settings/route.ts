import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { requireRole } from "@/lib/auth";
import { LOCAL_MODE, readStore, updateStore } from "@/lib/local-store";

const defaults = {
  youtubeLiveId: "",
  siteAnnouncement: "",
  announcementActive: false,
  maintenanceMode: false,
  contactEmail: "info@ammaashram.org",
  contactPhone: "",
  donationUpiId: "",
  ashramAddress: "Siva Sri Thiyaneswar Amma Ashram, Thiruvannamalai, Tamil Nadu 606601",
};

export async function GET(request: NextRequest) {
  const { error } = await requireRole(request, ["superadmin"]);
  if (error) return error;

  try {
    if (LOCAL_MODE) {
      const store = readStore();
      return NextResponse.json({ settings: store.settings || defaults });
    }

    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    return NextResponse.json({ settings: settings || defaults });
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { error } = await requireRole(request, ["superadmin"]);
  if (error) return error;

  try {
    const body = await request.json();

    if (LOCAL_MODE) {
      let settings: Record<string, unknown> = {};
      updateStore((store) => {
        store.settings = {
          ...defaults,
          ...store.settings,
          ...body,
          updatedAt: new Date().toISOString(),
        };
        settings = store.settings;
      });
      return NextResponse.json({ settings });
    }

    await connectDB();
    const settings = await SiteSettings.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
