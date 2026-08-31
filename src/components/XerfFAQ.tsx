"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const faqs = [
  {
    question: "Does XERF hurt?",
    answer:
      "XERF is designed to be comfortable. Wave Fit Pulse creates a stable, balanced thermal profile, and the ICD cryogen cooling keeps the skin protected throughout, providing a warm, pain-free Never-Numb experience.",
  },
  {
    question: "What technology does XERF use?",
    answer:
      "XERF is the world's first monopolar RF device to combine 6.78 MHz and 2 MHz frequencies in one handpiece. Real-time impedance feedback adapts energy delivery to your skin for precise, personalized treatment.",
  },
  {
    question: "When will I see XERF results?",
    answer:
      "Some people feel mild tightness immediately from collagen contraction, but clearer visible change usually develops gradually over 1 to 6 months as collagen remodeling continues.",
  },
  {
    question: "How long do XERF results last?",
    answer:
      "XERF stimulates long-term collagen and elastin production. Results are progressive and long-lasting, with many clients maintaining them through periodic touch-up sessions.",
  },
  {
    question: "Which areas can XERF treat?",
    answer:
      "XERF treats the eye area and forehead, arms, thighs and knees, neck, lower face and jawline, and the buttocks - helping tighten lax skin and improve texture across these areas.",
  },
  {
    question: "Is downtime required after XERF?",
    answer:
      "No. XERF involves no needles, no numbing, and no downtime. You can return to your life immediately after each session, which typically lasts 15 to 30 minutes.",
  },
];

export default function XerfFAQ() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="relative overflow-hidden bg-white px-5 sm:px-10 py-16 sm:py-20"
      style={{
                backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FadeIn as="div" y={30}>
        <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal text-center">
          {t("XERF Questions Clients Often Ask")}
        </h2>
      </FadeIn>

      <div className="max-w-[920px] mx-auto mt-8 sm:mt-14 space-y-3 sm:space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <FadeIn as="div" key={faq.question} y={20}>
              <div className="rounded-[20px] p-5 sm:p-6 transition-colors" style={{ backgroundColor: "#F8F7F5" }}>
                <motion.button
                  className="w-full flex items-center justify-between gap-6 cursor-pointer text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[#313242] font-medium text-[16px] min-[768px]:text-[20px]">
                    {t(faq.question)}
                  </span>
                  <motion.span
                    className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-white flex items-center justify-center"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.3334 0H8.66673V16H7.3334V0Z" fill="#B07E3F" />
                      <path d="M0 7.33348H16V8.66681H0V7.33348Z" fill="#B07E3F" />
                    </svg>
                  </motion.span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden "
      >
                      <p className="text-[#313242] font-medium text-[14px] min-[768px]:text-[16px] leading-relaxed mt-4 sm:mt-5 pr-8 sm:pr-12">
                        {t(faq.answer)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}