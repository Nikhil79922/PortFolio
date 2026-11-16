import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems, profile } from "@/lib/DynamicValues";
import { scrollToSection } from "@/lib/utils";
import Avatar from "./Avatar";
import { openPalette } from "./CommandPalette";
import ShareButton from "./ShareButton";
import { ThemeMenu } from "./ThemeToggle";

/**
 * Top bar for phones and tablets (< lg). No hamburger: sections live in the always-visible
 * <MobileDock>, and everything else (résumé, profiles, theme, copy email) is one tap away
 * in the command palette behind the search button.
 */
const MobileHeader = ({ active }: { active: string }) => {
  const current = navItems.find((n) => n.id === active)?.label ?? "";

  return (
    <header className="sticky top-0 z-40 border-b bg-background shadow-[0_1px_0_0_hsl(var(--foreground)/0.02)] animate-in fade-in slide-in-from-top-2 duration-500 ease-smooth lg:hidden">
      <div className="flex h-14 items-center justify-between gap-2 px-4 sm:px-6">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="flex min-w-0 items-center gap-2.5 rounded-lg"
        >
          <Avatar className="size-8 shrink-0 rounded-lg text-xs" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-semibold">{profile.name}</span>
            <span
              key={current}
              className="truncate font-mono text-[10px] uppercase tracking-wider text-primary animate-in fade-in slide-in-from-bottom-1 duration-500 ease-smooth"
            >
              {current}
            </span>
          </span>
        </a>

        <div className="flex shrink-0 items-center">
          <Button variant="ghost" size="icon" onClick={openPalette} aria-label="Search: résumé, profiles, sections and theme" title="Search">
            <Search className="size-[18px]" />
          </Button>
          <ThemeMenu />
          <ShareButton />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
