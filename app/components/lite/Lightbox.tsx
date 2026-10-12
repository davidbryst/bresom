import { useCallback, useEffect, useRef } from "react";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-screen image viewer for project galleries. Keyboard: Esc closes,
 * ←/→ navigate. Click outside the image (the backdrop) also closes.
 */
export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = images.length;
  const current = images[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate],
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate],
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [onClose, goPrev, goNext]);

  if (!current) return null;

  return (
    // Backdrop click closes; keyboard users close with Escape (handled above).
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 md:p-12"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 md:right-6 md:top-6 flex h-11 w-11 items-center justify-center border border-paper/30 text-paper text-lg hover:border-paper transition-colors"
      >
        ✕
      </button>

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Image précédente"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center border border-paper/30 text-paper text-xl hover:border-paper transition-colors"
        >
          ←
        </button>
      )}

      {/* Stops the backdrop's close-on-click; not an interactive control. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <img
        src={current.src}
        alt={current.alt}
        className="max-h-[85vh] max-w-full md:max-w-[85vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Image suivante"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center border border-paper/30 text-paper text-xl hover:border-paper transition-colors"
        >
          →
        </button>
      )}

      {total > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.18em] text-paper/70">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
