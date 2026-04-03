import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { requireAuth } from "@/lib/auth";
import { LOCAL_MODE, paginate, readStore } from "@/lib/local-store";

// Admin only: list all donations
export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    if (LOCAL_MODE) {
      const store = readStore();
      let donations = store.donations;
      if (status) donations = donations.filter((item) => item.status === status);
      if (category) donations = donations.filter((item) => item.category === category);
      donations = [...donations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const result = paginate(donations, page, limit);
      const completed = store.donations.filter((item) => item.status === "completed");
      const stats = {
        totalAmount: completed.reduce((sum, item) => sum + (item.amountInINR || 0), 0),
        totalDonors: Array.from(new Set(completed.map((item) => item.donorEmail))),
        count: completed.length,
      };

      return NextResponse.json({
        donations: result.items,
        pagination: result.pagination,
        stats,
      });
    }

    await connectDB();
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (category) query.category = category;

    const total = await Donation.countDocuments(query);
    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Aggregate stats
    const stats = await Donation.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amountInINR" },
          totalDonors: { $addToSet: "$donorEmail" },
          count: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json({
      donations,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
      stats: stats[0] || { totalAmount: 0, totalDonors: [], count: 0 },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}
