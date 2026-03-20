const Footer = () => {
  return (
    <footer className="border-t border-border/40 px-6 py-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-foreground font-bold text-lg tracking-tight mb-1">Точка Связи</p>
          <p className="text-muted-foreground text-sm">Экибастуз, Казахстан</p>
        </div>
        <p className="text-muted-foreground/60 text-xs tracking-wider">
          © 2025 Все права защищены
        </p>
      </div>
    </footer>
  );
};

export default Footer;
