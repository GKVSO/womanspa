"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "./Animations";
import BookButton from "./BookButton";

const bullets = [
  "low daily energy",
  "chronic fatigue",
  "brain fog",
  "slower recovery",
  "high stress lifestyles",
  "reduced mental focus",
  "healthy aging concerns",
];

export default function NadTherapyCandidates() {
  const t = useT();
  return (
    <section className="relative overflow-hidden rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24"
      style={{
        backgroundColor: "#CFD2D8",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <FadeIn as="div" y={30}>
        <h2 className="text-center text-white text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[100px] leading-tight font-berlingske font-normal">
          {t("Who NAD+")}
          <br />
          {t("Therapy Is Best Suited For")}
        </h2>
      </FadeIn>

      <div className="relative z-10 mt-8 lg:-mt-[150px] w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-[110%] -translate-y-[15%] z-20">
          <FadeIn as="div" y={30}>
            <div className="bg-white/80 rounded-[30px] p-6 sm:p-10 w-full sm:w-[620px] backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-6 lg:gap-10">
                <div>
                  <h3 className="text-[#313242] font-bold text-[20px] min-[768px]:text-[32px] mb-6">
                    {t("Especially Ideal For:")}
                  </h3>
                  <p className="text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px] mb-4">
                    {t("NAD+ Therapy may be ideal for individuals experiencing:")}
                  </p>
                  <ul className="space-y-2">
                    {bullets.map((item, i) => (
                      <motion.li
                        key={item}
                        className="flex items-start gap-3 text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px]"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: "#9A6D44" }} />
                        {t(item)}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <BookButton className="mt-6" style={{ backgroundColor: "#B07E3F" }}>
                  {t("Book Consultation")}
                </BookButton>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn as="div" y={30}>
          <Image
            src="/nad-candidate.png"
            alt={t("NAD+ ideal candidate")}
            width={2400}
            height={1350}
            className="w-full h-auto rounded-[30px]"
          />
        </FadeIn>
      </div>
    </section>
  );
}
