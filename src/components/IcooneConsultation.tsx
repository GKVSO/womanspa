"use client";

import { useT } from "@/i18n/LanguageProvider";
import { btnHover } from "./Animations";
import BookButton from "./BookButton";

const primaryStruggle = [
  "fluid retention",
  "cellulite",
  "bloating",
  "heavy legs",
  "stubborn body texture",
];

const healthyHabits = ["work out", "eat well", "stay active"];

const commonFeelings = ["puffy", "less toned", "heavier in their body"];

const laserSupport = [
  "tissue regeneration",
  "collagen stimulation",
  "body contour refinement",
  "cellulite reduction",
  "skin firmness",
];

function DotList({ items, start }: { items: string[]; start?: number }) {
  const t = useT();
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-3 text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F1D1B] flex-shrink-0 mt-[9px]" />
          {t(item)}
        </li>
      ))}
    </ul>
  );
}

export default function IcooneConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-10 sm:mb-20">
        {t("Swelling, Puffiness & Cellulite Often Start Beneath The Surface")}
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1200px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mb-8">
            {t("Many clients struggle with:")}
          </p>
          <DotList items={primaryStruggle} />

          <p className="text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px] mt-12 mb-2">
            {t("Even healthy women who:")}
          </p>
          <DotList items={healthyHabits} />

          <p className="text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px] mt-12 mb-2">
            {t("Often still feel:")}
          </p>
          <DotList items={commonFeelings} />
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 p-6 sm:p-10">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1200px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug max-w-[680px]">
            {t("ICOONE uses patented Roboderm Multi Micro Alveolar Stimulation technology to mechanically stimulate connective tissue, circulation, and lymphatic flow with thousands of microstimulations per minute")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center mt-8 sm:mt-10">
            <div className="flex-1">
              <p className="text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px] mb-2">
                {t("Laser and LED integration help support:")}
              </p>
              <DotList items={laserSupport} />

              <BookButton {...btnHover} className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 mt-10 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full min-[768px]:w-auto"
                label={t("Schedule Consultation")}
              />
            </div>
            <img
              src="/icoone-robot.webp"
              alt={t("ICOONE Roboderm technology")}
              className="hidden min-[768px]:block w-full sm:w-[40%] h-auto object-contain rounded-[30px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}