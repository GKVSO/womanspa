"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const items = [
  {
    title: "01 \u2013 Personalized Assessment",
    text: "We discuss your lifestyle, wellness goals, and recovery concerns",
  },
  {
    title: "02 \u2013 NAD+ Administration",
    text: "Treatment protocols are customized around your needs",
  },
  {
    title: "03 \u2013 Cellular Support",
    text: "Clients relax comfortably during treatment in a luxury wellness setting",
  },
  {
    title: "04 \u2013 Progressive Wellness",
    text: "Hydration and nutrient support help optimize recovery and overall wellness",
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

export default function NadTherapyProcess() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 bg-[#F2F2F2] rounded-b-[60px] bg-cover bg-right min-[1200px]:bg-center bg-[url(/nad-process-bg.png)] bg-no-repeat">
      <div className="flex flex-col">
        <StaggerContainer staggerDelay={0.12} className="max-w-[760px]">
          <StaggerItem>
            <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal">
              {t("How NAD+ Therapy")}
              <br />
              {t("Supports Cellular Function")}
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
                {i < items.length - 1 ? <Divider /> : <div className="h-px my-5 sm:my-8" />}
              </StaggerItem>
            </Fragment>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
