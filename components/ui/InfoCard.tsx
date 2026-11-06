import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  icon?: LucideIcon;
  eyebrow: string;
  title: ReactNode;
  note?: ReactNode;
  className?: string;
};

/** Small white card: gold eyebrow, bold line, grey note — "Temple timings". */
export function InfoCard({ icon: Icon, eyebrow, title, note, className }: Props) {
  return (
    <div className={cn("card px-5 py-[18px] flex gap-3.5", className)}>
      {Icon ? (
        <span className="icon-circle w-10! h-10! bg-sand! text-saffron-text! mt-0.5" aria-hidden>
          <Icon size={18} />
        </span>
      ) : null}
      <div className="min-w-0">
        <p className="eyebrow-gold">{eyebrow}</p>
        <p className="mt-1 font-semibold leading-snug">{title}</p>
        {note ? <p className="mt-0.5 text-[13px] text-ink-2">{note}</p> : null}
      </div>
    </div>
  );
}
