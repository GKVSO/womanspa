"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { StaggerContainer, StaggerItem, FadeIn, btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const items = [
  {
    num: "01",
    title: "Gentle RF Energy Delivery",
    text: "EMFEMME 360 delivers controlled radiofrequency\nenergy comfortably and non-invasively to targeted tissue",
  },
  {
    num: "02",
    title: "Natural Regenerative Response",
    text: "The gentle thermal energy helps stimulate the body's\nnatural regenerative and collagen-supporting processes",
  },
  {
    num: "03",
    title: "Collagen & Tissue Support",
    text: "As collagen remodeling occurs, tissue support, circulation,\nand overall feminine wellness may improve over time",
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

export default function CandelaSmootherTechnology() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-0 bg-[#F2F1F3] lg: lg:bg-contain lg:bg-no-repeat lg:bg-center bg-[url(/candela-smoother-tech-bg.webp)]"
      >
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 flex-1 items-stretch lg:justify-between">
          <StaggerContainer staggerDelay={0.12} className="max-w-[760px]">
            <StaggerItem>
              <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal">
                {t("Gentle Technology Designed")}
                <br />
                {t("Around Feminine Wellness")}
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
                      {item.num} - {t(item.title)}
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
                {t("EMFEMME 360 uses gentle radiofrequency energy to")}
                <br />
                {t("support feminine wellness, comfort, and intimate")}
                <br />
                {t("confidence through a painless, non-invasive experience")}
              </p>
              <motion.button
                {...btnHover}
                className="text-white font-bold text-[14px] rounded-[10px] px-8 py-4 mt-10 w-full min-[768px]:w-auto cursor-pointer"
                style={{ backgroundColor: "#B07E3F" }}
              >
                {t("Schedule Consultation")}
              </motion.button>
            </div>
          </FadeIn>
        </div>

        <div className="lg:hidden w-full mt-8 rounded-[20px] overflow-hidden">
          <Image
            src="/candela-smoother-tech-768.png"
            alt={t("EMFEMME 360 technology")}
            width={768}
            height={583}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="w-full overflow-hidden mt-6 -mb-4">
          <motion.p
            className="text-white font-berlingske text-[50px] min-[768px]:text-[100px] min-[1200px]:text-[180px] min-[1600px]:text-[250px] leading-none text-center whitespace-nowrap select-none"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {t("Efemme 360")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}