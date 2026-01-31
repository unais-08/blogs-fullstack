import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, className = "", id, rows = 4, ...props },
    ref,
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const textareaClasses = [
      "w-full px-5 py-4 border-2 transition-all duration-300 rounded-md text-slate-900 font-medium leading-relaxed",
      "focus:outline-none focus:ring-0",
      "resize-y min-h-[150px]",
      error
        ? "border-red-500 bg-red-50"
        : "border-slate-100 bg-[#f9f9f9] focus:border-[#7843e9] focus:bg-white",
      className,
    ].join(" ");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#111] mb-2"
          >
            {label}
            {props.required && <span className="text-[#7843e9] ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={textareaClasses}
          {...props}
        />

        {error && (
          <p
            className="mt-2 text-[10px] font-bold uppercase tracking-wider text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
