import { Code2, Github, Linkedin, Mail, type LucideProps } from "lucide-react";
import { SocialKind } from "@/lib/Models";

const ICONS: Record<SocialKind, React.ComponentType<LucideProps>> = {
  github: Github,
  linkedin: Linkedin,
  leetcode: Code2,
  email: Mail,
};

const SocialIcon = ({ kind, ...props }: { kind: SocialKind } & LucideProps) => {
  const Icon = ICONS[kind];
  return <Icon aria-hidden {...props} />;
};

export default SocialIcon;
