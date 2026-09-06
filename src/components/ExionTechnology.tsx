"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { StaggerContainer, StaggerItem, FadeIn, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT } from "@/i18n/LanguageProvider";

const items = [
  {
    num: "01",
    title: "Energy Delivery",
    text: "Advanced technology delivers controlled energy to targeted tissue.",
  },
  {
    num: "02",
    title: "Collagen Activation",
    text: "The body responds by stimulating natural collagen production.",
  },
  {
    num: "03",
    title: "Gradual Rejuvenation",
    text: "Results continue improving over time as collagen develops.",
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

export default function ExionTechnology() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-0 bg-[#F2F1F3] bg-[url(/exion-tech-bg.webp)] lg:bg-contain lg:bg-no-repeat lg:bg-center">
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 flex-1 items-stretch lg:justify-between">
          <StaggerContainer staggerDelay={0.12} className="max-w-[760px]">
            <StaggerItem>
              <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal whitespace-pre-line">
                {t("Intelligent RF Technology\nDesigned Around Precision")}
              </h2>
            </StaggerItem>

            <StaggerItem>
              <Divider />
            </StaggerItem>

            {items.map((item) => (
              <Fragment key={item.num}>
                <StaggerItem>
                  <div className="py-2">
                    <p className="text-[#313242] font-semibold text-[16px] min-[1600px]:text-[20px]">
                      {item.num} — {t(item.title)}
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

          <FadeIn as="div" y={30} className="flex items-center">
            <div className="w-full lg:w-[480px] flex flex-col items-end justify-end min-[1200px]:justify-center pb-8 min-[1200px]:pb-0">
              <p className="text-[#313242] font-semibold text-[16px] min-[1600px]:text-[20px] leading-relaxed">
                {t("EXION combines advanced radiofrequency energy and targeted ultrasound technology to stimulate collagen and support skin renewal at deeper levels.")}
              </p>
              <div className="mt-10 w-full sm:w-auto">
                <BookButton
                  className="whitespace-nowrap cursor-pointer text-white font-bold text-[14px] rounded-[10px] px-8 py-4 w-full sm:w-auto"
                  style={{ backgroundColor: "#B07E3F" }}
                  label={t("Book Consultation")}
                />
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="lg:hidden w-full mt-8 rounded-[20px] overflow-hidden">
          <Image
            src="/exion-tech-768.png"
            alt={t("EXION technology")}
            width={1152}
            height={768}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="w-full overflow-hidden mt-6 -mb-4">
          <motion.p
            className="text-white font-berlingske text-[100px] min-[768px]:text-[250px] min-[1200px]:text-[417px] min-[1600px]:text-[567px] leading-none text-center whitespace-nowrap select-none"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {t("Exion")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}