"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const cards = [
  {
    title: "Skin and jawline look tighter",
    text: "Energy reaches target skin layers to help lax skin look firmer and the jawline look clearer in suitable candidates",
    position: "self-start",
  },
  {
    title: "Fine lines and texture improvement",
    text: "Collagen and elastin stimulation can help the skin look smoother, firmer, and more refined over time",
    position: "self-start mt-0 sm:mt-[340px]",
  },
  {
    title: "Results gradually become clearer",
    text: "Some people feel mild tightness immediately from collagen contraction, but clearer visible change usually develops over 1 to 6 months",
    position: "self-start",
  },
];

export default function XerfResults() {
  const t = useT();
  return (
    <section className="relative overflow-hidden rounded-b-[60px] bg-white px-5 sm:px-10 pt-14 sm:pt-24 pb-20 sm:pb-32">
      <FadeIn as="div" y={30}>
        <h2 className="text-center text-[#313242] text-[32px] sm:text-[48px] leading-tight font-berlingske font-normal mb-24">
          {t("What results can")}
          <br />
          {t("you expect after XERF?")}
        </h2>
      </FadeIn>

      <StaggerContainer staggerDelay={0.12} className="relative max-w-[1200px] mx-auto">
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
          {cards.map((card, i) => (
            <StaggerItem key={card.title}>
              <div className={`${card.position} relative z-10`}>
                <div className="rounded-[30px] p-6 sm:p-10 flex flex-col justify-between h-full min-h-[340px] min-[1600px]:min-h-[360px]"
                  style={{ backgroundColor: "rgba(203,160,125,0.8)" }}
                >
                  <p className="text-white font-normal text-[24px] font-berlingske">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="text-left text-white font-bold text-[24px] leading-snug mb-4">
                      {t(card.title)}
                    </p>
                    <p className="text-left text-white font-medium text-[20px] leading-snug">
                      {t(card.text)}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}

          <motion.div
            className="relative sm:absolute left-0 top-0 sm:left-1/2 sm:top-1/2 translate-x-0 translate-y-0 sm:-translate-x-1/2 sm:-translate-y-1/2 z-20 flex justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src="/xerf-results.webp"
              alt={t("XERF results")}
              width={420}
              height={560}
              className="h-[320px] sm:h-[520px] w-auto"
            />
          </motion.div>
        </div>
      </StaggerContainer>
    </section>
  );
}