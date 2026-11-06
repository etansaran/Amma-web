import type { ReactNode } from "react";

/** Re-mounts on every navigation, giving each page a short CSS fade-in. */
export default function SiteTemplate({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
