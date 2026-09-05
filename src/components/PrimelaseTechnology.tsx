"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { StaggerContainer, StaggerItem } from "./Animations";
import BookButton from "./BookButton";

const items = [
  {
    title: "810nm",
    text: "deep penetration for robust hair follicle destruction",
  },
  {
    title: "940nm",
    text: "superior hemoglobin absorption, enhancing follicle targeting and improving safety across skin tones",
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

export default function PrimelaseTechnology() {
  const t = useT();
  return (
    <section id="treatments" className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 bg-[#ECEDEE] min-[1200px]:bg-[url(/primelase-tech-bg.webp)] min-[1200px]:bg-cover min-[1200px]:bg-no-repeat min-[1200px]:bg-[position:center]">
      <div className="flex flex-col">
        <StaggerContainer staggerDelay={0.12} className="max-w-[760px]">
          <StaggerItem>
            <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal whitespace-pre-line">
              {t("Why Primelase Diode Laser Works Faster, Gentler, and Across \n More Skin Types")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[#9A6D44] font-semibold text-[18px] sm:text-[20px] mt-8 mb-2">
              {t("The Dual-Wavelength Advantage")}
            </p>
            <p className="text-[#1F1D1B] font-medium text-[16px] sm:text-[18px] max-w-[600px] leading-relaxed">
              {t("Most diode lasers use 810nm alone, which is well-absorbed by melanin but can struggle with darker skin or lighter hair. Primelase combines:")}
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
            <p className="text-[#9A6D44] font-semibold text-[18px] sm:text-[20px] mt-4 mb-2">
              {t("Advanced Contact Cooling")}
            </p>
            <p className="text-[#1F1D1B] font-medium text-[16px] sm:text-[18px] max-w-[600px] leading-relaxed">
              {t("Sapphire cooling plate maintains a consistent 5°C on the skin surface before, during, and after each pulse — protecting the epidermis and virtually eliminating pain")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <BookButton style={{ backgroundColor: "#fff", color: "#000" }} className="bg-white text-black font-bold text-[14px] rounded-[15px] px-8 py-4 mt-6 w-full min-[768px]:w-auto cursor-pointer" label={t("Schedule Consultation")} />
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10">
              <img
                src="/primelase-tech-device.png"
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