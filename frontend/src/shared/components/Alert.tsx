/**
 * Alert Component
 * Status messages and notifications
 */

import { type ReactNode } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantClasses: Record<AlertVariant, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

export const Alert = ({
  variant = "info",
  children,
  onClose,
  className = "",
}: AlertProps) => {
  const classes = [
    "p-4 rounded-lg border",
    variantClasses[variant],
    className,
  ].join(" ");

  return (
    <div className={classes} role="alert">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-current opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close alert"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
