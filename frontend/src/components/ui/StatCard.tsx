import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  color?: "primary" | "accent" | "destructive" | "teal";
}

const colorMap = {
  primary: { bg: "bg-primary/15", text: "text-primary", icon: "text-primary" },
  accent: { bg: "bg-warning-amber/15", text: "text-warning-amber", icon: "text-warning-amber" },
  destructive: { bg: "bg-destructive/15", text: "text-destructive", icon: "text-destructive" },
  teal: { bg: "bg-safe-teal/15", text: "text-safe-teal", icon: "text-safe-teal" },
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, color = "primary" }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/20">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={clsx("mt-2 text-3xl font-bold", colors.text)}>{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span className={clsx("text-xs font-medium", trend.positive ? "text-primary" : "text-destructive")}>
                {trend.positive ? "+" : ""}
                {trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div className={clsx("rounded-lg p-3", colors.bg)}>
          <Icon className={clsx("h-6 w-6", colors.icon)} />
        </div>
      </div>
    </div>
  );
}
