"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const faqs = [
  {
    question: "01. What is NAD+ Therapy?",
    answer: "NAD+ (Nicotinamide Adenine Dinucleotide) is a naturally occurring coenzyme found in all living cells. It plays a key role in energy production, DNA repair, and cellular function. NAD+ Therapy involves delivering this essential coenzyme directly into the bloodstream for optimal absorption.",
  },
  {
    question: "02. What are the potential benefits?",
    answer: "While individual experiences vary, many clients report feeling increased daily energy, improved mental clarity, and faster recovery after intense schedules or workouts. NAD+ is designed to support the body’s natural metabolic and cellular repair processes.",
  },
  {
    question: "03. How long does a session take?",
    answer: "A typical NAD+ IV drip takes between 2 to 4 hours, depending on the dosage and individual tolerance. During the session, clients relax in our comfortable wellness space.",
  },
  {
    question: "04. Will I feel results immediately?",
    answer: "Some clients notice a boost in energy and mental clarity shortly after their first session, while others may feel the effects more gradually over the following days. Results often compound with multiple sessions.",
  },
  {
    question: "05. Who is a good candidate for NAD+?",
    answer: "NAD+ Therapy is often chosen by individuals experiencing chronic fatigue, brain fog, high stress, or those looking to support their overall wellness and healthy aging. However, it is not for everyone. Our medical team conducts a thorough assessment before any treatment to ensure it is appropriate for you.",
  },
];

export default function NadTherapyFAQ() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-white px-5 sm:px-10 py-16 sm:py-20">
      <FadeIn as="div" y={30}>
        <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal text-center">
          {t("NAD+ Therapy Questions Clients Often Ask")}
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
                      <path d="M7.3334 0H8.66673V16H7.3334V0Z" fill="#CBA07D" />
                      <path d="M0 7.33348H16V8.66681H0V7.33348Z" fill="#CBA07D" />
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
                      className="overflow-hidden"
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
