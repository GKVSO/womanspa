"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import { btnHover } from "./Animations";

const struggleBullets = [
  "Stubborn acne that leaves marks long after breakouts heal",
  "Sunspots and melasma that don’t respond to creams",
  "Diffuse redness and rosacea flares that erode confidence",
  "Early fine lines and dull texture despite a disciplined regimen",
  "Unwanted hair that keeps you in a cycle of shaving and waxing",
  "Being told your skin type isn’t “suitable” for certain lasers",
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

export default function AerolaseConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-10 sm:mb-20">
        {t("Your Skin Deserves A Solution That Doesn't Create New Problems")}
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mb-8">
            {t("Most lasers demand a trade-off: treat acne but aggravate sensitive skin; target pigmentation but risk hyperpigmentation on deeper tones")}
          </p>
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mb-8">
            {t("You may have experienced:")}
          </p>
          <DotList items={struggleBullets} />
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 p-6 sm:p-10">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug max-w-[680px]">
            {t("Aerolase Neo was engineered precisely to eliminate every single one of them - in a single device, for every skin tone")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 items-start sm:items-center mt-8">
            <motion.button {...btnHover} className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full min-[768px]:w-auto">
              {t("Book Consultation")}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
