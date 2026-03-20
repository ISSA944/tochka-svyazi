import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

const locations = [
  {
    name: "ул. Ауэзова 35",
    desc: "Основной магазин",
    hours: "10:00 — 20:00, без выходных",
  },
  {
    name: "ТЦ Болашак+",
    desc: "Второй филиал",
    hours: "10:00 — 20:00, без выходных",
  },
];

const LocationsSection = () => {
  return (
    <section className="px-6 py-32 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-bold tracking-tight text-gradient text-center mb-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ lineHeight: 1.1 }}
      >
        Наши магазины
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-center mb-16 text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Два удобных адреса в Экибастузе
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {locations.map((loc, i) => (
          <motion.div
            key={loc.name}
            className="rounded-2xl surface-elevated border border-border/30 p-8 md:p-10 group hover:border-border/60 transition-colors duration-300"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <span className="text-muted-foreground text-sm font-medium">{loc.desc}</span>
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
              {loc.name}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              {loc.hours}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LocationsSection;
