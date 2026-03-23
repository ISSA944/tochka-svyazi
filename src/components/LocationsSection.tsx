import { motion } from "framer-motion";
import { MapPin, Clock, ExternalLink } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const locations = [
  {
    name: "ул. Ауэзова 35",
    label: "Основной магазин",
    hours: "10:00 — 20:00",
    days: "Без выходных",
    mapUrl: "https://2gis.kz/ekibastuz/search/ауэзова%2035",
  },
  {
    name: "ТЦ Болашак+",
    label: "Второй филиал",
    hours: "10:00 — 20:00",
    days: "Без выходных",
    mapUrl: "https://2gis.kz/ekibastuz/search/болашак",
  },
];

const LocationsSection = () => {
  return (
    <section id="locations" className="px-4 sm:px-6 md:px-12 py-20 md:py-32 max-w-7xl mx-auto">
      <motion.div
        className="mb-12 md:mb-20"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-medium">Контакты</p>
        <h2
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-foreground"
          style={{ lineHeight: 1 }}
        >
          Наши
          <br />
          <span className="text-gradient">магазины</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {locations.map((loc, i) => (
          <motion.a
            key={loc.name}
            href={loc.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl border border-primary/10 bg-card p-6 sm:p-8 md:p-10 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_-12px_hsla(52,100%,50%,0.1)]"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease }}
          >
            <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground text-[11px] sm:text-xs tracking-[0.15em] uppercase font-medium">{loc.label}</span>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300" />
            </div>

            <h3 className="mb-4 sm:mb-5 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:translate-y-[-1px] transition-transform duration-500">
              {loc.name}
            </h3>

            <div className="flex flex-col gap-3 text-muted-foreground text-sm sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-primary/60" />
                {loc.hours}
              </div>
              <span className="text-muted-foreground/50">{loc.days}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default LocationsSection;
