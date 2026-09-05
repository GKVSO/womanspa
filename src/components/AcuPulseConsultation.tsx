"use client";

import { motion } from "framer-motion";
import { btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const benefitsBullets = [
  "fine lines becoming more visible",
  "uneven texture",
  "dullness",
  "acne scars",
  "pigmentation",
];

function DotList({ items }: { items: string[] }) {
  const t = useT();
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F1D1B] flex-shrink-0 mt-[9px]" />
          {t(item)}
        </li>
      ))}
    </ul>
  );
}

export default function AcuPulseConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-10 sm:mb-20">
        {t("Your Skin Changes Over Time")}
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug mb-10">
            {t("Many women begin noticing:")}
          </p>
          <DotList items={benefitsBullets} />
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 p-6 sm:p-10">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug max-w-[680px]">
            {t("CO2 Laser Resurfacing stimulates collagen renewal and deeper skin regeneration to help the skin appear smoother, firmer, brighter, and more refined")}
          </p>

          <div className="flex flex-col gap-3 sm:gap-8 items-start mt-8">
            <motion.button {...btnHover} className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 mt-10 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full min-[768px]:w-auto">
              {t("Schedule Consultation")}
            </motion.button>
            <div className="w-full flex justify-end">
              <img
                src="/acupulse-consultation-device.png"
                alt={t("AcuPulse treatment")}
                className="hidden min-[768px]:block w-auto h-[300px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}