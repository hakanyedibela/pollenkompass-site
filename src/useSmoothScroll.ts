import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Lenis inertial page scrolling — the wheel carries a little weight instead of
 * snapping, which suits a page that reads as an instrument.
 *
 * Under `prefers-reduced-motion` Lenis is never constructed, so scrolling stays
 * fully native and the CSS fallback in styles.css governs anchor jumps. The
 * media query is watched, not just sampled, so toggling the OS setting mid-visit
 * takes effect without a reload.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const sync = () => {
      if (reduced.matches) {
        lenis?.destroy();
        lenis = null;
        return;
      }
      lenis ??= new Lenis({
        // Restrained: enough glide to feel damped, not enough to feel laggy.
        duration: 0.9,
        // Lenis drives its own rAF loop and intercepts in-page anchor clicks
        // (the skip link) so they land smoothly instead of jumping.
        autoRaf: true,
        anchors: true,
      });
    };

    sync();
    reduced.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);
}
