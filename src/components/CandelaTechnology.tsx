"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import BookButton from "./BookButton";

const items = [
  {
    num: "01",
    title: "Modern Skin Science",
    text: "Candela Matrix uses intelligent impedance monitoring technology that helps personalize energy delivery in real time based on how the skin responds during treatment",
  },
  {
    num: "02",
    title: "This allows treatments to feel:",
    text: "• more precise\n• more controlled\n• more personalized\n• safer across multiple skin types",
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

export default function CandelaTechnology() {
  const t = useT();
  return (
    <section
      className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-0 lg:bg-[url(/candela-technology-bg.png)]"
      style={{
                backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 flex-1">
          <StaggerContainer staggerDelay={0.12} className="max-w-[760px] flex-1">
            <StaggerItem>
              <h2 className="text-[#313242] text-[32px] sm:text-[48px] leading-tight font-berlingske font-normal">
                {t("Intelligent RF Technology Designed Around Precision")}
              </h2>
            </StaggerItem>

            <StaggerItem>
              <Divider />
            </StaggerItem>

            {items.map((item) => (
              <Fragment key={item.num}>
                <StaggerItem>
                  <div className="py-2">
                    <p className="text-[#313242] font-semibold text-[18px] sm:text-[20px]">
                      {item.num} - {t(item.title)}
                    </p>
                    <p className="text-[#313242] font-medium text-[15px] sm:text-[16px] mt-2 max-w-[520px]">
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

          <FadeIn as="div" y={30}>
            <div className="w-full lg:w-[620px] flex flex-col items-start justify-center pb-8">
              <p className="text-[#313242] font-semibold text-[18px] sm:text-[20px] leading-relaxed">
                {t("Advanced skin rejuvenation with RF microneedling,")}
                <br />
                {t("fractional RF resurfacing, and intelligent multi-depth")}
                <br />
                {t("technology — focused on long-term skin quality with")}
                <br />
                {t("minimal downtime")}
              </p>
              <BookButton
                {...btnHover}
                className="text-white font-bold text-[14px] rounded-[10px] px-8 py-4 mt-10 w-full sm:w-auto cursor-pointer"
                style={{ backgroundColor: "#B07E3F" }}
                label={t("Schedule Consultation")}
              />
            </div>
          </FadeIn>
        </div>

        <div className="w-full overflow-hidden mt-6 -mb-4">
          <motion.p
            className="text-white font-berlingske text-[80px] sm:text-[200px] leading-none text-center whitespace-nowrap select-none"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {t("Candela Matrix")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}