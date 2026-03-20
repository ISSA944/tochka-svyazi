import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!%20Хочу%20узнать%20про%20Trade-In";

const TradeInSection = () => {
  return (
    <section className="px-6 py-32 max-w-5xl mx-auto">
      <motion.div
        className="relative rounded-3xl surface-elevated border border-border/30 overflow-hidden p-10 md:p-16"
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-accent/8 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Trade-In
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6" style={{ lineHeight: 1.1 }}>
            Обменяй старый
            <br />
            на новый за 5 минут
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Принесите свой старый гаджет — мы оценим его и&nbsp;предложим лучшую цену при обмене на новый.
          </p>
          <Button variant="premium" size="lg" className="rounded-full px-10 h-14 text-base group" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Узнать стоимость
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default TradeInSection;
