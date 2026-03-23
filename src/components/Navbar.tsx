import { motion } from "framer-motion";
import { ArrowRight, Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/logo.jpg";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!";
const navLinks = [
  { href: "#catalog", label: "Каталог" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#tradein", label: "Trade-In" },
  { href: "#locations", label: "Контакты" },
];

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-3 md:py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between surface-glass rounded-[1.35rem] px-4 sm:px-6 py-3">
        <a href="#top" className="flex items-center gap-3 min-w-0">
          <img src={logo} alt="Точка Связи" className="h-9 w-9 rounded-lg object-cover shrink-0" />
          <span className="text-foreground font-bold text-base sm:text-lg tracking-tight truncate">
            Точка Связи
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_4px_hsla(52,100%,50%,0.2)] transition-all duration-300"
          >
            WhatsApp
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Открыть WhatsApp"
            className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Открыть меню"
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white/5 text-foreground"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88vw] border-l border-primary/10 bg-background/95 px-5 py-6 backdrop-blur-2xl"
            >
              <SheetHeader className="pr-10">
                <SheetTitle className="flex items-center gap-3">
                  <img src={logo} alt="Точка Связи" className="h-10 w-10 rounded-lg object-cover" />
                  <span>Точка Связи</span>
                </SheetTitle>
                <SheetDescription>
                  Магазин оригинальной техники и аксессуаров в Экибастузе.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <a
                      href={link.href}
                      className="flex items-center justify-between rounded-2xl border border-primary/10 bg-card px-4 py-4 text-base font-medium text-foreground transition-colors hover:border-primary/30"
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </a>
                  </SheetClose>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-primary/10 bg-primary/5 p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Быстрая консультация, наличие и стоимость товаров в один тап.
                </p>
                <SheetClose asChild>
                  <Button variant="hero" size="lg" className="mt-4 w-full" asChild>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      Перейти в WhatsApp
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
