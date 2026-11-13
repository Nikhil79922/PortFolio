import { ArrowRight, FileText, GraduationCap, Languages, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { education, profile } from "@/lib/DynamicValues";
import { cn, scrollToSection } from "@/lib/utils";
import ExternalLink from "./ExternalLink";
import SystemPanel from "./SystemPanel";

/** Staggered entrance using tailwindcss-animate (CSS only). */
const enter = (delay: string) =>
  cn("animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-1000 ease-smooth", delay);

const Hero = () => (
  <section id="home" aria-labelledby="home-title" className="pb-8 pt-10 sm:pt-16 lg:pt-20">
    <p className={cn(enter("delay-0"), "mb-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary")}>
      <span aria-hidden className="text-muted-foreground">$ </span>
      Hi, I'm {profile.name.split(" ")[0]}
      <span className="hidden sm:inline"> — {profile.role}</span>
      <span aria-hidden className="caret" />
    </p>

    <h1
      id="home-title"
      className={cn(
        enter("delay-150"),
        "max-w-3xl text-balance text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      )}
    >
      I build{" "}
      <span className="text-gradient">
        scalable, <span className="whitespace-nowrap">event-driven</span>
      </span>{" "}
      backend systems.
    </h1>

    <p className={cn(enter("delay-300"), "mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg")}>
      {profile.summary}
    </p>

    <ul
      className={cn(enter("delay-500"), "mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground")}
      aria-label="Quick facts"
    >
      <li className="flex items-center gap-2">
        <MapPin className="size-4 text-primary" aria-hidden /> {profile.location}
      </li>
      <li className="flex items-center gap-2">
        <GraduationCap className="size-4 text-primary" aria-hidden /> B.Tech CSE · {education.detail}
      </li>
      <li className="flex items-center gap-2">
        <Languages className="size-4 text-primary" aria-hidden /> {profile.languages.join(", ")}
      </li>
    </ul>

    <div className={cn(enter("delay-700"), "mt-8 flex flex-wrap gap-3")}>
      <Button size="lg" className="group" onClick={() => scrollToSection("projects")}>
        View my work
        <ArrowRight className="ml-2 size-4 transition-transform duration-500 ease-smooth group-hover:translate-x-1" aria-hidden />
      </Button>
      <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
        Get in touch
      </Button>
      <Button size="lg" variant="ghost" asChild>
        <ExternalLink href={profile.resumeUrl}>
          <FileText className="mr-2 size-4" aria-hidden /> Résumé
        </ExternalLink>
      </Button>
    </div>

    <div className={cn(enter("delay-1000"), "mt-12")}>
      <SystemPanel />
    </div>
  </section>
);

export default Hero;
