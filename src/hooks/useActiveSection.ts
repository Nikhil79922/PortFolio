import { useEffect, useRef, useState } from "react";
import { NAV_DONE_EVENT, NAV_TARGET_EVENT } from "@/lib/utils";

/**
 * Tracks which section is in the reading zone of the viewport.
 *
 * When the user clicks a nav item, the indicator jumps straight to the target (one smooth
 * glide) and observer updates are ignored until the eased scroll reports it is done — otherwise the
 * indicator would stutter through every section the smooth scroll passes.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const locked = useRef(false);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        if (locked.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    elements.forEach((el) => observer.observe(el));

    // At the very bottom the last section is active (it may be too short to reach the zone).
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!locked.current && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
          setActive(ids[ids.length - 1]);
        }
      });
    };

    let unlockTimer = 0;
    const unlock = () => {
      window.clearTimeout(unlockTimer);
      locked.current = false;
    };
    const onNavTarget = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      locked.current = true;
      setActive(id);
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(unlock, 2000); // safety net
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(NAV_DONE_EVENT, unlock);
    window.addEventListener(NAV_TARGET_EVENT, onNavTarget);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(unlockTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(NAV_DONE_EVENT, unlock);
      window.removeEventListener(NAV_TARGET_EVENT, onNavTarget);
    };
  }, [ids]);

  return active;
}
