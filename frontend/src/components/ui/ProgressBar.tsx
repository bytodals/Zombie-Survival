import clsx from "clsx";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: "primary" | "accent" | "destructive" | "teal";
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const colorMap = {
  primary: "bg-primary",
  accent: "bg-warning-amber",
  destructive: "bg-destructive",
  teal: "bg-safe-teal",
};

const sizeMap = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({ value, max = 100, color = "primary", showLabel = false, size = "md" }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="flex items-center gap-3">
      <div className={clsx("flex-1 overflow-hidden rounded-full bg-secondary", sizeMap[size])}>
        <div className={clsx("h-full rounded-full transition-all duration-500", colorMap[color])} style={{ width: `${percentage}%` }} />
      </div>
      {showLabel && (
        <span className="min-w-[3rem] text-right text-sm font-medium text-muted-foreground">
          {value}/{max}
        </span>
      )}
    </div>
  );
}
