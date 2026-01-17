import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Accueil", href: "#hero" },
  { name: "A propos", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-dark-deep/90 backdrop-blur-lg border-b border-dark-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-2xl font-bold text-light-primary"
            >
              <span className="text-transparent bg-clip-text bg-gradient-violet">
                DA
              </span>
              <span className="text-light-primary">.</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ color: "#7C3AED" }}
                  className="px-4 py-2 text-sm text-light-secondary hover:text-violet-accent transition-colors duration-200"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-5 py-2.5 bg-gradient-violet text-white text-sm font-semibold rounded-lg shadow-glow-violet transition-all duration-300"
            >
              Discutons
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-light-primary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-dark-deep/80 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <motion.div
          className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-dark-surface border-l border-dark-border p-6 pt-24"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-light-secondary hover:text-violet-accent hover:bg-dark-card rounded-lg transition-all duration-200"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : 20 }}
              transition={{ delay: navLinks.length * 0.1 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-4 py-3 bg-gradient-violet text-white font-semibold rounded-lg text-center"
            >
              Discutons
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
