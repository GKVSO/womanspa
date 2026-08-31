import { NextResponse, type NextRequest } from "next/server";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth-helper";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes (but allow the login page)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    if (!token || !verifyToken(token)) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Admin API routes protection
  if (pathname.startsWith("/api/admin")) {
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};