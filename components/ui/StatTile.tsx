import { cn } from "@/lib/cn";

type Props = {
  value: string;
  label: string;
  onNight?: boolean;
  className?: string;
};

/** Big number + caption — "365 · days a year, without a break". */
export function StatTile({ value, label, onNight, className }: Props) {
  return (
    <div
      className={cn(
        "flex-[1_1_150px] rounded-2xl p-5",
        onNight ? "bg-night-2 border border-night-line" : "card",
        className,
      )}
    >
      <p
        className={cn(
          "font-display text-[32px] md:text-[36px] leading-none",
          onNight ? "text-gold-light" : "text-saffron-text",
        )}
      >
        {value}
      </p>
      <p className={cn("mt-1.5 text-sm", onNight ? "text-on-night-2" : "text-ink-2")}>
        {label}
      </p>
    </div>
  );
}
