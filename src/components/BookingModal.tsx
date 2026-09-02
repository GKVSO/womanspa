"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/i18n/LanguageProvider";
import VagaroEmbed from "./VagaroEmbed";

interface BookingSettings {
  bookingUrl: string;
  bookingEmbed: string;
  bookingMode: string;
}

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [settings, setSettings] = useState<BookingSettings>({ bookingUrl: "", bookingEmbed: "", bookingMode: "link" });
  const t = useT();

  useEffect(() => {
    fetch("/api/booking-settings")
      .then((r) => r.json())
      .then((set) => setSettings(set))
      .catch(() => {});
  }, []);

  const bookHref = settings.bookingUrl || "/book";
  const openInNewTab = !!settings.bookingUrl;

  const showEmbed = settings.bookingMode === "embed" && settings.bookingEmbed;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={onClose}
        >
          <motion.div
            className={`relative bg-white rounded-[20px] sm:rounded-[30px] w-full ${showEmbed ? 'max-w-[800px]' : 'max-w-[400px] min-[768px]:max-w-[520px]'} overflow-hidden shadow-2xl my-auto`}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={onClose}
              aria-label={t("Close")}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors cursor-pointer"
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M1 1L17 17M17 1L1 17" stroke="#040404" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.button>

            {showEmbed ? (
              <div className="p-4 sm:p-8 pt-12 sm:pt-16 min-h-[500px]">
                <VagaroEmbed code={settings.bookingEmbed} />
              </div>
            ) : (
              <>
                <div className="bg-[#CBA07D] rounded-[20px] sm:rounded-[30px] p-6 sm:p-10 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="/xerf-modal.webp"
                      alt={t("Consultation")}
                      className="mx-auto w-20 h-20 sm:w-28 sm:h-28 min-[1200px]:w-32 min-[1200px]:h-32 rounded-full object-cover"
                    />
                    <h3 className="text-white text-[24px] min-[768px]:text-[28px] min-[1200px]:text-[32px] font-berlingske leading-tight mt-5 sm:mt-6">
                      {t("Book A Free")}
                      <br />
                      {t("Consultation")}
                    </h3>
                  </motion.div>
                </div>
                <div className="p-5 sm:p-10 pt-6 sm:pt-8 flex justify-center">
                  <button
                    onClick={() => {
                      if (openInNewTab) {
                        window.open(bookHref, "_blank", "noopener,noreferrer");
                      } else {
                        window.location.href = bookHref;
                      }
                      onClose();
                    }}
                    className="w-full sm:w-auto text-white font-bold text-[14px] rounded-[10px] px-8 py-4 bg-[#CBA07D] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {t("Continue to secure online booking")}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
