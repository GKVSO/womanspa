"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import { Fragment } from "react";
import BookButton from "./BookButton";
import { StaggerContainer, StaggerItem, btnHover } from "./Animations";

const items = [
  {
    title: "Rhythmic Compression",
    text: "Mechanical pulses stimulate circulation and tissue movement",
  },
  {
    title: "Tissue Activation",
    text: "The body responds through improved circulation and oxygenation",
  },
  {
    title: "Lymphatic Support",
    text: "Fluid movement and drainage may gradually improve",
  },
  {
    title: "Progressive Body Refinement",
    text: "Skin and body contours appear smoother, firmer, and more sculpted over time",
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

export default function EndospheresTechnology() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 bg-[#ECEDEE]">
      <div
        className="hidden min-[1200px]:block absolute inset-0 bg-no-repeat bg-right pointer-events-none bg-[url(/endo-device-alt.webp)]"
        
      />
      <div className="relative">
        <StaggerContainer staggerDelay={0.12} className="max-w-[760px]">
          <StaggerItem>
            <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal whitespace-pre-line">
              {t("Rhythmic Mechanical\nStimulation Explained Simply")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <Divider />
          </StaggerItem>

          {items.map((item) => (
            <Fragment key={item.title}>
              <StaggerItem>
                <div className="py-2">
                  <p className="text-[#9A6D44] font-semibold text-[14px] min-[1600px]:text-[16px]">
                    {t(item.title)}
                  </p>
                  <p className="text-[#1F1D1B] font-medium text-[14px] min-[1600px]:text-[16px] mt-1 max-w-[520px]">
                    {t(item.text)}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <Divider />
              </StaggerItem>
            </Fragment>
          ))}

          <StaggerItem>
            <BookButton className="bg-white text-black font-bold text-[14px] rounded-[15px] px-8 py-4 mt-6 w-full min-[768px]:w-auto cursor-pointer whitespace-nowrap" label={t("Schedule Private Consultation")} />
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10">
              <img
                src="/endospheres-tech-device.png"
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