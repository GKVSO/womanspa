"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useT, useLanguage } from "@/i18n/LanguageProvider";
import { ml, toLang, sv } from "@/lib/i18n-helpers";

const cards = [
  {
    title: "Instant Visible Glow",
    text: "Your skin looks brighter, smoother, and more hydrated immediately after the treatment. No redness, no recovery time — just radiance",
  },
  {
    title: "Deep Cleansing + Gentle Extraction",
    text: "Patented vortex suction clears pores and removes debris without the pain and trauma of manual extractions",
  },
  {
    title: "Intensive Hydration",
    text: "Simultaneous infusion of hyaluronic acid, antioxidants, and peptides restores hydration at the dermal level",
  },
  {
    title: "Fully Customizable",
    text: "Syndeo technology allows your provider to tailor each step with targeted boosters — addressing pigmentation, aging, acne, or sensitivity",
  },
  {
    title: "No Downtime, No Irritation",
    text: "Unlike chemical peels or lasers, HydraFacial is non-invasive and suitable even on sensitive skin.",
  },
];

function BenefitCard({ progress, card, index, cmsItem, lang }: { progress: MotionValue<number>; card: (typeof cards)[number]; index: number; cmsItem?: Record<string, unknown>; lang: "en"|"ru"|"es" }) {
  const t = useT();
  const start = index * 0.07;
  const end = Math.min(start + 0.1, 1);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);
  const title = cmsItem ? (ml(cmsItem.title, lang) || t(card.title)) : t(card.title);
  const text = cmsItem ? (ml(cmsItem.text, lang) || t(card.text)) : t(card.text);

  return (
    <motion.div style={{ opacity, y }} className="will-change-transform h-full">
      <div className="rounded-[30px] bg-white/80 p-6 sm:p-10 flex flex-col justify-between h-full min-[1600px]:min-h-[360px]">
        <p className="text-[#1F1D1B] font-normal text-[24px] font-berlingske">
          {String(index + 1).padStart(2, "0")}
        </p>
        <div>
          <p className="text-left text-[#1F1D1B] font-bold text-[16px] min-[768px]:text-[18px] min-[1200px]:text-[16px] min-[1600px]:text-[24px] leading-snug mb-4">
            {t(title)}
          </p>
          <p className="text-left text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[20px] leading-snug">
            {t(text)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HydrafacialBenefits({ cms, editing }: { cms?: Record<string, unknown>; editing?: boolean }) {
  const t = useT();
  const { lang: ctxLang } = useLanguage();
  const lang = toLang(ctxLang);
  const cmsTitle = cms ? ml(cms.title, lang) : "";
  const cmsItems = cms && Array.isArray(cms.items) ? cms.items as Record<string, unknown>[] : null;
  const e = (type: string, label: string) => editing ? { "data-edit-type": type, "data-edit-label": label } as Record<string, string> : {};
  const cmsImage = cms ? sv(cms.image) : "";
  const titleRef = useRef(null);
  const deviceRef = useRef(null);
  const cardsRef = useRef(null);

  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    offset: ["start 0.95", "start 0.55"],
  });
  const { scrollYProgress: deviceProgress } = useScroll({
    target: deviceRef,
    offset: ["start 0.9", "start 0.45"],
  });
  const { scrollYProgress: cardsProgress } = useScroll({
    target: cardsRef,
    offset: ["start 0.85", "start 0.15"],
  });

  const spring = { stiffness: 55, damping: 25, mass: 0.6 };

  const smoothTitle = useSpring(titleProgress, spring);
  const smoothDevice = useSpring(deviceProgress, spring);
  const smoothCards = useSpring(cardsProgress, spring);

  const titleOpacity = useTransform(smoothTitle, [0, 1], [0, 1]);
  const titleY = useTransform(smoothTitle, [0, 1], [40, 0]);
  const deviceOpacity = useTransform(smoothDevice, [0, 1], [0, 1]);
  const deviceY = useTransform(smoothDevice, [0, 1], [60, 0]);

  return (
    <section
      {...e("section","benefits")}
      className={`relative overflow-hidden rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-12 sm:pb-20 ${editing ? "cursor-pointer hover:ring-2 hover:ring-white" : ""}`}
      style={{
        backgroundColor: "#CBA07D",
                backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div ref={titleRef} style={{ opacity: titleOpacity, y: titleY }} className="will-change-transform">
        <h2 {...e("text","benefits_title")} className={`text-center text-white text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[92px] leading-tight font-berlingske font-normal ${editing ? "cursor-pointer hover:ring-2 hover:ring-white" : ""}`}>
          {cmsTitle ? t(cmsTitle) : <>{t("The HydraFacial")}
          <br />
          {t("Syndeo Difference")}</>}
        </h2>
      </motion.div>

      <motion.div
        ref={deviceRef}
        style={{ opacity: deviceOpacity, y: deviceY }}
        className="relative z-10 -mt-4 min-[768px]:-mt-8 flex justify-center will-change-transform "
      >
        <Image
          src={cmsImage || "/hydrafacial-benefits.webp"}
          alt={t("HydraFacial Syndeo")}
          width={800}
          height={500}
          className="h-full w-full"
        />
      </motion.div>

      <div ref={cardsRef} className="relative z-20 -mt-8 min-[768px]:-mt-[100px] w-full">
        <div
          className="absolute -inset-8 rounded-[60px]"
          style={{ backgroundColor: "#CBA07D", filter: "blur(10px)", opacity: 0.9 }}
        />
        <div className="relative rounded-[40px]" style={{ backgroundColor: "#CBA07D" }}>
          <div {...e("card","benefits_items")} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 ${editing ? "cursor-pointer hover:ring-2 hover:ring-white" : ""}`}>
            {cards.map((card, i) => (
              <BenefitCard key={card.title} progress={smoothCards} card={card} index={i} cmsItem={cmsItems?.[i]} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}