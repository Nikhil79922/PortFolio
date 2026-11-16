import { ArrowUpRight, Trophy } from "lucide-react";
import { achievements } from "@/lib/DynamicValues";
import ExternalLink from "./ExternalLink";
import Section, { Reveal } from "./Section";
import SwipeCarousel from "./SwipeCarousel";

const Achievements = () => (
  <Section id="achievements" eyebrow="Recognition" title="Achievements">
    <Reveal>
      <SwipeCarousel label="Achievements" gridClassName="md:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={(i % 2) * 0.12} className="h-full max-md:!translate-y-0 max-md:!opacity-100">
            <article className="card-surface card-interactive group flex h-full gap-4 p-5">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-500/10 text-amber-500 transition-transform duration-500 ease-smooth group-hover:scale-110">
                <Trophy className="size-5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-snug">
                    {a.href ? (
                      <ExternalLink href={a.href} className="after:absolute after:inset-0 after:rounded-xl">
                        {a.title}
                      </ExternalLink>
                    ) : (
                      a.title
                    )}
                  </h3>
                  {a.href && (
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-muted-foreground transition-[color,transform] duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  )}
                </div>
                <p className="mt-0.5 text-xs font-medium text-primary">{a.org}</p>
                <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </SwipeCarousel>
    </Reveal>
  </Section>
);

export default Achievements;
