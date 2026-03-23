import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Repeat, ShieldCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

const Scene3D = lazy(() => import("@/components/Scene3D"));

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!%20Хочу%20узнать%20подробнее";

const ease = [0.16, 1, 0.3, 1] as const;
const heroHighlights = [
  { icon: ShieldCheck, title: "Гарантия", value: "Оригинальные товары" },
  { icon: Repeat, title: "Trade-In", value: "Оценка за 5 минут" },
  { icon: MapPin, title: "2 точки", value: "Экибастуз" },
];

const StaticHeroBackdrop = () => (
  <>
    <img
      src={heroBg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover opacity-35"
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsla(52,100%,50%,0.22),transparent_32%),radial-gradient(circle_at_80%_28%,hsla(214,100%,60%,0.15),transparent_30%)]" />
  </>
);

const HeroSection = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const shouldRenderInteractiveScene = !isMobile && !prefersReducedMotion;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {shouldRenderInteractiveScene ? (
          <Suspense fallback={<StaticHeroBackdrop />}>
            <Scene3D />
          </Suspense>
        ) : (
          <StaticHeroBackdrop />
        )}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/80 via-background/40 to-background" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 sm:pt-32 pb-24 sm:pb-32 pointer-events-none">
        <div className="max-w-3xl text-center sm:text-left">
          <motion.div
            className="mb-8 sm:mb-10 inline-flex items-center gap-2 self-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs tracking-wide font-medium">Точка Связи — Экибастуз</span>
          </motion.div>

          <motion.h1
            className="mb-6 sm:mb-8 text-[clamp(2.8rem,15vw,7.5rem)] font-black tracking-[-0.05em] text-foreground"
            style={{ lineHeight: 0.9 }}
            initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
          >
            Главная
            <br />
            <span className="text-gradient-bright">точка</span>
            <br />
            технологий
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-muted-foreground sm:mx-0 sm:mb-12 sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
          >
            iPhone · Samsung · Dyson · PS5 · Парфюм
            <br className="hidden md:block" />
            Оригинальные товары с гарантией
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 pointer-events-auto sm:flex-row sm:flex-wrap sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          >
            <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Перейти в WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="#catalog">
                Каталог
              </a>
            </Button>
          </motion.div>

          {isMobile && (
            <motion.div
              className="mt-8 grid grid-cols-1 gap-3 pointer-events-auto sm:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease }}
            >
              {heroHighlights.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-card/70 px-4 py-4 backdrop-blur-xl"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-primary/40 text-[10px] tracking-[0.3em] uppercase">Листайте</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-primary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
