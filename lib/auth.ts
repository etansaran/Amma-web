import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "./mongodb";
import User, { IUser } from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function signToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY } as jwt.SignOptions);
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  const cookieToken = request.cookies.get("admin_token")?.value;
  return cookieToken || null;
}

export async function requireAuth(
  request: NextRequest
): Promise<{ user: IUser; error: null } | { user: null; error: NextResponse }> {
  const token = extractToken(request);

  if (!token) {
    return {
      user: null,
      error: NextResponse.json({ error: "Authentication required" }, { status: 401 }),
    };
  }

  try {
    const payload = verifyToken(token);
    await connectDB();
    const user = await User.findById(payload.userId).select("+password");

    if (!user) {
      return {
        user: null,
        error: NextResponse.json({ error: "User not found" }, { status: 401 }),
      };
    }

    return { user, error: null };
  } catch {
    return {
      user: null,
      error: NextResponse.json({ error: "Invalid or expired token" }, { status: 401 }),
    };
  }
}

export function setAuthCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return response;
}

export function clearAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
