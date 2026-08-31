"use client";

import { motion } from "framer-motion";
import { btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const struggleBullets = [
  "persistent abdominal fat",
  "bra bulges",
  "inner / outer thighs",
  "love handles",
  "back fat",
  "post-menopausal body changes",
  "fat pockets resistant to even disciplined routines",
];

function DotList(props: { items: string[] }) {
  const t = useT();
  return (
    <ul className="space-y-2.5">
      {props.items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F1D1B] flex-shrink-0 mt-[9px]" />
          {t(item)}
        </li>
      ))}
    </ul>
  );
}

export default function EmeraldConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-10 sm:mb-20">
        {t("Stubborn Fat That")}
        <br />
        {t("Doesn&apos;t Respond to Diet or Exercise")}
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mb-8">
            {t("Many high-performing men and women struggle with:")}
          </p>
          <DotList items={struggleBullets} />
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 p-6 sm:p-10">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug max-w-[680px]">
            {t("Emerald Laser uses 532nm low-level laser technology to target adipocytes through cold photobiomodulation — shrinking fat cells without thermal injury, no anesthesia, no compression, and zero recovery time.")}
          </p>

          <p className="text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px] mt-8 max-w-[600px]">
            {t("The body naturally clears the released lipids through the lymphatic system over the following weeks. Gentle. Luxury-grade. Medically sound.")}
          </p>

          <div className="flex flex-col gap-3 sm:gap-10 items-start mt-8">
            <motion.button {...btnHover} className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full min-[768px]:w-auto">
              {t("Schedule Consultation")}
            </motion.button>
            <img
              src="/emerald-device.webp"
              alt={t("Emerald Laser device")}
              className="hidden min-[768px]:block w-full h-auto object-contain rounded-[30px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
