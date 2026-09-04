"use client";

import { useLanguage, useT } from "@/i18n/LanguageProvider";
import { ml, sv, toLang } from "@/lib/i18n-helpers";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const cards = [
  {
    title: "Bladder Control Support",
    image: "/emsella-ellipse-1.webp",
    text: "Helps strengthen pelvic floor\nmuscles associated with urinary control",
  },
  {
    title: "Pelvic Floor Strength",
    image: "/emsella-ellipse-2.webp",
    text: "Supports deeper muscle\nengagement beyond traditional Kegel exercises",
  },
  {
    title: "Postpartum Recovery Support",
    image: "/emsella-ellipse-3.webp",
    text: "Popular among women\nafter pregnancy and childbirth",
  },
  {
    title: "Menopause-Related Changes",
    image: "/emsella-ellipse-4.webp",
    text: "Supports pelvic wellness\nduring hormonal transitions",
  },
  {
    title: "Intimate Wellness Support",
    image: "/emsella-ellipse-5.webp",
    text: "Supports improved pelvic strength,\noverall feminine wellness and sensation",
  },
  {
    title: "Non-Invasive Treatment",
    image: "/emsella-ellipse-6.webp",
    text: "No surgery, anesthesia,\nrecovery, or downtime required",
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
  const image = cmsItem && sv(cmsItem.image) ? String(sv(cmsItem.image)) : card.image;

  return (
    <motion.div style={{ opacity, y }} className="will-change-transform h-full">
      <div className="rounded-[30px] bg-white/80 p-6 sm:p-10 flex flex-col items-center h-full">
        <p className="text-center text-[#1F1D1B] font-bold text-[16px] min-[768px]:text-[18px] min-[1200px]:text-[16px] min-[1600px]:text-[24px] leading-snug mb-8">
          {t(title)}
        </p>
        <img
          src={image}
          alt=""
          className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full mb-8"
        />
        <p className="text-center text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[20px] leading-snug whitespace-pre-line">
          {t(text)}
        </p>
      </div>
    </motion.div>
  );
}

export default function EmsellaBenefits({ cms, editing }: { cms?: Record<string, unknown>; editing?: boolean }) {
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
        <h2 {...e("text","benefits_title")} className={`text-center text-white text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[92px] leading-tight font-berlingske font-normal px-2 sm:px-0 ${editing ? "cursor-pointer hover:ring-2 hover:ring-white" : ""}`}>
          {cmsTitle ? t(cmsTitle) : <>{t("Designed To Support Pelvic")}
          <br />
          {t("Health, Comfort &amp; Confidence")}</>}
        </h2>
      </motion.div>

      <motion.div
        ref={deviceRef}
        style={{ opacity: deviceOpacity, y: deviceY }}
        className="relative z-10 -mt-4 min-[768px]:-mt-8 flex justify-center will-change-transform "
      >
        <Image
          src={cmsImage || "/emsella-main.png"}
          alt={t("BTL Emsella")}
          width={860}
          height={848}
          quality={100}
          className="w-full max-w-[860px] h-auto object-contain"
        />
      </motion.div>

      <div ref={cardsRef} className="relative z-20 -mt-8 min-[768px]:-mt-[100px] w-full">
        <div
          className="absolute -inset-15 blur-[25px] bg-[#CBA07D] rounded-[60px]"
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