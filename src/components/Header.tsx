"use client";

import { LANGUAGES, useLanguage, useT, type Lang } from "@/i18n/LanguageProvider";
import { setupAnchorInterceptor } from "@/lib/scroll";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { btnHover } from "./Animations";
import BookingModal from "./BookingModal";

const menuGroups = [
  {
    label: "Skin Rejuvenation & Resurfacing",
    href: "/skin-rejuvenation",
    children: [
      { label: "SylfirmX", href: "/sylfirmx" },
      { label: "XERF", href: "/xerf" },
      { label: "AcuPulse CO2", href: "/acupulse" },
      { label: "HydraFacial", href: "/hydrafacial" },
      { label: "Aerolase Neo", href: "/aerolase" },
      { label: "Candela Matrix", href: "/candela-matrix" },
    ],
  },
  {
    label: "Body Contouring & Fat Reduction",
    href: "/body-contouring",
    children: [
      { label: "Emsculpt NEO", href: "/emsculpt-neo" },
      { label: "ICOONE Laser Med", href: "/icoone" },
      { label: "Emerald Laser", href: "/emerald-laser" },
      { label: "Endospheres Therapy", href: "/endospheres" },
      { label: "Exion", href: "/exion" },
    ],
  },
  {
    label: "Wellness",
    href: "/wellness",
    children: [
      { label: "Emsella", href: "/emsella" },
      { label: "EMFEMME 360", href: "/candela-smoother" },
    ],
  },
  { label: "Laser Hair Removal", href: "/primelase" },
  {
    label: "Longevity",
    href: "#",
    children: [
      { label: "NAD+ Therapy", href: "/longevity/nad-therapy" },
      { label: "IV Therapy", href: "/longevity/iv-therapy" },
    ],
  },
  { label: "Before / After", href: "/before-after" },
  { label: "Blog", href: "/journal" },
  { label: "Reviews", href: "/reviews" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="relative w-[23px] h-[23px] flex items-center justify-center"
    >
      {open ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M1 1L17 17M17 1L1 17" stroke="#040404" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
          <circle cx="4.24264" cy="11.313" r="3" transform="rotate(-45 4.24264 11.313)" fill="#040404" />
          <circle cx="11.313" cy="4.24264" r="3" transform="rotate(-45 11.313 4.24264)" fill="#040404" />
          <circle cx="18.3833" cy="11.313" r="3" transform="rotate(-45 18.3833 11.313)" fill="#040404" />
          <circle cx="11.313" cy="18.3833" r="3" transform="rotate(-45 11.313 18.3833)" fill="#040404" />
        </svg>
      )}
    </motion.div>
  );
}

