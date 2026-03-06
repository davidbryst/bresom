/**
 * LoadingSpinner - Composant de chargement animé avec multiples variants
 * Utilise Framer Motion pour des animations fluides et performantes
 */

import { motion } from "motion/react";
import { SPRING_TRANSITIONS, EASING_TRANSITIONS, getPrefersReducedMotion } from "~/config/motionConfig";

export type SpinnerVariant = "circular" | "dots" | "bars" | "pulse";
export type SpinnerSize = "sm" | "md" | "lg";

export interface LoadingSpinnerProps {
  /**
   * Variant du spinner
   * - circular: Cercle qui tourne (par défaut)
   * - dots: 3 dots qui rebondissent
   * - bars: Barres verticales qui ondulent
   * - pulse: Pulsation scale + opacity
   */
  variant?: SpinnerVariant;

  /**
   * Taille du spinner
   * - sm: 16px
   * - md: 24px (par défaut)
   * - lg: 40px
   */
  size?: SpinnerSize;

  /**
   * Couleur du spinner (CSS color string)
   * Par défaut: #7C3AED (violet-accent)
   */
  color?: string;

  /**
   * Classe CSS additionnelle
   */
  className?: string;
}

/**
 * Map des tailles en pixels
 */
const SIZE_MAP: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 40,
};

/**
 * Composant Spinner Circulaire
 */
function CircularSpinner({
  size,
  color,
  className = "",
}: {
  size: number;
  color: string;
  className?: string;
}) {
  const prefersReducedMotion = getPrefersReducedMotion();

  return (
    <motion.div
      className={`rounded-full border-2 border-transparent ${className}`}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
        borderRightColor: color,
      }}
      animate={{ rotate: prefersReducedMotion ? 0 : 360 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 0.8,
              repeat: Infinity,
              ease: "linear",
            }
      }
    />
  );
}

/**
 * Composant Spinner Dots
 */
function DotsSpinner({
  size,
  color,
  className = "",
}: {
  size: number;
  color: string;
  className?: string;
}) {
  const prefersReducedMotion = getPrefersReducedMotion();
  const dotSize = size / 3;

  return (
    <div className={`flex gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -size / 2, 0],
                  opacity: [0.3, 1, 0.3],
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}

/**
 * Composant Spinner Bars
 */
function BarsSpinner({
  size,
  color,
  className = "",
}: {
  size: number;
  color: string;
  className?: string;
}) {
  const prefersReducedMotion = getPrefersReducedMotion();
  const barWidth = size / 5;

  return (
    <div className={`flex gap-1 items-end ${className}`} style={{ height: size }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          style={{
            width: barWidth,
            backgroundColor: color,
          }}
          animate={
            prefersReducedMotion
              ? { height: size * 0.3 }
              : {
                  height: [size * 0.3, size, size * 0.3],
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}

/**
 * Composant Spinner Pulse
 */
function PulseSpinner({
  size,
  color,
  className = "",
}: {
  size: number;
  color: string;
  className?: string;
}) {
  const prefersReducedMotion = getPrefersReducedMotion();

  return (
    <motion.div
      className={`rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1],
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    />
  );
}

/**
 * LoadingSpinner - Composant principal
 */
export function LoadingSpinner({
  variant = "circular",
  size = "md",
  color = "#7C3AED",
  className = "",
}: LoadingSpinnerProps) {
  const sizeValue = SIZE_MAP[size];

  const spinnerProps = {
    size: sizeValue,
    color,
    className,
  };

  switch (variant) {
    case "circular":
      return <CircularSpinner {...spinnerProps} />;
    case "dots":
      return <DotsSpinner {...spinnerProps} />;
    case "bars":
      return <BarsSpinner {...spinnerProps} />;
    case "pulse":
      return <PulseSpinner {...spinnerProps} />;
    default:
      return <CircularSpinner {...spinnerProps} />;
  }
}

export default LoadingSpinner;
