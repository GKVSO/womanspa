"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const faqs = [
  {
    question: "Is there downtime?",
    answer:
      "FemTouch requires little to no downtime. Most women can return to their normal daily activities immediately after the treatment. Your provider may recommend avoiding sexual activity for a short period after the procedure to allow the tissue to recover.",
  },
  {
    question: "Is FemTouch safe for women who’ve had a hysterectomy?",
    answer:
      "FemTouch may be suitable for women who have had a hysterectomy, depending on their individual health history and condition. A consultation with a qualified provider is recommended to determine if the treatment is right for you.",
  },
  {
    question: "Can FemTouch be combined with Emsella or Emfemme 360?",
    answer:
      "Yes. FemTouch can be combined with other women’s wellness treatments such as Emsella or EMFEMME 360. These treatments address different aspects of intimate health and may complement each other as part of a personalized wellness plan.",
  },
  {
    question: "Will my partner feel the difference?",
    answer:
      "Many women report improvements in comfort, tissue quality, and confidence after FemTouch treatments. Some women also notice positive changes in intimacy, but individual results may vary.",
  },
];

export default function FemTouchFAQ() {
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
          {t("Femtouch Questions")}
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