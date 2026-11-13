import { memo } from "react";
import Achievements from "./components/portfolio/Achievements";
import CommandPalette from "./components/portfolio/CommandPalette";
import Contact from "./components/portfolio/Contact";
import Experience from "./components/portfolio/Experience";
import Footer from "./components/portfolio/Footer";
import Hero from "./components/portfolio/Hero";
import MobileDock from "./components/portfolio/MobileDock";
import MobileHeader from "./components/portfolio/MobileHeader";
import Projects from "./components/portfolio/Projects";
import Sidebar from "./components/portfolio/Sidebar";
import Skills from "./components/portfolio/Skills";
import TechMarquee from "./components/portfolio/TechMarquee";
import { Toaster } from "./components/ui/toaster";
import { useActiveSection } from "./hooks/useActiveSection";
import { useSpotlight } from "./hooks/useSpotlight";
import { navItems } from "./lib/DynamicValues";

const SECTION_IDS = navItems.map((n) => n.id);

/**
 * All page content, memoized: the active-section state changes while scrolling, and only the
 * navigation should re-render then — not the diagram, cards and lists (that would drop frames).
 */
const Content = memo(function Content() {
  return (
    <main
      id="main"
      className="mx-auto max-w-5xl px-4 pb-28 transition-[padding] duration-500 ease-smooth sm:px-8 lg:px-12 lg:pb-0 xl:px-16"
    >
      <Hero />
      <TechMarquee />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
});

function App() {
  const active = useActiveSection(SECTION_IDS);
  useSpotlight();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Reading progress (CSS scroll-driven animation; hidden where unsupported) */}
      <div
        aria-hidden
        className="scroll-progress fixed inset-x-0 top-0 z-[55] h-0.5 bg-gradient-to-r from-primary via-brand2 to-primary"
      />

      {/* Ambient backdrop: drifting light, grid and film grain. Fixed + clipped so it never causes overflow. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="glow absolute inset-x-0 top-0 h-[680px]" />
        <div className="bg-grid absolute inset-x-0 top-0 h-[680px]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative flex min-h-dvh overflow-x-clip">
        <Sidebar active={active} />

        <div className="min-w-0 flex-1">
          <MobileHeader active={active} />
          <Content />
        </div>
      </div>

      <MobileDock active={active} />
      <CommandPalette />
      <Toaster />
    </>
  );
}

export default App;
