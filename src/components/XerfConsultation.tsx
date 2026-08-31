"use client";

import { motion } from "framer-motion";
import { btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const concerns = [
  "Skin that feels looser, less resilient",
  "Jawline definition that is softening",
  "Fine lines that have settled into your lower face and neck",
  "A tired look that no amount of sleep erases",
  "Uneven skin texture and early signs of laxity",
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

export default function XerfConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-10 sm:mb-20">
        {t("Your Skin")}
        <br />
        {t("Changes Over Time")}
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[22px] sm:text-[28px] font-berlingske leading-snug mb-8">
            {t("You may have tried creams, serums,")}
            <br />
            {t("even traditional RF treatments")}
          </p>

          <p className="text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px] mb-6">
            {t("Yet still notice:")}
          </p>
          <DotList items={concerns} />

          <p className="text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px] leading-relaxed mt-8">
            {t("Most non-invasive tightening options feel either too subtle, too\nuncomfortable, or require needles and hours of numbing. And many\nRF devices use only one frequency, limiting how deep the energy can go")}
          </p>
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 px-6 sm:px-10 pt-6 sm:pt-10 pb-0 flex flex-col">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug max-w-[680px]">
            {t("At WO/MAN Luxe MedSpa,")}
            <br />
            {t("we believe you deserve more")}
          </p>

          <p className="text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px] leading-relaxed mt-6">
            {t("XERF was engineered to deliver structural change - deep, personalized,\nand needle-free - without asking you to sacrifice comfort or recovery time.")}
          </p>

          <motion.button
            {...btnHover}
            className="self-start w-full min-[768px]:w-auto bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 mt-8 mb-8 min-[768px]:mb-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            {t("Schedule Consultation")}
          </motion.button>

          <div className="flex justify-center min-[768px]:mt-auto">
            <img
              src="/xerf-consultation.webp"
              alt={t("XERF treatment")}
              className="hidden min-[768px]:block w-full h-auto sm:h-[300px] sm:w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
