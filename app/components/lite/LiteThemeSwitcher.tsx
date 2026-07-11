import { useEffect, useRef, useState } from "react";

/**
 * Floating accent-color switcher for the lite build.
 *
 * The whole theme reads its accent from the `--accent-rgb` CSS variable
 * (Tailwind's `vermilion` color + the `--accent` var in lite.css both point
 * at it). Changing that one variable re-tints links, selection, buttons,
 * skill bars — everything — instantly. The choice is persisted in
 * localStorage and re-applied before paint via the inline script in root.tsx
 * to avoid a flash of the default color.
 */

export const ACCENT_STORAGE_KEY = "lite-accent";
const ACCENT_CYCLE_KEY = "lite-accent-cycle";

type Swatch = { name: string; rgb: string };

const SWATCHES: Swatch[] = [
  { name: "Vermillon", rgb: "255 59 18" },
  { name: "Cobalt", rgb: "43 68 255" },
  { name: "Forêt", rgb: "14 138 79" },
  { name: "Violet", rgb: "124 58 237" },
  { name: "Or", rgb: "232 163 23" },
  { name: "Magenta", rgb: "255 45 120" },
];

const DEFAULT_RGB = SWATCHES[0].rgb;

// Seconds spent morphing from one swatch to the next in cycle mode.
const CYCLE_STEP_SECONDS = 5;

const parseRgb = (rgb: string) => rgb.split(" ").map(Number) as [number, number, number];
const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

export default function LiteThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(DEFAULT_RGB);
  const [cycling, setCycling] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  // Sync state with whatever the inline script already applied.
  useEffect(() => {
    const current =
      document.documentElement.style.getPropertyValue("--accent-rgb").trim() ||
      window.localStorage.getItem(ACCENT_STORAGE_KEY) ||
      DEFAULT_RGB;
    setActive(current);
    if (window.localStorage.getItem(ACCENT_CYCLE_KEY) === "1") setCycling(true);
  }, []);

  // Infinite smooth loop through every swatch, one frame at a time.
  useEffect(() => {
    if (!cycling) return;
    const stops = [...SWATCHES.map((s) => parseRgb(s.rgb)), parseRgb(SWATCHES[0].rgb)];
    const stepMs = CYCLE_STEP_SECONDS * 1000;
    const totalMs = stepMs * (stops.length - 1);
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) % totalMs;
      const segment = Math.floor(elapsed / stepMs);
      const t = (elapsed % stepMs) / stepMs;
      const [r1, g1, b1] = stops[segment];
      const [r2, g2, b2] = stops[segment + 1];
      const rgb = `${lerp(r1, r2, t)} ${lerp(g1, g2, t)} ${lerp(b1, b2, t)}`;
      document.documentElement.style.setProperty("--accent-rgb", rgb);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [cycling]);

  // Close the panel on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (rgb: string) => {
    setCycling(false);
    window.localStorage.removeItem(ACCENT_CYCLE_KEY);
    document.documentElement.style.setProperty("--accent-rgb", rgb);
    window.localStorage.setItem(ACCENT_STORAGE_KEY, rgb);
    setActive(rgb);
  };

  const toggleCycle = () => {
    setCycling((was) => {
      const next = !was;
      if (next) window.localStorage.setItem(ACCENT_CYCLE_KEY, "1");
      else window.localStorage.removeItem(ACCENT_CYCLE_KEY);
      return next;
    });
  };

  return (
    <div ref={rootRef} className="fixed bottom-5 right-5 z-[70] print:hidden">
      {/* Swatch panel */}
      <div
        id="lite-theme-panel"
        className={`absolute bottom-full right-0 mb-3 origin-bottom-right border border-ink bg-paper p-3 shadow-[6px_6px_0_0_var(--ink)] transition-all duration-300 ease-lite ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        <p className="lite-mono mb-2 text-[10px] uppercase tracking-[0.25em] text-ink/60">
          Accent
        </p>
        <div className="grid grid-cols-3 gap-2 w-max">
          {SWATCHES.map((s) => {
            const selected = !cycling && s.rgb === active;
            return (
              <button
                key={s.rgb}
                type="button"
                onClick={() => pick(s.rgb)}
                title={s.name}
                aria-label={`Couleur ${s.name}`}
                aria-pressed={selected}
                className={`relative h-8 w-8 border transition-colors duration-200 hover:brightness-110 ${
                  selected
                    ? "border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]"
                    : "border-ink/20"
                }`}
                style={{ background: `rgb(${s.rgb})` }}
              />
            );
          })}
          <button
            type="button"
            onClick={toggleCycle}
            title="Dégradé infini"
            aria-label="Activer le dégradé de couleurs infini"
            aria-pressed={cycling}
            className={`relative h-8 w-8 overflow-hidden rounded-full border transition-colors duration-200 hover:brightness-110 ${
              cycling
                ? "border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]"
                : "border-ink/20"
            }`}
          >
            <span
              aria-hidden="true"
              className="lite-cycle-swatch absolute inset-[-25%] block"
              style={{
                background: `conic-gradient(${SWATCHES.map((s) => `rgb(${s.rgb})`).join(", ")}, rgb(${SWATCHES[0].rgb}))`,
              }}
            />
          </button>
        </div>
      </div>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="lite-theme-panel"
        aria-label="Changer la couleur du site"
        className="flex h-12 w-12 items-center justify-center border border-ink bg-paper text-ink shadow-[4px_4px_0_0_var(--ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_6px_0_0_var(--ink)] active:translate-y-0 active:shadow-[3px_3px_0_0_var(--ink)]"
      >
        <span
          className="block h-5 w-5 rounded-full transition-colors duration-300"
          style={{ background: "var(--accent)" }}
        />
      </button>
    </div>
  );
}
