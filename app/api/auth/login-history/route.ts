import { NextRequest, NextResponse } from "next/server";
import { getLoginHistory } from "@/lib/local-store";
import { requireAuth, requireRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const auth = await requireRole(request, ["superadmin"]);
  if (auth.error) return auth.error;

  const { searchParams } = new URL(request.url);
  const limit = Math.min(100, Number(searchParams.get("limit") || 30));

  return NextResponse.json({
    history: getLoginHistory(limit),
  });
}
