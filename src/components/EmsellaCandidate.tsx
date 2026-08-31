"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT } from "@/i18n/LanguageProvider";

const bullets = [
  "bladder leakage",
  "urgency or frequent urination",
  "weakened pelvic floor muscles",
  "postpartum pelvic changes",
  "menopause-related changes",
  "reduced pelvic strength",
];

export default function EmsellaCandidate() {
  const t = useT();
  return (
    <section className="relative overflow-hidden rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 bg-[#CFD2D8]">
      <FadeIn as="div" y={30}>
        <h2 className="text-center text-white text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[100px] leading-tight font-berlingske font-normal">
          {t("Emsella May Be Ideal")}
          <br />
          {t("If You Experience")}
        </h2>
      </FadeIn>

      <div className="relative z-20 mt-10 sm:mt-16 flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-0">
        <FadeIn as="div" y={30} className="lg:w-[620px]">
          <div className="bg-white/80 rounded-[30px] p-6 sm:p-10 w-full sm:w-[620px] backdrop-blur-sm">
            <div className="flex flex-col justify-between items-stretch gap-6 lg:gap-10">
              <div>
                <h3 className="text-[#313242] font-bold text-[20px] min-[768px]:text-[32px] mb-6">
                  {t("Ideal Candidate List")}
                </h3>
                <p className="text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px] mb-4">
                  {t("Emsella may be ideal for clients who want to improve:")}
                </p>
                <ul className="space-y-2">
                  {bullets.map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-start gap-3 text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px]"
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: "#9A6D44" }} />
                      {t(item)}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <BookButton className="mt-6" style={{ backgroundColor: "#B07E3F" }}>
                {t("Book Consultation")}
                </BookButton>
            </div>
          </div>
        </FadeIn>

        <FadeIn as="div" y={30} className="lg:flex-1 lg:-ml-24">
          <Image
            src="/emsella-candidate-new.png"
            alt={t("Emsella pelvic floor ideal candidate")}
            width={500}
            height={790}
            className="w-full lg:w-[560px] h-auto mx-auto lg:mx-0"
          />
        </FadeIn>
      </div>
    </section>
  );
}