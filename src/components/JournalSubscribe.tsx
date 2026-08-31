"use client";

import { motion } from "framer-motion";
import { useT } from "@/i18n/LanguageProvider";

export default function JournalSubscribe() {
  const t = useT();
  return (
    <form
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 w-full max-w-2xl bg-white rounded-[24px] sm:rounded-full p-2"
      style={{ border: "1px solid #F6F6F7" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder={t("Enter your email")}
        className="flex-1 min-w-0 bg-transparent px-4 py-3 sm:py-2 text-[16px] font-medium outline-none"
        style={{ color: "#313242", opacity: 0.6 }}
        aria-label={t("Enter your email")}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto justify-center bg-[#B07E3F] text-white font-medium text-[16px] rounded-full px-6 py-2.5 cursor-pointer "
      >
{t("Subscribe")}
      </motion.button>
    </form>
  );
}
