import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { requireAuth } from "@/lib/auth";

// Admin only: list all donations
export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const status = searchParams.get("status");
    const category = searchParams.get("category");

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
