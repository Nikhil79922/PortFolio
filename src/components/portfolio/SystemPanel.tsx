import { useEffect, useMemo, useRef, useState } from "react";
import { stats } from "@/lib/DynamicValues";
import { cn } from "@/lib/utils";
import { SCROLL_IDLE_EVENT, SCROLL_START_EVENT } from "@/hooks/useScrollingClass";

/* ------------------------------------------------------------------------------------------
 * A representative event-driven architecture, rendered as a live SVG with simulated traffic.
 * Packets move with native SVG <animateMotion>, so no JS animation loop runs per frame.
 * ---------------------------------------------------------------------------------------- */

type Kind = "client" | "edge" | "service" | "data" | "bus";
type Point = [number, number];

interface FlowNode {
  id: string;
  label: string;
  sub: string;
  kind: Kind;
  detail: string;
  h: Point; // centre in the horizontal (desktop) layout
  v: Point; // centre in the vertical (mobile) layout
}

const NODES: FlowNode[] = [
  { id: "client", label: "Clients", sub: "web · mobile", kind: "client", h: [85, 170], v: [180, 30],
    detail: "Web & mobile clients — 50K+ users across 5 production applications." },
  { id: "gateway", label: "API Gateway", sub: "spring-cloud-gateway", kind: "edge", h: [265, 170], v: [180, 106],
    detail: "Spring Cloud Gateway — path-based routing, JWT validation and rate limiting at the edge." },
  { id: "auth", label: "Auth", sub: "jwt · rbac", kind: "service", h: [460, 70], v: [62, 190],
    detail: "Auth service — JWT with refresh-token rotation and role-based access control." },
  { id: "booking", label: "Booking", sub: "spring-boot · jpa", kind: "service", h: [460, 170], v: [180, 190],
    detail: "Booking service — Spring Boot + JPA; publishes domain events to Kafka." },
  { id: "payment", label: "Payments", sub: "razorpay · idempotent", kind: "service", h: [460, 270], v: [298, 190],
    detail: "Payment service — Razorpay integration with idempotency keys so retries never double-charge." },
  { id: "redis", label: "Redis", sub: "cache · sessions", kind: "data", h: [665, 50], v: [62, 274],
    detail: "Redis — caching layer that takes hot reads off the database and cuts response times." },
  { id: "kafka", label: "Kafka", sub: "event backbone", kind: "bus", h: [665, 170], v: [180, 274],
    detail: "Apache Kafka — the event backbone that keeps services asynchronous and decoupled." },
  { id: "postgres", label: "PostgreSQL", sub: "source of truth", kind: "data", h: [665, 290], v: [298, 274],
    detail: "PostgreSQL — transactional source of truth through Hibernate / JPA." },
  { id: "notify", label: "Notifications", sub: "email · sms · zendesk", kind: "service", h: [870, 110], v: [110, 358],
    detail: "Notification service — consumes events and fans out email, SMS and Zendesk updates." },
  { id: "saga", label: "Saga", sub: "orchestrator", kind: "service", h: [870, 230], v: [250, 358],
    detail: "Saga orchestrator — compensating transactions keep distributed state consistent." },
];

const EDGES: [string, string][] = [
  ["client", "gateway"],
  ["gateway", "auth"],
  ["gateway", "booking"],
  ["gateway", "payment"],
  ["auth", "redis"],
  ["booking", "redis"],
  ["booking", "kafka"],
  ["payment", "kafka"],
  ["payment", "postgres"],
  ["kafka", "notify"],
  ["kafka", "saga"],
];

const LAYOUTS = {
  h: { key: "h", w: 960, h: 340, nodeW: 150, nodeH: 52 },
  v: { key: "v", w: 360, h: 388, nodeW: 108, nodeH: 44 },
} as const;
type Layout = (typeof LAYOUTS)[keyof typeof LAYOUTS];

const DOT: Record<Kind, string> = {
  client: "fill-muted-foreground",
  edge: "fill-primary",
  service: "fill-primary",
  data: "fill-amber-500",
  bus: "fill-brand2",
};

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

