import { ArrowUpRight, Trophy } from "lucide-react";
import { achievements } from "@/lib/DynamicValues";
import ExternalLink from "./ExternalLink";
import Section, { Reveal } from "./Section";

const Achievements = () => (
  <Section id="achievements" eyebrow="Recognition" title="Achievements">
    <div className="grid gap-4 sm:grid-cols-2">
      {achievements.map((a, i) => (
        <Reveal key={a.title} delay={(i % 2) * 0.12} className="h-full">
          <article className="card-surface card-interactive group flex h-full gap-4 p-5">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-500/10 text-amber-500">
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
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  />
                )}
              </div>
              <p className="mt-0.5 text-xs font-medium text-primary">{a.org}</p>
              <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Achievements;
