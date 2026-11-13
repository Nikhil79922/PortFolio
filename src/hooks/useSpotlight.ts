import { useEffect } from "react";

/**
 * One delegated pointer listener that feeds the cursor position (--x / --y) to whichever
 * `.card-surface` is under the pointer, throttled to one write per animation frame.
 * Mouse/pen only — touch devices never pay for it.
 */
export function useSpotlight(selector = ".card-surface") {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;

    const flush = () => {
      frame = 0;
      if (!last) return;
      const target = (last.target as Element | null)?.closest<HTMLElement>(selector);
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty("--x", `${last.clientX - r.left}px`);
      target.style.setProperty("--y", `${last.clientY - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [selector]);
}
