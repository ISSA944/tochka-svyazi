import { lazy, Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import BentoGrid from "@/components/BentoGrid";
import TradeInSection from "@/components/TradeInSection";
import LocationsSection from "@/components/LocationsSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

const InteractivePreloader = lazy(() => import("@/components/InteractivePreloader"));

const PRELOADER_SESSION_KEY = "tochka-svyazi-preloader-seen";

const shouldShowPreloader = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobileViewport = window.innerWidth < 768;

  if (prefersReducedMotion || isMobileViewport) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(PRELOADER_SESSION_KEY) !== "1";
  } catch {
    return true;
  }
};

const PreloaderFallback = () => <div className="fixed inset-0 z-[100] bg-black" />;

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(shouldShowPreloader);

  const handlePreloaderFinish = () => {
    try {
      window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
    } catch {
      // Ignore storage restrictions and continue to the site.
    }

    setShowPreloader(false);
  };

  return (
    <div id="top" className="relative">
      {/* Premium Cinematic Preloader Overlay */}
      {showPreloader && (
        <Suspense fallback={<PreloaderFallback />}>
          <InteractivePreloader onFinish={handlePreloaderFinish} />
        </Suspense>
      )}

      {/* Main Website Content */}
      <main className="min-h-screen bg-background pb-24 sm:pb-0">
        <Navbar />
        <HeroSection />
        <AdvantagesSection />
        <BentoGrid />
        <TradeInSection />
        <LocationsSection />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </div>
  );
};

export default Index;
