import { useRef } from "react";
import { Check, Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useTheme, type Theme, type ThemeOrigin } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Theme; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

const centerOf = (el: Element | null): ThemeOrigin | undefined => {
  if (!el) return undefined;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

/** Compact icon button that opens a Light / Dark / System menu. */
export const ThemeMenu = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const TriggerIcon = theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={triggerRef}
          variant="ghost"
          size="icon"
          aria-label={`Theme: ${theme}. Change theme`}
          title="Change theme"
        >
          <TriggerIcon key={theme} className="size-4 animate-in spin-in-90 fade-in duration-500 ease-smooth" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 duration-300">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => setTheme(value, centerOf(triggerRef.current))}
            className="cursor-pointer gap-2"
            aria-checked={theme === value}
            role="menuitemradio"
          >
            <Icon className="size-4" aria-hidden />
            <span className="flex-1">{label}</span>
            {theme === value && <Check className="size-4 text-primary" aria-hidden />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/** Segmented Light / Dark / System control with a sliding selection indicator. */
export const ThemeSegmented = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(0, OPTIONS.findIndex((o) => o.value === theme));

  // Radio-group keyboard pattern: arrows move + select.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + OPTIONS.length) % OPTIONS.length;
    buttons.current[next]?.focus();
    setTheme(OPTIONS[next].value, centerOf(buttons.current[next]));
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      onKeyDown={onKeyDown}
      className={cn("relative grid grid-cols-3 rounded-lg border bg-muted/50 p-1", className)}
    >
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-md bg-background shadow-sm ring-1 ring-border transition-transform duration-500 ease-smooth"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {OPTIONS.map(({ value, label, icon: Icon }, i) => {
        const selected = theme === value;
        return (
          <button
            key={value}
            ref={(el) => (buttons.current[i] = el)}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={(e) => setTheme(value, { x: e.clientX, y: e.clientY })}
            className={cn(
              "relative z-10 flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors duration-300",
              selected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeMenu;
