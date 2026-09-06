"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import BookButton from "./BookButton";
import { useT } from "@/i18n/LanguageProvider";

function ConsultationImage({ className = "" }: { className?: string }) {
  const t = useT();
  return (
    <motion.div
      className={`relative w-full overflow-hidden ${className}`}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Image
        src="/exion-consultation.webp"
        alt={t("EXION treatment")}
        fill
        sizes="50vw"
        className="object-cover"
        priority
      />
    </motion.div>
  );
}

export default function ExionConsultation() {
  const t = useT();
  return (
    <section className="relative overflow-hidden flex flex-col lg:flex-row rounded-b-[60px]" style={{ backgroundColor: "#F1F2F4" }}>
      <div className="flex-1 px-5 sm:px-10 py-16 sm:py-20">
        <FadeIn as="div" className="max-w-[1440px] mx-auto" y={30}>
          <StaggerContainer staggerDelay={0.1}>
            <StaggerItem>
              <h2 className="text-black text-[24px] min-[768px]:text-[36px] min-[1600px]:text-[48px] font-berlingske leading-tight mb-6 sm:mb-8 whitespace-pre-line">
                {t("Your Skin Can Still Look\nHealthy, Firm & Refined")}
              </h2>
            </StaggerItem>

            <StaggerItem>
              <motion.p
                className="text-[16px] mb-8"
                style={{ color: "#1F1D1B", fontWeight: 500 }}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {t("Over time, collagen production naturally slows down.")}
              </motion.p>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="w-full h-px mb-8"
                style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </StaggerItem>

            <StaggerItem className="min-[768px]:hidden">
              <ConsultationImage className="min-h-[320px] rounded-[20px] mb-8" />
            </StaggerItem>

            <StaggerItem>
              <p className="text-black font-semibold text-[16px] min-[1600px]:text-[18px] mb-4">
                {t("Beautiful skin is rarely about perfection. Usually, it's about:")}
              </p>
              <ul className="space-y-2 mb-8">
                {["more dense", "firm", "even", "fresh and radiant"].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-black font-semibold text-[16px]"
                    style={{ opacity: 0.9 }}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 0.9, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: "#9A6D44" }} />
                    {t(item)}
                  </motion.li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="w-full h-px mb-8"
                style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </StaggerItem>

            <StaggerItem>
              <motion.p
                className="text-[16px] mb-8"
                style={{ color: "#1F1D1B", fontWeight: 500 }}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {t("EXION is designed to stimulate collagen and improve overall skin quality using advanced non-invasive technology.")}
              </motion.p>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="w-full h-px mb-8"
                style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="text-[18px] min-[1600px]:text-[20px]"
                style={{ color: "#1F1D1B", fontWeight: 600 }}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {t("EXION helps stimulate collagen and improve skin quality without surgery.")}
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8">
                <BookButton
                  className="whitespace-nowrap cursor-pointer text-white font-bold text-[14px] rounded-[10px] px-8 py-4"
                  style={{ backgroundColor: "#B07E3F" }}
                  label={t("Book Consultation")}
                />
              </div>
            </StaggerItem>
          </StaggerContainer>

          <div className="hidden min-[768px]:block lg:hidden mt-8">
            <ConsultationImage className="min-h-[480px] rounded-[30px]" />
          </div>
        </FadeIn>
      </div>

      <div className="hidden lg:block relative w-full lg:w-1/2 min-h-[480px]">
        <ConsultationImage className="h-full" />
      </div>
    </section>
  );
}