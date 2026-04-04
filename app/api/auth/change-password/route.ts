import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { consumePasswordResetToken, getLocalAdminAccount, recordLoginHistory, updateLocalAdminAccount } from "@/lib/local-store";
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { user, error } = await requireAuth(request);
  if (error) return error;

  try {
    const body = await request.json();
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");
    const resetCode = String(body.resetCode || "");

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
    }

    if (String(user._id) === "local-admin") {
      const account = getLocalAdminAccount();
      const currentMatches = currentPassword && currentPassword === account.password;

      if (!currentMatches && !resetCode) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }

      if (resetCode) {
        const valid = consumePasswordResetToken(user.email, resetCode);
        if (!valid) {
          return NextResponse.json({ error: "Reset code is invalid or expired" }, { status: 400 });
        }
      } else if (!currentMatches) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }

      updateLocalAdminAccount({ password: newPassword });
      recordLoginHistory({
        email: user.email,
        status: "success",
        mode: "security",
        action: "password-changed",
        timestamp: new Date().toISOString(),
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      });
      return NextResponse.json({ message: "Password updated successfully" });
    }

    await connectDB();
    const dbUser = await User.findById(user._id).select("+password");
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isMatch = await dbUser.comparePassword(currentPassword);
    if (!isMatch) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }
    dbUser.password = newPassword;
    await dbUser.save();
    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
