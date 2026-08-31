"use client";

import { motion } from "framer-motion";
import { btnHover } from "./Animations";
import { useBookingLink } from "./useBookingLink";
import { useT } from "@/i18n/LanguageProvider";

/**
 * Universal "Book" button that sends the user to Vagaro
 * (booking link from admin settings, or /book page with the widget).
 * Visual style matches hero primary buttons across the site.
 */
export default function BookButton({
  label,
  children,
  className = "",
  style,
  dark = false,
}: {
  label?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dark?: boolean;
}) {
  const { linkProps } = useBookingLink();
  const t = useT();
  const text = label ?? children ?? t("Book Consultation");

  // If caller passes custom backgroundColor, render as colored button with white text
  const hasCustomBg = !!style && style.backgroundColor != null;
  const cls = hasCustomBg
    ? "w-full sm:w-auto inline-block text-center text-white font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    : dark
    ? "w-full sm:w-auto text-white font-bold text-[14px] border border-white rounded-[10px] px-8 py-4 bg-transparent hover:bg-white/10 transition-colors cursor-pointer"
    : "w-full sm:w-auto inline-block text-center bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer";

  return (
    <motion.a
      {...btnHover}
      {...linkProps}
      className={`${cls} ${className}`}
      style={style}
    >
      {text}
    </motion.a>
  );
}
