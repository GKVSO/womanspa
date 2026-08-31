"use client";

import { useState, useEffect } from "react";

interface BookingSettings {
  bookingUrl: string;
  bookingMode: string;
}

/**
 * Returns where "Book" buttons should send the user:
 * - Vagaro booking URL if configured in admin settings
 * - /book page as fallback (which embeds the Vagaro widget)
 */
export function useBookingLink() {
  const [settings, setSettings] = useState<BookingSettings>({ bookingUrl: "", bookingMode: "link" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/booking-settings")
      .then((r) => r.json())
      .then((s) => setSettings(s))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const href = settings.bookingUrl || "/book";
  const isExternal = !!settings.bookingUrl;

  return {
    href,
    isExternal,
    loading,
    /** Props to spread onto <a> */
    linkProps: isExternal
      ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
      : { href },
  };
}
