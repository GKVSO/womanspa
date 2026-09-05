"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StaggerContainer, StaggerItem, FadeIn } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const cards = [
  {
    title: "Microneedling",
    image: "/sylfirm-tech-ellipse-19.png",
    text: "Ultra-fine needles create controlled microchannels within the skin",
  },
  {
    title: "RF Energy",
    image: "/sylfirm-tech-ellipse-18.png",
    text: "Radiofrequency energy is delivered beneath the surface",
  },
  {
    title: "Collagen Support",
    image: "/sylfirm-tech-ellipse-18-1.png",
    text: "The skin activates natural collagen remodeling processes",
  },
];

function Divider() {
  return (
    <motion.div
      className="w-full h-px my-6 sm:my-8"
      style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}

export default function SylfirmTechnology() {
  const t = useT();
  return (
    <section className="relative overflow-hidden px-5 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 bg-[#F1F2F4]">
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
        <div className="flex-1 max-w-[620px]">
          <StaggerContainer staggerDelay={0.12}>
            <StaggerItem>
              <h2 className="text-[#313242] text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] leading-tight font-berlingske font-normal">
                {t("Precision RF Microneedling Explained Simply")}
              </h2>
            </StaggerItem>

            <StaggerItem>
              <Divider />
            </StaggerItem>

            <StaggerItem>
              <p className="text-[#313242] font-medium text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[16px] leading-relaxed max-w-[620px]">
                {t("SylfirmX uses ultra-fine microneedles combined with dual-wave radiofrequency energy to target multiple layers of the skin while supporting collagen production and overall skin renewal.")}
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[#313242] font-medium text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[16px] leading-relaxed mt-6 max-w-[620px]">
                {t("The treatment is designed to help improve redness, melasma, uneven skin tone, acne scars, skin texture, and early signs of aging through controlled skin remodeling and regeneration. Helps improve the appearance of surgical scars by supporting collagen renewal and smoother skin texture.")}
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <FadeIn as="div" y={30}>
            <Image
              src="/sylfirm-tech-main.png"
              alt={t("SylfirmX technology")}
              width={1338}
              height={1122}
              className="w-full max-w-[500px] h-auto object-contain"
            />
          </FadeIn>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 mt-12 sm:mt-16">
        {cards.map((card, i) => (
          <FadeIn as="div" key={card.title} y={30} delay={i * 0.1}>
            <motion.div
              className="rounded-[30px] p-6 sm:p-10 flex flex-col items-center h-full backdrop-blur-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.8)", minHeight: "300px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="text-[#1F1D1B] font-bold text-[16px] min-[768px]:text-[18px] min-[1200px]:text-[16px] min-[1600px]:text-[24px] leading-snug mb-8">
                {t(card.title)}
              </p>
              <img
                src={card.image}
                alt=""
                className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full mb-8 object-cover"
              />
              <p className="text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[20px] leading-snug text-center">
                {t(card.text)}
              </p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}