import { Check, Clock, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export type Status =
  | "awaiting_approval"
  | "awaiting_confirmation"
  | "confirmed"
  | "not_available";

type Props = { status: Status; className?: string };

/** Status pill with icon + text, so colour is never the only signal. */
export function StatusChip({ status, className }: Props) {
  const t = useTranslations("Common");
  const map = {
    awaiting_approval: {
      label: t("awaitingApproval"),
      cls: "bg-amber-bg text-amber-text",
      Icon: Clock,
    },
    awaiting_confirmation: {
      label: t("awaitingConfirmation"),
      cls: "bg-amber-bg text-amber-text",
      Icon: Clock,
    },
    confirmed: {
      label: t("confirmed"),
      cls: "bg-green-bg text-green-text",
      Icon: Check,
    },
    not_available: {
      label: t("notAvailable"),
      cls: "bg-grey-bg text-ink-2",
      Icon: XCircle,
    },
  } as const;
  const { label, cls, Icon } = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-8 px-3 rounded-pill text-[13px] font-bold",
        cls,
        className,
      )}
    >
      <Icon size={14} strokeWidth={2.5} aria-hidden />
      {label}
    </span>
  );
}
