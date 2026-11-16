import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  /** Accessible name for the list, e.g. "Featured projects". */
  label: string;
  children: React.ReactNode[];
  /** Grid layout used from md (768px) up, e.g. "md:grid-cols-2". */
  gridClassName?: string;
}

/**
 * Phones (< md): a native scroll-snap carousel that bleeds to the screen edges, shows a peek of
 * the next card, and has an animated pager + counter. Tablet/desktop (md+): a regular grid.
 * Scrolling is native (compositor-driven), so swiping stays smooth on low-end phones.
 */
const SwipeCarousel = ({ label, children, gridClassName }: Props) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = children.length;

  // Track the snapped card (rAF-throttled).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const items = track.children;
        if (!items.length) return;
        const first = items[0] as HTMLElement;
        const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        setIndex(atEnd ? count - 1 : Math.round(track.scrollLeft / step));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const item = track?.children[i] as HTMLElement | undefined;
    if (!track || !item) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: item.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: reduce ? "auto" : "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo(Math.min(count - 1, index + 1));
    else if (e.key === "ArrowLeft") goTo(Math.max(0, index - 1));
  };

  return (
    <div>
      <ul
        ref={trackRef}
        aria-label={label}
        onKeyDown={onKeyDown}
        className={cn(
          // phones: edge-to-edge horizontal snap scroller
          "-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-1 sm:-mx-8 sm:scroll-px-8 sm:px-8",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          // tablet / desktop: plain grid
          "md:mx-0 md:grid md:snap-none md:gap-4 md:overflow-visible md:px-0 md:pb-0",
          gridClassName
        )}
      >
        {children.map((child, i) => (
          <li
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="flex w-[85%] shrink-0 snap-start sm:w-[70%] md:w-auto [&>*]:w-full"
          >
            {child}
          </li>
        ))}
      </ul>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-between md:hidden">
          <span className="font-mono text-xs tabular-nums text-muted-foreground" aria-hidden>
            <span key={index} className="inline-block text-foreground animate-in fade-in slide-in-from-bottom-1 duration-300">
              {String(index + 1).padStart(2, "0")}
            </span>{" "}
            / {String(count).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            {children.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show item ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
                className="grid h-6 place-items-center px-0.5"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-500 ease-smooth",
                    i === index ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/35"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SwipeCarousel;
