"use client";

import Image from "next/image";
import { StaggerContainer, StaggerItem } from "../Animations";
import { useT } from "@/i18n/LanguageProvider";

const team = [
  {
    name: "Valeriya Verloka",
    role: "Founder &amp; Clinical Director",
    image: "/team-valeriya.png",
    lift: true,
  },
  {
    name: "Olesya Saa",
    role: "Senior Aesthetic Specialist",
    image: "/team-olesya.png",
    lift: false,
  },
  {
    name: "Onissis Samaniego",
    role: "Aesthetic Specialist",
    image: "/team-onissis.png",
    lift: true,
  },
  {
    name: "Onissis Samaniego",
    role: "Client Experience Specialist",
    image: "/team-client.png",
    lift: false,
  },
];

export default function HomeTeam() {
  const t = useT();
  return (
    <section className="bg-[#CFD2D8] px-5 sm:px-10 py-16 sm:py-24">
      <StaggerContainer staggerDelay={0.1}>
        <StaggerItem className="w-full">
          <h2 className="text-white text-[40px] min-[768px]:text-[70px] min-[1200px]:text-[80px] min-[1600px]:text-[100px] leading-tight font-berlingske font-normal text-center">
            {t("Specialists Who")}
            <br />
            {t("Know Their Craft")}
          </h2>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 mt-12">
            {team.map((member, i) => (
              <div
                key={i}
                className={`${member.lift ? "lg:mt-16" : ""} ${i % 2 === 1 ? "lg:mt-8" : ""}`}
              >
                <div className="rounded-[30px] overflow-hidden relative aspect-[373/570]">
                  <Image
                    src={member.image}
                    alt={t(member.name)}
                    width={373}
                    height={570}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 left-4">
                    <p className="text-[#1F1D1B] font-berlingske text-[20px] min-[768px]:text-[28px] min-[1200px]:text-[24px] min-[1600px]:text-[32px] leading-tight">
                      {t(member.name)}
                    </p>
                    <p className="text-[#1F1D1B] font-medium text-[12px] min-[768px]:text-[14px] min-[1600px]:text-[16px] mt-1 leading-snug" style={{ opacity: 0.5 }}>
                      {t(member.role)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}