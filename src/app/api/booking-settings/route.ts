import { NextResponse } from "next/server";
import { getSetting, setSetting } from "@/lib/db";

export const dynamic = "force-dynamic";

// Public GET: booking-related settings only (no secrets)
export async function GET() {
  const [bookingUrl, bookingEmbed, bookingMode] = await Promise.all([
    getSetting("vagaro_booking_url"),
    getSetting("vagaro_booking_embed"),
    getSetting("vagaro_booking_mode"),
  ]);
  return NextResponse.json({
    bookingUrl: bookingUrl || "",
    bookingEmbed: bookingEmbed || "",
    bookingMode: bookingMode || "link", // link | embed
  });
}
