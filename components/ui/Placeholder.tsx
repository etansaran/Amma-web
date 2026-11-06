import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type Props = {
  /** What the office must supply, e.g. "₹ daily cost". Shown to visitors in a soft style. */
  label: string;
  className?: string;
};

/**
 * Marks a fact the ashram office still has to confirm (brief §14).
 * Renders as a clearly-styled, honest placeholder instead of a guessed value.
 */
export function Placeholder({ label, className }: Props) {
  const t = useTranslations("Common");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-dashed border-line-2 bg-amber-bg/60 px-1.5 py-0.5 text-[0.9em] text-amber-text",
        className,
      )}
      title={t("placeholderNote")}
      data-placeholder
    >
      {label}
    </span>
  );
}
