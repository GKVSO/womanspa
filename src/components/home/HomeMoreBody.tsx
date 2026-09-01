"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const cards = [
  {
    title: "Personalized Care",
    text: "Every recommendation\nis customized around your goals and lifestyle",
  },
  {
    title: "Natural-Looking Results",
    text: "Focused on refinement,\nbalance, and healthy-looking outcomes",
  },
  {
    title: "Luxury Clinical Environment",
    text: "Designed to feel private,\nelevated, and comfortable",
  },
  {
    title: "Wellness + Aesthetics Approach",
    text: "Beauty, confidence, wellness,\nand longevity work together",
  },
  {
    title: "Modern Non-Surgical Treatments",
    text: "Advanced treatments\nwithout aggressive recovery",
  },
  {
    title: "Long-Term Relationships",
    text: "Many clients continue treatments\nas part of ongoing wellness routines",
  },
];

function BenefitCard({ progress, card, index }: { progress: MotionValue<number>; card: (typeof cards)[number]; index: number }) {
  const t = useT();
  const start = index * 0.07;
  const end = Math.min(start + 0.1, 1);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);

  return (
    <motion.div style={{ opacity, y }} className="will-change-transform h-full">
      <div className="rounded-[30px] bg-white/80 p-6 sm:p-10 flex flex-col justify-between h-full min-[1600px]:min-h-[360px]">
        <p className="text-[#1F1D1B] font-normal text-[24px] font-berlingske">
          {String(index + 1).padStart(2, "0")}
        </p>
        <div>
          <p className="text-left text-[#1F1D1B] font-bold text-[16px] min-[768px]:text-[18px] min-[1200px]:text-[16px] min-[1600px]:text-[24px] leading-snug mb-4">
            {t(card.title)}
          </p>
          <p className="text-left text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[20px] leading-snug whitespace-pre-line">
            {t(card.text)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeMoreBody() {
  const t = useT();
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
    <section className="relative overflow-hidden rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-12 sm:pb-20 bg-[#CBA07D]">
      <motion.div ref={titleRef} style={{ opacity: titleOpacity, y: titleY }} className="will-change-transform">
        <h2 className="text-center text-white text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[92px] leading-tight font-berlingske font-normal px-2 sm:px-0">
          {t("A More Personalized,")}
          <br />
          {t("Elevated Experience")}
        </h2>
      </motion.div>

      <motion.div
        ref={deviceRef}
        style={{ opacity: deviceOpacity, y: deviceY }}
        className="relative z-10 -mt-4 min-[768px]:-mt-8 flex justify-center will-change-transform"
      >
        <Image
          src="/home-more-experience.png"
          alt={t("Elevated experience")}
          width={1928}
          height={1085}
          className="h-auto w-[90%] lg:w-[70%]"
        />
      </motion.div>

      <div ref={cardsRef} className="relative z-20 -mt-8 min-[768px]:-mt-[100px] w-full">
        <div
          className="absolute -inset-12 blur-[15px] bg-[#CBA07D] rounded-[60px]"
        />
        <div className="relative rounded-[40px]" style={{ backgroundColor: "#CBA07D" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {cards.map((card, i) => (
              <BenefitCard key={card.title} progress={smoothCards} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}