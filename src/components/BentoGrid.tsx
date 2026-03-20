import { motion } from "framer-motion";
import categoryApple from "@/assets/category-apple.jpg";
import categoryDyson from "@/assets/category-dyson.jpg";
import categoryPs5 from "@/assets/category-ps5.jpg";
import categoryPerfume from "@/assets/category-perfume.jpg";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!%20Интересует%20";

interface CategoryCard {
  title: string;
  desc: string;
  image: string;
  query: string;
  className: string;
  glowClassName?: string;
  glowColor?: string;
  serif?: boolean;
}

const categories: CategoryCard[] = [
  {
    title: "Apple Universe",
    desc: "iPhone · iPad · MacBook · AirPods",
    image: categoryApple,
    className: "md:col-span-2 md:row-span-2",
    query: "продукция%20Apple",
  },
  {
    title: "Dyson Beauty",
    desc: "Стайлеры · Фены · Очистители воздуха",
    image: categoryDyson,
    className: "md:col-span-1 md:row-span-1",
    query: "продукция%20Dyson",
    glowClassName: "glow-dyson",
    glowColor: "hsla(280, 70%, 55%, 0.15)",
  },
  {
    title: "PS5 Gaming",
    desc: "Консоли · Геймпады · Игры",
    image: categoryPs5,
    className: "md:col-span-1 md:row-span-1",
    query: "PlayStation%205",
    glowClassName: "glow-ps5",
    glowColor: "hsla(220, 90%, 55%, 0.12)",
  },
  {
    title: "Парфюмерия",
    desc: "Премиальные ароматы мировых брендов",
    image: categoryPerfume,
    className: "md:col-span-2 md:row-span-1",
    query: "парфюмерия",
    serif: true,
  },
];

const BentoGrid = () => {
  return (
    <section className="px-6 py-32 max-w-7xl mx-auto">
      <motion.p
        className="text-muted-foreground text-xs tracking-[0.35em] uppercase text-center mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        Категории
      </motion.p>
      <motion.h2
        className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-gradient-bright text-center mb-20"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ lineHeight: 1.05 }}
      >
        Всё лучшее —
        <br />
        в одном месте
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[260px]">
        {categories.map((cat, i) => (
          <motion.a
            key={cat.title}
            href={`${WHATSAPP_URL}${cat.query}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative rounded-2xl overflow-hidden surface-card glow-hover ${cat.className} ${cat.glowClassName || ""}`}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            {/* Ambient glow for specific cards */}
            {cat.glowColor && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${cat.glowColor}, transparent 70%)`,
                }}
              />
            )}

            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
              loading="lazy"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,0%)]/95 via-[hsl(0,0%,0%)]/40 to-transparent" />

            <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
              <h3
                className={`text-xl md:text-2xl font-bold tracking-tight text-foreground mb-1 ${
                  cat.serif ? "font-serif-luxury text-2xl md:text-3xl italic font-medium tracking-normal" : ""
                }`}
              >
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
