import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

/** Screen point the theme-switch animation should expand from (e.g. the clicked button). */
export type ThemeOrigin = { x: number; y: number };

type ThemeProviderState = {
  /** The user's choice (may be "system"). */
  theme: Theme;
  /** What is actually applied right now. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme, origin?: ThemeOrigin) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

const MEDIA = "(prefers-color-scheme: dark)";
const getSystemTheme = (): ResolvedTheme => (window.matchMedia(MEDIA).matches ? "dark" : "light");

const readStored = (key: string, fallback: Theme): Theme => {
  try {
    const v = localStorage.getItem(key);
    return v === "dark" || v === "light" || v === "system" ? v : fallback;
  } catch {
    return fallback;
  }
};

type ViewTransitionDocument = Document & { startViewTransition?: (cb: () => void) => unknown };

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme" }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => readStored(storageKey, defaultTheme));
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  // Follow OS-level changes live while in "system" mode.
  useEffect(() => {
    const mql = window.matchMedia(MEDIA);
    const onChange = () => setSystemTheme(mql.matches ? "dark" : "light");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  // Layout effect: the class must be applied synchronously so a view transition captures it.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const value = useMemo<ThemeProviderState>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (next: Theme, origin?: ThemeOrigin) => {
        try {
          localStorage.setItem(storageKey, next);
        } catch {
          /* storage unavailable (private mode) — still apply for this session */
        }

        // Reduced-motion users get a cross-fade instead of the wipe (handled in CSS).
        const doc = document as ViewTransitionDocument;
        if (!doc.startViewTransition || next === theme) {
          setThemeState(next);
          return;
        }
        const root = document.documentElement;
        root.style.setProperty("--vt-x", origin ? `${origin.x}px` : "50%");
        root.style.setProperty("--vt-y", origin ? `${origin.y}px` : "0%");
        doc.startViewTransition(() => flushSync(() => setThemeState(next)));
      },
    }),
    [theme, resolvedTheme, storageKey]
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
