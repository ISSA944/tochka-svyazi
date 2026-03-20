import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!%20Хочу%20узнать%20подробнее";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8 font-medium">
            Точка Связи — Экибастуз
          </p>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gradient leading-[0.95] mb-8"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ lineHeight: 0.95 }}
        >
          Главная точка
          <br />
          технологий
          <br />
          в Экибастузе
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          iPhone, Dyson, PlayStation 5, оригинальная парфюмерия
          <br className="hidden sm:block" />
          и&nbsp;аксессуары премиум-класса
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button variant="hero" size="lg" className="rounded-full px-10 h-14 text-base" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Заказать сейчас
            </a>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-base border-border/50" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </a>
          </Button>
        </motion.div>

        {/* 3D placeholder */}
        <motion.div
          className="mt-20 mx-auto w-full max-w-3xl aspect-[16/9] rounded-2xl surface-elevated border border-border/30 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            Spline 3D Model
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
