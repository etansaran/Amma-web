"use client";

import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  children?: ReactNode;
  as?: "input" | "select" | "textarea";
  rows?: number;
}

export default function FormField({
  label,
  id,
  type = "text",
  placeholder,
  registration,
  error,
  required,
  children,
  as = "input",
  rows = 4,
}: FormFieldProps) {
  const baseClass = `w-full rounded-xl px-4 py-3 input-spiritual text-sm font-raleway ${
    error ? "border-red-500/50" : ""
  }`;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[#F5F5F5]/70 text-sm font-raleway font-medium mb-1.5"
      >
        {label} {required && <span className="text-[#C17F4A]">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          className={`${baseClass} resize-none`}
          {...registration}
        />
      ) : as === "select" ? (
        <select id={id} className={baseClass} {...registration}>
          {children}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={baseClass}
          {...registration}
        />
      )}

      {error && (
        <p className="mt-1 text-red-400 text-xs font-raleway">{error}</p>
      )}
    </div>
  );
}
