"use client";

import { useT } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { StaggerContainer, StaggerItem, btnHover } from "../Animations";

const groups = [
  {
    title: "Body Contouring &amp; Fat Reduction",
    image: "/home-body-contouring.png",
    href: "/body-contouring",
    items: [
      "Emsculpt NEO",
      "ICOONE Laser Med",
      "Emerald Laser",
      "Endospheres Therapy",
      "Exion RF Body",
    ],
  },
  {
    title: "Skin Rejuvenation &amp; Resurfacing",
    image: "/home-skin-rejuv.png",
    href: "/skin-rejuvenation",
    items: [
      "Exion RF",
      "Candela Matrix Rf Microneedling",
      "Candela Matrix Sublative",
      "Lumenis Stellar M 22 IPL and Resurfx",
      "Gentle Max Pro laser facial",
      "Aerolase Neo Elite",
      "Xerf",
    ],
  },
  {
    title: "Laser Hair Removal",
    image: "/home-laser-hair.png",
    href: "/primelase",
    items: [
      "Candela GentleMax Pro",
      "Primelase Diode Laser",
    ],
  },
  {
    title: "Longevity",
    image: "/home-longevity.png",
    href: "#",
    items: [
      "IV Therapy",
      "NAD+ Therapy",
    ],
  },
  {
    title: "Wellness",
    image: "/home-wellness.png",
    href: "/wellness",
    items: [
      "Emsella for man and women",
      "Emfemme",
      "FemTouch",
      "Bio hormonal replacement",
      "Peptides",
      "Ivs",
      "Wellness ultrasound",
      "Acupulse co 2 vaginal rejuvenation",
    ],
  },
];

export default function HomeTreatments() {
  const t = useT();
  return (
    <section className="bg-[#F1F2F4] px-5 sm:px-10 py-16 sm:py-24">
      <StaggerContainer staggerDelay={0.1}>
        <StaggerItem className="w-full">
          <h2 className="text-black text-[24px] min-[768px]:text-[36px] font-berlingske leading-tight text-left">
            {t("Personalized Treatments")}
            <br />
            {t("Designed Around Your Goals")}
          </h2>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 auto-rows-[minmax(297px,auto)]">
            {groups.map((group) => (
              <motion.article
                key={group.title}
                className="group relative bg-cover bg-center rounded-[20px] overflow-hidden flex flex-col justify-between"
                style={{ backgroundImage: `url(${group.image})` }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 flex flex-col justify-between gap-4 h-full p-8">
                  <div>
                    <h3 className="text-white font-berlingske text-[18px] min-[768px]:text-[24px] leading-tight max-w-md">
                      {t(group.title)}
                    </h3>
                    <ul className="space-y-1.5 mt-5">
                      {group.items.map((item) => (
                        <li key={item} className="text-white text-[14px] min-[768px]:text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[16px] font-medium leading-snug">
                          {t(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={group.href} className="self-start mt-auto">
                    <motion.button
                      {...btnHover}
                      className="bg-[#CBA07D] text-white font-bold text-[12px] min-[768px]:text-[14px] rounded-[10px] px-10 py-4 cursor-pointer"
                    >
                      {t("Show More")}
                    </motion.button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}