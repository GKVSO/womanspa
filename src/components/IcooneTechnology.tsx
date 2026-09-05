"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment } from "react";
import { StaggerContainer, StaggerItem, btnHover } from "./Animations";

const items = [
  {
    title: "Mechanical Microstimulation",
    text: "Thousands of microstimulations activate connective tissue",
  },
  {
    title: "Laser & LED Support",
    text: "Energy technologies support collagen and body remodeling",
  },
  {
    title: "Lymphatic Activation",
    text: "Fluid movement and circulation are stimulated",
  },
  {
    title: "Progressive Body Refinement",
    text: "The body may gradually appear smoother, lighter, firmer, and more sculpted",
  },
];

function Divider() {
  return (
    <motion.div
      className="w-full h-px my-5 sm:my-8"
      style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}

export default function IcooneTechnology() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 bg-[#ECEDEE] min-[1200px]:bg-[url(/icoone-tech-bg.webp)] min-[1200px]:bg-bottom-right min-[1200px]:bg-no-repeat"
      >
      <div className="flex flex-col">
        <StaggerContainer staggerDelay={0.12} className="max-w-[760px]">
          <StaggerItem>
            <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal">
              {t("Multi Micro Alveolar Stimulation Explained Simply")}
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
            <motion.button
              {...btnHover}
              className="bg-white text-black font-bold text-[14px] rounded-[15px] px-8 py-4 mt-6 w-full min-[768px]:w-auto cursor-pointer "
      >
              {t("Schedule Consultation")}
            </motion.button>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10 lg:hidden">
              <Image
                src="/icoone-tech-device.png"
                alt={t("ICOONE technology")}
                width={258}
                height={360}
                className="w-full h-auto object-contain"
              />
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}