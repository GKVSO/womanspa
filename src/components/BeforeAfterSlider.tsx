import { useT } from "@/i18n/LanguageProvider";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
}

export default function BeforeAfterSlider({ beforeSrc, afterSrc }: BeforeAfterSliderProps) {
  const t = useT();
  return (
    <div className="flex w-full">
      <div className="relative flex-1 overflow-hidden rounded-l-[40px] h-[20vh] min-[768px]:h-[30vh] min-[1200px]:h-[45vh] min-[1600px]:h-[58vh]">
        <img src={beforeSrc} alt={t("Before")} className="before-after-img-left" />
        <div className="absolute bottom-4 left-4 bg-[#B07E3F] text-white text-[13px] sm:text-[16px] font-semibold rounded-full px-3 py-1.5 sm:px-5 sm:py-2.5 whitespace-nowrap">
          {t("Before")}
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-r-[40px] h-[20vh] min-[768px]:h-[30vh] min-[1200px]:h-[45vh] min-[1600px]:h-[58vh]">
        <img src={afterSrc} alt={t("After")} className="before-after-img-right" />
        <div className="absolute bottom-4 right-4 bg-[#B07E3F] text-white text-[13px] sm:text-[16px] font-semibold rounded-full px-3 py-1.5 sm:px-5 sm:py-2.5 whitespace-nowrap">
          {t("After")}
        </div>
      </div>
    </div>
  );
}
