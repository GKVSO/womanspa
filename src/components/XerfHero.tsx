"use client";

import { useLanguage, useT } from "@/i18n/LanguageProvider";
import { ml, nv, sv, toLang } from "@/lib/i18n-helpers";
import { smoothScrollToTarget } from "@/lib/scroll";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, btnHover } from "./Animations";

const cards = [
  {
    num: "01",
    title: "Refining contours",
    subtitle: "Without numbing",
  },
  {
    num: "02",
    title: "Stimulating collagen",
    subtitle: "Tightening laxity",
  },
  {
    num: "03",
    title: "Zero Downtime",
    subtitle: "Back to life immediately",
  },
];

const DEFAULTS = {
  backgroundImage: "/xerf-hero.webp",
  backgroundImageTablet: "/xerf-hero-768.png",
  backgroundImageMobile: "/xerf-hero-360.png",
  titleSizeMobile: 24,
  titleSizeTablet: 36,
  titleSizeDesktop: 40,
  titleSizeLarge: 48,
  titleFont: "font-berlingske",
  titleLineHeight: 1.25,
  starColor: "#FFFFFF",
  overlay: 25,
  borderRadius: 60,
  buttonColor: "#FFFFFF",
  buttonTextColor: "#000000",
};

export default function XerfHero({ cms, editing }: { cms?: Record<string, unknown>; editing?: boolean }) {
  const t = useT();
  const { lang: ctxLang } = useLanguage();
  const lang = toLang(ctxLang);
  const c = cms || {};
  const e = (type: string, label: string) => editing ? { "data-edit-type": type, "data-edit-label": label } as Record<string, string> : {};
  const EDIT_CLS = editing ? "cursor-pointer hover:ring-2 hover:ring-[#CBA07D] hover:ring-offset-1" : "";

  const cmsTitle = ml(c.title, lang);
  const cmsSubtitle = ml(c.subtitle, lang);
  const cmsPrimaryBtn = ml(c.primaryBtn, lang);
  const cmsSecondaryBtn = ml(c.secondaryBtn, lang);
  const cmsStarsText = ml(c.starsText, lang);

  const bgDesktop = sv(c.backgroundImage) || DEFAULTS.backgroundImage;
  const bgTablet = sv(c.backgroundImageTablet) || DEFAULTS.backgroundImageTablet;
  const bgMobile = sv(c.backgroundImageMobile) || DEFAULTS.backgroundImageMobile;
  const overlay = nv(c.backgroundOverlay, DEFAULTS.overlay);
  const starColor = sv(c.starColor) || DEFAULTS.starColor;
  const titleFont = sv(c.titleFont) || DEFAULTS.titleFont;
  const borderRadius = nv(c.borderRadius, DEFAULTS.borderRadius);
  const buttonColor = sv(c.buttonColor) || DEFAULTS.buttonColor;
  const buttonTextColor = sv(c.buttonTextColor) || DEFAULTS.buttonTextColor;
  const showStars = c.showStars !== "no";

  // Mini-cards: CMS list or defaults
  const cmsCards = Array.isArray(c.cardsMini) ? c.cardsMini as Record<string, unknown>[] : null;
  const miniCards = cmsCards && cmsCards.length > 0
    ? cmsCards.map((card) => ({
        num: sv(card.num) || "",
        title: ml(card.title, lang),
        subtitle: ml(card.subtitle, lang),
      }))
    : cards;

  // Responsive title sizes
  const sMobile = nv(c.titleSizeMobile, DEFAULTS.titleSizeMobile);
  const sTablet = nv(c.titleSizeTablet, DEFAULTS.titleSizeTablet);
  const sDesktop = nv(c.titleSizeDesktop, DEFAULTS.titleSizeDesktop);
  const sLarge = nv(c.titleSizeLarge, DEFAULTS.titleSizeLarge);

  const titleStyle: React.CSSProperties = {
    lineHeight: nv(c.titleLineHeight, DEFAULTS.titleLineHeight),
    letterSpacing: c.titleLetterSpacing != null && c.titleLetterSpacing !== "" ? `${nv(c.titleLetterSpacing, 0)}px` : undefined,
    fontSize: `${sMobile}px`,
  };

  return (
    <section
      {...e("section", "hero")}
      className={`bg-cover bg-center bg-no-repeat px-5 sm:px-10 pt-20 sm:pt-24 pb-10 sm:pb-16 min-h-[100vh] flex flex-col overflow-hidden bg-[url(/xerf-hero-360.png)] min-[768px]:bg-[url(/xerf-hero-768.png)] min-[1200px]:bg-[url(/xerf-hero.webp)] ${editing ? "relative" : "rounded-b-[60px]"}`}
      style={{
        borderRadius: editing ? undefined : `0 0 ${borderRadius}px ${borderRadius}px`,
      }}
    >
      {/* Overlay */}
      {/* Overlay only when explicitly enabled (> 0) */}

      <StaggerContainer staggerDelay={0.15} className="w-full flex-1 flex flex-col relative z-10">
        <StaggerItem>
          <div {...e("text", "hero_stars")} className={`group flex flex-col items-start gap-2 mb-4 sm:mb-6 sm:flex-row sm:items-center sm:flex-wrap ${EDIT_CLS}`}>
            {showStars && (
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="24" height="24" viewBox="0 0 24 24"
                    className="transition-all duration-300 ease-in-out group-hover:scale-110"
                    style={{ color: starColor, transitionDelay: `${i * 100}ms` }}>
                    <path d="M12.0026 18.26L4.9491 22.2082L6.52443 14.2799L0.589844 8.7918L8.61688 7.84006L12.0026 0.5L15.3882 7.84006L23.4152 8.7918L17.4807 14.2799L19.056 22.2082L12.0026 18.26Z" fill="currentColor" />
                  </svg>
                ))}
              </div>
            )}
            {showStars && (
              <span className="text-white text-[13px] sm:text-[16px] ml-2">
                {cmsStarsText ? t(cmsStarsText) : t("Rated 5.0 on Google &middot; Hallandale Beach, FL")}
              </span>
            )}
          </div>
        </StaggerItem>

        <StaggerItem>
          <h1
            {...e("text", "hero_title")}
            className={`xerf-hero-title text-white leading-tight ${titleFont} ${EDIT_CLS}`}
            style={titleStyle}
          >
            {cmsTitle ? t(cmsTitle) : <>{t("Lift &amp; Tighten Loose Skin")}<br />{t("&mdash; Without Surgery or Downtime")}</>}
          </h1>
          {/* Responsive font-size overrides */}
          <style>{`
            .xerf-hero-title { font-size: ${sMobile}px; }
            @media (min-width: 768px) { .xerf-hero-title { font-size: ${sTablet}px; } }
            @media (min-width: 1200px) { .xerf-hero-title { font-size: ${sDesktop}px; } }
            @media (min-width: 1600px) { .xerf-hero-title { font-size: ${sLarge}px; } }
          `}</style>
        </StaggerItem>

        <StaggerItem>
          <p {...e("text", "hero_subtitle")} className={`text-white text-[16px] font-semibold leading-relaxed mt-6 max-w-[680px] ${EDIT_CLS}`}>
            {cmsSubtitle ? t(cmsSubtitle) : <>{t("Restore a firmer jawline, tighter neck, and smoother skin with the newest")}{t("RF technology. Comfortable treatment. No needles. No downtime")}</>}
          </p>
        </StaggerItem>

        <StaggerItem className="mt-auto sm:mt-0">
          <div {...e("button", "hero_buttons")} className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10 ${EDIT_CLS}`}>
            <motion.button
              {...btnHover}
              className="w-full sm:w-auto font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              style={{ backgroundColor: buttonColor, color: buttonTextColor }}
            >
              {cmsPrimaryBtn ? t(cmsPrimaryBtn) : t("Claim 100$ Consultation")}
            </motion.button>
            <motion.button onClick={() => smoothScrollToTarget('before-after')} {...btnHover} className="w-full sm:w-auto text-white font-bold text-[14px] border border-white rounded-[10px] px-8 py-4 bg-transparent hover:bg-white/10 transition-colors cursor-pointer">
              {cmsSecondaryBtn ? t(cmsSecondaryBtn) : t("Before&amp;After")}
            </motion.button>
          </div>
        </StaggerItem>
      </StaggerContainer>

      <StaggerContainer staggerDelay={0.1} className="w-full mt-10 sm:mt-12 relative z-10">
        <StaggerItem>
          <div {...e("card", "hero_cards")} className={`hidden sm:flex flex-wrap gap-4 sm:gap-6 ${EDIT_CLS}`}>
            {miniCards.map((card) => (
              <div
                key={card.num}
                className="w-full h-[170px] sm:w-[200px] sm:h-[180px] rounded-[20px] p-5 sm:p-6 flex flex-col justify-between backdrop-blur-sm"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.35)" }}
              >
                <p className="text-white/80 font-berlingske text-[20px]">{card.num}</p>
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
