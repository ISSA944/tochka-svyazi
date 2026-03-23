import { motion } from "framer-motion";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <motion.footer
      className="border-t border-primary/10 px-4 sm:px-6 md:px-12 pt-14 pb-28 sm:pb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Точка Связи" className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <p className="text-foreground font-bold text-xl tracking-tight">Точка Связи</p>
            <p className="text-muted-foreground text-sm">Экибастуз, Казахстан</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-10 text-sm text-muted-foreground">
          <a href="tel:+77026933999" className="hover:text-primary transition-colors duration-300">+7 702 693 39 99</a>
          <a href="https://wa.me/77026933999" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">WhatsApp</a>
        </div>
        <p className="text-muted-foreground/40 text-xs tracking-wider">
          © {new Date().getFullYear()} Точка Связи
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
