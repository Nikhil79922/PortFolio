import { Fragment } from "react";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { education, experience } from "@/lib/DynamicValues";
import { cn } from "@/lib/utils";
import Section, { Reveal } from "./Section";

/** Highlights scan faster when the numbers stand out. */
const emphasizeNumbers = (text: string) =>
  text.split(/(\d[\d,.]*\+?%?)/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Experience = () => {
  // A vertical timeline only makes sense with more than one role.
  const timeline = experience.length > 1;

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Shipping production backends"
      description="Designing, securing and deploying Java microservices — from API design to CI/CD."
    >
      <ol className={cn("relative space-y-6", timeline && "border-l border-border pl-6 sm:pl-8")}>
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.role}`} className="relative">
            {timeline && (
              <span
                aria-hidden
                className={cn(
                  "absolute -left-[31px] top-6 size-3.5 rounded-full border-2 border-background sm:-left-[39px]",
                  job.current ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground/40"
                )}
              />
            )}
            <Reveal delay={i * 0.1}>
              <article className={cn("card-surface p-4 sm:p-6", job.current && "border-primary/30 bg-card")}>
                <header className="flex items-start gap-3 sm:gap-4">
                  <div
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-brand2/20 font-semibold text-primary ring-1 ring-primary/20 sm:size-12"
                  >
                    {initials(job.company)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold leading-snug sm:text-lg">{job.role}</h3>
                        <p className="text-sm font-medium text-primary">{job.company}</p>
                      </div>
                      <p className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px] text-muted-foreground sm:text-xs">
                        {job.current && (
                          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-sans font-medium text-emerald-600 dark:text-emerald-400">
                            Current
                          </span>
                        )}
                        {job.period}
                      </p>
                    </div>
                  </div>
                </header>

                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:mt-5">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-brand2" />
                      <span>{emphasizeNumbers(h)}</span>
                    </li>
                  ))}
                </ul>

                {job.tags && (
                  <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">
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

      <Reveal className="mt-4 sm:mt-6">
        <div className="card-surface flex items-start gap-3 p-4 sm:gap-4 sm:p-6">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary sm:size-12">
            <GraduationCap className="size-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-semibold leading-snug">{education.degree}</h3>
                <p className="text-sm text-muted-foreground">{education.school}</p>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground sm:text-xs">{education.period}</p>
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
};

export default Experience;
