import type { CSSProperties, ReactNode } from "react";

/*
 * Scroll reveals are pure CSS driven by one shared IntersectionObserver
 * (components/motion/RevealObserver.tsx). These components ship no JavaScript
 * of their own, work in server and client components, and never hide content
 * when JavaScript is unavailable: the hidden start state only applies once the
 * <html> element has the `js` class.
 */

type RevealTag = "div" | "section" | "article" | "li" | "figure" | "header" | "span";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the element rises in. */
  delay?: number;
  as?: RevealTag;
  /** Animate on first paint (hero content) instead of when scrolled into view. */
  immediate?: boolean;
  id?: string;
};

function delayStyle(delay: number): CSSProperties | undefined {
  return delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  immediate = false,
  id,
}: RevealProps) {
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={immediate ? "now" : ""}
      style={delayStyle(delay)}
    >
      {children}
    </Tag>
  );
}

/** Staggers its <RevealItem> children as the group scrolls into view. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility; the stagger step is set in CSS. */
  stagger?: number;
}) {
  return (
    <div className={className} data-reveal-group="">
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "a";
}) {
  return (
    <Tag className={className} data-reveal-item="">
      {children}
    </Tag>
  );
}
