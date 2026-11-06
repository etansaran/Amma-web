import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Gold-on-night variant for dark sections. */
  tone?: "saffron" | "gold";
  external?: boolean;
};

/** Text link with an arrow that nudges on hover — "Full calendar →". */
export function ArrowLink({
  href,
  children,
  className,
  tone = "saffron",
  external,
}: Props) {
  const classes = cn(
    tone === "gold" ? "link-arrow-gold" : "link-arrow",
    className,
  );
  const icon = <ArrowRight size={16} strokeWidth={2.25} aria-hidden />;
  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(/^https?:/.test(href)
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
