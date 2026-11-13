import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/DynamicValues";
import { scrollToSection } from "@/lib/utils";

const Footer = () => (
  <footer className="flex flex-col items-center justify-between gap-4 border-t py-8 text-sm text-muted-foreground sm:flex-row">
    <p>
      © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript &amp; Tailwind CSS.
    </p>
    <Button variant="ghost" size="sm" onClick={() => scrollToSection("home")}>
      Back to top <ArrowUp className="ml-1.5 size-3.5" />
    </Button>
  </footer>
);

export default Footer;
