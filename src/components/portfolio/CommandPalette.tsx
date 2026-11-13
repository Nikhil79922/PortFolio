import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight,
  Copy,
  CornerDownLeft,
  FileText,
  Hash,
  Monitor,
  Moon,
  Search,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/components/ui/use-toast";
import { navItems, profile, socials } from "@/lib/DynamicValues";
import { cn, copyText, scrollToSection } from "@/lib/utils";
import SocialIcon from "./SocialIcon";

/** Fire this from anywhere to open the palette. */
export const OPEN_PALETTE_EVENT = "palette:open";
// eslint-disable-next-line react-refresh/only-export-components
export const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

// eslint-disable-next-line react-refresh/only-export-components
export const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

type IconProps = { className?: string };

interface Command {
  id: string;
  group: "Jump to" | "Links" | "Appearance" | "Actions";
  label: string;
  hint?: string;
  icon: LucideIcon | ((p: IconProps) => JSX.Element);
  keywords?: string;
  run: () => void;
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const pending = useRef<(() => void) | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { setTheme } = useTheme();
  const { toast } = useToast();

  // Global shortcut + programmatic open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  const commands = useMemo<Command[]>(() => {
    const openUrl = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      ...navItems.map<Command>((n) => ({
        id: `go-${n.id}`,
        group: "Jump to",
        label: n.label,
        icon: Hash,
        run: () => scrollToSection(n.id),
      })),
      { id: "resume", group: "Links", label: "Open résumé", icon: FileText, keywords: "cv pdf", run: openUrl(profile.resumeUrl) },
      ...socials
        .filter((s) => s.kind !== "email")
        .map<Command>((s) => ({
          id: `link-${s.kind}`,
          group: "Links",
          label: `Open ${s.label}`,
          hint: s.handle,
          icon: (p: IconProps) => <SocialIcon kind={s.kind} {...p} />,
          run: openUrl(s.href),
        })),
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        hint: profile.email,
        icon: (p: IconProps) => <SocialIcon kind="email" {...p} />,
        keywords: "contact mail hire",
        run: () => (window.location.href = socials.find((s) => s.kind === "email")!.href),
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        icon: Copy,
        keywords: "contact clipboard",
        run: async () => {
          const ok = await copyText(profile.email);
          toast({ title: ok ? "Email copied" : "Couldn't copy", description: profile.email });
        },
      },
      { id: "theme-light", group: "Appearance", label: "Light theme", icon: Sun, keywords: "mode", run: () => setTheme("light") },
      { id: "theme-dark", group: "Appearance", label: "Dark theme", icon: Moon, keywords: "mode", run: () => setTheme("dark") },
      { id: "theme-system", group: "Appearance", label: "System theme", icon: Monitor, keywords: "mode auto", run: () => setTheme("system") },
    ];
  }, [setTheme, toast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ""} ${c.hint ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => setIndex(0), [query]);

  // Keep the highlighted option in view.
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const choose = (cmd: Command | undefined) => {
    if (!cmd) return;
    pending.current = cmd.run; // run after the dialog has fully closed (scroll-lock released)
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[index]);
    }
  };

  let lastGroup = "";

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) setQuery("");
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          onCloseAutoFocus={(e) => {
            if (pending.current) {
              e.preventDefault();
              const run = pending.current;
              pending.current = null;
              run();
            }
          }}
          className="fixed left-1/2 top-[12vh] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-2xl shadow-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 duration-300 ease-smooth"
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Dialog.Description className="sr-only">
            Type to filter. Use the arrow keys to choose and Enter to run.
          </Dialog.Description>

          <div className="flex items-center gap-3 border-b px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Jump to a section, open a link, switch theme…"
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
              aria-autocomplete="list"
            />
            <kbd className="hidden shrink-0 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
              ESC
            </kbd>
          </div>

          <ul id="palette-list" ref={listRef} role="listbox" aria-label="Commands" className="max-h-[min(60vh,22rem)] overflow-y-auto p-2">
            {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted-foreground">No results for “{query}”</li>}
            {filtered.map((cmd, i) => {
              const Icon = cmd.icon;
              const showGroup = cmd.group !== lastGroup;
              lastGroup = cmd.group;
              const selected = i === index;
              return (
                <li key={cmd.id} role="presentation">
                  {showGroup && (
                    <p role="presentation" className="px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground first:pt-1">
                      {cmd.group}
                    </p>
                  )}
                  <div
                    id={`cmd-${cmd.id}`}
                    role="option"
                    aria-selected={selected}
                    data-index={i}
                    onMouseMove={() => setIndex(i)}
                    onClick={() => choose(cmd)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150",
                      selected ? "bg-accent text-accent-foreground" : "text-foreground/90"
                    )}
                  >
                    <Icon className={cn("size-4 shrink-0", selected ? "text-primary" : "text-muted-foreground")} />
                    <span className="flex-1 truncate">{cmd.label}</span>
                    {cmd.hint && <span className="hidden truncate text-xs text-muted-foreground sm:inline">{cmd.hint}</span>}
                    {selected && <ArrowRight className="size-3.5 shrink-0 text-primary animate-in fade-in slide-in-from-left-1 duration-200" aria-hidden />}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between border-t px-4 py-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border bg-muted px-1 font-mono">↑</kbd>
              <kbd className="rounded border bg-muted px-1 font-mono">↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1.5">
              <CornerDownLeft className="size-3" aria-hidden /> to select
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CommandPalette;
