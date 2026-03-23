import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Repeat } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!%20Хочу%20узнать%20про%20Trade-In";
const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  { num: "01", text: "Принесите старый гаджет" },
  { num: "02", text: "Мгновенная оценка" },
  { num: "03", text: "Получите новый со скидкой" },
];

const TradeInSection = () => {
  return (
    <section id="tradein" className="px-4 sm:px-6 md:px-12 py-20 md:py-32 max-w-7xl mx-auto">
      <motion.div
        className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] border border-primary/15"
        style={{ background: "linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(0 0% 3%) 100%)" }}
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease }}
      >
        <div
          className="pointer-events-none absolute -top-24 right-0 h-[260px] w-[260px] rounded-full opacity-20 blur-[110px] md:-top-32 md:h-[400px] md:w-[400px] md:blur-[140px]"
          style={{ background: "hsl(52 100% 50%)" }}
        />

        <div className="relative z-10 grid gap-8 p-6 sm:p-8 md:grid-cols-2 md:gap-12 md:p-16 lg:p-20">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Repeat className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary text-xs font-medium tracking-wide">Trade-In</span>
            </motion.div>

            <motion.h2
              className="mb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-foreground"
              style={{ lineHeight: 0.95 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
            >
              Обменяй старый
              <br />
              на новый
              <br />
              <span className="text-gradient">за 5 минут</span>
            </motion.h2>

            <motion.p
              className="mb-8 max-w-md text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Принесите свой старый гаджет — мы оценим его и предложим лучшую цену при обмене.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button variant="premium" size="lg" className="group w-full sm:w-auto" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Узнать стоимость
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:gap-4 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="flex items-start gap-4 sm:gap-5 rounded-2xl border border-primary/10 bg-secondary/20 p-4 sm:p-5"
                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
              >
                <span className="text-primary text-xs font-bold tracking-wider mt-0.5 shrink-0">
                  {step.num}
                </span>
                <p className="text-foreground text-sm sm:text-base font-medium">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TradeInSection;
