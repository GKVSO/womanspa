"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StaggerContainer, StaggerItem, FadeIn } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

export default function CandelaCandidate() {
  const t = useT();
  return (
    <section
      className="relative overflow-hidden px-5 sm:px-10 pt-16 sm:pt-20 pb-0"
      style={{
        backgroundColor: "#F1F2F4",
                backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <StaggerContainer staggerDelay={0.12} className="max-w-[760px]">
        <StaggerItem>
          <h2 className="text-white text-[32px] sm:text-[48px] leading-tight font-berlingske font-normal">
            {t("Muscle Stimulation &amp; RF")}
            <br />
            {t("Technology Working Together")}
          </h2>
        </StaggerItem>

        <StaggerItem>
          <motion.div
            className="w-full h-px mt-8"
            style={{ background: "linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)" }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </StaggerItem>

        <StaggerItem>
          <img
            src="/candela-group-40575.svg"
            alt=""
            className="w-16 h-16 mt-8"
          />
        </StaggerItem>

        <StaggerItem>
          <p className="text-white font-medium text-[15px] sm:text-[18px] leading-relaxed mt-6 max-w-[700px]">
            {t("Candela Matrix combines multiple RF technologies designed to target")}
            <br />
            {t("different layers of the skin within a personalized treatment approach")}
          </p>
        </StaggerItem>

        <StaggerItem>
          <motion.div
            className="w-full h-px mt-8"
            style={{ background: "linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)" }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </StaggerItem>

        <StaggerItem>
          <img
            src="/candela-group-40576.svg"
            alt=""
            className="w-16 h-16 mt-8"
          />
        </StaggerItem>

        <StaggerItem>
          <p className="text-white font-medium text-[15px] sm:text-[18px] leading-relaxed mt-6 max-w-[700px]">
            {t("The treatment stimulates collagen production while supporting")}
            <br />
            {t("smoother texture, firmer skin, and healthier overall skin quality")}
          </p>
        </StaggerItem>
      </StaggerContainer>

      <div className="flex justify-end mt-8 sm:mt-12">
        <FadeIn as="div" y={30}>
          <motion.div className="bg-white/80 rounded-t-[30px] w-full sm:w-[620px] p-6 sm:p-10 backdrop-blur-sm">
            <p className="text-[#313242] font-berlingske text-[24px] sm:text-[32px] leading-tight">
              {t("RF Microneedling")}
            </p>
            <div className="flex justify-center items-center py-10">
              <Image
                src="/candela-card-circle.webp"
                alt={t("RF Microneedling")}
                width={300}
                height={300}
                className="rounded-full"
              />
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}