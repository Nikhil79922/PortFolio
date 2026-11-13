import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { profile, socials } from "@/lib/DynamicValues";
import { copyText } from "@/lib/utils";
import ExternalLink from "./ExternalLink";
import Section, { Reveal } from "./Section";
import SocialIcon from "./SocialIcon";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const email = socials.find((s) => s.kind === "email");

  const copyEmail = async () => {
    if (await copyText(profile.email)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      toast({ title: "Couldn't copy automatically", description: profile.email });
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something reliable">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-10">
          <div aria-hidden className="glow pointer-events-none absolute inset-0 opacity-80" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="max-w-lg text-lg text-muted-foreground">
                I'm currently {profile.availability.toLowerCase()} in Java backend and microservices
                engineering. The fastest way to reach me is by email — I usually reply within a day.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <ExternalLink href={email?.href}>
                    <Mail className="mr-2 size-4" /> Email me
                  </ExternalLink>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={copyEmail}
                  aria-label={`Copy email address ${profile.email}`}
                  title="Copy email address"
                >
                  {copied ? (
                    <Check key="check" className="mr-2 size-4 text-emerald-500 animate-in zoom-in-50 spin-in-12 duration-300" aria-hidden />
                  ) : (
                    <Copy key="copy" className="mr-2 size-4 animate-in fade-in zoom-in-75 duration-200" aria-hidden />
                  )}
                  {profile.email}
                </Button>
                <Button size="lg" variant="ghost" asChild>
                  <ExternalLink href={profile.resumeUrl}>
                    <FileText className="mr-2 size-4" aria-hidden /> Résumé
                  </ExternalLink>
                </Button>
                <span className="sr-only" role="status" aria-live="polite">
                  {copied ? "Email address copied to clipboard" : ""}
                </span>
              </div>
            </div>

            <ul className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {socials
                .filter((s) => s.kind !== "email")
                .map((s) => (
                  <li key={s.kind}>
                    <ExternalLink
                      href={s.href}
                      className="group flex items-center gap-3 rounded-xl border bg-background/60 p-3 transition-colors hover:border-primary/40 hover:bg-background"
                    >
                      <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                        <SocialIcon kind={s.kind} className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">{s.label}</span>
                        <span className="block truncate text-xs text-muted-foreground">{s.handle}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </ExternalLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
};

export default Contact;
