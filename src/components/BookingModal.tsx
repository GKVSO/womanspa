"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

interface BookingSettings {
  bookingUrl: string;
  bookingMode: string;
}

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [settings, setSettings] = useState<BookingSettings>({ bookingUrl: "", bookingMode: "link" });
  const t = useT();

  useEffect(() => {
    fetch("/api/booking-settings")
      .then((r) => r.json())
      .then((set) => setSettings(set))
      .catch(() => {});
  }, []);

  // Where the Book button sends the user: Vagaro link directly, or our /book page
  const bookHref = settings.bookingUrl || "/book";
  const openInNewTab = !!settings.bookingUrl; // external Vagaro link opens in new tab; /book navigates in-site

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
            className="relative bg-white rounded-[20px] sm:rounded-[30px] w-full max-w-[400px] min-[768px]:max-w-[520px] overflow-hidden shadow-2xl my-auto"
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
                <p className="text-white/90 text-[14px] min-[768px]:text-[16px] leading-relaxed mt-3">
                  {t("And receive a")}&nbsp;<strong className="text-white">{t("$100 Welcome Gift")}</strong>&nbsp;{t("toward")}
                  <br />
                  {t("your first treatment")}
                </p>
              </motion.div>
            </div>

            <div className="p-5 sm:p-10 pt-6 sm:pt-8">
              <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
                {["Your Name", "Phone Number"].map((placeholder) => (
                  <motion.input
                    key={placeholder}
                    type="text"
                    placeholder={t(placeholder)}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-[16px] sm:rounded-[20px] text-[16px] sm:text-[18px] font-medium outline-none"
                    style={{ backgroundColor: "#FAFAFA", border: "1px solid #F6F6F7", color: "#313242" }}
                    whileFocus={{ scale: 1.01, borderColor: "#CBA07D" }}
                    transition={{ duration: 0.3 }}
                  />
                ))}

                <div className="flex items-start gap-3">
                  <motion.div
                    className={`w-5 h-5 flex-shrink-0 rounded border mt-0.5 flex items-center justify-center transition-colors cursor-pointer ${agreed ? "bg-white border-[#CBA07D]" : ""}`}
                    style={{ borderColor: agreed ? "#CBA07D" : "#CFA889" }}
                    onClick={() => setAgreed(!agreed)}
                    whileTap={{ scale: 0.9 }}
                  >
                    {agreed && (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8.0026 13L15.0737 5.92893L13.6595 4.51472L8.0026 10.1716L5.17421 7.3431L3.75999 8.7574L8.0026 13Z" fill="#CBA07D"/>
                      </svg>
                    )}
                  </motion.div>
                  <p className="text-[12px] sm:text-[14px] font-medium leading-snug" style={{ color: "#1F1D1B", opacity: 0.5 }}>
                    {t("By checking this box, I agree to the")}&nbsp;<u>{t("Privacy Policy")}</u>&nbsp;{t("for Woman Luxe")}
                    <br />
                    {t("Med Spa and consent to receive marketing text messages and emails from")}
                    <br />
                    {t("Woman Luxe Med Spa.")}
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={!agreed}
                  onClick={() => {
                    if (!agreed) return;
                    if (openInNewTab) {
                      window.open(bookHref, "_blank", "noopener,noreferrer");
                    } else {
                      window.location.href = bookHref;
                    }
                    onClose();
                  }}
                  whileHover={agreed ? { scale: 1.03 } : {}}
                  whileTap={agreed ? { scale: 0.97 } : {}}
                  className={`w-full text-white font-bold text-[14px] rounded-full py-3 sm:py-4 transition-all cursor-pointer ${
                    agreed ? "bg-[#CBA07D] shadow-sm hover:shadow-lg" : "bg-[#CBA07D]/40 cursor-not-allowed"
                  }`}
                >
                  {t("Book Consultation")}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}