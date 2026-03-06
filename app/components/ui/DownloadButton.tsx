/**
 * DownloadButton - Bouton de téléchargement avec spinner animé
 * Hybrid: Framer Motion pour states + GSAP pour effet magnétique
 * Requis explicitement par l'utilisateur
 */

import { motion, AnimatePresence } from "motion/react";
import { Download, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { LoadingSpinner } from "./LoadingSpinner";
import { SPRING_TRANSITIONS, createAccessibleTransition } from "~/config/motionConfig";

export type DownloadButtonState = "idle" | "loading" | "success";

export interface DownloadButtonProps {
  /**
   * URL du fichier à télécharger
   */
  href: string;

  /**
   * Nom du fichier téléchargé (optionnel)
   */
  filename?: string;

  /**
   * Callback au début du téléchargement
   */
  onDownloadStart?: () => void;

  /**
   * Callback à la fin du téléchargement
   */
  onDownloadComplete?: () => void;

  /**
   * Classes CSS additionnelles
   */
  className?: string;

  /**
   * Texte du bouton (par défaut: "Télécharger mon CV")
   */
  children?: React.ReactNode;

  /**
   * Variant de couleur
   */
  variant?: "primary" | "secondary" | "outline";

  /**
   * Activer l'effet magnétique
   */
  magnetic?: boolean;

  /**
   * Force de l'effet magnétique (0-1)
   */
  magneticStrength?: number;
}

/**
 * DownloadButton Component
 */
export function DownloadButton({
  href,
  filename,
  onDownloadStart,
  onDownloadComplete,
  className = "",
  children = "Télécharger mon CV",
  variant = "primary",
  magnetic = true,
  magneticStrength = 0.3,
}: DownloadButtonProps) {
  const [state, setState] = useState<DownloadButtonState>("idle");
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Gestion du clic - Simule le téléchargement avec états
   */
  const handleClick = (e: React.MouseEvent) => {
    // Si déjà en loading ou success, ne rien faire
    if (state !== "idle") {
      e.preventDefault();
      return;
    }

    setState("loading");
    onDownloadStart?.();

    // Simuler une durée de téléchargement (1.5s)
    setTimeout(() => {
      setState("success");
      onDownloadComplete?.();

      // Retour à idle après 2s
      setTimeout(() => {
        setState("idle");
      }, 2000);
    }, 1500);
  };

  /**
   * Effet magnétique GSAP
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    gsap.to(buttonRef.current, {
      x: deltaX * magneticStrength,
      y: deltaY * magneticStrength,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  /**
   * Retour à la position initiale
   */
  const handleMouseLeave = () => {
    if (!magnetic || !buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });

    setIsHovered(false);
  };

  /**
   * Variants de couleur
   */
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-violet-primary to-violet-accent text-white shadow-glow-violet hover:shadow-glow-violet-lg",
    secondary: "bg-dark-card text-light-primary border-2 border-violet-accent hover:bg-violet-accent/10",
    outline: "bg-transparent text-violet-accent border-2 border-violet-accent hover:bg-violet-accent hover:text-white",
  };

  return (
    <motion.a
      ref={buttonRef}
      href={state === "success" ? href : undefined}
      download={filename}
      className={`
        inline-flex items-center justify-center gap-3 px-6 py-3
        font-semibold rounded-xl transition-all cursor-pointer
        ${variantClasses[variant]}
        ${state === "loading" ? "pointer-events-none opacity-90" : ""}
        ${className}
      `}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: state === "idle" ? 1.05 : 1 }}
      whileTap={{ scale: state === "idle" ? 0.95 : 1 }}
      transition={createAccessibleTransition(SPRING_TRANSITIONS.default)}
    >
      {/* Icon avec AnimatePresence pour transitions fluides */}
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
              transition={createAccessibleTransition(SPRING_TRANSITIONS.bouncy)}
            >
              <Download className="w-5 h-5" />
            </motion.div>
          )}

          {state === "loading" && (
            <motion.div
              key="loading"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={createAccessibleTransition(SPRING_TRANSITIONS.default)}
            >
              <LoadingSpinner
                variant="circular"
                size="sm"
                color={variant === "primary" ? "#ffffff" : "#7C3AED"}
              />
            </motion.div>
          )}

          {state === "success" && (
            <motion.div
              key="success"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.3, 1] }}
              exit={{ opacity: 0 }}
              transition={createAccessibleTransition({
                ...SPRING_TRANSITIONS.bouncy,
                duration: 0.5,
              })}
            >
              <Check className="w-5 h-5 text-green-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Texte avec animation d'opacité */}
      <motion.span
        animate={{
          opacity: state === "loading" ? 0.7 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {state === "loading" ? "Téléchargement..." : state === "success" ? "Téléchargé !" : children}
      </motion.span>

      {/* Ripple effect au clic */}
      {state === "idle" && (
        <motion.span
          className="absolute inset-0 bg-white/20 rounded-xl pointer-events-none"
          initial={{ scale: 0, opacity: 1 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.a>
  );
}

export default DownloadButton;
