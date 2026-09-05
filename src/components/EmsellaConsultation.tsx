"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import { btnHover } from "./Animations";

const struggleBullets = [
  "leaking when laughing or exercising",
  "constantly searching for bathrooms",
  "avoiding long drives or workouts",
  "wearing pads \u201cjust in case\u201d",
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

export default function EmsellaConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-10 sm:mb-20 whitespace-pre-line">
        {t("You Shouldn&apos;t Have To Think \n About Your Bladder Every Day")}
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] pt-8 sm:pt-14 px-8 sm:px-14 pb-0 flex flex-col">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mb-8">
            {t("Many women quietly deal with:")}
          </p>
          <DotList items={struggleBullets} />
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mt-8 whitespace-pre-line">
            {t("And most never \n talk about it!")}
          </p>
          <div className="mt-auto pt-10 flex justify-center">
            <img
              src="/emsella-struggle.webp"
              alt={t("Frustrated woman dealing with bladder concerns")}
              className="w-full sm:w-[70%] h-auto rounded-[30px] object-contain"
            />
          </div>
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 pt-6 sm:pt-10 px-6 sm:px-10 pb-0 flex flex-col">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug max-w-[680px]">
            {t("Emsella uses HIFEM technology")}
            {t("to strengthen the pelvic floor through")}
            {t("thousands of muscle contractions during")}
            {t("a completely non-invasive treatment session")}
          </p>

          <div className="mt-8">
            <DotList items={[
                t("No surgery"), 
                t("No downtime"), 
                t("No recovery"), 
                t("Fully clothed treatment"), 
                t("Pelvic floor strengthening")
              ]} />
          </div>

          <div className="mt-8">
            <motion.button {...btnHover} className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full min-[768px]:w-auto">
              {t("Schedule Private Consultation")}
            </motion.button>
          </div>

          <div className="mt-auto flex justify-center">
            <img
              src="/emsella-treatment.webp"
              alt={t("Emsella pelvic floor treatment")}
              className="w-full sm:w-[70%] h-auto rounded-[30px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}