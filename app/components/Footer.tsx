import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/davidabraham", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/davidabraham", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/davidabraham", label: "Twitter" },
  { icon: Mail, href: "mailto:sh.david.abraham@gmail.com", label: "Email" },
];

const navLinks = [
  { name: "Accueil", href: "#hero" },
  { name: "A propos", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-dark-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-light-primary inline-block mb-4"
            >
              <span className="text-transparent bg-clip-text bg-gradient-violet">
                DA
              </span>
              <span className="text-light-primary">.</span>
            </motion.a>
            <p className="text-light-secondary text-sm leading-relaxed mb-6">
              Développeur Full Stack & Designer UI/UX passionné par la création
              d'expériences digitales élégantes et performantes.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center text-light-muted hover:text-violet-accent hover:border-violet-primary/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-light-primary font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4, color: "#7C3AED" }}
                    className="text-light-secondary text-sm hover:text-violet-accent transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-light-primary font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-light-secondary">
              <li>
                <span className="text-light-muted">Email:</span>
                <br />
                <a
                  href="mailto:sh.david.abraham@gmail.com"
                  className="hover:text-violet-accent transition-colors"
                >
                  sh.david.abraham@gmail.com
                </a>
              </li>
              <li>
                <span className="text-light-muted">Téléphone:</span>
                <br />
                +225 01 40 54 41 97
              </li>
              <li>
                <span className="text-light-muted">Localisation:</span>
                <br />
                Abidjan, Côte d'Ivoire
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-light-muted text-sm text-center md:text-left">
            © {new Date().getFullYear()} David Abraham. Tous droits réservés.
          </p>
          <p className="text-light-muted text-sm flex items-center gap-1">
            Fait avec{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-violet-accent fill-violet-accent" />
            </motion.span>{" "}
            et React
          </p>
        </div>
      </div>
    </footer>
  );
}
