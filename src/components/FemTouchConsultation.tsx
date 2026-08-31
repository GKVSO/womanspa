"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const symptoms = [
  "Vaginal dryness that makes intimacy uncomfortable or painful",
  "A subtle loss of tightness and tone",
  "Occasional urinary leakage when laughing, coughing, or exercising",
  "Decreased sensitivity and diminished sexual satisfaction",
  "Recurrent irritation or infections",
];

function DotList(props: { items: string[] }) {
  const t = useT();
  return (
    <ul className="space-y-2.5">
      {props.items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9A6D44] flex-shrink-0 mt-[9px]" />
          {t(item)}
        </li>
      ))}
    </ul>
  );
}

export default function FemTouchConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <FadeIn as="div" y={30}>
        <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-4 sm:mb-6">
          {t("Some Changes Are Rarely")}
          <br />
          {t("Spoken About &mdash; But Deeply Felt")}
        </h2>
      </FadeIn>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16 mt-10 lg:mt-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug mb-6">
            {t("Childbirth, hormonal shifts, menopause, and even the natural passage of time can silently affect your most intimate wellbeing. You may have noticed:")}
          </p>
          <DotList items={symptoms} />
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 p-8 sm:p-14 flex flex-col">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug mb-6">
            {t("At WO/MAN Luxe MedSpa, we believe you deserve better. FemTouch exists precisely for the conversation most women never get to have - and for results that can quietly, powerfully transform your daily quality of life")}
          </p>

          <div className="mt-auto pt-10">
            <motion.button
              {...btnHover}
              className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full min-[768px]:w-auto "
      >
              {t("Schedule Consultation")}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}