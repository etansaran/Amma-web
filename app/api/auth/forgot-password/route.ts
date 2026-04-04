import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetToken, getLocalAdminAccount } from "@/lib/local-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").toLowerCase().trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const account = getLocalAdminAccount();
    if (email !== String(account.email || "").toLowerCase()) {
      return NextResponse.json({
        message: "If this account exists, a reset code has been generated.",
      });
    }

    const result = createPasswordResetToken(email);
    return NextResponse.json({
      message: "Reset code generated successfully.",
      resetCode: result.token,
      expiresAt: result.expiresAt,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Failed to generate reset code" }, { status: 500 });
  }
}
