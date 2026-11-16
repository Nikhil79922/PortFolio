import { useRef, useState } from "react";
import { Cloud, Code2, CreditCard, Database, Layers, Network, ShieldCheck, type LucideIcon } from "lucide-react";
import { alsoFamiliar, skillGroups } from "@/lib/DynamicValues";
import { ISkillGroup, SkillGroupIcon } from "@/lib/Models";
import { cn } from "@/lib/utils";
import Section, { Reveal } from "./Section";
import TechLogo from "./TechLogo";

const GROUP_ICONS: Record<SkillGroupIcon, LucideIcon> = {
  code: Code2,
  layers: Layers,
  network: Network,
  database: Database,
  shield: ShieldCheck,
  cloud: Cloud,
  "credit-card": CreditCard,
};

const SkillChips = ({ group }: { group: ISkillGroup }) => (
  <ul className="flex flex-wrap gap-2">
    {group.skills.map((skill) => (
      <li key={skill.name} className="flex items-center gap-2 rounded-lg border bg-background/60 px-2.5 py-1.5 text-sm">
        {skill.logo && (
          <TechLogo name={skill.name} src={skill.logo} className={cn("size-4", skill.invertOnDark && "dark:invert")} />
        )}
        {skill.name}
      </li>
    ))}
  </ul>
);

/** Phones: category tabs + one panel (swipe or tap to switch) instead of seven stacked cards. */
const MobileSkillTabs = () => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const n = skillGroups.length;
  const group = skillGroups[active];

  const select = (i: number, focus = false) => {
    const next = (i + n) % n;
    if (next === active) return;
    setDir(next > active ? 1 : -1);
    setActive(next);
    const tab = tabRefs.current[next];
    const list = listRef.current;
    if (tab && list) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollTo({ left: tab.offsetLeft - list.clientWidth / 2 + tab.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
    }
    if (focus) tab?.focus({ preventScroll: true });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: n - 1 };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  return (
    <div className="md:hidden">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Skill categories"
        onKeyDown={onKeyDown}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {skillGroups.map((g, i) => {
          const Icon = GROUP_ICONS[g.icon];
          const selected = i === active;
          return (
            <button
              key={g.title}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={`skill-tab-${i}`}
              aria-selected={selected}
              aria-controls="skill-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-[color,background-color,border-color,transform] duration-300 ease-smooth active:scale-95",
                selected ? "border-primary/40 bg-primary/10 text-primary" : "bg-card/80 text-muted-foreground"
              )}
            >
              <Icon className="size-4" aria-hidden />
              {g.title}
            </button>
          );
        })}
      </div>

      <div
        id="skill-panel"
        role="tabpanel"
        aria-labelledby={`skill-tab-${active}`}
        className="card-surface mt-3 min-h-[11.5rem] overflow-hidden p-4"
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const start = touch.current;
          touch.current = null;
          if (!start) return;
          const dx = e.changedTouches[0].clientX - start.x;
          const dy = e.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) select(active + (dx < 0 ? 1 : -1));
        }}
      >
        <div
          key={active}
          className={cn(
            "animate-in fade-in duration-500 ease-smooth",
            dir === 1 ? "slide-in-from-right-6" : "slide-in-from-left-6"
          )}
        >
          <p className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>{group.skills.length} skills</span>
            <span aria-hidden>
              {active + 1}/{n} · swipe
            </span>
          </p>
          <SkillChips group={group} />
        </div>
      </div>
    </div>
  );
};

const Skills = () => (
  <Section
    id="skills"
    eyebrow="Skills"
    title="Tools of the trade"
    description="Java-first, with a deep focus on microservices, messaging and data."
  >
    <Reveal>
      <MobileSkillTabs />
    </Reveal>

    <div className="hidden gap-4 md:grid md:grid-cols-2 2xl:grid-cols-3">
      {skillGroups.map((group, i) => {
        const Icon = GROUP_ICONS[group.icon];
        return (
          <Reveal key={group.title} delay={(i % 2) * 0.12} className="h-full">
            <div className="card-surface h-full p-5">
              <h3 className="flex items-center gap-2.5 text-sm font-semibold">
                <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                {group.title}
              </h3>
              <div className="mt-4">
                <SkillChips group={group} />
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>

    {alsoFamiliar.length > 0 && (
      <Reveal className="mt-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Also familiar with:</span> {alsoFamiliar.join(" · ")}
        </p>
      </Reveal>
    )}
  </Section>
);

export default Skills;
