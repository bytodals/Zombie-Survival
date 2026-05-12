import clsx from "clsx";
import type { ReactNode } from "react";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Loading data...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="transition-colors hover:bg-secondary/50">
              {columns.map((col) => (
                <td key={col.key} className={clsx("px-4 py-3.5 text-sm", col.className)}>
                  {col.render ? col.render(item) : (item as Record<string, unknown>)[col.key]?.toString() ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
