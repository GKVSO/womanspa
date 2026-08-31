"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "../Animations";
import { useT } from "@/i18n/LanguageProvider";

function Divider() {
  return (
    <motion.div
      className="w-full h-px my-6 sm:my-8"
      style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}

export default function HomeSmoothTexture() {
  const t = useT();
  return (
    <section className="relative overflow-hidden flex flex-col lg:flex-row rounded-b-[60px]" style={{ backgroundColor: "#F1F2F4" }}>
      <div className="flex-1 px-5 sm:px-10 py-16 sm:py-20">
        <FadeIn as="div" className="max-w-[760px] mx-auto" y={30}>
          <StaggerContainer staggerDelay={0.1}>
            <StaggerItem>
              <h2 className="text-black text-[24px] min-[768px]:text-[36px] min-[1600px]:text-[48px] font-berlingske leading-tight">
                {t("Built On A Belief That")}
                <br />
                {t("You Deserve Better Care")}
              </h2>
            </StaggerItem>

            <StaggerItem>
              <Divider />
            </StaggerItem>

            <StaggerItem>
              <p className="text-[#1F1D1B] font-semibold text-[16px] leading-relaxed">
                {t("About Us")}
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[#1F1D1B] font-medium text-[16px] leading-relaxed mt-6">
                {t("WO/MAN Luxe Med Spa was founded by Valeriya Verloka with one clear purpose: to bring the standard of care found in the world's best aesthetic clinics to South Florida — without the cold, clinical feeling that often comes with it")}
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[#1F1D1B] font-medium text-[16px] leading-relaxed mt-6">
                {t("The philosophy is simple: every client should be seen, heard, and treated as an individual")}
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[#1F1D1B] font-medium text-[16px] leading-relaxed mt-6">
                {t("A real person with real goals, a real lifestyle, and a desire to feel confident, healthy, and at home in their own skin")}
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[#1F1D1B] font-medium text-[16px] leading-relaxed mt-6">
                {t("We exist to help people feel confident, healthy, and at home in their own skin — using the most advanced non-invasive technology available today")}
              </p>
            </StaggerItem>
          </StaggerContainer>
        </FadeIn>
      </div>

      <div className="flex-1 relative min-h-[320px] sm:min-h-[480px] lg:min-h-0">
        <Image
          src="/home-about.png"
          alt={t("About WO/MAN Luxe Med Spa")}
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}