function edgePath(a: FlowNode, b: FlowNode, L: Layout) {
  if (L.key === "h") {
    const [ax, ay] = a.h;
    const [bx, by] = b.h;
    const x1 = ax + L.nodeW / 2;
    const x2 = bx - L.nodeW / 2;
    const dx = (x2 - x1) / 2;
    return `M${x1} ${ay} C${x1 + dx} ${ay} ${x2 - dx} ${by} ${x2} ${by}`;
  }
  const [ax, ay] = a.v;
  const [bx, by] = b.v;
  const y1 = ay + L.nodeH / 2;
  const y2 = by - L.nodeH / 2;
  const dy = (y2 - y1) / 2;
  return `M${ax} ${y1} C${ax} ${y1 + dy} ${bx} ${y2 - dy} ${bx} ${y2}`;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** True while the element is on screen and the tab is visible. */
function useActiveInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return [ref, inView && visible] as const;
}

/* ------------------------------------ Diagram ------------------------------------ */

const Diagram = ({ active, setActive, running }: { active: string | null; setActive: (id: string | null) => void; running: boolean }) => {
  const wide = useMediaQuery("(min-width: 640px)");
  const L: Layout = wide ? LAYOUTS.h : LAYOUTS.v;
  const svgRef = useRef<SVGSVGElement>(null);
  const pointerType = useRef<string>("mouse");

  // Pause SMIL animations when off-screen / tab hidden / reduced motion — and while the page is
  // scrolling: SMIL forces a layout + paint every frame (measured), so scrolling would stutter.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canAnimate = running && !reduce;
    const sync = () => {
      if (canAnimate && !document.documentElement.classList.contains("is-scrolling")) svg.unpauseAnimations();
      else svg.pauseAnimations();
    };
    sync();
    window.addEventListener(SCROLL_START_EVENT, sync);
    window.addEventListener(SCROLL_IDLE_EVENT, sync);
    return () => {
      window.removeEventListener(SCROLL_START_EVENT, sync);
      window.removeEventListener(SCROLL_IDLE_EVENT, sync);
    };
  }, [running, L.key]);

  const connected = useMemo(() => {
    if (!active) return null;
    const set = new Set<string>([active]);
    EDGES.forEach(([a, b]) => {
      if (a === active) set.add(b);
      if (b === active) set.add(a);
    });
    return set;
  }, [active]);

  const pos = (n: FlowNode) => (L.key === "h" ? n.h : n.v);

  return (
    // Keyed by layout: crossing the 640px breakpoint cross-fades the new layout in instead of snapping.
    <div key={L.key} className="animate-in fade-in zoom-in-[0.98] duration-500 ease-smooth">
    <svg
      ref={svgRef}
      viewBox={`0 0 ${L.w} ${L.h}`}
      className="h-auto w-full select-none"
      role="img"
      aria-labelledby="sys-title sys-desc"
    >
      <title id="sys-title">Representative event-driven microservice architecture</title>
      <desc id="sys-desc">
        Clients call an API gateway that routes to auth, booking and payment services. Services cache in Redis,
        persist to PostgreSQL and publish events to Kafka, which feeds notification and saga-orchestrator consumers.
      </desc>
      {/* Edges. Perf: no SVG filters and no animated dashes — those repaint the whole SVG every
          frame. Each packet is a cheap halo + core group moved by one native <animateMotion>. */}
      {EDGES.map(([a, b], i) => {
        const id = `edge-${L.key}-${i}`;
        const d = edgePath(byId[a], byId[b], L);
        const lit = connected ? connected.has(a) && connected.has(b) && (a === active || b === active) : false;
        const dim = connected && !lit;
        const bus = a === "kafka" || b === "kafka";
        const dur = 2.1 + (i % 4) * 0.35;
        const begin = ((i * 0.43) % 2).toFixed(2);
        return (
          <g key={id} className={cn("transition-opacity duration-500 ease-smooth", dim ? "opacity-15" : "opacity-100")}>
            <path id={id} d={d} className="fill-none stroke-border" strokeWidth={1.5} />
            <path
              d={d}
              className={cn(
                "flow-line fill-none transition-[stroke,stroke-width] duration-500 ease-smooth",
                lit ? "stroke-primary" : bus ? "stroke-brand2/60" : "stroke-primary/45"
              )}
              strokeWidth={lit ? 2 : 1.5}
            />
            <g className={cn("packet", bus ? "fill-brand2" : "fill-primary")} opacity={0}>
              <circle r={7.5} opacity={0.18} />
              <circle r={3.2} />
              <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.25 1">
                <mpath href={`#${id}`} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
            </g>
          </g>
        );
      })}

      {/* Nodes */}
      {NODES.map((n) => {
        const [cx, cy] = pos(n);
        const isActive = active === n.id;
        const dim = connected && !connected.has(n.id);
        return (
          <g
            key={n.id}
            transform={`translate(${cx - L.nodeW / 2} ${cy - L.nodeH / 2})`}
            className={cn("cursor-pointer transition-opacity duration-500 ease-smooth", dim ? "opacity-35" : "opacity-100")}
            onPointerDown={(e) => (pointerType.current = e.pointerType)}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(n.id)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
            onClick={() => setActive(isActive && pointerType.current !== "mouse" ? null : n.id)}
          >
            <rect
              width={L.nodeW}
              height={L.nodeH}
              rx={12}
              className={cn(
                "fill-card transition-[stroke] duration-500 ease-smooth",
                isActive ? "stroke-primary" : "stroke-border"
              )}
              strokeWidth={isActive ? 2 : 1.25}
            />
            <circle cx={L.key === "h" ? 16 : 13} cy={L.nodeH / 2} r={4} className={DOT[n.kind]} />
            {L.key === "h" ? (
              <>
                <text x={28} y={L.nodeH / 2 - 3} className="fill-foreground text-[13px] font-semibold">
                  {n.label}
                </text>
                <text x={28} y={L.nodeH / 2 + 13} className="fill-muted-foreground font-mono text-[10px]">
                  {n.sub}
                </text>
              </>
            ) : (
              <text x={23} y={L.nodeH / 2 + 4} className="fill-foreground text-[12px] font-semibold">
                {n.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
    </div>
  );
};

/* ------------------------------------ Log stream ------------------------------------ */

const LOGS: [level: "INFO" | "WARN", svc: string, msg: string][] = [
  ["INFO", "gateway", "POST /api/bookings → booking · 201 · 23ms"],
  ["INFO", "booking", "BookingCreated → kafka booking.events"],
  ["INFO", "kafka", "booking.events p2 @48121 → 2 consumer groups"],
  ["INFO", "redis", "GET user:42 · cache HIT · 0.4ms"],
  ["INFO", "payment", "razorpay.capture · idempotency-key ✓ no double charge"],
  ["WARN", "payment", "upstream timeout · retry 1/3 in 200ms"],
  ["INFO", "saga", "transfer#9813 step 2 failed → compensating"],
  ["INFO", "saga", "transfer#9814 · 3/3 steps committed"],
  ["INFO", "notify", "email + SMS dispatched · zendesk synced"],
  ["INFO", "auth", "JWT refreshed · refresh token rotated"],
];

const stamp = () => new Date().toTimeString().slice(0, 8);

const LogStream = ({ running }: { running: boolean }) => {
  const [lines, setLines] = useState(() => LOGS.slice(0, 4).map((l, i) => ({ id: i, t: stamp(), l })));
  const next = useRef(4);

  // Runs in reduced-motion mode too: new lines only fade in (movement is stripped by CSS).
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      const id = next.current++;
      setLines((prev) => [...prev.slice(-3), { id, t: stamp(), l: LOGS[id % LOGS.length] }]);
    }, 1900);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div aria-hidden className="flex h-[4.35rem] flex-col justify-end overflow-hidden font-mono text-[11px] leading-[1.45rem] sm:h-[5.75rem] sm:text-xs">
      {lines.map(({ id, t, l: [lvl, svc, msg] }, i) => (
        <div
          key={id}
          className={cn(
            "flex min-w-0 gap-2 whitespace-nowrap transition-opacity duration-500",
            i === lines.length - 1 ? "animate-in fade-in slide-in-from-bottom-2 duration-700 ease-smooth" : "opacity-60"
          )}
        >
          <span className="hidden text-muted-foreground/70 sm:inline">{t}</span>
          <span className={lvl === "WARN" ? "text-amber-500" : "text-emerald-500"}>{lvl}</span>
          <span className="w-[3.25rem] shrink-0 text-primary sm:w-14">{svc}</span>
          <span className="min-w-0 flex-1 truncate text-foreground/80">{msg}</span>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------ Count-up stat ------------------------------------ */

const CountUp = ({ value, run }: { value: string; run: boolean }) => {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match?.[1].split(".")[1]?.length ?? 0;
  const suffix = match?.[2] ?? "";
  const [n, setN] = useState(0);
  const started = useRef(false);

  // Deps are primitives only: a fresh `match` array each render would re-run the effect every
  // frame, and its cleanup would cancel the animation mid-way (the count would freeze).
  useEffect(() => {
    if (!run || started.current || !target) return;
    started.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setN(p < 1 ? target * (1 - Math.pow(2, -10 * p)) : target); // ease-out-expo
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // If interrupted (scrolled away / unmounted), land on the final value instead of freezing.
    return () => {
      cancelAnimationFrame(raf);
      setN(target);
    };
  }, [run, target]);

  if (!match) return <>{value}</>;
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden>
        {n.toFixed(decimals)}
        {suffix}
      </span>
    </>
  );
};

/* ------------------------------------ Panel ------------------------------------ */

const SystemPanel = () => {
  const [active, setActive] = useState<string | null>(null);
  const [ref, running] = useActiveInView<HTMLDivElement>();
  const node = active ? byId[active] : null;

  return (
    <div ref={ref} className="card-surface">
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-red-500/70" />
            <span className="size-2.5 rounded-full bg-amber-500/70" />
            <span className="size-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <p className="truncate font-mono text-xs text-muted-foreground">
            <span className="text-foreground">~/architecture</span>
            <span className="hidden sm:inline"> — how I build backend systems</span>
          </p>
        </div>
        <p className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          LIVE<span className="hidden sm:inline"> · simulated</span>
        </p>
      </div>

      {/* Diagram */}
      <div className="px-2 pb-1 pt-3 sm:px-5 sm:pb-2 sm:pt-5">
        <Diagram active={active} setActive={setActive} running={running} />
      </div>

      {/* Inspector + logs */}
      <div className="grid grid-cols-1 border-t lg:grid-cols-[1fr_1.35fr]">
        <div className="min-h-[4.75rem] min-w-0 border-b px-4 py-3 sm:min-h-[5.75rem] lg:border-b-0 lg:border-r" aria-live="polite">
          <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Inspector</p>
          {node ? (
            <p key={node.id} className="text-sm leading-relaxed animate-in fade-in slide-in-from-left-2 duration-500 ease-smooth">
              <span className="font-semibold text-foreground">{node.label}</span>{" "}
              <span className="text-muted-foreground">— {node.detail.split(" — ")[1] ?? node.detail}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              <span className="hidden [@media(hover:hover)]:inline">Hover</span>
              <span className="[@media(hover:hover)]:hidden">Tap</span> any service to see what I built there.
            </p>
          )}
        </div>
        <div className="min-w-0 overflow-hidden bg-muted/30 px-4 py-3">
          <LogStream running={running} />
        </div>
      </div>

      {/* Metrics */}
      <dl className="grid grid-cols-2 border-t sm:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex flex-col-reverse gap-1 px-4 py-4 sm:px-5",
              i % 2 === 1 && "border-l",
              i >= 2 && "border-t sm:border-t-0",
              i === 2 && "sm:border-l"
            )}
          >
            <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{s.label}</dt>
            <dd className="text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">
              <CountUp value={s.value} run={running} />
            </dd>
          </div>
        ))}
      </dl>

      <p className="sr-only">Representative architecture with simulated traffic, for illustration.</p>
    </div>
  );
};

export default SystemPanel;
