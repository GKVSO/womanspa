"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const areas = [
  { label: "Arms", side: "left", position: "left-[20%] top-[25%]", w768: "190px", wFull: "280px" },
  { label: "Thighs", side: "left", position: "left-[20%] bottom-[33%]", w768: "204px", wFull: "300px" },
  { label: "Abdomen / Core", side: "right", position: "right-[20%] top-[40%]", w768: "190px", wFull: "280px" },
  { label: "Glutes", side: "right", position: "right-[20%] top-[46%]", w768: "218px", wFull: "320px" },
];

function MobileAreaDot({ area, index }: { area: (typeof areas)[number]; index: number }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={`absolute ${area.position} z-10`}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t(area.label)}
        className="w-10 h-10 rounded-full bg-[#9A6D44] text-white text-[24px] font-bold flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
      >
        +
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={`absolute top-1/2 -translate-y-1/2 ${area.side === "left" ? "left-12" : "right-12"} bg-white rounded-[16px] shadow-xl px-4 py-3 w-auto z-20`}
            initial={{ opacity: 0, x: area.side === "left" ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: area.side === "left" ? 10 : -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => setOpen(false)}
          >
            <p className="text-[#313242] font-semibold text-[16px] whitespace-nowrap">{t(area.label)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EmsculptTreatmentAreas() {
  const t = useT();
  const desktopPosition = (pos: string) =>
    pos.replace("left-[20%]", "left-[2%]").replace("right-[20%]", "right-[2%]");
  return (
    <section className="relative overflow-hidden rounded-b-[60px] bg-white px-5 sm:px-10 pt-14 sm:pt-24 pb-20 sm:pb-32">
      <FadeIn as="div" y={30}>
        <h2 className="text-center text-[#313242] text-[32px] sm:text-[48px] leading-tight font-berlingske font-normal mb-6">
          {t("Common EMSculpt Neo Treatment Areas")}
        </h2>
        <p className="text-center text-[#313242] font-medium text-[16px] mb-16">
          {t("Common treatment areas include:")}
        </p>
      </FadeIn>

      <div className="relative max-w-[900px] mx-auto h-[700px]">
        <Image
          src="/emsculpt-areas-model.webp"
          alt={t("EMSculpt Neo treatment areas")}
          width={500}
          height={900}
          className="h-full w-auto mx-auto"
        />

        {/* Mobile: plus buttons only (below 768) */}
        <div className="min-[768px]:hidden">
          {areas.map((area, i) => (
            <MobileAreaDot key={area.label} area={area} index={i} />
          ))}
        </div>

        {/* 768+: labels with lines */}
        <div className="hidden min-[768px]:block">
          {areas.map((area, i) => (
            <motion.div
              key={area.label}
              className={`absolute ${desktopPosition(area.position)} flex items-center gap-3`}
              initial={{ opacity: 0, x: area.side === "left" ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {area.side === "left" ? (
                <>
                  <span className="text-[#313242] font-medium text-[16px] whitespace-nowrap">
                    {t(area.label)}
                  </span>
                  <span
                    className="h-px bg-[#9A6D44] w-[var(--line-w)] min-[1200px]:w-[var(--line-w-full)]"
                    style={{ ["--line-w" as string]: area.w768, ["--line-w-full" as string]: area.wFull }}
                  />
                  <span className="w-2 h-2 rounded-full bg-[#9A6D44]" />
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#9A6D44]" />
                  <span
                    className="h-px bg-[#9A6D44] w-[var(--line-w)] min-[1200px]:w-[var(--line-w-full)]"
                    style={{ ["--line-w" as string]: area.w768, ["--line-w-full" as string]: area.wFull }}
                  />
                  <span className="text-[#313242] font-medium text-[16px] whitespace-nowrap">
                    {t(area.label)}
                  </span>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
