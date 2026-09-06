"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT } from "@/i18n/LanguageProvider";

export default function FemTouchCandidate() {
  const t = useT();
  return (
    <section className="relative overflow-hidden rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 bg-[#CFD2D8]">
      <FadeIn as="div" y={30}>
        <h2 className="text-center text-white text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[100px] leading-tight font-berlingske font-normal whitespace-pre-line">
          {t("Who Benefits Most\nFrom FemTouch?")}
        </h2>
      </FadeIn>

      <div className="relative z-20 mt-10 sm:mt-16">
        <Image
          src="/femtouch-candidate.png"
          alt={t("FemTouch ideal candidate")}
          width={1600}
          height={900}
          className="hidden lg:block w-full h-auto mx-auto"
        />
        <div className="lg:absolute lg:left-0 lg:bottom-20 lg:w-[520px] lg:flex-shrink-0 relative">
          <FadeIn as="div" y={30}>
            <div className="bg-white/80 rounded-[30px] p-6 sm:p-10 w-full backdrop-blur-sm">
              <div className="flex flex-col justify-between items-stretch gap-6 lg:gap-10">
                <div>
                  <h3 className="text-[#313242] font-bold text-[20px] min-[768px]:text-[32px] mb-6">
                    {t("Especially Ideal For:")}
                  </h3>
                  <p className="text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px] mb-8 leading-relaxed">
                    {t("FemTouch is designed for women who want to restore their intimate health without surgery, hormones, or prolonged recovery.")}
                  </p>

                  <p className="text-[#313242] font-bold text-[14px] min-[768px]:text-[18px] mb-3">
                    {t("Postpartum Women (even years after childbirth)")}
                  </p>
                  <p className="text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px] mb-8 leading-relaxed">
                    {t("Vaginal laxity, episiotomy scars, mild stress incontinence — restored through collagen regeneration.")}
                  </p>

                  <p className="text-[#313242] font-bold text-[14px] min-[768px]:text-[18px] mb-3">
                    {t("Perimenopausal &amp; Menopausal Women")}
                  </p>
                  <p className="text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px] leading-relaxed">
                    {t("Declining estrogen leads to vaginal atrophy, dryness, and painful intercourse. FemTouch provides a non-hormonal solution")}
                  </p>
                </div>

                <BookButton className="mt-6 whitespace-nowrap" style={{ backgroundColor: "#B07E3F" }} label={t("Book Consultation")} />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="relative z-10 mt-8 lg:hidden w-full">
        <Image
          src="/femtouch-candidate.png"
          alt={t("FemTouch ideal candidate")}
          width={1600}
          height={900}
          className="w-full h-auto rounded-[30px]"
        />
      </div>
    </section>
  );
}