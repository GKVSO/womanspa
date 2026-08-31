"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const areas = [
  {
    label: "Eye area and forehead",
    text: "Helps fine lines and lax skin around the\n eye area and forehead look firmer",
    side: "left",
    position: "left-[20%] top-0",
    lineWidth: "330px",
  },
  {
    label: "Arms",
    text: "Helps improve the appearance of mild skin\n laxity and uneven skin texture on the upper arms",
    side: "left",
    position: "left-[20%] top-[20%]",
    lineWidth: "300px",
  },
  {
    label: "Thighs and knees",
    text: "Supports firmer-looking skin in the thigh and\n knee areas where mild laxity or uneven texture\n may be present",
    side: "left",
    position: "left-[20%] top-[50%]",
    lineWidth: "330px",
  },
  {
    label: "Neck, Lower Face And Jawline",
    text: "Helps tighten lax cheeks, soften heaviness\n near the nasolabial area, and make the jawline\n look clearer",
    side: "right",
    position: "right-[20%] top-[2%]",
    lineWidth: "345px",
  },
  {
    label: "Buttocks",
    text: "Supports smoother and firmer-looking\n skin in the buttock area by promoting collagen\n and elastin activity",
    side: "right",
    position: "right-[20%] top-[40%]",
    lineWidth: "360px",
  },
];

function MobileAreaDot({ area, index }: { area: (typeof areas)[number]; index: number }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={`absolute ${area.position} ${open ? "z-30" : "z-10"}`}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t(area.label)}
        className="w-10 h-10 rounded-full bg-[#9A6D44] text-white text-[24px] font-bold flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform "
      >
        +
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={`absolute top-1/2 -translate-y-1/2 ${area.side === "left" ? "left-12" : "right-12"} bg-white rounded-[16px] shadow-xl p-4 w-[240px] z-20`}
            initial={{ opacity: 0, x: area.side === "left" ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: area.side === "left" ? 10 : -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => setOpen(false)}
          >
            <p className="text-[#313242] font-semibold text-[16px] leading-snug">{t(area.label)}</p>
            <p className="text-[#313242] font-medium text-[14px] leading-snug mt-1 whitespace-pre-line">
              {t(area.text)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function XerfTreatmentAreas() {
  const t = useT();
  const desktopPosition = (pos: string) =>
    pos.replace("left-[20%]", "left-[2%]").replace("right-[20%]", "right-[2%]");
  return (
    <section className="relative overflow-hidden rounded-b-[60px] bg-white px-5 sm:px-10 pt-14 sm:pt-24 pb-20 sm:pb-32">
      <FadeIn as="div" y={30}>
        <h2 className="text-center text-[#313242] text-[32px] sm:text-[48px] leading-tight font-berlingske font-normal mb-6">
          {t("Which areas can XERF treat?")}
        </h2>
        <p className="text-center text-[#313242] font-medium text-[16px] mb-16">
          {t("Common treatment areas include:")}
        </p>
      </FadeIn>

      <div className="relative max-w-[900px] mx-auto h-[700px]">
        <Image
          src="/emsculpt-areas-model.webp"
          alt={t("XERF treatment areas")}
          width={500}
          height={900}
          className="h-full w-auto mx-auto"
        />

        {/* Mobile: plus buttons only */}
        <div className="lg:hidden">
          {areas.map((area, i) => (
            <MobileAreaDot key={area.label} area={area} index={i} />
          ))}
        </div>

        {/* Desktop: labels with lines */}
        <div className="hidden lg:block">
          {areas.map((area, i) => (
            <motion.div
              key={area.label}
              className={`absolute ${desktopPosition(area.position)} flex flex-col`}
              initial={{ opacity: 0, x: area.side === "left" ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {area.side === "left" ? (
                <>
                  <div className="flex items-start gap-3 max-w-[320px]">
                    <div>
                      <p className="text-[#313242] font-semibold text-[16px] whitespace-pre-line">
                        {t(area.label)}
                      </p>
                      <p className="text-[#313242] font-medium text-[14px] leading-snug mt-1 whitespace-pre-line">
                        {t(area.text)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span
                      className="h-px bg-[#9A6D44]"
                      style={{ width: area.lineWidth }}
                    />
                    <span className="w-2 h-2 rounded-full bg-[#9A6D44]" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-end gap-3 max-w-[380px] flex-col">
                    <div className="text-right">
                      <p className="text-[#313242] font-semibold text-[16px] whitespace-pre-line">
                        {t(area.label)}
                      </p>
                      <p className="text-[#313242] font-medium text-[14px] leading-snug mt-1 whitespace-pre-line">
                        {t(area.text)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3 justify-end">
                    <span className="w-2 h-2 rounded-full bg-[#9A6D44]" />
                    <span
                      className="h-px bg-[#9A6D44]"
                      style={{ width: area.lineWidth }}
                    />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
