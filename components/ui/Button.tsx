"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-[#0D0D0D] font-bold shadow-md hover:shadow-[0_8px_24px_rgba(212,168,83,0.4)] hover:-translate-y-0.5",
  secondary:
    "bg-[#1A1A1A] border border-[#D4A853]/30 text-[#D4A853] hover:bg-[#222222] hover:border-[#D4A853]/60 hover:-translate-y-0.5",
  outline:
    "border border-[#D4A853]/50 text-[#D4A853] bg-transparent hover:bg-[#D4A853]/10 hover:border-[#D4A853] hover:-translate-y-0.5",
  ghost:
    "text-[#D4A853] bg-transparent hover:bg-[#D4A853]/10",
};

const sizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled,
  loading,
  className = "",
  type = "button",
  fullWidth,
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-raleway font-semibold rounded-full
    transition-all duration-200
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${disabled || loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
    ${className}
  `;

  const content = (
    <>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </>
  );

  if (href) {
    return <Link href={href} className={baseClasses}>{content}</Link>;
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
    >
      {content}
    </motion.button>
  );
}
