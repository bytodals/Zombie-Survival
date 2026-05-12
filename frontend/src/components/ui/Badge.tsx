import clsx from "clsx";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
}

const variantStyles = {
  default: "bg-secondary text-secondary-foreground",
  success: "bg-primary/15 text-primary",
  warning: "bg-warning-amber/15 text-warning-amber",
  danger: "bg-destructive/15 text-destructive",
  info: "bg-safe-teal/15 text-safe-teal",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

export function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
  return (
    <span className={clsx("inline-flex items-center rounded-full font-medium", variantStyles[variant], sizeStyles[size])}>
      {children}
    </span>
  );
}
