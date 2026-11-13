import { skillGroups } from "@/lib/DynamicValues";
import { cn } from "@/lib/utils";
import TechLogo from "./TechLogo";

const LOGOS = skillGroups.flatMap((g) => g.skills).filter((s) => s.logo);

/** Infinite, pause-on-hover strip of the stack. Pure CSS; static and wrapped when motion is reduced. */
const TechMarquee = () => (
  <section aria-label="Technologies I work with" className="py-6">
    <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      Production stack
    </p>
    <div className="marquee overflow-hidden motion-reduce:[mask-image:none]">
      {/* Per-item margin (not gap) keeps both copies exactly equal width → seamless -50% loop. */}
      <ul className="marquee-track motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3">
        {[0, 1].map((copy) =>
          LOGOS.map((s) => (
            <li
              key={`${copy}-${s.name}`}
              aria-hidden={copy === 1 || undefined}
              className={cn(
                "mr-3 flex shrink-0 items-center gap-2 rounded-full border bg-card/80 px-3.5 py-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground",
                copy === 1 && "motion-reduce:hidden"
              )}
            >
              <TechLogo name={s.name} src={s.logo} className={cn("size-4", s.invertOnDark && "dark:invert")} />
              {s.name}
            </li>
          ))
        )}
      </ul>
    </div>
  </section>
);

export default TechMarquee;
