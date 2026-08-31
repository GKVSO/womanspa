"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const processList = [
  { num: "01", title: "Increased cellular energy", desc: "You can fight chronic fatigue, low energy, and sluggishness." },
  { num: "02", title: "DNA Repair", desc: "Supports the body's natural DNA repair processes for cell health." },
  { num: "03", title: "Anti-aging support", desc: "Combats signs of aging at the cellular level for a youthful feeling." },
  { num: "04", title: "Energy Metabolism", desc: "Helps you feel more energized and improves nutrient conversion." },
];

export default function NadTherapyProcess() {
  const t = useT();

  return (
    <section className="px-5 sm:px-10 py-16 sm:py-24 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      <div className="flex-1 w-full">
        <FadeIn as="div" y={30}>
          <h2 className="text-[#313242] text-[28px] sm:text-[36px] lg:text-[44px] leading-tight font-berlingske font-normal mb-10">
            {t("How NAD+ Therapy")}
            <br />
            {t("Supports Cellular Function")}
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.15} className="space-y-6">
          {processList.map((item) => (
            <StaggerItem key={item.num} className="border-t border-[#E5E5E5] pt-6">
              <h4 className="text-[#CBA07D] font-semibold text-[14px] sm:text-[16px] mb-2">
                {item.num} - {t(item.title)}
              </h4>
              <p className="text-[#313242]/80 text-[14px] sm:text-[16px]">
                {t(item.desc)}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="flex-1 w-full flex justify-center lg:justify-end">
        <FadeIn as="div" y={30}>
          <div className="relative w-full max-w-[400px] h-[500px] bg-[#F8F6F3] rounded-[30px] p-6 flex items-center justify-center">
             <Image 
                src="/nad-iv-pole.png" 
                alt="NAD+ IV Pole" 
                width={300} 
                height={400} 
                className="w-auto h-full object-contain mix-blend-multiply"
              />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
