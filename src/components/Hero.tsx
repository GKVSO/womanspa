"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";
import BookButton from "./BookButton";

interface HeroProps {
  titleFirst?: string;
  titleSecond?: string;
  singleLineTitle?: string;
  description?: string;
  primaryBtn?: string;
  primaryBtnHref?: string;
  secondaryBtn?: string;
  secondaryBtnHref?: string;
  showButtons?: boolean;
  children?: React.ReactNode;
}

export default function Hero({
  titleFirst = "Before & After at",
  titleSecond = "WO/MAN Luxe MedSpa",
  singleLineTitle,
  description,
  primaryBtn = "Book Consultation",
  primaryBtnHref = "/book",
  secondaryBtn = "View Before / After",
  secondaryBtnHref = "#before-after",
  showButtons = true,
  children,
}: HeroProps) {
  const t = useT();
  return (
    <FadeIn as="section" className="bg-[#CBA07D] rounded-b-[60px] pt-24 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-10 flex flex-col items-center justify-center text-center min-h-[80vh]" y={0}>
      <StaggerContainer staggerDelay={0.15} className="w-full flex flex-col items-center">
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
            <span className="text-white text-[16px] ml-2">
              {t("Rated 5.0 on Google &middot; Hallandale Beach, FL")}
            </span>
          </div>
        </StaggerItem>

        <StaggerItem className="w-full flex justify-center">
          {singleLineTitle ? (
            <h1 className="text-white text-[24px] min-[768px]:text-[36px] min-[1200px]:text-[40px] min-[1600px]:text-[48px] leading-tight font-berlingske max-w-4xl whitespace-pre-line">
              {t(singleLineTitle)}
            </h1>
          ) : (
            <h1 className="text-white text-[24px] min-[768px]:text-[36px] min-[1200px]:text-[40px] min-[1600px]:text-[48px] leading-tight font-berlingske max-w-3xl">
              {t(titleFirst)}
              <br />
              {t(titleSecond)}
            </h1>
          )}
        </StaggerItem>

        {description && (
          <StaggerItem className="w-full flex justify-center">
            <p className="text-white text-[16px] font-normal max-w-xl mt-6">
              {t(description)}
            </p>
          </StaggerItem>
        )}

        {showButtons && (
          <StaggerItem>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
              <BookButton label={t(primaryBtn)} className="w-full sm:w-auto whitespace-nowrap" />
              <motion.a href={secondaryBtnHref} {...btnHover} className="flex items-center justify-center w-full sm:w-auto text-white font-bold text-[14px] border border-white rounded-[10px] px-8 py-4 bg-transparent hover:bg-white/10 transition-colors cursor-pointer text-center whitespace-nowrap">
                {t(secondaryBtn)}
              </motion.a>
            </div>
          </StaggerItem>
        )}

        {children && (
          <StaggerItem className="w-full flex justify-center">
            <div className="mt-8 w-full flex justify-center">{children}</div>
          </StaggerItem>
        )}
      </StaggerContainer>
    </FadeIn>
  );
}
