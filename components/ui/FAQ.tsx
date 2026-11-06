import { ChevronDown } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { faqSchema, type FaqItem } from "@/lib/schema";
import { cn } from "@/lib/cn";

type Props = {
  items: FaqItem[];
  /** Emit FAQPage JSON-LD (default true). */
  schema?: boolean;
  className?: string;
};

/** Accessible accordion built on <details>, with FAQPage structured data. */
export function FAQ({ items, schema = true, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {schema ? <JsonLd data={faqSchema(items)} /> : null}
      {items.map((item, i) => (
        <details
          key={i}
          className="group card overflow-hidden open:border-line-2 open:shadow-card transition-shadow"
        >
          <summary className="flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 font-display text-[18px] md:text-[20px] leading-snug text-ink">
            <span>{item.question}</span>
            <span className="icon-circle w-9! h-9! bg-sand! text-saffron-text! transition-transform duration-300 group-open:rotate-180">
              <ChevronDown size={18} aria-hidden />
            </span>
          </summary>
          <div className="px-5 pb-5 md:px-6 md:pb-6 -mt-1 text-ink-2 text-[15.5px] leading-relaxed">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
