"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const technologies = [
  {
    id: 1,
    title: "Emsculpt NEO",
    description:
      "RF + High-Intensity Focused Electromagnetic energy for simultaneous fat reduction and muscle building",
    image: "/tech-emsculpt.webp",
    href: "/emsculpt-neo",
  },
  {
    id: 2,
    title: "ICOONE Laser Med",
    description:
      "Patented Roboderm Multi Micro Alveolar Stimulation for lymphatic drainage, cellulite refinement, and skin firming",
    image: "/tech-icoone.webp",
    href: "/icoone",
  },
  {
    id: 3,
    title: "Emerald Laser",
    description:
      "FDA-cleared cold 532nm laser for fat emulsification — zero heat, zero pain, zero downtime, BMI up to 40",
    image: "/tech-emerald.webp",
    href: "/emerald-laser",
  },
  {
    id: 4,
    title: "Endospheres Therapy",
    description:
      "Compressive microvibration to support circulation, fluid drainage, and tissue remodeling",
    image: "/tech-endospheres.png",
    href: "/endospheres",
  },
  {
    id: 5,
    title: "Exion",
    description:
      "Advanced RF with AI-driven energy delivery for fat reduction and skin tightening in one application",
    image: "/tech-exion.webp",
    href: "/exion",
  },
];

export default function TechnologiesSection() {
  const t = useT();
  return (
    <FadeIn as="section" className="flex justify-center py-20">
      <div className="w-[92%] sm:w-[90%]">
        <StaggerContainer staggerDelay={0.1}>
          <StaggerItem className="w-full flex justify-center">
            <h2 className="text-black text-[24px] min-[768px]:text-[36px] font-berlingske leading-tight text-center">
              {t("Five Technologies. Infinite Precision.")}
            </h2>
          </StaggerItem>

          <StaggerItem className="w-full flex justify-center">
            <p className="hidden min-[768px]:block text-[16px] font-medium mt-3 text-center max-w-3xl min-[1600px]:max-w-none min-[1600px]:whitespace-nowrap" style={{ color: "#1F1D1B" }}>
              {t("Explore our exclusive collection of body contouring technologies,")}
              <br className="min-[1600px]:hidden" />
              {t("each selected for a distinct role in body refinement.")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {technologies.map((tech) => (
                <motion.article
                  key={tech.id}
                  className="group relative bg-cover bg-center rounded-[20px] overflow-hidden p-8 aspect-[151/100] flex flex-col justify-between"
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
