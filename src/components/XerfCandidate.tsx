"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "./Animations";
import BookButton from "./BookButton";

const bullets = [
  "Have mild to moderate skin laxity",
  "Want to tighten the jawline, cheeks, under-chin area, or neck",
  "Want skin-quality and fine-line support along with lifting",
  "Are concerned about pain from some lifting devices",
  "Want a non-surgical option that generally requires no downtime",
];

export default function XerfCandidate() {
  const t = useT();
  return (
    <section className="relative overflow-hidden rounded-b-[60px] px-5 sm:px-10 pt-5 sm:pt-24"
      style={{
        backgroundColor: "#CFD2D8",
                backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <FadeIn as="div" y={30}>
        <h2 className="text-center text-white text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[100px] leading-tight font-berlingske font-normal">
          {t("Who is XERF")}
          <br />
          {t("suitable for?")}
        </h2>
      </FadeIn>

      <div className="relative mt-10 sm:mt-16">
        <Image
          src="/xerf-candidate.webp"
          alt={t("Xerf ideal candidate")}
          width={2400}
          height={1350}
          className="w-full sm:w-[50%] h-auto rounded-[30px] lg:-mb-5 mx-auto"
        />

        <div className="lg:absolute lg:right-0 lg:bottom-[25px] lg:z-20 lg:mt-0 -mt-10 relative w-full lg:w-auto mb-6 lg:mb-0">
          <FadeIn as="div" y={30}>
            <div className="bg-white/80 rounded-[30px] p-6 sm:p-10 w-full sm:w-[620px] lg:w-[520px] backdrop-blur-sm">
              <div>
                <h3 className="text-[#313242] font-bold text-[20px] min-[768px]:text-[32px] mb-6">
                  {t("Ideal Candidate List")}
                </h3>
                <p className="text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px] mb-4">
                  {t("XERF may be ideal for clients who want to improve:")}
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
                <BookButton className="mt-8" style={{ backgroundColor: "#B07E3F" }}>
                  {t("Book Consultation")}
                  </BookButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}