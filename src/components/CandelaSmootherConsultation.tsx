
"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT } from "@/i18n/LanguageProvider";

const focus = ["Comfort", "Feminine wellness", "Confidence", "Quality of life", "Private care"];

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

export default function CandelaSmootherConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <FadeIn as="div" y={30}>
        <p className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-4 sm:mb-6">
          {t("This Isn't About Aesthetic Perfection. It's About Feeling Comfortable In Your Body Again")}
        </p>
      </FadeIn>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16 mt-10 lg:mt-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug mb-6">
            {t("For many women, intimate wellness changes slowly over time")}
          </p>
          <p className="text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px] mb-6">
            {t("After childbirth, hormonal shifts, stress or aging many begin feeling less confident, disconnected from their femininity, less comfortable, frustrated talking about intimate concerns")}
          </p>
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 p-8 sm:p-14 flex flex-col">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug mb-6">
            {t("EMFEMME 360 is designed as a discreet, non-surgical wellness treatment focused on:")}
          </p>
          <DotList items={focus} />

          <div className="mt-auto pt-10">
            <BookButton className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full min-[768px]:w-auto whitespace-nowrap" label={t("Book Private Consultation")} />
          </div>
        </div>
      </div>
    </section>
  );
}
