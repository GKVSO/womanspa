"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const faqs = [
  {
    question: "01. How long do IV Therapy sessions take?",
    answer: "Most IV therapy sessions take around 30-60 minutes, depending on the type of infusion and how quickly it is administered. Your provider can give you a more precise estimate before treatment.",
  },
  {
    question: "02. Is IV Therapy painful?",
    answer: "IV therapy usually involves only a brief pinch when the IV is inserted. Once the IV is in place, the treatment itself should not be painful, although some people may experience mild discomfort at the insertion site.",
  },
  {
    question: "03. How often should I get IV Therapy?",
    answer: "There is no single schedule that works for everyone. The appropriate frequency depends on your health goals, the type of IV treatment and your individual needs. A healthcare professional should determine whether repeat sessions are appropriate.",
  },
  {
    question: "04. Can IV Therapy support energy and recovery?",
    answer: "IV therapy can quickly deliver fluids and nutrients into the bloodstream. This may be useful when hydration or specific nutrient replacement is needed. However, evidence for IV vitamin therapy as a general wellness or energy treatment remains limited, so benefits depend on the individual and the treatment provided.",
  },
  {
    question: "05. Is there downtime?",
    answer: "IV therapy generally does not require a recovery period. Most people can return to their normal activities after the infusion, depending on how they feel and what was administered. Your provider may recommend specific precautions based on your treatment.",
  },
];

export default function IvTherapyFAQ() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-white px-5 sm:px-10 py-16 sm:py-20">
      <FadeIn as="div" y={30}>
        <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal text-center">
          {t("IV Therapy Questions Clients Often Ask")}
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