function LanguageSwitcher({ light }: { light?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        className={`flex items-center gap-1 cursor-pointer ${light ? "text-white" : "text-[#040404]"}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#a)">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.94 4.76q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill={light ? "#fff" : "#666"} />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h16v16H0z" />
            </clipPath>
          </defs>
        </svg>
        <span className="text-[12px] font-bold">{lang}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke={light ? "white" : "#040404"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-0 mt-2 bg-white rounded-[10px] shadow-lg overflow-hidden min-w-[90px] z-10"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l as Lang);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-[12px] font-bold cursor-pointer hover:bg-[#CBA07D]/10 transition-colors ${lang === l ? "text-[#CBA07D]" : "text-[#040404]"}`}
              >
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const t = useT();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    const cleanupAnchor = setupAnchorInterceptor();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cleanupAnchor();
    };
  }, []);

  const slideHidden = isMobile ? { y: "-100%" } : { x: "-100%" };
  const slideShown = isMobile ? { y: 0 } : { x: 0 };

  return (
    <>
      <motion.header
        className={`flex items-center justify-between px-4 sm:px-10 py-4 w-full fixed top-0 left-0 right-0 z-[130] transition-all duration-300 ${scrolled ? "bg-[#CBA07D] shadow-md rounded-b-[15px] sm:rounded-b-[30px]" : "bg-transparent"}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Left group: mobile logo / desktop menu button + nav */}
        <div className="flex items-center gap-2 sm:gap-6 order-2 lg:order-1">
          <Link href="/" className="lg:hidden flex-shrink-0">
            <Image src="/logo.svg" alt={t("Woman Med Spa")} width={131} height={40} className="w-[90px] h-auto min-[640px]:w-[131px]" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <motion.button
              {...btnHover}
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 bg-white rounded-[10px] px-4 py-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              aria-label={t("Menu")}
            >
              <MenuIcon open={open} />
              <span className="text-[#040404] font-bold text-[12px]">{open ? t("Close") : t("Menu")}</span>
            </motion.button>
            <nav className={`flex items-center gap-6 ${open ? "hidden" : ""}`}>
              {[
                { label: "Treatments", href: "/#treatments" },
                { label: "About Us", href: "/reviews" },
                { label: "Blog", href: "/journal" },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-white font-bold text-[12px] relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 after:ease-[cubic-bezier(0.25,0.1,0.25,1)] after:w-0 hover:after:w-full"
                  whileHover={{ opacity: 0.85 }}
                  transition={{ duration: 0.3 }}
                >
                  {t(item.label)}
                </motion.a>
              ))}
            </nav>
          </div>
        </div>

        {/* Center logo (desktop) */}
        <div className="hidden lg:block order-2 flex-shrink-0">
          <Link href="/">
            <Image src="/logo.svg" alt={t("Woman Med Spa")} width={131} height={40} />
          </Link>
        </div>

        {/* Right group: mobile menu + lang + whatsapp / desktop whatsapp + book + lang */}
        <div className="flex items-center gap-3 sm:gap-4 order-3 flex-1 lg:flex-none justify-end">
          <motion.button
            {...btnHover}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex items-center gap-2 bg-white rounded-[10px] px-3 py-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            aria-label={t("Menu")}
          >
            <MenuIcon open={open} />
            <span className="text-[#040404] font-bold text-[12px]">{open ? t("Close") : t("Menu")}</span>
          </motion.button>

          <div className="lg:hidden">
            <LanguageSwitcher light />
          </div>

          <motion.a
            href="https://api.whatsapp.com/send/?phone=13053369373&text=Hi%21+I%E2%80%99m+interested+in+booking+at+WO%2FMAN+Luxe+MedSpa.+Can+you+help+me+with+available+dates+and+next+steps%3F&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden flex border border-white rounded-[15px] p-2 items-center justify-center"
            whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Image src="/whatsapp-icon.svg" alt={t("WhatsApp")} width={20} height={20} />
          </motion.a>

          <motion.a
            href="https://api.whatsapp.com/send/?phone=13053369373&text=Hi%21+I%E2%80%99m+interested+in+booking+at+WO%2FMAN+Luxe+MedSpa.+Can+you+help+me+with+available+dates+and+next+steps%3F&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex border border-white rounded-[15px] p-2 items-center justify-center"
            whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Image src="/whatsapp-icon.svg" alt={t("WhatsApp")} width={20} height={20} />
          </motion.a>

          <motion.button
            {...btnHover}
            onClick={() => setBookingOpen(true)}
            className="hidden lg:inline-flex text-white font-bold text-[12px] border border-white rounded-[15px] px-5 py-2 bg-transparent hover:bg-white/10 transition-colors"
          >
            {t("Book an appointment")}
          </motion.button>

          <div className="hidden lg:block">
            <LanguageSwitcher light />
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[110] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="fixed top-0 left-0 right-0 bottom-0 w-full lg:w-[50vw] z-[120] overflow-y-auto"
              style={{ backgroundColor: "#CBA07D" }}
              initial={slideHidden}
              animate={slideShown}
              exit={slideHidden}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <nav className="relative flex flex-col min-h-full px-6 sm:px-10 lg:px-14 py-20">

                <ul className="flex flex-col gap-1">
                  {menuGroups.map((group) => (
                    <li key={group.label}>
                      {group.children ? (
                        <div className="border-b border-white/20">
                          <button
                            className="w-full flex items-center justify-between gap-4 py-4 cursor-pointer group"
                            onClick={() =>
                              setExpanded((cur) => (cur === group.label ? null : group.label))
                            }
                          >
                            <span className="text-white text-[24px] lg:text-[26px] font-berlingske leading-tight text-left">
                              {t(group.label)}
                            </span>
                            <motion.svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              animate={{ rotate: expanded === group.label ? 45 : 0 }}
                              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                              className="flex-shrink-0"
                            >
                              <path d="M11 0H13V24H11V0Z" fill="white" />
                              <path d="M0 11H24V13H0V11Z" fill="white" />
                            </motion.svg>
                          </button>

                          <AnimatePresence initial={false}>
                            {expanded === group.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                className="overflow-hidden"
                              >
                                <ul className="pb-5 space-y-3">
                                  {group.children.map((child) => (
                                    <li key={child.label}>
                                      <Link
                                        href={child.href}
                                        onClick={() => setOpen(false)}
                                        className="text-white/85 hover:text-white text-[18px] font-medium transition-colors"
                                      >
                                        {t(child.label)}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={group.href}
                          onClick={() => setOpen(false)}
                          className="block text-white text-[24px] lg:text-[26px] font-berlingske leading-tight py-4 border-b border-white/20 hover:opacity-80 transition-opacity"
                        >
                          {t(group.label)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <motion.button
                    {...btnHover}
                    onClick={() => {
                      setOpen(false);
                      setBookingOpen(true);
                    }}
                    className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 w-full lg:w-auto cursor-pointer"
                  >
                    {t("Book an appointment")}
                  </motion.button>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}