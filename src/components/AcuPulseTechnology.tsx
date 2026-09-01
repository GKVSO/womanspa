"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT } from "@/i18n/LanguageProvider";

const steps = [
  {
    title: "Step 1 - Controlled Skin Resurfacing",
    text: "The laser precisely treats targeted skin layers",
  },
  {
    title: "Step 2 - Collagen Stimulation",
    text: "The body activates natural collagen remodeling",
  },
  {
    title: "Step 3 - Skin Renewal",
    text: "New skin appears smoother, firmer, and more refined",
  },
];

const reasons = [
  "Advanced anti-aging solution",
  "Long-term collagen support",
  "Effective for texture & scars",
  "Natural-looking rejuvenation",
  "Customizable treatment intensity",
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

export default function AcuPulseTechnology() {
  const t = useT();
  return (
    <section id="treatments" className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-32 pb-16 sm:pb-40 bg-[#EFEEF1] min-[1200px]:bg-[url(/acupulse-tech-bg.webp)] min-[1200px]:bg-cover min-[1200px]:bg-center min-[1200px]:bg-no-repeat">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start lg:justify-between">
        <StaggerContainer staggerDelay={0.12} className="max-w-[760px] min-[1200px]:max-w-[350px] min-[1600px]:max-w-[760px]">
          <StaggerItem>
            <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal">
              {t("How CO2 Laser")}
              <br />
              {t("Resurfacing Works")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[#1F1D1B] font-medium text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[16px] mt-6 max-w-[640px] min-[1200px]:max-w-[330px] min-[1600px]:max-w-[640px] leading-relaxed">
              {t("CO2 laser technology creates controlled micro-injuries within the skin to stimulate collagen production and accelerate cellular renewal, as the skin heals, texture improves, fine lines soften, and the complexion appears smoother and more radiant")}
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
                  <p className="text-[#1F1D1B] font-medium text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[16px] mt-1 max-w-[520px] min-[1200px]:max-w-[330px] min-[1600px]:max-w-[520px]">
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
            src="/acupulse-tech-768.png"
            alt={t("AcuPulse CO2 technology")}
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
                <h3 className="text-[#313242] text-[16px] font-bold leading-tight mb-8">
                  {t("Why Clients Choose It")}
                </h3>
                <ul className="space-y-3">
                  {reasons.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#313242] font-medium text-[16px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9A6D44] flex-shrink-0 mt-[9px]" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <BookButton className="mt-8" style={{ backgroundColor: "#B07E3F" }}>
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
