"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT } from "@/i18n/LanguageProvider";

const bullets = [
  "texture",
  "fine lines",
  "poresize",
  "dullness",
  "skin firmness",
  "acne scars",
];

export default function CandelaIdealCandidate() {
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
          {t("Ideal For Clients Focused On Long-Term Skin Quality")}
        </h2>
      </FadeIn>

      <div className="relative z-20 mt-10 sm:mt-16 flex items-end gap-10">
        <FadeIn as="div" y={30}>
          <div className="bg-white/80 rounded-[30px] p-6 sm:p-10 w-full sm:w-[620px] backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-6 lg:gap-10">
              <div>
                <h3 className="text-[#313242] font-bold text-[20px] min-[768px]:text-[32px] mb-6">
                  {t("Ideal Candidate List")}
                </h3>
                                <p className="text-[#313242] font-semibold text-[14px] min-[768px]:text-[16px] mb-4">
                  {t("Candela Matrix may be ideal for clients who want to improve:")}
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

      <div className="relative z-10 mt-8 lg:-mt-[500px] w-full">
        <FadeIn as="div" y={30}>
          <Image
            src="/candela-candidate.webp"
            alt={t("Candela Matrix ideal candidate")}
            width={2400}
            height={1350}
            className="w-full sm:w-[25%] h-auto rounded-[30px] mx-auto"
          />
        </FadeIn>
      </div>

      <FadeIn as="div" className="lg:absolute lg:right-[120px] lg:bottom-[140px] lg:z-20 relative w-full lg:w-auto mt-6 lg:mt-0" y={30} delay={0.15}>
        <div
          className="rounded-[30px] p-8 w-full lg:w-[540px] h-auto lg:h-[340px] flex flex-col justify-between"
          style={{ backgroundColor: "rgba(176, 126, 63, 0.8)" }}
        >
          <img src="/sylfirm-frame.svg" alt="" className="w-12 h-12" />
          <p className="text-white font-bold text-[20px] leading-relaxed">
            {t("Especially popular among clients wanting visible rejuvenation without aggressive surgery or extended recovery")}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
