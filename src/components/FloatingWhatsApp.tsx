import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!";

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 h-12 pl-4 pr-5 rounded-full border border-border/40 bg-card/80 backdrop-blur-xl active:scale-[0.96] transition-all duration-300 hover:border-border/70 hover:shadow-[0_4px_24px_-4px_hsla(142,70%,45%,0.15)]"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Написать в WhatsApp"
    >
      <div className="w-7 h-7 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center">
        <MessageCircle className="h-3.5 w-3.5 text-white" />
      </div>
      <span className="text-foreground text-sm font-medium hidden sm:block">WhatsApp</span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
