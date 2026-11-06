import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant =
  | "saffron"
  | "night"
  | "outline-gold"
  | "outline-saffron"
  | "outline-night"
  | "white";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  saffron: "btn-saffron",
  night: "btn-night",
  "outline-gold": "btn-outline-gold",
  "outline-saffron": "btn-outline-saffron",
  "outline-night": "btn-outline-night",
  white: "btn-white",
};

const sizeClass: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** When true the button stretches to its container. */
  block?: boolean;
};

type LinkButtonProps = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type RealButtonProps = BaseProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: never;
    external?: never;
  };

export type ButtonProps = LinkButtonProps | RealButtonProps;

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

/**
 * Pill button. Internal `href` → locale-aware Link; external/mailto/tel → <a>;
 * no href → <button>.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "saffron",
    size = "md",
    className,
    children,
    block,
  } = props;
  const classes = cn(
    "btn",
    variantClass[variant],
    sizeClass[size],
    block && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external || isExternal(href)) {
      const newTab = /^https?:/.test(href);
      return (
        <a
          href={href}
          className={classes}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    type = "button",
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    block: _block,
    href: _href,
    external: _external,
    ...rest
  } = props as RealButtonProps;
  void _variant; void _size; void _className; void _children; void _block; void _href; void _external;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
