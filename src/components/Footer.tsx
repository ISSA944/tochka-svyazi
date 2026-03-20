import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="border-t border-border/20 px-6 md:px-12 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-foreground font-bold text-xl tracking-tight mb-1">Точка Связи</p>
          <p className="text-muted-foreground text-sm">Экибастуз, Казахстан</p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 text-sm text-muted-foreground">
          <a href="tel:+77026933999" className="hover:text-foreground transition-colors duration-300">+7 702 693 39 99</a>
          <a href="https://wa.me/77026933999" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">WhatsApp</a>
        </div>
        <p className="text-muted-foreground/40 text-xs tracking-wider">
          © {new Date().getFullYear()}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
