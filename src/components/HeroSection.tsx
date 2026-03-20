import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!%20Хочу%20узнать%20подробнее";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-12">
      {/* Subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-30 blur-[150px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsla(210,100%,50%,0.12), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.p
          className="text-muted-foreground text-xs tracking-[0.35em] uppercase mb-10 font-medium"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Точка Связи — Экибастуз
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-[-0.04em] text-gradient-bright mb-8"
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ lineHeight: 0.92 }}
        >
          Главная точка
          <br />
          технологий
          <br />
          <span className="text-gradient">в Экибастузе</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-14 leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          iPhone · Dyson · PlayStation 5 · Оригинальная парфюмерия
          <br />
          и аксессуары премиум-класса
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button variant="hero" size="lg" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Заказать сейчас
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </a>
          </Button>
        </motion.div>

        {/* 3D Spline placeholder */}
        <motion.div
          className="mt-24 mx-auto w-full max-w-4xl aspect-[16/9] rounded-3xl surface-card flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-border/50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground/60 text-xs tracking-[0.3em] uppercase">
              Spline 3D Model
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
