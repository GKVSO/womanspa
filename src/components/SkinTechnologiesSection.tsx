"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const technologies = [
  {
    id: 1,
    title: "Sylfirm X RF Microneedling",
    description:
      "RF + High-Intensity Focused Electromagnetic energy for simultaneous fat reduction and muscle building",
    image: "/skin-sylfirmx.webp",
    href: "/sylfirmx",
  },
  {
    id: 2,
    title: "Xerf",
    description:
      "XERF delivers thermal energy precisely into the shallow, middle, and deep layers of your skin - stimulating collagen, tightening laxity, and refining contours",
    image: "/skin-xerf.webp",
    href: "/xerf",
  },
  {
    id: 3,
    title: "AcuPulse CO₂ Laser",
    description:
      "Ablative fractional CO2 laser - the gold standard for dramatic resurfacing, deep wrinkle reduction, and scar revision in a single treatment",
    image: "/skin-acupulse.webp",
    href: "/acupulse",
  },
  {
    id: 4,
    title: "HydraFacial Syndeo",
    description:
      "Technology delivers deep cleansing, gentle extraction, and intensive hydration in a single 30-minute treatment",
    image: "/skin-hydrafacial.webp",
    href: "/hydrafacial",
  },
  {
    id: 5,
    title: "AerolaSe Neo",
    description:
      "A revolutionary, single-platform solution that treats acne, clears pigmentation, reduces redness, stimulates collagen",
    image: "/skin-aerolase.webp",
    href: "/aerolase",
  },
  {
    id: 6,
    title: "Candela Matrix",
    description:
      "A next-generation RF skin renewal treatment designed to support collagen remodeling, improve texture, refine pores",
    image: "/skin-candela.webp",
    href: "/candela-matrix",
  },
];

export default function SkinTechnologiesSection() {
  const t = useT();
  return (
    <FadeIn id="treatments" as="section" className="flex justify-center py-20">
      <div className="w-[92%] sm:w-[90%]">
        <StaggerContainer staggerDelay={0.1}>
          <StaggerItem className="w-full flex justify-center">
            <h2 className="text-black text-[24px] min-[768px]:text-[36px] min-[1600px]:text-[48px] font-berlingske leading-tight text-center whitespace-pre-line">
              {t("Six Technologies. Every\nLayer Of Skin Transformation")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
              {technologies.map((tech) => (
                <motion.article
                  key={tech.id}
                  className="group relative bg-cover bg-center rounded-[20px] overflow-hidden px-4 sm:px-8 py-8 aspect-[151/100] flex flex-col justify-between"
                  style={{ backgroundImage: `url(${tech.image})` }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div>
                    <h3 className="text-white font-berlingske text-[16px] min-[768px]:text-[24px] min-[1200px]:text-[18px] min-[1600px]:text-[32px] leading-tight">
                      {t(tech.title)}
                    </h3>
                    <p className="text-white text-[12px] min-[768px]:text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[20px] font-medium leading-snug mt-3 max-w-md" style={{ opacity: 0.9 }}>
                      {t(tech.description)}
                    </p>
                  </div>

                  <Link href={tech.href} className="self-start mt-6">
                    <motion.button
                      {...btnHover}
                      className="bg-[#CBA07D] text-white font-bold text-[12px] min-[768px]:text-[14px] rounded-[10px] px-10 py-4 cursor-pointer "
      >
                      {t("Explore More")}
                    </motion.button>
                  </Link>
                </motion.article>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </FadeIn>
  );
}
