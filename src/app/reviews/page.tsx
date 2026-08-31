import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReviewsSlider from "@/components/ReviewsSlider";
import Consultation from "@/components/Consultation";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero
          titleFirst="Client Reviews at"
          titleSecond="WO/MAN Luxe MedSpa"
          primaryBtn="Book Consultation"
          secondaryBtn="View Before / After"
        />
        <ReviewsSlider />
        <Consultation />
      </main>
    </div>
  );
}
