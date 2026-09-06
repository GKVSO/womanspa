"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const items = [
  {
    num: "1.",
    title: "Micro-Ablative Fractional Resurfacing",
    text: "Tiny columns of thermal energy are delivered deep into the lamina propria, leaving the surrounding tissue intact. This initiates a powerful wound-healing cascade without damaging the surface.",
  },
  {
    num: "2.",
    title: "Collagen Remodeling & Neo-Vascularization",
    text: "New collagen and elastin fibers are synthesized over the following weeks. Blood flow improves, tissue thickens, and the vaginal lining regains its healthy, lubricated, resilient state.",
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

export default function FemTouchTechnology() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 bg-[#ECEDEE]">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:justify-between">
        <StaggerContainer staggerDelay={0.12} className="max-w-[760px] flex-1">
          <StaggerItem>
            <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal whitespace-pre-line">
              {t("How Fractional CO2 Laser\nRestores Feminine Wellness")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <Divider />
          </StaggerItem>

          {items.map((item) => (
            <Fragment key={item.num}>
              <StaggerItem>
                <div className="py-2">
                  <p className="text-[#9A6D44] font-semibold text-[16px] min-[1600px]:text-[20px]">
                    {item.num} {t(item.title)}
                  </p>
                  <p className="text-[#313242] font-medium text-[14px] min-[1600px]:text-[16px] mt-2 max-w-[520px]">
                    {t(item.text)}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <Divider />
              </StaggerItem>
            </Fragment>
          ))}
        </StaggerContainer>

        <div className="w-full lg:w-[480px] lg:flex-shrink-0">
          <img
            src="/femtouch-tech-device.png"
            alt={t("FemTouch technology device")}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}