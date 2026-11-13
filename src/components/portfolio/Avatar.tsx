import { profile } from "@/lib/DynamicValues";
import { cn } from "@/lib/utils";

const Avatar = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      "relative grid place-items-center rounded-2xl bg-gradient-to-br from-primary to-brand2 font-bold text-white shadow-lg shadow-primary/20",
      className
    )}
  >
    <span className="tracking-tight">{profile.initials}</span>
  </div>
);

export default Avatar;
