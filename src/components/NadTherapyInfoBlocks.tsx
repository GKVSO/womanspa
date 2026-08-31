"use client";

import { motion } from "framer-motion";
import { FadeIn, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT } from "@/i18n/LanguageProvider";

const signsList = [
  "Persistent fatigue",
  "Brain fog",
  "Muscle weakness/soreness",
  "Unexplained weight gain",
  "Trouble recovering after workouts",
  "Slower metabolism and aging",
  "Poor focus or memory",
  "Decreased athletic ability",
];

export default function NadTherapyInfoBlocks() {
  const t = useT();

  return (
    <section className="px-5 sm:px-10 py-16 sm:py-24 max-w-4xl mx-auto">
      <FadeIn as="div" y={30}>
        <h2 className="text-center text-[#313242] text-[28px] sm:text-[36px] lg:text-[44px] leading-tight font-berlingske font-normal mb-10">
          {t("Low Energy, Mental Fatigue")}
          <br />
          {t("& Slower Recovery Can Affect Everyday Life")}
        </h2>
      </FadeIn>

      <div className="flex flex-col gap-6">
        <FadeIn as="div" y={20} className="bg-[#F8F6F3] rounded-[30px] p-8 sm:p-12">
          <h3 className="text-[#313242] font-semibold text-[18px] sm:text-[20px] mb-6">
            {t("Signs you have energy issues:")}
          </h3>
          <ul className="space-y-3">
            {signsList.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-3 text-[#313242] text-[15px] sm:text-[16px]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-[#313242]" />
                {t(item)}
              </motion.li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn as="div" y={20} className="bg-[#F8F6F3] rounded-[30px] p-8 sm:p-12">
          <p className="text-[#313242] text-[16px] sm:text-[18px] leading-relaxed font-semibold">
            {t("NAD+ therapy is the proactive solution... always produced naturally by our body to replenish energy resources that decline with age. Now you can restore your body's essential vitality with a direct source that works instantly for real, lasting wellness.")}
          </p>
          <div className="mt-8 flex justify-start">
            <BookButton 
              className="w-full sm:w-auto border border-[#E5E5E5]"
              label={t("Book NAD+ Therapy")}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
