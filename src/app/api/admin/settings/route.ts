import { NextResponse, type NextRequest } from "next/server";
import { getSetting, setSetting } from "@/lib/db";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

async function authed(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  return !!token && verifyToken(token);
}

// GET /api/admin/settings — all Vagaro settings
export async function GET(req: NextRequest) {
  if (!(await authed(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const [bookingUrl, bookingEmbed, bookingMode] = await Promise.all([
    getSetting("vagaro_booking_url"),
    getSetting("vagaro_booking_embed"),
    getSetting("vagaro_booking_mode"),
  ]);
  return NextResponse.json({
    vagaro_booking_url: bookingUrl || "",
    vagaro_booking_embed: bookingEmbed || "",
    vagaro_booking_mode: bookingMode || "link",
  });
}

// POST /api/admin/settings — save Vagaro settings
export async function POST(req: NextRequest) {
  if (!(await authed(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (typeof body.vagaro_booking_url === "string") {
    await setSetting("vagaro_booking_url", body.vagaro_booking_url);
  }
  if (typeof body.vagaro_booking_embed === "string") {
    await setSetting("vagaro_booking_embed", body.vagaro_booking_embed);
  }
  if (typeof body.vagaro_booking_mode === "string") {
    await setSetting("vagaro_booking_mode", body.vagaro_booking_mode);
  }
  return NextResponse.json({ ok: true });
}
