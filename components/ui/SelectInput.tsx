import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = Omit<ComponentProps<"select">, "className"> & { className?: string };

/** Native <select> styled like the `input` utility, with a chevron. */
export function SelectInput({ className, children, ...rest }: Props) {
  return (
    <span className={cn("relative block", className)}>
      <select className="input appearance-none pr-11 cursor-pointer" {...rest}>
        {children}
      </select>
      <ChevronDown
        size={18}
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-2"
      />
    </span>
  );
}
