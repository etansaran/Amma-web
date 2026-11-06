import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  /** id of the control inside — the label points at it. */
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  /** Message shown once the visitor leaves the field invalid. */
  error?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Visible label + control (+ optional hint). Flexes to 240px in a wrapping row. */
export function FormField({ id, label, hint, error, children, className }: Props) {
  const t = useTranslations("Common");
  return (
    <div className={cn("form-field flex flex-col flex-[1_1_240px] min-w-0", className)}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-[13px] text-ink-2">{hint}</p> : null}
      <p className="field-error items-center gap-1.5" aria-live="polite">
        <CircleAlert size={14} aria-hidden className="shrink-0" />
        {error ?? t("fieldError")}
      </p>
    </div>
  );
}
