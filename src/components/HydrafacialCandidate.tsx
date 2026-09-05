"use client";

import { useT } from "@/i18n/LanguageProvider";
import Image from "next/image";
import { FadeIn } from "./Animations";
import BookButton from "./BookButton";

export default function HydrafacialCandidate() {
  const t = useT();
  return (
    <section className="relative overflow-hidden rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 bg-[#CFD2D8]">
      <FadeIn as="div" y={30}>
        <h2 className="text-center text-white text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[100px] leading-tight font-berlingske font-normal px-2">
          {t("Who Benefits Most From HydraFacial Syndeo?")}
        </h2>
      </FadeIn>

      <div className="relative mt-10 lg:mt-70 xl:mt-50 2xl:mt-30">
        <div className="relative w-full w-full lg:w-[70%] xl:w-[50%] min-[1200px]:w-full h-auto mx-auto lg:-ml-[10%] xl:ml-[10%] 2xl:ml-[auto]">
          <Image
            src="/hydrafacial-candidate.png"
            alt={t("HydraFacial ideal candidate")}
            width={1600}
            height={941}
            className="size-full rounded-[30px] "
          />

          <div className="lg:absolute lg:right-0 lg:bottom-[25px] lg:translate-x-[70%] lg:z-20 relative w-full lg:w-auto mb-6 lg:mb-0">
            <FadeIn as="div" y={30}>
              <div className="bg-white/80 rounded-[30px] p-6 sm:p-10 w-full lg:w-[520px] backdrop-blur-sm">
                <div>
                  <h3 className="text-[#313242] font-bold text-[20px] min-[768px]:text-[32px] mb-8">
                    {t("Especially Ideal For:")}
                  </h3>
                  <p className="text-[#313242] font-bold text-[14px] min-[768px]:text-[18px] mb-3">
                    {t("Women 30–60")}
                  </p>
                  <p className="text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px] mb-8 leading-relaxed">
                    {t("Fine lines, dehydration, dullness, hormonal pigmentation — HydraFacial restores the luminosity that time and stress diminish.")}
                  </p>
                  <p className="text-[#313242] font-bold text-[14px] min-[768px]:text-[18px] mb-3">
                    {t("Men")}
                  </p>
                  <p className="text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px] leading-relaxed">
                    {t("Deep cleansing for congested, shaving-irritated skin with zero \"spa\" stigma. Fast, effective, and discreet")}
                  </p>
                  <BookButton className="mt-8" style={{ backgroundColor: "#B07E3F" }}>
                    {t("Book Consultation")}
                    </BookButton>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}