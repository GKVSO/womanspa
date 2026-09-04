"use client";

import { useT } from "@/i18n/LanguageProvider";
import BookButton from "./BookButton";

const struggleBullets = [
  "Daily or weekly hair removal routines that feel never-ending",
  "Ingrown hairs, irritation, and post-shave breakouts",
  "Darker skin tones being told “laser isn’t safe for you”",
  "Avoiding the beach, the gym, or intimacy because of stubble",
  "Discomfort during treatments that made you quit early",
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

export default function PrimelaseConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-white rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-40">
      <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske text-center mb-10 sm:mb-20 whitespace-pre-line">
        {t("Unwanted Hair Shouldn't \n Steal Your Time Or Confidence")}
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-16">
        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] p-8 sm:p-14">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mb-8">
            {t("Shaving, waxing, ingrown hairs, razor burn, constant maintenance — for high-performing men and women, it&apos;s an invisible drain on time and self-assurance")}
          </p>
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske mb-8">
            {t("You&apos;ve likely experienced:")}
          </p>
          <DotList items={struggleBullets} />
        </div>

        <div className="flex-1 bg-[#F4F1E7] rounded-[40px] sm:rounded-[60px] mt-0 lg:mt-32 pt-6 sm:pt-10 px-6 sm:px-10 pb-0 flex flex-col">
          <p className="text-[#1F1D1B] text-[18px] min-[768px]:text-[24px] min-[1600px]:text-[32px] font-berlingske leading-snug max-w-[680px]">
            {t("Most laser technologies force a trade-off: speed vs comfort, efficacy vs safety on darker skin. We reject that compromise. Primelase was engineered to solve all of it — at the speed your schedule demands")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 items-start sm:items-center mt-8">
            <BookButton style={{ backgroundColor: "#fff", color: "#000" }} className="w-full sm:w-auto px-6 py-3 rounded-[10px] font-bold text-[14px]" label={t("Schedule Consultation")} />
          </div>

          <div className="mt-auto flex justify-center">
            <img
              src="/primelase-consultation.webp"
              alt={t("Primelase hair removal")}
              className="w-full sm:w-[70%] h-auto rounded-[30px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
