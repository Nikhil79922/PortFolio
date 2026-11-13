import { Cloud, Code2, CreditCard, Database, Layers, Network, ShieldCheck, type LucideIcon } from "lucide-react";
import { alsoFamiliar, skillGroups } from "@/lib/DynamicValues";
import { SkillGroupIcon } from "@/lib/Models";
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

const Skills = () => (
  <Section
    id="skills"
    eyebrow="Skills"
    title="Tools of the trade"
    description="Java-first, with a deep focus on microservices, messaging and data."
  >
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
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
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2 rounded-lg border bg-background/60 px-2.5 py-1.5 text-sm"
                  >
                    {skill.logo && (
                      <TechLogo
                        name={skill.name}
                        src={skill.logo}
                        className={cn("size-4", skill.invertOnDark && "dark:invert")}
                      />
                    )}
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>

    {alsoFamiliar.length > 0 && (
      <Reveal className="mt-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Also familiar with:</span> {alsoFamiliar.join(" · ")}
        </p>
      </Reveal>
    )}
  </Section>
);

export default Skills;
