"use client";

import { useState } from "react";
import { useT } from "@/i18n/LanguageProvider";
import { smoothScrollToTarget } from "@/lib/scroll";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, btnHover } from "../Animations";
import BookButton from "../BookButton";

export default function HomeHero() {
  const t = useT();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative rounded-b-[60px] px-5 sm:px-10 pt-20 sm:pt-24 pb-10 sm:pb-16 min-h-[100vh] flex flex-col justify-between overflow-hidden">
      
      {/* Background Poster (Fallback & Base layer) */}
      <div className="absolute inset-0 w-full h-full bg-[url(/home-hero.webp)] bg-cover bg-center bg-no-repeat -z-30" />

      {/* Video Background */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </motion.video>

      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-black/30 -z-10" />

      <StaggerContainer staggerDelay={0.15} className="relative z-10 w-full flex-1 flex flex-col justify-end">
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
          <h1 className="text-white text-[24px] min-[768px]:text-[36px] min-[1200px]:text-[40px] min-[1600px]:text-[48px] leading-tight font-berlingske">
            {t("WO/MAN Luxe Med Spa, Body, Skin")}
            <br />
            {t("Laser Hair Removal &amp; Wellness")}
            <br />
            {t("Treatments in Hallandale Beach, FL")}
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="text-white text-[16px] font-semibold leading-relaxed mt-6 max-w-[680px]">
            {t("Advanced treatments for skin rejuvenation, feminine wellness, body sculpting, and longevity — delivered in a private luxury clinical environment designed around results, discretion, and personalized care")}
          </p>
        </StaggerItem>

        <StaggerItem className="mt-auto sm:mt-0 pt-10 sm:pt-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <BookButton label={t("Book Consultation")} className="w-full sm:w-auto" />
            <motion.button onClick={() => smoothScrollToTarget('treatments')} {...btnHover} className="w-full sm:w-auto text-white font-bold text-[14px] border border-white rounded-[10px] px-8 py-4 bg-transparent hover:bg-white/10 transition-colors cursor-pointer">
              {t("Explore Treatments")}
            </motion.button>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
