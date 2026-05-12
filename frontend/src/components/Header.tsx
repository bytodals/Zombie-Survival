import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search survivors, weapons..."
            className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden rounded border border-border bg-card px-1.5 py-0.5 text-xs text-muted-foreground md:inline-block">
            /
          </kbd>
        </div>
      </div>
    </header>
  );
}
