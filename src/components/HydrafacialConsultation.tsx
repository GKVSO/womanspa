"use client";

import { useT } from "@/i18n/LanguageProvider";
import { btnHover } from "./Animations";
import BookButton from "./BookButton";

const struggleBullets = [
  "Congested pores and dull texture",
  "Dehydration beneath the surface that makeup can't hide",
  "Uneven tone and early pigmentation",
  "Fine lines that seem deeper by the week",
  "Breakouts and post-acne marks that linger too long",
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

export default function HydrafacialConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-10 sm:mb-20">
        {t("Your Skin Faces More Than You Realize - Every Single Day")}
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mb-8">
            {t("Miami's humidity, sun exposure, air conditioning, pollution, and stress create a constant cycle of:")}
          </p>
          <DotList items={struggleBullets} />
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 pt-6 sm:pt-10 px-6 sm:px-10 pb-6 sm:pb-10 flex flex-col">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug max-w-[680px]">
            {t("You've tried department store creams, random spa facials, and DIY routines - and yet your skin doesn't look or feel the way you want it to")}
          </p>

          <p className="text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[18px] mt-8 max-w-[600px] leading-relaxed">
            {t("It's not your fault. Most facials address only the surface. Real transformation requires technology that cleanses, extracts, and infuses at a level skincare alone cannot reach")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 items-start sm:items-center mt-8">
            <BookButton {...btnHover} className="bg-white text-black font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full min-[768px]:w-auto" label={t("Schedule Consultation")} />
          </div>
        </div>
      </div>
    </section>
  );
}
