import { motion } from "framer-motion";
import categoryApple from "@/assets/category-apple.jpg";
import categoryDyson from "@/assets/category-dyson.jpg";
import categoryPs5 from "@/assets/category-ps5.jpg";
import categoryPerfume from "@/assets/category-perfume.jpg";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!%20Интересует%20";

const categories = [
  {
    title: "Apple Universe",
    desc: "iPhone, iPad, MacBook, AirPods и аксессуары",
    image: categoryApple,
    span: "md:col-span-2 md:row-span-2",
    query: "продукция%20Apple",
  },
  {
    title: "Dyson Beauty",
    desc: "Стайлеры, фены и очистители воздуха",
    image: categoryDyson,
    span: "md:col-span-1 md:row-span-1",
    query: "продукция%20Dyson",
  },
  {
    title: "PS5 Gaming",
    desc: "Консоли, геймпады и топовые игры",
    image: categoryPs5,
    span: "md:col-span-1 md:row-span-1",
    query: "PlayStation%205",
  },
  {
    title: "Оригинальная парфюмерия",
    desc: "Премиальные ароматы от мировых брендов",
    image: categoryPerfume,
    span: "md:col-span-2 md:row-span-1",
    query: "парфюмерия",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const BentoGrid = () => {
  return (
    <section className="px-6 py-32 max-w-7xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-bold tracking-tight text-gradient text-center mb-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ lineHeight: 1.1 }}
      >
        Наши категории
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-center mb-16 text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Всё лучшее — в одном месте
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px]">
        {categories.map((cat, i) => (
          <motion.a
            key={cat.title}
            href={`${WHATSAPP_URL}${cat.query}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative rounded-2xl overflow-hidden border border-border/30 ${cat.span}`}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-1">
                {cat.title}
              </h3>
              <p className="text-muted-foreground text-sm">{cat.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
