import { NextRequest, NextResponse } from "next/server";
import {
  createLocalAdminUser,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  isLocalAdminEnabled,
  LOCAL_ADMIN_USER_ID,
  signToken,
  setAuthCookie,
} from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request, "auth-login", 10, 60_000);
    if (!rateLimit.ok) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again shortly." },
        { status: 429, headers: { "Retry-After": rateLimit.retryAfter.toString() } }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (isLocalAdminEnabled()) {
      const localEmail = process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
      const localPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

      if (email === localEmail && password === localPassword) {
        const localUser = createLocalAdminUser();
        const token = signToken({
          userId: LOCAL_ADMIN_USER_ID,
          email: localUser.email,
          role: localUser.role,
        });

        const response = NextResponse.json({
          message: "Login successful",
          user: {
            id: localUser._id,
            name: localUser.name,
            email: localUser.email,
            role: localUser.role,
          },
          token,
          mode: "local",
        });

        return setAuthCookie(response, token);
      }
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const [{ connectDB }, userModule] = await Promise.all([
      import("@/lib/mongodb"),
      import("@/models/User"),
    ]);

    await connectDB();

    const user = await userModule.default.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });

    return setAuthCookie(response, token);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
