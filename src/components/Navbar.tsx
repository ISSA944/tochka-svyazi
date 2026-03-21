import { motion } from "framer-motion";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between surface-glass rounded-2xl px-6 py-3">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="Точка Связи" className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-foreground font-bold text-lg tracking-tight hidden sm:block">
            Точка Связи
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#catalog" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">Каталог</a>
          <a href="#advantages" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">Преимущества</a>
          <a href="#tradein" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">Trade-In</a>
          <a href="#locations" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">Контакты</a>
        </div>

        <a
          href="https://wa.me/77026933999?text=Здравствуйте!"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_4px_hsla(52,100%,50%,0.2)] transition-all duration-300"
        >
          WhatsApp
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
