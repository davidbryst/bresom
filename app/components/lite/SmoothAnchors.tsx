import { useEffect } from "react";

/**
 * Smooth in-page anchor scrolling for the lite build (no Lenis).
 *
 * Fixes two issues with plain `<a href="#x">`:
 *  1. Native browsers only scroll when the URL hash *changes* — clicking the
 *     same anchor again (e.g. "back to top") does nothing. We always scroll.
 *  2. The fixed header would overlap the target — we offset by its height.
 *
 * Also clears any body scroll-lock (mobile menu) before scrolling.
 */
export default function SmoothAnchors() {
  useEffect(() => {
    const HEADER_OFFSET = 72;

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const anchor = (e.target as HTMLElement).closest?.(
        'a[href^="#"], a[href^="/#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href === "/#") return;

      // "/#hash" only resolves here when the target lives on the current
      // page (i.e. we're already on "/"). Otherwise let the browser do a
      // real navigation to "/" and jump to the hash natively.
      const hash = href.startsWith("/") ? href.slice(1) : href;
      const el = document.querySelector(hash);
      if (!el) return;

      e.preventDefault();

      // Release any scroll-lock left by the mobile menu so scrollTo can run.
      document.body.style.overflow = "";

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const top =
        (el as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        HEADER_OFFSET;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduce ? "auto" : "smooth",
      });

      // Keep the hash in the URL (shareable) without re-triggering a native jump.
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
