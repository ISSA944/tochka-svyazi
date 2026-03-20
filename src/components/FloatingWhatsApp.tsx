import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/77026933999?text=Здравствуйте!";

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 h-14 rounded-full surface-glass active:scale-[0.97] transition-transform"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Написать в WhatsApp"
    >
      <div className="w-8 h-8 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center">
        <MessageCircle className="h-4 w-4 text-foreground" />
      </div>
      <span className="text-foreground text-sm font-medium hidden sm:block">
        Contact Expert
      </span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
