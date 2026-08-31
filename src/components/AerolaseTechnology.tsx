"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const items = [
  {
    title: "The target (melanin, bacteria, vessels) is heated precisely",
    text: "",
  },
  {
    title: "Surrounding skin stays cool and protected",
    text: "",
  },
  {
    title: "Treatments are comfortable without numbing",
    text: "",
  },
  {
    title: "All skin types can be treated safely",
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

export default function AerolaseTechnology() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 bg-[#ECEDEE]  min-[1200px]:bg-cover min-[1200px]:bg-no-repeat min-[1200px]:bg-[position:center] min-[1200px]:bg-[url(/aerolase-tech-bg.webp)] min-[1200px]:bg-contain min-[1200px]:bg-no-repeat min-[1200px]:bg-[position:right_center]"
      >
      <div className="flex flex-col">
        <StaggerContainer staggerDelay={0.12} className="max-w-[760px]">
          <StaggerItem>
            <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal">
              {t("The 650-Microsecond Revolution: Speed Makes It Safe")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[#1F1D1B] font-medium text-[16px] sm:text-[18px] mt-6 max-w-[600px] leading-relaxed">
              {t("Conventional lasers fire in milliseconds, allowing heat to spread to surrounding tissue — causing pain, redness, and risk of complications. Aerolase Neo&apos;s patented 650-microsecond pulse duration delivers energy faster than the thermal relaxation time of the skin, meaning:")}
            </p>
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
            <div className="mt-10">
              <img
                src="/aerolase-tech-device.png"
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
