"use client";

import { motion } from "framer-motion";
import { btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";
import { useBookingModal } from "./BookingModalProvider";

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
  const t = useT();
  const { openModal } = useBookingModal();
  const text = label ?? children ?? t("Book Consultation");

  const hasCustomBg = !!style && style.backgroundColor != null;
  const cls = hasCustomBg
    ? "w-full sm:w-auto inline-block text-center text-white font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    : dark
    ? "w-full sm:w-auto text-white font-bold text-[14px] border border-white rounded-[10px] px-8 py-4 bg-transparent hover:bg-white/10 transition-colors cursor-pointer"
    : "w-full sm:w-auto inline-block text-center bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer";

  return (
    <motion.button
      {...btnHover}
      onClick={openModal}
      className={`${cls} ${className}`}
      style={style}
    >
      {text}
    </motion.button>
  );
}
