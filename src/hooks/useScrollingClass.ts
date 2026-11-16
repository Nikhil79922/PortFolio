import { useEffect } from "react";

/** Fired on window when a scroll gesture starts / settles. */
export const SCROLL_START_EVENT = "scroll:start";
export const SCROLL_IDLE_EVENT = "scroll:idle";

/**
 * Adds `is-scrolling` to <html> while the page is scrolling and removes it ~160ms after the
 * last scroll event. Paint-heavy decorative loops pause on that class (see index.css) and the
 * architecture diagram pauses its SVG animation on these events, so scrolling only composites.
 * The class flips twice per gesture — not per frame — so it costs almost nothing.
 */
export function useScrollingClass(idleMs = 160) {
  useEffect(() => {
    const root = document.documentElement;
    let timer = 0;
    let scrolling = false;

    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        root.classList.add("is-scrolling");
        window.dispatchEvent(new Event(SCROLL_START_EVENT));
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        scrolling = false;
        root.classList.remove("is-scrolling");
        window.dispatchEvent(new Event(SCROLL_IDLE_EVENT));
      }, idleMs);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      root.classList.remove("is-scrolling");
    };
  }, [idleMs]);
}
