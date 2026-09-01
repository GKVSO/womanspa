"use client";

import { motion } from "framer-motion";
import { smoothScrollToTarget } from "@/lib/scroll";
import { StaggerContainer, StaggerItem, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT, useLanguage } from "@/i18n/LanguageProvider";
import { ml, toLang, sv, px, nv } from "@/lib/i18n-helpers";

export default function WellnessHero({ cms, editing }: { cms?: Record<string, unknown>; editing?: boolean }) {
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
      className={`flex flex-col rounded-b-[60px] px-5 sm:px-10 pt-20 sm:pt-24 pb-16 min-h-[100vh] overflow-hidden ${cmsBg ? "bg-cover bg-center bg-no-repeat" : ""} ${editing ? "cursor-pointer hover:ring-2 hover:ring-white" : ""}`}
      style={cmsBg ? { backgroundImage: `url(${cmsBg})` } : { backgroundColor: "#CBA07D" }}
    >
      <StaggerContainer staggerDelay={0.15} className="w-full max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center">
        <StaggerItem>
          <div className="group flex flex-col items-center gap-2 mb-4 sm:mb-6 sm:flex-row sm:justify-center sm:flex-wrap">
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
            {cmsTitle ? t(cmsTitle) : <>{t("Wellness At WO/MAN")}<br />{t("Luxe MedSpa Hallandale Beach")}</>}
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p {...e("text","hero_subtitle")} className={`${subtitleFont || ""} text-white text-[16px] font-semibold max-w-2xl mx-auto mt-8 leading-relaxed ${editing ? "cursor-pointer hover:ring-2 hover:ring-[#CBA07D]" : ""}`} style={{ ...(cms ? { color: sv(cms.subtitleColor) || undefined, fontSize: cms.subtitleSize ? `${cms.subtitleSize}px` : undefined } : {}) }}>
            {cmsSubtitle ? t(cmsSubtitle) : t(`Three advanced, non-surgical technologies. One deeply personalized plan for pelvic floor
            strength, internal vaginal health, external intimate aesthetics, and total feminine confidence`)}
          </p>
        </StaggerItem>

        <StaggerItem className="pt-10 sm:pt-0">
          <div {...e("button","hero_buttons")} className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 ${editing ? "cursor-pointer hover:ring-2 hover:ring-[#CBA07D]" : ""}`}>
            <BookButton className="w-full sm:w-auto bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" label={cmsPrimaryBtn ? t(cmsPrimaryBtn) : t("Book Consultation")} />
            <motion.button onClick={() => smoothScrollToTarget('treatments')} {...btnHover} className="w-full sm:w-auto text-white font-bold text-[14px] border border-white rounded-[10px] px-8 py-4 bg-transparent hover:bg-white/10 transition-colors cursor-pointer">
              {cmsSecondaryBtn ? t(cmsSecondaryBtn) : t("Explore Treatments")}</motion.button>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}