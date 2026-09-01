"use client";

import { motion } from "framer-motion";
import { smoothScrollToTarget } from "@/lib/scroll";
import { StaggerContainer, StaggerItem, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT, useLanguage } from "@/i18n/LanguageProvider";
import { ml, toLang, sv, px, nv } from "@/lib/i18n-helpers";

const cards = [
  {
    icon: "/emsella-group.svg",
    title: "Men And Women",
    subtitle: "All ages, all concerns",
  },
  {
    icon: "/emsella-clothed.svg",
    title: "Fully Clothed",
    subtitle: "No undressing required",
  },
  {
    icon: "/emsella-clock.svg",
    title: "Zero Downtime",
    subtitle: "Back to life immediately",
  },
];

export default function EmsellaHero({ cms, editing }: { cms?: Record<string, unknown>; editing?: boolean }) {
  const t = useT();
  const { lang: ctxLang } = useLanguage();
  const lang = toLang(ctxLang);
  const cmsTitle = cms ? ml(cms.title, lang) : "";
  const cmsSubtitle = cms ? ml(cms.subtitle, lang) : "";
  const cmsPrimaryBtn = cms ? ml(cms.primaryBtn, lang) : "";
  const cmsSecondaryBtn = cms ? ml(cms.secondaryBtn, lang) : "";
  const cmsBg = cms ? sv(cms.backgroundImage) : "";
  const cmsBgTablet = cms ? sv(cms.backgroundImageTablet) : "";
  const cmsBgMobile = cms ? sv(cms.backgroundImageMobile) : "";
  const e = (type: string, label: string) => editing ? { "data-edit-type": type, "data-edit-label": label } as Record<string,string> : {};
  const titleFont = cms ? sv(cms.titleFont) : "";
  const subtitleFont = cms ? sv(cms.subtitleFont) : "";
  return (
    <section
      {...e("section","hero")}
      className={`bg-cover bg-center bg-no-repeat rounded-b-[60px] px-5 sm:px-10 pt-20 sm:pt-24 pb-10 sm:pb-16 min-h-[100vh] flex flex-col overflow-hidden ${!cmsBg ? "bg-[url(/emsella-hero-360.png)] min-[768px]:bg-[url(/emsella-hero-768.png)] min-[1200px]:bg-[url(/emsella-hero.webp)]" : ""} ${editing ? "cursor-pointer hover:ring-2 hover:ring-white" : ""}`}
      style={cmsBg ? { backgroundImage: `url(${cmsBg})` } : { ["--bg-base" as any]: "url('/emsella-hero-360.png')", ["--bg-768" as any]: "url('/emsella-hero-768.png')", ["--bg-1200" as any]: "url('/emsella-hero.webp')" } }
    >
      <StaggerContainer staggerDelay={0.15} className="w-full flex-1 flex flex-col">
        <StaggerItem>
          <div className="group flex flex-col items-start gap-2 mb-4 sm:mb-6 sm:flex-row sm:items-center sm:flex-wrap">
            <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="24" height="24" viewBox="0 0 24 24"
                className="transition-all duration-300 ease-in-out text-white group-hover:text-[#FFD700] group-hover:scale-110"
                style={{ transitionDelay: `${i * 100}ms` }}>
                <path d="M12.0026 18.26L4.9491 22.2082L6.52443 14.2799L0.589844 8.7918L8.61688 7.84006L12.0026 0.5L15.3882 7.84006L23.4152 8.7918L17.4807 14.2799L19.056 22.2082L12.0026 18.26Z" fill="currentColor" />
              </svg>
            ))}
          </div>
            <span className="text-white text-[13px] sm:text-[16px] ml-2">
              {t("Rated 5.0 on Google &middot; Hallandale Beach, FL")}
            </span>
          </div>
        </StaggerItem>

        <StaggerItem>
          <h1 {...e("text","hero_title")} className={`${titleFont || "font-berlingske"} text-white text-[24px] min-[768px]:text-[36px] min-[1200px]:text-[40px] min-[1600px]:text-[48px] leading-tight ${editing ? "cursor-pointer hover:ring-2 hover:ring-[#CBA07D]" : ""}`} style={{ ...(cms ? { color: sv(cms.titleColor) || undefined, fontSize: cms.titleSize ? `${cms.titleSize}px` : undefined } : {}) }}>
            {cmsTitle ? t(cmsTitle) : <>{t("Emsella Pelvic Floor")}<br />{t("Treatment in")}<br />{t("Hallandale Beach, FL")}</>}
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p {...e("text","hero_subtitle")} className={`${subtitleFont || ""} text-white text-[16px] font-semibold leading-relaxed mt-6 max-w-[720px] ${editing ? "cursor-pointer hover:ring-2 hover:ring-[#CBA07D]" : ""}`} style={{ ...(cms ? { color: sv(cms.subtitleColor) || undefined, fontSize: cms.subtitleSize ? `${cms.subtitleSize}px` : undefined } : {}) }}>
            {cmsSubtitle ? t(cmsSubtitle) : <>{t("WO/MAN Luxe Med Spa offers BTL Emsella in Hallandale Beach, FL. The only FDA-cleared")}{t("pelvic floor treatment that delivers the equivalent of 11,200 Kegel exercises in a single 28-minute")}{t("session. Fully clothed. No surgery. No downtime.")}</>}
          </p>
        </StaggerItem>

        <StaggerItem className="mt-auto sm:mt-0">
          <div {...e("button","hero_buttons")} className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10 ${editing ? "cursor-pointer hover:ring-2 hover:ring-[#CBA07D]" : ""}`}>
            <BookButton className="w-full sm:w-auto bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" label={cmsPrimaryBtn ? t(cmsPrimaryBtn) : t("Book Private Consultation")} />
            <motion.button onClick={() => smoothScrollToTarget('reviews')} {...btnHover} className="w-full sm:w-auto bg-transparent text-white font-bold text-[14px] rounded-[10px] px-8 py-4 border border-white hover:bg-white/10 transition-colors cursor-pointer">
              {cmsSecondaryBtn ? t(cmsSecondaryBtn) : t("View Reviews")}</motion.button>
          </div>
        </StaggerItem>
      </StaggerContainer>

      <StaggerContainer staggerDelay={0.1} className="w-full mt-10 sm:mt-12">
        <StaggerItem>
          <div className="hidden sm:flex flex-wrap gap-4 sm:gap-6">
            {cards.map((card, i) => (
              <div
                key={i}
                className="w-full h-[170px] sm:w-[200px] sm:h-[180px] rounded-[20px] p-5 sm:p-6 flex flex-col justify-between backdrop-blur-sm"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.35)" }}
              >
                <img src={card.icon} alt="" className="w-6 h-6 sm:w-7 sm:h-7" />
                <div>
                  <p className="text-white text-[16px] font-semibold leading-snug">{t(card.title)}</p>
                  <p className="text-white/70 text-[14px] leading-snug mt-1">{t(card.subtitle)}</p>
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}