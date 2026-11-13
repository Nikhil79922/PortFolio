import React, { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/DynamicValues";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

// One shared observer for every <Reveal>, instead of one per element.
type Callback = () => void;
const callbacks = new WeakMap<Element, Callback>();
let observer: IntersectionObserver | null = null;
const getObserver = () =>
  (observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -60px 0px" }
  ));

/** Fades content up the first time it scrolls into view. Pure CSS transition — no animation library. */
export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Delay in seconds. */
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = getObserver();
    callbacks.set(el, () => setShown(true));
    io.observe(el);
    return () => {
      callbacks.delete(el);
      io.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay * 1000}ms` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-1000 ease-smooth motion-reduce:!translate-y-0 print:translate-y-0 print:opacity-100",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
};

const Section = ({ id, eyebrow, title, description, className, children }: SectionProps) => {
  const n = navItems.findIndex((item) => item.id === id);
  return (
  <section id={id} aria-labelledby={`${id}-title`} className={cn("py-14 sm:py-20", className)}>
    <Reveal className="mb-8 max-w-2xl sm:mb-10">
      <p className="mb-3 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
        {n > 0 && <span className="text-muted-foreground">{String(n).padStart(2, "0")}</span>}
        <span aria-hidden className="h-px w-8 bg-gradient-to-r from-primary to-brand2" />
        {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-pretty text-base text-muted-foreground">{description}</p>}
    </Reveal>
    {children}
  </section>
  );
};

export default Section;
