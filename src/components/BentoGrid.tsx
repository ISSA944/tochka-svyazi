import { motion } from "framer-motion";
import categoryApple from "@/assets/category-apple.jpg";
import categoryDyson from "@/assets/category-dyson.jpg";
import categoryPs5 from "@/assets/category-ps5.jpg";
import categoryPerfume from "@/assets/category-perfume.jpg";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!%20Интересует%20";

const ease = [0.16, 1, 0.3, 1] as const;

interface CategoryCard {
  title: string;
  desc: string;
  image: string;
  query: string;
  span: string;
  glowColor?: string;
  serif?: boolean;
}

const categories: CategoryCard[] = [
  {
    title: "Apple",
    desc: "iPhone · iPad · MacBook · AirPods · Watch",
    image: categoryApple,
    query: "продукция%20Apple",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Dyson",
    desc: "Стайлеры · Фены · Очистители",
    image: categoryDyson,
    query: "продукция%20Dyson",
    span: "md:col-span-1 md:row-span-1",
    glowColor: "hsla(290, 60%, 50%, 0.2)",
  },
  {
    title: "PlayStation",
    desc: "PS5 · Геймпады · Игры",
    image: categoryPs5,
    query: "PlayStation%205",
    span: "md:col-span-1 md:row-span-1",
    glowColor: "hsla(215, 80%, 50%, 0.18)",
  },
  {
    title: "Парфюмерия",
    desc: "Премиальные ароматы",
    image: categoryPerfume,
    query: "парфюмерия",
    span: "md:col-span-2 md:row-span-1",
    serif: true,
  },
];

const BentoGrid = () => {
  return (
    <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4">Каталог</p>
        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-foreground"
          style={{ lineHeight: 1 }}
        >
          Всё лучшее —
          <br />
          <span className="text-gradient">в одном месте</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[240px] md:auto-rows-[280px]">
        {categories.map((cat, i) => (
          <motion.a
            key={cat.title}
            href={`${WHATSAPP_URL}${cat.query}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative rounded-2xl overflow-hidden ${cat.span}`}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease }}
          >
            {/* Image */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.06] opacity-70 group-hover:opacity-90"
              loading="lazy"
            />

            {/* Colored glow */}
            {cat.glowColor && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 60%, ${cat.glowColor}, transparent 65%)`,
                }}
              />
            )}

            {/* Gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

            {/* Border overlay */}
            <div className="absolute inset-0 rounded-2xl border border-border/40 group-hover:border-border/70 transition-colors duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
              <h3
                className={`text-xl md:text-2xl font-bold tracking-tight text-foreground mb-1 transition-transform duration-500 group-hover:translate-y-[-2px] ${
                  cat.serif ? "font-serif-luxury text-2xl md:text-3xl italic font-medium tracking-normal" : ""
                }`}
              >
                {cat.title}
              </h3>
              <p className="text-muted-foreground text-sm transition-opacity duration-500 group-hover:opacity-100 opacity-70">
                {cat.desc}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
