"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const items = [
  {
    title: "532 nm low-level laser",
    text: "",
  },
  {
    title: "No heat, no vibration, no suction",
    text: "",
  },
  {
    title: "10 independent diodes",
    text: "",
  },
  {
    title: "FDA-cleared for BMI up to 40",
    text: "",
  },
  {
    title: "Suitable for all skin types",
    text: "",
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

export default function EmeraldTechnology() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 bg-[#ECEDEE] min-[1200px]:bg-[url(/emerald-device-alt.webp)] min-[1200px]:bg-contain min-[1200px]:bg-no-repeat min-[1200px]:bg-[position:right_center]">
      <div className="flex flex-col">
        <StaggerContainer staggerDelay={0.12} className="max-w-[760px]">
          <StaggerItem>
            <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal">
              {t("Cold Photobiomodulation")}
              <br />
              {t("That Respects the Body")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[#1F1D1B] font-medium text-[16px] sm:text-[18px] mt-6 max-w-[600px] leading-relaxed">
              {t("Emerald Laser uses 10 independent 532nm green laser beams to target fat cells beneath the dermis, creating transient pores in adipocyte membranes. Triglycerides escape, cells shrink, and surrounding tissues remain intact.")}
            </p>
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
            <motion.button
              {...btnHover}
              className="bg-white text-black font-bold text-[14px] rounded-[15px] px-8 py-4 mt-6 w-full min-[768px]:w-auto cursor-pointer"
            >
              {t("Schedule Consultation")}
            </motion.button>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10">
              <img
                src="/emerald-tech-device.png"
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