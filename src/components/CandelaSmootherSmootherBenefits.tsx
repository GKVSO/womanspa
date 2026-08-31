"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useT } from "@/i18n/LanguageProvider";

const cards = [
  {
    title: "Fine Lines & Wrinkles",
    image: "/CandelaSmootherSmoother-ellipse-1.png",
    text: "Supports smoother,\nyounger-looking skin texture",
  },
  {
    title: "Skin Firmness",
    image: "/CandelaSmootherSmoother-ellipse-2.png",
    text: "Helps improve visible\nskin laxity and elasticity",
  },
  {
    title: "Enlarged Pores",
    image: "/CandelaSmootherSmoother-ellipse-3.png",
    text: "Supports refined\nlooking skin texture",
  },
  {
    title: "Acne Scars & Texture",
    image: "/CandelaSmootherSmoother-ellipse-4.png",
    text: "Designed to improve\nuneven texture and skin quality",
  },
  {
    title: "Dull Skin",
    image: "/CandelaSmootherSmoother-ellipse-5.png",
    text: "Supports brighter,\nhealthier-looking skin overall",
  },
  {
    title: "Collagen Support",
    image: "/CandelaSmootherSmoother-ellipse-6.png",
    text: "Stimulates natural regenerative\nprocesses beneath the skin",
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
      <div className="rounded-[30px] bg-white/80 p-10 flex flex-col items-center h-full">
        <p className="text-center text-[#1F1D1B] font-bold text-[16px] min-[768px]:text-[18px] min-[1200px]:text-[16px] min-[1600px]:text-[24px] leading-snug mb-8">
          {t(card.title)}
        </p>
        <img
          src={card.image}
          alt=""
          className="w-[140px] h-[140px] rounded-full mb-8"
        />
        <p className="text-center text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[20px] leading-snug whitespace-pre-line">
          {t(card.text)}
        </p>
      </div>
    </motion.div>
  );
}

export default function CandelaSmootherSmootherBenefits() {
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
    <section
      className="relative overflow-hidden rounded-b-[60px] px-10 pt-24 pb-20"
      style={{
        backgroundColor: "#CBA07D",
                backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div ref={titleRef} style={{ opacity: titleOpacity, y: titleY }} className="will-change-transform">
        <h2 className="text-center text-white text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[92px] leading-tight font-berlingske font-normal">
          {t("One Treatment.")}
          <br />
          {t("Multiple Skin Concerns")}
        </h2>
      </motion.div>

      <motion.div
        ref={deviceRef}
        style={{ opacity: deviceOpacity, y: deviceY }}
        className="relative z-10 -mt-4 min-[768px]:-mt-12 min-[1200px]:-mt-16 min-[1600px]:-mt-20 flex justify-center will-change-transform "
      >
        <Image
          src="/CandelaSmootherSmoother-benefits.png"
          alt={t("CandelaSmootherSmootherX results")}
          width={779}
          height={1341}
          className="h-full w-full"
        />
      </motion.div>

      <div
        ref={cardsRef}
        className="relative z-20 -mt-12 min-[768px]:-mt-24 min-[1200px]:-mt-[120px] min-[1600px]:-mt-[140px] w-full "
      >
        <div
          className="absolute -inset-8 rounded-[60px]"
          style={{ backgroundColor: "#CBA07D", filter: "blur(10px)", opacity: 0.9 }}
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
