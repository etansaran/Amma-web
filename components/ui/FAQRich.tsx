import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";

export type FaqRichItem = {
  question: string;
  /** Rendered answer — may contain links and <Placeholder>s. */
  answer: ReactNode;
  /**
   * Plain-text answer for the FAQPage structured data. Required when `answer`
   * is not a string, so that no "[placeholder]" text reaches search engines.
   */
  schemaAnswer?: string;
  /** Open by default (the design opens the first question). */
  open?: boolean;
};

type Props = {
  items: FaqRichItem[];
  /** Emit FAQPage JSON-LD (default true). */
  schema?: boolean;
  className?: string;
};

/**
 * Same accordion as <FAQ>, for answers that need markup (links, placeholders).
 * The JSON-LD is built from `schemaAnswer` (or the answer itself when it is a string).
 */
export function FAQRich({ items, schema = true, className }: Props) {
  const schemaItems = items
    .map((item) => ({
      question: item.question,
      answer:
        typeof item.answer === "string" ? item.answer : (item.schemaAnswer ?? ""),
    }))
    .filter((item) => item.answer.length > 0);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {schema && schemaItems.length > 0 ? <JsonLd data={faqSchema(schemaItems)} /> : null}
      {items.map((item, i) => (
        <details
          key={i}
          open={item.open}
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
