import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!";

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed inset-x-4 bottom-4 z-50 flex h-14 items-center justify-center gap-3 rounded-full border border-primary/20 bg-card/85 px-5 backdrop-blur-xl active:scale-[0.96] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_4px_24px_-4px_hsla(52,100%,50%,0.15)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-12 sm:justify-start sm:pl-4 sm:pr-5"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Написать в WhatsApp"
    >
      <div className="w-7 h-7 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center">
        <MessageCircle className="h-3.5 w-3.5 text-foreground" />
      </div>
      <span className="text-foreground text-sm font-medium">Написать в WhatsApp</span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
