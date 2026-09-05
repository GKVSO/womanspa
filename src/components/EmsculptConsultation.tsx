"use client";

import { useT } from "@/i18n/LanguageProvider";
import { btnHover } from "./Animations";
import BookButton from "./BookButton";

const struggleBullets = [
  "stubborn areas of fat",
  "lack of muscle definition",
  "weakened core strength",
  "slower metabolism",
  "difficulty maintaining tone",
  "areas that feel resistant to workouts",
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

export default function EmsculptConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-10 sm:mb-20">
        {t("Some Areas Don't Change - Even With Diet & Exercise")}
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mb-8">
            {t("Many clients live healthy lifestyles, work out consistently, and still struggle with:")}
          </p>
          <DotList items={struggleBullets} />
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 p-6 sm:p-10">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug max-w-[680px]">
            {t("EMSculpt Neo combines muscle stimulation and radiofrequency technology to help support body sculpting and muscle definition without surgery.")}
          </p>

          <div className="flex flex-col gap-3 sm:gap-10 items-start mt-8">
            <BookButton {...btnHover} className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full min-[768px]:w-auto" 
              label={t("Schedule Consultation")}
            />
            <img
              src="/emsculpt-device.webp"
              alt={t("EMSculpt Neo device")}
              className="hidden min-[768px]:block w-full h-auto object-contain rounded-[30px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
