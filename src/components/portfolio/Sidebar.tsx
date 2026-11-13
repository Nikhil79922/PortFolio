import { FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems, profile, socials } from "@/lib/DynamicValues";
import { cn, scrollToSection } from "@/lib/utils";
import Avatar from "./Avatar";
import { isMac, openPalette } from "./CommandPalette";
import ExternalLink from "./ExternalLink";
import ShareButton from "./ShareButton";
import SocialIcon from "./SocialIcon";
import { ThemeSegmented } from "./ThemeToggle";

const Sidebar = ({ active }: { active: string }) => (
  <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-r bg-card/40 px-6 py-8 backdrop-blur transition-[width] duration-500 ease-smooth lg:flex lg:animate-in lg:fade-in lg:slide-in-from-left-6 lg:duration-500 xl:w-80">
    <div className="flex items-center gap-3">
      <Avatar className="size-12 text-lg" />
      <div className="min-w-0">
        <p className="truncate font-semibold">{profile.name}</p>
        <p className="truncate text-sm text-muted-foreground">{profile.role}</p>
      </div>
    </div>

    <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      {profile.availability}
    </div>

    <button
      type="button"
      onClick={openPalette}
      className="group mt-6 flex w-full items-center gap-2 rounded-lg border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
    >
      <Search className="size-4" aria-hidden />
      <span className="flex-1 text-left">Quick jump…</span>
      <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">{isMac() ? "⌘K" : "Ctrl K"}</kbd>
    </button>

    <nav aria-label="Sections" className="-mx-1 mt-6 min-h-0 flex-1 overflow-y-auto px-1">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300",
                  isActive ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-px transition-all duration-500 ease-smooth",
                    isActive ? "w-6 bg-primary" : "w-3 bg-muted-foreground/50 group-hover:w-5 group-hover:bg-foreground"
                  )}
                />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>

    <ThemeSegmented className="mb-3" />

    <Button asChild className="w-full">
      <ExternalLink href={profile.resumeUrl}>
        <FileText className="mr-2 size-4" /> View résumé
      </ExternalLink>
    </Button>

    <div className="mt-4 flex items-center justify-between border-t pt-4">
      <div className="flex items-center">
        {socials.map((s) => (
          <Button key={s.kind} variant="ghost" size="icon" asChild>
            <ExternalLink href={s.href} aria-label={s.label} title={s.label}>
              <SocialIcon kind={s.kind} className="size-4" />
            </ExternalLink>
          </Button>
        ))}
      </div>
      <ShareButton />
    </div>
  </aside>
);

export default Sidebar;
