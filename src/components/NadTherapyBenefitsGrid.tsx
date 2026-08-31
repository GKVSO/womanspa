"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const benefits = [
  { num: "01", title: "Cellular Energy production", desc: "Experience a natural boost in energy metabolism and cellular productivity." },
  { num: "02", title: "Healthy Aging support", desc: "Helps support cell vitality and protection for a more youthful you." },
  { num: "03", title: "Mental Clarity & Focus", desc: "Clear away brain fog and optimize cognitive function for sharper focus." },
  { num: "04", title: "Athletic Performance", desc: "Supports better endurance, stamina, and overall physical performance." },
  { num: "05", title: "Workout recovery", desc: "Accelerate your body's ability to heal and recover after intense workouts." },
  { num: "06", title: "Overall vitality", desc: "Enhance your body's general wellness and everyday vitality." },
];

export default function NadTherapyBenefitsGrid() {
  const t = useT();

  return (
    <section className="bg-[#CBA07D] rounded-[60px] px-5 sm:px-10 py-16 sm:py-24 my-10 max-w-6xl mx-auto">
      <FadeIn as="div" y={30}>
        <h2 className="text-center text-white text-[32px] sm:text-[40px] lg:text-[48px] leading-tight font-berlingske font-normal mb-12">
          {t("More Than")}
          <br />
          {t("Energy Support")}
        </h2>
      </FadeIn>

      <div className="flex justify-center mb-16 relative">
        <FadeIn as="div" y={20}>
          <div className="w-[180px] sm:w-[220px] mx-auto bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Image 
              src="/nad-bag.png" 
              alt="NAD+ IV Bag" 
              width={220} 
              height={300} 
              className="w-full h-auto drop-shadow-xl"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </FadeIn>
      </div>

      <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {benefits.map((b) => (
          <StaggerItem key={b.num}>
            <div className="bg-[#F8F6F3] rounded-[20px] p-6 h-full flex flex-col">
              <span className="text-[#313242] text-[16px] mb-2">{b.num}</span>
              <h4 className="text-[#313242] font-bold text-[18px] mb-2 uppercase tracking-wide">{t(b.title)}</h4>
              <p className="text-[#313242]/80 text-[14px] leading-relaxed">
                {t(b.desc)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
