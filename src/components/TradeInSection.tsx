import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!%20Хочу%20узнать%20про%20Trade-In";

const TradeInSection = () => {
  return (
    <section className="px-6 py-32 max-w-5xl mx-auto">
      <motion.div
        className="relative rounded-3xl surface-card overflow-hidden p-10 md:p-20"
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Accent glow */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-[120px] pointer-events-none"
          style={{ background: "hsl(210, 100%, 50%)" }}
        />

        <div className="relative z-10 max-w-xl">
          <motion.p
            className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Trade-In
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-foreground mb-6"
            style={{ lineHeight: 1 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Обменяй старый
            <br />
            на новый
            <br />
            <span className="text-gradient">за 5 минут</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-base md:text-lg mb-12 leading-relaxed max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Принесите свой старый гаджет — мы оценим его и предложим лучшую цену при обмене на новый.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button variant="premium" size="lg" className="group" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Узнать стоимость
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TradeInSection;
