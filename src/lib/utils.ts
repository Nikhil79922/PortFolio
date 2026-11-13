import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Fired by scrollToSection so navigation can highlight the target immediately… */
export const NAV_TARGET_EVENT = "nav:target";
/** …and this one when the scroll has finished (or was interrupted by the user). */
export const NAV_DONE_EVENT = "nav:done";

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
let cancelActiveScroll: (() => void) | null = null;

/**
 * Eased scroll to a section. Slower and softer than the browser's native smooth scroll,
 * duration scales with distance (0.7–1.1s), and it yields instantly to the user: any wheel,
 * touch or key press cancels it. Reduced-motion users get an instant jump.
 */
export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  cancelActiveScroll?.();
  window.dispatchEvent(new CustomEvent(NAV_TARGET_EVENT, { detail: id }));
  history.replaceState(null, "", `#${id}`);

  const root = document.documentElement;
  const offset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
  const maxY = root.scrollHeight - window.innerHeight;
  const startY = window.scrollY;
  const targetY = Math.min(maxY, Math.max(0, el.getBoundingClientRect().top + startY - offset));
  const distance = targetY - startY;
  const done = () => window.dispatchEvent(new Event(NAV_DONE_EVENT));

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(distance) < 2) {
    window.scrollTo({ top: targetY, behavior: "instant" });
    done();
    return;
  }

  const duration = Math.min(1100, Math.max(700, Math.abs(distance) * 0.35));
  const start = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    cancelActiveScroll = null;
    done();
  };
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: startY + distance * easeInOutCubic(t), behavior: "instant" });
    if (t < 1) frame = requestAnimationFrame(step);
    else stop();
  };

  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  cancelActiveScroll = stop;
  frame = requestAnimationFrame(step);
};

/**
 * Only allow safe, expected link targets: https URLs, mailto:, and same-site paths
 * ("/..."). Protocol-relative URLs ("//host") and javascript:/data: are rejected.
 */
export const isSafeHref = (url?: string): url is string =>
  !!url && (/^(https:\/\/|mailto:)/i.test(url) || /^\/(?!\/)/.test(url));

/**
 * Copies text to the clipboard. Falls back to a hidden <textarea> + execCommand when the
 * async Clipboard API is unavailable or blocked (insecure context, unfocused document).
 */
export const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      ta.remove();
    }
  }
};

/** Links that should open in a new tab (anything except mailto:). */
export const opensNewTab = (url: string) => !/^mailto:/i.test(url);
