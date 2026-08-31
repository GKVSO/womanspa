"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const items = [
  {
    title: "1. Cleanse & Peel",
    text: "A gentle lactic acid and glucosamine blend removes dead surface cells and reveals fresh, receptive skin.",
  },
  {
    title: "2. Extract & Clear",
    text: "Vortex suction painlessly removes impurities from pores while salicylic acid helps prevent future congestion.",
  },
  {
    title: "3. Hydrate & Protect",
    text: "A proprietary blend of hyaluronic acid, antioxidants, minerals, and peptides is infused deep into the skin — not wiped on top",
  },
  {
    title: "4. LED Light Therapy",
    text: "The built-in LED handpiece delivers therapeutic light immediately after infusion:",
  },
];

function Divider() {
  return (
    <motion.div
      className="w-full min-[1200px]:w-1/2 h-px my-5 sm:my-8" style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}

export default function HydrafacialTechnology() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 bg-[#ECEDEE]  min-[1200px]:bg-cover min-[1200px]:bg-no-repeat min-[1200px]:bg-[position:center] min-[1200px]:bg-[url(/hydrafacial-tech-bg.webp)] min-[1200px]:bg-cover min-[1200px]:bg-center min-[1200px]:bg-no-repeat"
      >
      <div className="flex flex-col">
        <StaggerContainer staggerDelay={0.12} className="max-w-[760px]">
          <StaggerItem>
            <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal">
              {t("Patented Vortex-Fusion: The Science Behind The Glow")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <Divider />
          </StaggerItem>

          {items.map((item, i) => (
            <Fragment key={item.title}>
              <StaggerItem>
                <div className="py-2">
                  <p className="text-[#9A6D44] font-semibold text-[14px] min-[1600px]:text-[16px]">
                    {t(item.title)}
                  </p>
                  {item.text && (
                    <p className="text-[#1F1D1B] font-medium text-[14px] min-[1600px]:text-[16px] mt-1 max-w-[520px]">
                      {t(item.text)}
                    </p>
                  )}
                </div>
              </StaggerItem>
              <StaggerItem>
                <Divider />
              </StaggerItem>
            </Fragment>
          ))}

          <StaggerItem>
            <p className="text-[#9A6D44] font-semibold text-[18px] sm:text-[20px] mt-4 mb-2">
              {t("Blue LED")}
            </p>
            <p className="text-[#1F1D1B] font-medium text-[16px] sm:text-[18px] max-w-[600px] leading-relaxed">
              {t("targets acne-causing bacteria, reduces inflammation, and helps regulate sebum production")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[#9A6D44] font-semibold text-[18px] sm:text-[20px] mt-4 mb-2">
              {t("Red LED")}
            </p>
            <p className="text-[#1F1D1B] font-medium text-[16px] sm:text-[18px] max-w-[600px] leading-relaxed">
              {t("stimulates collagen synthesis, accelerates healing, and enhances the longevity of your post-facial glow")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <Divider />
          </StaggerItem>

          <StaggerItem>
            <p className="text-[#1F1D1B] font-medium text-[16px] sm:text-[18px] max-w-[600px] leading-relaxed">
              {t("The LED step seals the treatment — ensuring the active ingredients infused during Step 3 absorb optimally while your skin receives an additional layer of rejuvenation at the cellular level")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10">
              <img
                src="/hydrafacial-tech-device.png"
                alt={t("technology device")}
                className="block min-[1200px]:hidden w-full h-auto object-contain"
              />
            </div>
          </StaggerItem>
        </StaggerContainer>

      </div>
    </section>
  );
}