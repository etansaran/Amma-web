import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

type Props = { items: Crumb[]; onNight?: boolean; className?: string };

/** "Home › About Maataji" trail. The last item is the current page. */
export function Breadcrumbs({ items, onNight, className }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-sm",
          onNight ? "text-on-night-2" : "text-ink-2",
        )}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "inline-block py-3 -my-3 hover:underline underline-offset-4",
                    onNight ? "text-on-night-2 hover:text-on-night" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined}>{item.label}</span>
              )}
              {!last ? (
                <ChevronRight size={14} aria-hidden className="opacity-70" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
