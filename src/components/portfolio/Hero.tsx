import { ArrowRight, FileText, GraduationCap, Languages, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { education, profile } from "@/lib/DynamicValues";
import { cn, scrollToSection } from "@/lib/utils";
import ExternalLink from "./ExternalLink";
import SystemPanel from "./SystemPanel";

/** Staggered entrance using tailwindcss-animate (CSS only). */
const enter = (delay: string) =>
  cn("animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-1000 ease-smooth", delay);

const FACTS = [
  { icon: MapPin, text: profile.location },
  { icon: GraduationCap, text: `B.Tech CSE · ${education.detail}` },
  { icon: Languages, text: profile.languages.join(", ") },
];

const Hero = () => (
  <section id="home" aria-labelledby="home-title" className="pb-6 pt-8 sm:pb-8 sm:pt-16 lg:pt-20">
    {/* Availability lives in the sidebar on desktop; phones/tablets get it here. */}
    <p
      className={cn(
        enter("delay-0"),
        "mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 lg:hidden"
      )}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      {profile.availability}
    </p>

    <p className={cn(enter("delay-75"), "mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary sm:mb-5")}>
      <span aria-hidden className="text-muted-foreground">$ </span>
      Hi, I'm {profile.name.split(" ")[0]}
      <span className="hidden sm:inline"> — {profile.role}</span>
      <span aria-hidden className="caret" />
    </p>

    <h1
      id="home-title"
      className={cn(
        enter("delay-150"),
        "max-w-3xl text-balance text-[2.35rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      )}
    >
      I build{" "}
      <span className="text-gradient">
        scalable, <span className="whitespace-nowrap">event-driven</span>
      </span>{" "}
      backend systems.
    </h1>

    <p
      className={cn(
        enter("delay-300"),
        "mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"
      )}
    >
      {profile.summary}
    </p>

    <ul className={cn(enter("delay-500"), "mt-5 flex flex-wrap gap-2 sm:mt-6")} aria-label="Quick facts">
      {FACTS.map(({ icon: Icon, text }) => (
        <li
          key={text}
          className="flex items-center gap-1.5 rounded-full border bg-card/70 px-3 py-1 text-xs text-muted-foreground sm:text-sm"
        >
          <Icon className="size-3.5 text-primary sm:size-4" aria-hidden />
          {text}
        </li>
      ))}
    </ul>

    {/* Phones: full-width primary + an equal pair below. sm+: one row. */}
    <div className={cn(enter("delay-700"), "mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap")}>
      <Button size="lg" className="group col-span-2 w-full sm:w-auto" onClick={() => scrollToSection("projects")}>
        View my work
        <ArrowRight className="ml-2 size-4 transition-transform duration-500 ease-smooth group-hover:translate-x-1" aria-hidden />
      </Button>
      <Button size="lg" variant="outline" className="w-full px-4 sm:w-auto sm:px-6" onClick={() => scrollToSection("contact")}>
        Get in touch
      </Button>
      <Button size="lg" variant="outline" className="w-full px-4 sm:w-auto sm:border-transparent sm:bg-transparent sm:px-6 sm:shadow-none" asChild>
        <ExternalLink href={profile.resumeUrl}>
          <FileText className="mr-2 size-4" aria-hidden /> Résumé
        </ExternalLink>
      </Button>
    </div>

    <div className={cn(enter("delay-1000"), "mt-10 sm:mt-12")}>
      <SystemPanel />
    </div>
  </section>
);

export default Hero;
