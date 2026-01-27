/**
 * Card Component
 * Reusable card container
 */

import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = ({
  children,
  className = "",
  padding = "md",
  hover = false,
}: CardProps) => {
  const classes = [
    "bg-white rounded-lg shadow-md border border-gray-200",
    paddingClasses[padding],
    hover ? "transition-shadow duration-200 hover:shadow-lg" : "",
    className,
  ].join(" ");

  return <div className={classes}>{children}</div>;
};
