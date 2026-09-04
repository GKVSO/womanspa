"use client";

import { useLanguage, useT } from "@/i18n/LanguageProvider";
import { ml, sv, toLang } from "@/lib/i18n-helpers";
import { StaggerContainer, StaggerItem } from "./Animations";
import BookButton from "./BookButton";

export default function NadTherapyHero({ cms, editing }: { cms?: Record<string, unknown>; editing?: boolean }) {
  const t = useT();
  const { lang: ctxLang } = useLanguage();
  const lang = toLang(ctxLang);
  const cmsTitle = cms ? ml(cms.title, lang) : "";
  const cmsSubtitle = cms ? ml(cms.subtitle, lang) : "";
  const cmsPrimaryBtn = cms ? ml(cms.primaryBtn, lang) : "";
  const cmsSecondaryBtn = cms ? ml(cms.secondaryBtn, lang) : "";
  const cmsBg = cms ? sv(cms.backgroundImage) : "";
  const e = (type: string, label: string) => editing ? { "data-edit-type": type, "data-edit-label": label } as Record<string,string> : {};
  const titleFont = cms ? sv(cms.titleFont) : "";
  const subtitleFont = cms ? sv(cms.subtitleFont) : "";
  return (
    <section
      {...e("section","hero")}
      className={`bg-cover bg-no-repeat bg-bottom sm:bg-right rounded-b-[60px] px-5 sm:px-10 pt-20 sm:pt-24 pb-10 sm:pb-16 min-h-[100vh] flex flex-col overflow-hidden bg-[url(/nad-bg-mobile.png)] sm:bg-[url(/nad-bg.png)] ${editing ? "cursor-pointer hover:ring-2 hover:ring-white" : ""}`}
      style={cmsBg ? { backgroundImage: `url(${cmsBg})` } : {}}
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
          <h1 {...e("text","hero_title")} className={`${titleFont || "font-berlingske"} text-white text-[24px] min-[768px]:text-[36px] min-[1200px]:text-[40px] min-[1600px]:text-[48px] leading-tight max-w-4xl ${editing ? "cursor-pointer hover:ring-2 hover:ring-[#CBA07D]" : ""}`} style={{ ...(cms ? { color: sv(cms.titleColor) || undefined, fontSize: cms.titleSize ? `${cms.titleSize}px` : undefined } : {}) }}>
            {cmsTitle ? t(cmsTitle) : <>{t("NAD+ Therapy For Cellular Energy,")}<br />{t("Healthy Aging & Optimal Wellness")}</>}
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p {...e("text","hero_subtitle")} className={`${subtitleFont || ""} text-white text-[16px] font-semibold leading-relaxed mt-6 max-w-[680px] ${editing ? "cursor-pointer hover:ring-2 hover:ring-[#CBA07D]" : ""}`} style={{ ...(cms ? { color: sv(cms.subtitleColor) || undefined, fontSize: cms.subtitleSize ? `${cms.subtitleSize}px` : undefined } : {}) }}>
            {cmsSubtitle ? t(cmsSubtitle) : t("Support your body's natural energy production, cognitive performance, recovery, and healthy aging with personalized NAD+ therapy administered under medical supervision.")}
          </p>
        </StaggerItem>

        <StaggerItem className="mt-auto sm:mt-10">
          <div {...e("button","hero_buttons")} className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 ${editing ? "cursor-pointer hover:ring-2 hover:ring-[#CBA07D]" : ""}`}>
            <BookButton style={{ backgroundColor: "#fff", color: "#000" }} className="w-full sm:w-auto px-6 py-3 rounded-[10px] font-bold text-[14px]" label={cmsPrimaryBtn ? t(cmsPrimaryBtn) : t("Book Consultation")} />
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
