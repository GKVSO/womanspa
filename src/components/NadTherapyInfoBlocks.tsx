"use client";

import { motion } from "framer-motion";
import { btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const signsList = [
  "persistent fatigue",
  "brain fog",
  "low energy",
  "slower workout recovery",
  "reduced mental clarity",
  "signs of accelerated aging",
  "increased daily stress",
  "decreased overall vitality",
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

export default function NadTherapyInfoBlocks() {
  const t = useT();

  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-10 sm:mb-20">
        {t("Low Energy, Mental Fatigue")}
        <br />
        {t("& Slower Recovery Can Affect Everyday Life")}
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1200px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mb-8">
            {t("Many clients experience:")}
          </p>
          <DotList items={signsList} />
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 p-6 sm:p-10">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1200px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug max-w-[680px]">
            {t("NAD+ therapy is designed to help restore cellular energy production by supporting essential metabolic processes that naturally decline with age. Personalized treatment plans may help improve energy, cognitive function, recovery, and overall wellness")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center mt-8 sm:mt-10">
            <div className="flex-1">
              <motion.button {...btnHover} className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full min-[768px]:w-auto">
                {t("Schedule Consultation")}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
