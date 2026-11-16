import { ArrowUpRight, Github, Lock } from "lucide-react";
import { projects } from "@/lib/DynamicValues";
import { IProject } from "@/lib/Models";
import { cn } from "@/lib/utils";
import ExternalLink from "./ExternalLink";
import Section, { Reveal } from "./Section";
import SwipeCarousel from "./SwipeCarousel";

/** Inside phone carousels cards are shown immediately (the carousel itself fades in once). */
const IN_CAROUSEL = "h-full max-md:!translate-y-0 max-md:!opacity-100";

const ProjectCard = ({ project, index }: { project: IProject; index?: number }) => {
  const href = project.live ?? project.repo;
  const featured = index !== undefined;

  return (
    <article
      className={cn(
        "card-surface card-interactive group flex h-full flex-col p-5 sm:p-6",
        featured && "bg-gradient-to-br from-card via-card to-primary/[0.05]"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {featured && (
            <p className="mb-2 font-mono text-[11px] tabular-nums tracking-wider text-primary/80">
              {String(index + 1).padStart(2, "0")}
            </p>
          )}
          <h3 className="text-[17px] font-semibold leading-snug sm:text-lg">
            {href ? (
              <ExternalLink href={href} className="after:absolute after:inset-0 after:rounded-xl focus-visible:ring-0">
                {project.title}
              </ExternalLink>
            ) : (
              project.title
            )}
          </h3>
        </div>
        {href ? (
          <span className="flex shrink-0 items-center gap-1 text-muted-foreground transition-colors duration-300 group-hover:text-primary">
            {project.repo && !project.live && <Github className="size-4" aria-hidden />}
            <ArrowUpRight
              className="size-4 transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        ) : (
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground" title="Private / proprietary">
            <Lock className="size-3.5" aria-hidden /> Private
          </span>
        )}
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.tags.map((t) => (
          <li key={t} className="rounded-md border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
};

const Projects = () => {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Distributed systems with Spring Boot, messaging and caching at their core."
    >
      <Reveal>
        <SwipeCarousel label="Featured projects" gridClassName="md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.12} className={IN_CAROUSEL}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </SwipeCarousel>
      </Reveal>

      {others.length > 0 && (
        <>
          <Reveal>
            <h3 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-wider text-muted-foreground sm:mt-12">
              More projects
            </h3>
          </Reveal>
          <Reveal>
            <SwipeCarousel label="More projects" gridClassName="md:grid-cols-2 2xl:grid-cols-4">
              {others.map((p, i) => (
                <Reveal key={p.title} delay={(i % 4) * 0.1} className={IN_CAROUSEL}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </SwipeCarousel>
          </Reveal>
        </>
      )}
    </Section>
  );
};

export default Projects;
