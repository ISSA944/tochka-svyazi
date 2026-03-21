import { motion } from "framer-motion";
import { ShieldCheck, Repeat, Award, Truck } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const advantages = [
  {
    icon: ShieldCheck,
    title: "100% Оригинал",
    desc: "Только сертифицированная продукция Apple, Samsung, Dyson, PS5. Гарантия качества.",
  },
  {
    icon: Repeat,
    title: "Выгодный Trade-in",
    desc: "Мгновенная оценка вашего старого гаджета. Забери новый со скидкой за 5 минут.",
  },
  {
    icon: Award,
    title: "Официальная Гарантия",
    desc: "Послепродажное обслуживание и поддержка в наших шоурумах.",
  },
  {
    icon: Truck,
    title: "Доставка по Казахстану",
    desc: "Безопасно и оперативно отправляем заказы в любой город РК.",
  },
];

const AdvantagesSection = () => {
  return (
    <section id="advantages" className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-medium">Почему мы</p>
        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-foreground"
          style={{ lineHeight: 1 }}
        >
          Наши
          <br />
          <span className="text-gradient">преимущества</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {advantages.map((item, i) => (
          <motion.div
            key={item.title}
            className="group relative rounded-2xl border border-primary/10 bg-card p-8 md:p-10 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_-12px_hsla(52,100%,50%,0.1)]"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors duration-300">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdvantagesSection;
