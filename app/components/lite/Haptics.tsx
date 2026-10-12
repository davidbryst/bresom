import { useEffect } from "react";

// Retour haptique global sur les boutons et liens tactiles.
// - Android (Chrome, Samsung…) : Vibration API.
// - iOS Safari : pas de Vibration API ; on déclenche le « tic » natif d'un
//   <input type="checkbox" switch> en cliquant le <label> qui le contient
//   (même technique que la lib ios-haptics). Le switch est créé à chaque tap
//   puis retiré, et déclenché dans le `click` (geste utilisateur reconnu par iOS).
// Rien sur desktop (souris) ni si « Réduire les animations » est activé.

const SELECTOR = "a[href], button, [role='button'], input[type='submit']";

const HIDDEN =
  "position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;" +
  "clip-path:inset(50%);opacity:0.01;pointer-events:none;";

function iosTick() {
  const label = document.createElement("label");
  label.setAttribute("aria-hidden", "true");
  label.style.cssText = HIDDEN;
  const input = document.createElement("input");
  input.type = "checkbox";
  input.setAttribute("switch", "");
  input.tabIndex = -1;
  label.appendChild(input);
  document.body.appendChild(label);
  label.click();
  // Laisse iOS jouer le retour avant de retirer l'élément.
  setTimeout(() => label.remove(), 300);
}

export default function Haptics() {
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const canVibrate = typeof navigator.vibrate === "function";
    let lastPointer = "";

    const onPointerDown = (e: PointerEvent) => {
      lastPointer = e.pointerType;
    };

    const onClick = (e: MouseEvent) => {
      if (lastPointer !== "touch" || reduced?.matches) return;
      const target = e.target as Element | null;
      // Ignore nos propres clics synthétiques sur le label caché.
      if (!target || target.closest("label[aria-hidden='true']")) return;
      if (!target.closest(SELECTOR)) return;
      try {
        if (canVibrate) navigator.vibrate(12);
        else iosTick();
      } catch {
        /* no-op */
      }
    };

    document.addEventListener("pointerdown", onPointerDown, {
      capture: true,
      passive: true,
    });
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      });
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
}
