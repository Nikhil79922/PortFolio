import React from "react";
import { isSafeHref, opensNewTab } from "@/lib/utils";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  href?: string;
};

/**
 * A real <a> element for outbound links. Uses `noopener noreferrer` so the opened
 * page can't access `window.opener` (reverse-tabnabbing), and refuses unsafe schemes.
 */
const ExternalLink = React.forwardRef<HTMLAnchorElement, Props>(({ href, children, ...rest }, ref) => {
  if (!isSafeHref(href)) return <span {...(rest as React.HTMLAttributes<HTMLSpanElement>)}>{children}</span>;
  return (
    <a
      ref={ref}
      href={href}
      {...(opensNewTab(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
});
ExternalLink.displayName = "ExternalLink";

export default ExternalLink;
