"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "./Animations";
import BookButton from "./BookButton";

const bullets = [
  "localized stubborn fat",
  "active, wellness-oriented lifestyle",
  "preference for non-invasive solutions",
  "post-menopausal body changes",
  "desire for subtle, natural-looking refinement",
];

export default function EmeraldCandidate() {
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
        <h2 className="text-center text-white text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[100px] leading-tight font-berlingske font-normal px-2">
          {t("For Discerning Clients Who Expect Measurable Results")}
        </h2>
      </FadeIn>

      <div className="relative z-20 mt-12 lg:mt-48 mx-auto lg:mr-[unset] w-full sm:w-fit">
        <FadeIn as="div" y={30}>
          <div className="bg-white/80 rounded-[30px] p-6 sm:p-10 w-full sm:w-[620px] backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-6 lg:gap-10">
              <div>
                <h3 className="text-[#313242] font-bold text-[20px] min-[768px]:text-[32px] mb-6">
                  {t("Ideal Candidate List")}
                </h3>
                <p className="text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px] mb-4">
                  {t("Ideal candidates include individuals with:")}
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
              <BookButton className="mt-6 whitespace-nowrap" style={{ backgroundColor: "#B07E3F" }} label={t("Book Consultation")} />
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="relative z-10 mt-8 lg:-mt-[500px] w-full">
        <FadeIn as="div" y={30}>
          <Image
            src="/emerald-candidate.webp"
            alt={t("Emerald Laser ideal candidate")}
            width={2400}
            height={1350}
            className="w-full h-auto rounded-[30px]"
          />
        </FadeIn>
      </div>
    </section>
  );
}