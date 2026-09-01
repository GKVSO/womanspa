import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import Hero from "@/components/Hero";
import { getSetting } from "@/lib/db";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import VagaroEmbed from "@/components/VagaroEmbed";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book an Appointment | WO/MAN Luxe MedSpa",
  description: "Book your consultation or treatment online at WO/MAN Luxe MedSpa in Hallandale Beach, FL.",
};

export default async function BookPage() {
  const [bookingUrl, bookingEmbed, bookingMode] = await Promise.all([
    getSetting("vagaro_booking_url"),
    getSetting("vagaro_booking_embed"),
    getSetting("vagaro_booking_mode"),
  ]);

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero
            singleLineTitle="Book an Appointment"
            description="Schedule your consultation or treatment online. Fast, secure, and confirmed instantly."
            primaryBtn="Book Consultation"
            secondaryBtn="View Before / After"
            secondaryBtnHref="/before-after"
          />

          <section className="px-5 sm:px-10 py-10 sm:py-16" style={{ backgroundColor: "#F1F2F4" }}>
            <div className="mx-auto max-w-[1100px]">
              {!bookingUrl && !bookingEmbed ? (
                <div className="text-center py-16 rounded-[30px]" style={{ backgroundColor: "#fff" }}>
                  <p className="text-[18px] font-semibold" style={{ color: "#1F1D1B" }}>
                    Online booking is being set up.
                  </p>
                  <p className="text-[14px] mt-3" style={{ color: "#6B7078" }}>
                    Please call us at <a href="tel:+13053369373" className="font-semibold" style={{ color: "#B07E3F" }}>+1 (305) 336-9373</a> to book your appointment.
                  </p>
                </div>
              ) : bookingMode === "embed" && bookingEmbed ? (
                <VagaroEmbed code={bookingEmbed} />
              ) : (
                <div className="text-center py-16 rounded-[30px]" style={{ backgroundColor: "#fff" }}>
                  <p className="text-[18px] font-semibold mb-6" style={{ color: "#1F1D1B" }}>
                    Continue to secure online booking
                  </p>
                  <a
                    href={bookingUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-white font-bold text-[14px] rounded-[10px] px-8 py-4 shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: "#B07E3F" }}
                  >
                    Book Now
                  </a>
                </div>
              )}
            </div>
          </section>
        </main>
        <HomeFooter />
      </div>
    </LanguageProvider>
  );
}
