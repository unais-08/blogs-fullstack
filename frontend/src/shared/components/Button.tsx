/**
 * Button Component
 * Updated for high-contrast purple theme with uppercase bold styling
 */

import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  // Brand Purple from screenshot
  primary:
    "bg-[#7843e9] text-white hover:bg-[#6a36db] focus:ring-[#7843e9] shadow-[0_5px_15px_rgba(0,0,0,0.15)] active:translate-y-0.5",
  // Darker purple for UI elements like chat bubbles
  secondary: "bg-[#3f21b3] text-white hover:bg-[#331b94] focus:ring-[#3f21b3]",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  // Transparent variant used in "Get Started" buttons
  outline:
    "bg-transparent border-2 border-[#7843e9] text-[#7843e9] hover:bg-[#7843e910] focus:ring-[#7843e9]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-6 py-2 text-xs tracking-widest",
  md: "px-10 py-3 text-sm tracking-widest",
  lg: "px-14 py-4 text-base tracking-widest", // Matches the hero button scale
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  // Added 'uppercase' and 'font-black' to match the design's text style
  const baseClasses =
    "cursor-pointer font-black uppercase rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-center";

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
