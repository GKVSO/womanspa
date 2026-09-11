import { NextResponse } from "next/server";
import { getSetting, getPageBySlug, getAllPages } from "@/lib/db";

export const dynamic = "force-dynamic";

// Public GET: booking-related settings only (no secrets)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "";
  
  let pageSettings = null;
  
  if (path) {
    const segments = path.split("/").filter(Boolean);
    let slug = segments[segments.length - 1] || "";
    
    // If root or just a language prefix (ru, en, es), it might be the home page
    if (segments.length === 0 || (segments.length === 1 && ["ru", "es", "en"].includes(segments[0]))) {
      const pages = await getAllPages();
      const homePage = pages.find((p) => p.is_home === 1);
      if (homePage) slug = homePage.slug;
    }
    
    if (slug) {
      const page = await getPageBySlug(slug);
      if (page) {
         pageSettings = {
           bookingUrl: page.vagaro_booking_url,
           bookingEmbed: page.vagaro_booking_embed,
           bookingMode: page.vagaro_booking_mode
         };
      }
    }
  }

  const [bookingUrl, bookingEmbed, bookingMode] = await Promise.all([
    getSetting("vagaro_booking_url"),
    getSetting("vagaro_booking_embed"),
    getSetting("vagaro_booking_mode"),
  ]);
  
  return NextResponse.json({
    bookingUrl: pageSettings?.bookingUrl || bookingUrl || "",
    bookingEmbed: pageSettings?.bookingEmbed || bookingEmbed || "",
    bookingMode: pageSettings?.bookingMode || bookingMode || "link", // link | embed
  });
}
