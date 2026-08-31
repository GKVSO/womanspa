"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "./Animations";
import BookButton from "./BookButton";
import { useT } from "@/i18n/LanguageProvider";

const candidates = [
  "Aging",
  "Brain fog",
  "Chronic fatigue",
  "Muscle soreness",
  "Poor memory",
  "Slower metabolism",
  "Overall wellness",
];

export default function NadTherapyCandidates() {
  const t = useT();

  return (
    <section className="bg-[#CFD2D8] rounded-t-[60px] px-5 sm:px-10 pt-16 sm:pt-24 mt-10 overflow-hidden relative min-h-[700px]">
      <FadeIn as="div" y={30} className="relative z-20">
        <h2 className="text-center text-white text-[32px] sm:text-[40px] lg:text-[48px] leading-tight font-berlingske font-normal px-2">
          {t("Who NAD+")}
          <br />
          {t("Therapy Is Best Suited For")}
        </h2>
      </FadeIn>

      <div className="relative z-20 mt-10 sm:mt-16 max-w-6xl mx-auto">
        <FadeIn as="div" y={30}>
          <div className="bg-white rounded-[30px] p-8 sm:p-10 w-full sm:w-[450px] shadow-lg">
            <h3 className="text-[#313242] font-bold text-[20px] min-[768px]:text-[24px] mb-4">
              {t("Especially Ideal For")}
            </h3>
            <p className="text-[#313242]/70 font-medium text-[14px] mb-6">
              {t("NAD+ therapy is well-suited for individuals looking to address:")}
            </p>
            <ul className="space-y-2 mb-8">
              {candidates.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px]"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CBA07D]" />
                  {t(item)}
                </motion.li>
              ))}
            </ul>
            <BookButton className="w-full" style={{ backgroundColor: "#CBA07D" }} label={t("Book Consultation")} />
          </div>
        </FadeIn>
      </div>

      {/* Decorative Image */}
      <div className="absolute bottom-0 right-0 z-10 w-[80%] max-w-[900px] h-full pointer-events-none hidden md:block">
        <Image
          src="/acupulse-hero.webp" 
          alt="Woman relaxing"
          fill
          className="object-cover object-right-bottom mix-blend-multiply opacity-50"
        />
      </div>
    </section>
  );
}
