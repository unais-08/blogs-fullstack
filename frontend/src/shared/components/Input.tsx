import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const inputClasses = [
      "w-full px-4 py-3 border-2 transition-all duration-300 rounded-md text-slate-900 font-medium",
      "focus:outline-none focus:ring-0", // Removing standard ring for custom border feel
      error
        ? "border-red-500 bg-red-50"
        : "border-slate-100 bg-[#f9f9f9] focus:border-[#7843e9] focus:bg-white",
      "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    ].join(" ");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#111] mb-2"
          >
            {label}
            {props.required && <span className="text-[#7843e9] ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
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

Input.displayName = "Input";
