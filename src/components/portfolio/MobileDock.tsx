import { Briefcase, FolderGit2, Home, Layers, Mail, Trophy, type LucideIcon } from "lucide-react";
import { navItems } from "@/lib/DynamicValues";
import { cn, scrollToSection } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  experience: Briefcase,
  projects: FolderGit2,
  skills: Layers,
  achievements: Trophy,
  contact: Mail,
};

/** Short labels that fit a ~56px dock cell. */
const SHORT: Record<string, string> = { experience: "Work", achievements: "Awards" };

/**
 * Thumb-reachable bottom navigation for phones and tablets (< lg).
 * Always visible, no overlay or scroll-lock involved, so taps scroll immediately.
 */
const MobileDock = ({ active }: { active: string }) => {
  const index = Math.max(0, navItems.findIndex((i) => i.id === active));

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <ul
        className="pointer-events-auto relative grid w-full max-w-md rounded-2xl border bg-card p-1.5 shadow-2xl shadow-black/40 dark:border-t-[hsl(var(--edge))] animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-150 duration-500 ease-smooth"
        style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
      >
        {/* Sliding active indicator */}
        <span
          aria-hidden
          className="absolute inset-y-1.5 left-1.5 rounded-xl bg-primary/10 ring-1 ring-primary/25 transition-transform duration-500 ease-smooth"
          style={{
            width: `calc((100% - 0.75rem) / ${navItems.length})`,
            transform: `translateX(${index * 100}%)`,
          }}
        />
        {navItems.map((item) => {
          const Icon = ICONS[item.id] ?? Home;
          const isActive = item.id === active;
          return (
            <li key={item.id} className="relative z-10">
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium leading-none transition-[color,transform] duration-300 ease-smooth active:scale-95",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon
                  aria-hidden
                  className={cn("size-5 transition-transform duration-500 ease-smooth", isActive && "-translate-y-0.5 scale-110")}
                />
                <span aria-hidden>{SHORT[item.id] ?? item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileDock;
