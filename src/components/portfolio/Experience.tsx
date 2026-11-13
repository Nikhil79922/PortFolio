import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { education, experience } from "@/lib/DynamicValues";
import { cn } from "@/lib/utils";
import Section, { Reveal } from "./Section";

const Experience = () => (
  <Section
    id="experience"
    eyebrow="Experience"
    title="Where I've worked"
    description="Production backend engineering, from API design to deployment."
  >
    <ol className="relative space-y-6 border-l border-border pl-6 sm:pl-8">
      {experience.map((job, i) => (
        <li key={`${job.company}-${job.role}`} className="relative">
          <span
            aria-hidden
            className={cn(
              "absolute -left-[31px] top-6 size-3.5 rounded-full border-2 border-background sm:-left-[39px]",
              job.current ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground/40"
            )}
          />
          <Reveal delay={i * 0.1}>
            <article className={cn("card-surface p-5 sm:p-6", job.current && "border-primary/30 bg-card")}>
              <header className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <p className="text-sm font-medium text-primary">{job.company}</p>
                </div>
                <p className="flex items-center gap-2 whitespace-nowrap font-mono text-xs text-muted-foreground">
                  {job.current && (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-sans font-medium text-emerald-600 dark:text-emerald-400">
                      Current
                    </span>
                  )}
                  {job.period}
                </p>
              </header>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-primary/70" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {job.tags && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        </li>
      ))}
    </ol>

    <Reveal className="mt-10">
      <div className="card-surface flex items-start gap-4 p-5 sm:p-6">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <GraduationCap className="size-5" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-semibold">{education.degree}</h3>
              <p className="text-sm text-muted-foreground">{education.school}</p>
            </div>
            <p className="font-mono text-xs text-muted-foreground">{education.period}</p>
          </div>
          {education.detail && (
            <Badge variant="outline" className="mt-3 border-primary/30 text-primary">
              {education.detail}
            </Badge>
          )}
        </div>
      </div>
    </Reveal>
  </Section>
);

export default Experience;
