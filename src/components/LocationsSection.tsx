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
      <motion.p
        className="text-muted-foreground text-xs tracking-[0.35em] uppercase text-center mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        Адреса
      </motion.p>
      <motion.h2
        className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-gradient-bright text-center mb-20"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ lineHeight: 1.05 }}
      >
        Наши магазины
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((loc, i) => (
          <motion.div
            key={loc.name}
            className="rounded-2xl surface-card p-8 md:p-10 glow-hover"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-medium">{loc.desc}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
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
