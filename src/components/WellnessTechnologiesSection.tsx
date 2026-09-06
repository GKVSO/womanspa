"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const technologies = [
  {
    id: 1,
    title: "Emsella for man and woman",
    description:
      "Stimulates thousands of supramaximal pelvic floor contractions in a single 28-minute session — painless, non-invasive, and powerful",
    image: "/wellness-emsella.webp",
    href: "/emsella",
  },
  {
    id: 2,
    title: "Emfemme",
    description:
      "Gently heats tissue to stimulate collagen, improve circulation, and restore tightness and sensitivity",
    image: "/wellness-emfemme.webp",
    href: "/candela-smoother",
  },
  {
    id: 3,
    title: "Femtouch",
    description:
      "Fractional CO2 laser for internal vaginal health. Restores moisture, improves tone, and reduces mild stress incontinence through collagen remodeling — without hormones",
    image: "/wellness-femtouch.webp",
    href: "/femtouch",
  },
];

export default function WellnessTechnologiesSection() {
  const t = useT();
  return (
    <FadeIn id="treatments" as="section" className="flex justify-center py-20">
      <div className="w-[92%] sm:w-[90%]">
        <StaggerContainer staggerDelay={0.1}>
          <StaggerItem className="w-full flex flex-col items-center justify-center">
            <h2 className="text-black text-[24px] min-[768px]:text-[36px] min-[1600px]:text-[48px] font-berlingske leading-tight text-center">
              {t("Wellness ultrasound")}
            </h2>
            <p className="hidden min-[768px]:block text-[16px] min-[1600px]:text-[18px] font-medium text-center mt-4">
              {t("Precision Technologies. Every Dimension Of Your Confidence")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="grid grid-cols-1 min-[1200px]:grid-cols-2 gap-6 mt-12">
              {technologies.map((tech) => (
                <motion.article
                  key={tech.id}
                  className="group relative bg-cover bg-center rounded-[20px] overflow-hidden p-8 aspect-[151/100] min-[1600px]:aspect-[151/130] flex flex-col justify-between"
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