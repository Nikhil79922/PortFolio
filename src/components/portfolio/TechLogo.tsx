import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  src?: string;
  className?: string;
}

/** Lazy-loaded tech logo with a tidy monogram fallback when missing or broken. */
const TechLogo = ({ name, src, className }: Props) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        aria-hidden
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-md bg-primary/10 text-[10px] font-semibold text-primary",
          className
        )}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      width={20}
      height={20}
      onError={() => setFailed(true)}
      className={cn("size-5 shrink-0 object-contain", className)}
    />
  );
};

export default TechLogo;
