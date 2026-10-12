import { useEffect } from "react";

// Retour haptique global sur les boutons et liens tactiles.
// - Android (Chrome, Samsung…) : Vibration API.
// - iOS Safari 18+ : pas de Vibration API ; on déclenche le petit « tic » natif
//   en cliquant un <input type="checkbox" switch> caché via son <label>.
// Ne fait rien sur desktop (pointeur souris) ni si l'utilisateur a demandé
// à réduire les animations.

const SELECTOR = "a[href], button, [role='button'], input[type='submit']";

export default function Haptics() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const canVibrate = typeof navigator.vibrate === "function";

    // Fallback iOS : switch caché + label.
    let label: HTMLLabelElement | null = null;
    if (!canVibrate) {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.setAttribute("switch", "");
      input.id = "haptic-switch";
      input.tabIndex = -1;
      input.setAttribute("aria-hidden", "true");
      label = document.createElement("label");
      label.htmlFor = input.id;
      label.setAttribute("aria-hidden", "true");
      for (const el of [input, label]) {
        el.style.cssText =
          "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;";
      }
      document.body.append(input, label);
    }

    const tick = () => {
      try {
        if (canVibrate) navigator.vibrate(12);
        else label?.click();
      } catch {
        /* no-op */
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || reduced?.matches) return;
      const target = e.target as Element | null;
      if (target?.closest(SELECTOR)) tick();
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      if (label) {
        document.getElementById("haptic-switch")?.remove();
        label.remove();
      }
    };
  }, []);

  return null;
}
