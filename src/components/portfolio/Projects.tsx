import { ArrowUpRight, Github, Lock } from "lucide-react";
import { projects } from "@/lib/DynamicValues";
import { IProject } from "@/lib/Models";
import { cn } from "@/lib/utils";
import ExternalLink from "./ExternalLink";
import Section, { Reveal } from "./Section";

const ProjectCard = ({ project, featured }: { project: IProject; featured?: boolean }) => {
  const href = project.live ?? project.repo;

  return (
    <article
      className={cn(
        "card-surface card-interactive group flex h-full flex-col p-6",
        featured && "bg-gradient-to-br from-card via-card to-primary/[0.04]"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold leading-snug sm:text-lg">
          {href ? (
            <ExternalLink href={href} className="after:absolute after:inset-0 after:rounded-xl focus-visible:ring-0">
              {project.title}
            </ExternalLink>
          ) : (
            project.title
          )}
        </h3>
        {href ? (
          <span className="flex shrink-0 items-center gap-1 text-muted-foreground transition-colors group-hover:text-primary">
            {project.repo && !project.live && <Github className="size-4" aria-hidden />}
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
      description="Distributed systems built with Spring Boot, messaging and caching at their core."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.12} className="h-full">
            <ProjectCard project={p} featured />
          </Reveal>
        ))}
      </div>

      {others.length > 0 && (
        <>
          <Reveal>
            <h3 className="mb-4 mt-12 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              More projects
            </h3>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            {others.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.1} className="h-full">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </>
      )}
    </Section>
  );
};

export default Projects;
