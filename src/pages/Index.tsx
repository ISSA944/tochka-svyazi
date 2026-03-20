import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import TradeInSection from "@/components/TradeInSection";
import LocationsSection from "@/components/LocationsSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <BentoGrid />
      <TradeInSection />
      <LocationsSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
