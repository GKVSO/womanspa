"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT } from "@/i18n/LanguageProvider";

const steps = [
  {
    title: "1. Fit The Depth - Shallow, Middle, Deep",
    text: "Precise depth control allows targeting different tissue layers - from shallow to deep - providing comprehensive rejuvenation and skin tightening.",
  },
  {
    title: "2. Fit By Heat - Wave Fit Pulse",
    text: "Traditional RF can spike in temperature, causing discomfort or burns. XERF's Wave Fit Pulse auto-adjusts the RF pulse according to delivered energy, creating a stable, balanced thermal profile and a comfortably warm sensation throughout",
  },
  {
    title: "3. Fit For Skin - Real-Time Impedance Feedback",
    text: "Before each pulse, the system measures your skin's impedance and synchronizes energy delivery. This means your treatment is constantly adapting to your tissue - not delivering a generic preset",
  },
];

const cardItems = [
  {
    title: "Integrated Cooling — ICD System",
    text: "The Integrated Cryogen Delivery system cools the skin surface directly at the treatment point, with three adjustable cooling levels matched to treatment intensity. The result: epidermal protection and a Never-Numb experience",
  },
  {
    title: "EFFECTOR Surface Temperature Monitoring",
    text: "Both the device GUI and the handpiece display show surface temperature in real time, allowing your provider to maintain optimal safety and comfort with every pulse",
  },
];

function Divider() {
  return (
    <motion.div
      className="w-full min-[1200px]:w-1/2 h-px my-5 sm:my-8"
      style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}

export default function XerfTechnology() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-32 pb-16 sm:pb-40 bg-[#F7F1E7] min-[1200px]:bg-[url(/xerf-tech-bg.webp)] min-[1200px]:bg-cover min-[1200px]:bg-center min-[1200px]:bg-no-repeat">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start lg:justify-between">
        <StaggerContainer staggerDelay={0.12} className="max-w-[760px] min-[1200px]:max-w-[350px] min-[1600px]:max-w-[760px]">
          <StaggerItem>
            <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal">
              {t("How XERF Structural Skin Tightening Works")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[#1F1D1B] font-medium text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[16px] mt-6 max-w-[640px] min-[1200px]:max-w-[330px] min-[1600px]:max-w-[640px] leading-relaxed">
              {t("XERF is the world's first monopolar RF device to combine 6.78 MHz and 2 MHz frequencies in one handpiece. This dual-frequency approach is the key to its depth versatility")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <Divider />
          </StaggerItem>

          {steps.map((step) => (
            <Fragment key={step.title}>
              <StaggerItem>
                <div className="py-2">
                  <p className="text-[#9A6D44] font-semibold text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[16px]">
                    {t(step.title)}
                  </p>
                  <p className="text-[#1F1D1B] font-medium text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[16px] mt-1 max-w-[640px] min-[1200px]:max-w-[330px] min-[1600px]:max-w-[640px] leading-relaxed whitespace-pre-line">
                    {t(step.text)}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <Divider />
              </StaggerItem>
            </Fragment>
          ))}
        </StaggerContainer>

        <div className="lg:hidden w-full flex justify-center">
          <img
            src="/xerf-tech-768.png"
            alt={t("XERF technology")}
            className="w-full max-w-[420px] h-auto object-contain rounded-[30px]"
          />
        </div>

        <div className="flex-shrink-0 w-full min-[1024px]:w-[390px] min-[1600px]:w-[440px]">
          <StaggerContainer staggerDelay={0.12}>
            <StaggerItem>
              <motion.div
                className="bg-white/80 rounded-[30px] p-6 sm:p-10 flex flex-col"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {cardItems.map((item) => (
                  <div key={item.title} className="mb-8">
                    <h3 className="text-[#313242] text-[16px] font-bold leading-tight mb-3">
                      {t(item.title)}
                    </h3>
                    <p className="text-[#313242] font-medium text-[16px] leading-relaxed">
                      {t(item.text)}
                    </p>
                  </div>
                ))}
                <BookButton className="mt-2" style={{ backgroundColor: "#B07E3F" }}>
                  {t("Book Consultation")}
                  </BookButton>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}