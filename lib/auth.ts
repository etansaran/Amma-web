import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import type { IUser } from "@/models/User";
import { getLocalAdminAccount, LOCAL_ADMIN_ID } from "@/lib/local-store";

const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";
const DEFAULT_ADMIN_EMAIL = "admin@amma.org";
const DEFAULT_ADMIN_PASSWORD = "admin";

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

function getJwtSecret(): string {
  return (
    process.env.JWT_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "amma-default-admin-secret-change-this"
  );
}

export function signToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRY } as jwt.SignOptions);
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, getJwtSecret()) as JWTPayload;
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

    if (payload.userId === LOCAL_ADMIN_ID && isLocalAdminEnabled()) {
      const account = getLocalAdminAccount();
      const localAdmin = {
        _id: LOCAL_ADMIN_ID,
        name: account.name || "Local Admin",
        email: account.email || process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
        role: account.role || "superadmin",
      } as unknown as IUser;

      return { user: localAdmin, error: null };
    }

    const [{ connectDB }, userModule] = await Promise.all([
      import("./mongodb"),
      import("@/models/User"),
    ]);

    await connectDB();
    const user = await userModule.default.findById(payload.userId).select("+password");

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

export function isLocalAdminEnabled(): boolean {
  return Boolean(process.env.ADMIN_EMAIL || process.env.ADMIN_PASSWORD || !process.env.MONGODB_URI);
}

export function createLocalAdminUser() {
  const account = getLocalAdminAccount();
  return {
    _id: LOCAL_ADMIN_ID,
    name: account.name || "Local Admin",
    email: account.email || process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
    role: account.role || "superadmin",
  };
}

export { LOCAL_ADMIN_ID as LOCAL_ADMIN_USER_ID };
export { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD };

export async function requireRole(
  request: NextRequest,
  allowedRoles: Array<"admin" | "superadmin">
) {
  const auth = await requireAuth(request);
  if (auth.error) return auth;

  if (!allowedRoles.includes(auth.user.role as "admin" | "superadmin")) {
    return {
      user: null,
      error: NextResponse.json({ error: "You do not have permission to perform this action" }, { status: 403 }),
    };
  }

  return auth;
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
